import * as React from "react"
import { cn } from "../../lib/utils";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { inputClassName } from "../../utils/utils";

const Textarea = React.forwardRef(({ className, handleChange, ...props }, ref) =>
{
  const { theme } = useContext(ThemeContext);
  return (
    (<textarea
      onChange={handleChange}
      className={inputClassName(theme)}
      ref={ref}
      {...props} />)
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
