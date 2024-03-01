import React from "react";

export default function HoverUnderLine({
	children
}) {
	return (
		<div className="group cursor-pointer">
			{children}
			<div
				className="h-1 w-0 group-hover:w-full  transition-all bg-cl_primary"
			></div>
		</div>
	);
}
