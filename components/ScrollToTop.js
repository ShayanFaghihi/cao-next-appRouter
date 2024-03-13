import { useEffect } from "react";
import { useRouter } from "./RouterContext";

export default function ScrollToTop() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.route]);

  return null;
}
