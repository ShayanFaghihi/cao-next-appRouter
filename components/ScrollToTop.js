import { useEffect } from 'react';
import { useRouter } from './RouterContext';

const ScrollToTop = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.route]);

  return null;
};

export default ScrollToTop;
