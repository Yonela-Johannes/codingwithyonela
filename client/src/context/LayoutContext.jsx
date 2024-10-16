import { createContext, useEffect, useState } from "react";

export const LayoutContext = createContext();

const getFromLocalStorage = () =>
{
  if (typeof window !== "undefined")
  {
    const value = localStorage.getItem("layout");
    return value || "list";
  }
};

export const LayoutContextProvider = ({ children }) =>
{
  const [layout, setLayout] = useState(() =>
  {
    return getFromLocalStorage();
  });

  const layoutToggle = () =>
  {
    setLayout(layout === "list" ? "grid" : "list");
  };

  useEffect(() =>
  {
    localStorage.setItem("layout", layout);
  }, [layout]);

  return (
    <LayoutContext.Provider value={{ layout, layoutToggle }}>
      {children}
    </LayoutContext.Provider>
  );
};
