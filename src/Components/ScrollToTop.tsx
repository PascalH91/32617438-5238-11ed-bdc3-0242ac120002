import React from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = (): null => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      //@ts-ignore
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
