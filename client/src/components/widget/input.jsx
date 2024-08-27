import * as React from "react"

import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ id, className, type, handleChange, ...props }, ref) =>
{
  return (
    (<input
      id={id}
      type={type}
      onChange={handleChange}
      className={cn(
        "flex h-10 w-full rounded-md border border-bg_lighter bg-bg_lightest px-3 py-2 text-sm ring-offset-bg_lighter file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }