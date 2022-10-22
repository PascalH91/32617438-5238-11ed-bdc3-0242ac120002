import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { Context as ContextType } from "./utils/types";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
export const Context = React.createContext({} as ContextType);

const ContextProvider = ({
  children,
}: {
  children?: JSX.Element | JSX.Element[];
}) => {
  const [context, setContext] = React.useState({
    addedEvents: [],
    allEvents: undefined,
    topOffset: undefined,
    searchString: undefined,
  });
  return (
    //@ts-ignore
    <Context.Provider value={[context, setContext]}>
      {children}
    </Context.Provider>
  );
};

root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
