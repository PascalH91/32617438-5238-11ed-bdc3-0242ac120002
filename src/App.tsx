import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import { Context } from "./index";
import { Context as ContextType } from "./utils/types";
import Home from "./Components/Home";
import Basket from "./Components/Basket";
import Header from "./Components/Header";
import ScrollToTop from "./Components/ScrollToTop";

import "./Styles/components/app.css";

const App = (): JSX.Element => {
  //@ts-ignore
  const [context, setContext] = React.useContext<ContextType>(Context);
  const headerHeight = React.useRef<HTMLDivElement>(null);

  const handleSearch = React.useCallback(
    (value: string) => {
      setContext((oldContext: ContextType) => ({
        ...oldContext,
        searchString: value,
      }));
    },
    [setContext]
  );

  React.useEffect(() => {
    const offsetHeight = headerHeight.current?.offsetHeight;
    if (offsetHeight && offsetHeight !== context.topOffset) {
      setContext((oldContext: ContextType) => ({
        ...oldContext,
        topOffset: offsetHeight,
      }));
    }
  }, [context.topOffset, setContext]);

  return (
    <Router>
      <>
        <ScrollToTop />
        <Header
          onChangeSearch={handleSearch}
          searchValue={context.searchString}
          ref={headerHeight}
        />
        <Box height={headerHeight.current?.offsetHeight} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
