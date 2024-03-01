import React from "react";

export default function HoverUnderLine({
	children
}) {
	return (
		<div className="group cursor-pointer">
			{children}
			<div
				className="h-[1px] w-0 group-hover:w-full bg-bg_light transition-all"
			></div>
		</div>
	);
}
