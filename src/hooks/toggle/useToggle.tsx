import { useCallback, useState } from "react";

export const useToggle = (initialToggleValue = false) => {
  const [value, setValue] = useState(initialToggleValue);

  const toggle = useCallback(() => {
    setValue((value) => !value);
  }, []);

  return { value, toggle };
};
