import * as React from "react"
import { cn } from "../../lib/utils";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

const Textarea = React.forwardRef(({ className, handleChange, ...props }, ref) =>
{
  const { theme } = useContext(ThemeContext);
  return (
    (<textarea
      onChange={handleChange}
      className={`w-full px-3 border ${
        theme == "light"
          ? "text-black bg-gray-200"
          : "bg-bg_core text-white"
      }`}
      ref={ref}
      {...props} />)
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
