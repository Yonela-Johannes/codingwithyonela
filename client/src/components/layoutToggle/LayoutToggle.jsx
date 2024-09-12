import { useContext } from "react";
import { LayoutContext } from "../../context/LayoutContext";
import { MdGridView, MdOutlineFormatListBulleted } from "react-icons/md";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { ThemeContext } from "../../context/ThemeContext";

const LayoutToggle = () =>
{
  const { theme } = useContext(ThemeContext);
  const { layoutToggle, layout } = useContext(LayoutContext);
  return (
    <div
      onClick={layoutToggle}
      className="cursor-pointer text-2xl lg:text-3xl"
    >
      {
        layout === "grid" ? <p className={`${theme == 'light' ? 'text-bg_primary' : 'text-bg_lightest'}`}><MdOutlineFormatListBulleted /></p> : <p className={`${theme == 'light' ? 'text-bg_primary' : 'text-bg_lightest'}`}><MdGridView  /></p>
      }
    </div>
  );
};

export default LayoutToggle;
