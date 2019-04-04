import * as React from "react";

const useClickOutside = (
  callback: (event: MouseEvent) => void,
): [React.RefObject<HTMLDivElement>] => {
  const ref = React.useRef<HTMLDivElement>(null);

  const handleEvent = (event: MouseEvent): void => {
    if (ref.current !== null && !ref.current.contains(event.target as Node)) {
      callback(event);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleEvent);
    return () => {
      document.removeEventListener("mousedown", handleEvent);
    };
  }, [callback]);

  return [ref];
};

export default useClickOutside;
