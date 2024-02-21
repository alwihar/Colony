import React, { useEffect, useState } from "react";
import TransactionList from "./TransactionsList";
import SingleTransaction from "./SingleTransaction";

interface RouteParams {
  [key: string]: string;
}

const NaiveRouter: React.FC = () => {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => {
      setRoute(window.location.pathname);
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const matchRoute = (pattern: RegExp): RouteParams | null => {
    const match = route.match(pattern);
    if (match) {
      const keys = [...match.slice(1).keys()];
      const values = match.slice(1);
      let params: RouteParams = {};
      keys.forEach((key, index) => {
        params[key] = values[index];
      });
      return params;
    }
    return null;
  };

  if (route === "/" || route === "/transactions") {
    return <TransactionList />;
  } else if (matchRoute(/\/transaction\/(\w+)/)) {
    const params = matchRoute(/\/transaction\/(\w+)/);
    const transactionId = params && params["0"];
    return <SingleTransaction id={transactionId} />;
  }

  return <div>404 Not Found</div>;
};

export const navigate = (path: string) => {
  window.history.pushState({}, "", path);
  const popStateEvent = new PopStateEvent("popstate");
  window.dispatchEvent(popStateEvent);
};

export default NaiveRouter;
