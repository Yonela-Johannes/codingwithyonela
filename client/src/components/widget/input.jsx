import * as React from "react"
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

const Input = React.forwardRef(({ id, className, type, handleChange, ...props }, ref) =>
{
  const { theme } = useContext(ThemeContext);
  return (
    (<input
      id={id}
      type={type}
      className={`w-full px-3 ${
        theme == "light"
          ? "text-black bg-gray-200"
          : "bg-bg_core text-white"
      }`}
      onChange={handleChange}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
