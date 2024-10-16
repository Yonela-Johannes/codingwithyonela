import * as React from "react"
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { inputClassName } from "../../utils/utils";

const Input = React.forwardRef(({ id, className, type, handleChange, ...props }, ref) =>
{
  const { theme } = useContext(ThemeContext);
  return (
    (<input
      id={id}
      type={type}
      className={inputClassName(theme)}
      onChange={handleChange}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
