import * as React from "react";

const useTimeout = (ms: number = 0): boolean => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let timer = setTimeout(() => {
      setReady(true);
    }, ms);

    return () => {
      clearTimeout(timer);
    };
  }, [ms]);

  return ready;
};

export default useTimeout;
