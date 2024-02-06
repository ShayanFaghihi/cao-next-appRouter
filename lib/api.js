const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query = "", { variables }) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getAllAppBuildersHome(preview = false) {
  const data = await fetchAPI(
    `
    query AppBuilders {
        appBuilders(first: 20, where: {orderby: {order: DESC, field: DATE}}) {
          edges {
            node {
              id
              slug
              title
              content(format: RENDERED)
              date
              excerpt(format: RENDERED)
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.appBuilders;
}

export async function getAppBuilderAndMore(slug, preview, previewData) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";
  const data = await fetchAPI(
    `      
    fragment PostFields on AppBuilder {
        id
        slug
        title
        content(format: RENDERED)
        date
        excerpt(format: RENDERED)
        featuredImage {
            node {
            altText
            sourceUrl
            }
        }
      }
    query AppBuilderBySlug($id: ID!, $idType: AppBuilderIdType!) {
        appBuilder(id: $id, idType: $idType) {
          ...PostFields
          appBuilderCustomFields {
            productLogo
            platformSupport
            publishingCosts
            programmingRequired
            easeOfUseRating
            basicAnnualPlanCost
            hyperlinkForPrice
            designFlexibilityRating
            websiteUrl
          }
          ${
            // Only some of the fields of a revision are considered as there are some inconsistencies
            isRevision
              ? `
          revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
            edges {
              node {
                title
                excerpt
                content
              }
            }
          }
          `
              : ""
          }
        }
        appBuilders(first: 4, where: { orderby: { field: MODIFIED, order: DESC } }) {
            edges {
              node {
                ...PostFields
              }
            }
          }
      }
    `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    }
  );

  // Draft appBuilders may not have an slug
  if (isDraft) data.appBuilder.slug = postPreview.id;
  // Apply a revision (changes in a published appBuilder)
  if (isRevision && data.appBuilder.revisions) {
    const revision = data.appBuilder.revisions.edges[0]?.node;

    if (revision) Object.assign(data.appBuilder, revision);
    delete data.appBuilder.revisions;
  }

  // Filter out the main appBuilder
  data.appBuilders.edges = data.appBuilders.edges.filter(
    ({ node }) => node.slug !== slug
  );
  // If there are still 3 appBuilders, remove the last one
  if (data.appBuilders.edges.length > 2) data.appBuilders.edges.pop();

  return data;
}
