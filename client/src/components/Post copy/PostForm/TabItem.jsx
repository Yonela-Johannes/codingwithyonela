import { useEffect } from "react";
import HoverUnderLine from "../../HoverUnderLine";

const TabItem = ({
  item,
  setSelectedTab,
}) =>
{
  return (
    <HoverUnderLine>
      <div
        className="flex items-center justify-center gap-1 px-4 cursor-pointer font-semibold lg:min-w-28"
        onClick={() => setSelectedTab(item.title)}
      >
        <div>
          {item.icon}
        </div>
        <p className="hidden lg:block">{item.title}</p>
      </div>
    </HoverUnderLine>
  );
};
export default TabItem;