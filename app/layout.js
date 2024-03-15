import { Montserrat } from "next/font/google";
import { revalidateTag } from "next/cache";
import "./globals.css";
import Header from "@/components/header/header";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title:
    "Create App Online - Review Wix, FlutterFlow, Good Barber, Andromo, Shopify ...",
  description: "Review Wix, FlutterFlow, Good Barber, Andromo, Shopify ..",
};

export default function RootLayout({ children }) {
  revalidateTag("appBuilders");
  return (
    <html lang="en">
      <body className={montserrat.className} id="root">
        <Header />
        {children}
      </body>
    </html>
  );
}
