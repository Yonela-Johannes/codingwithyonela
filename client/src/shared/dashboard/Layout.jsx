import { useContext } from "react";
import Menu from "../../components/dashboard/Menu";
import { ThemeContext } from "../../context/ThemeContext";


export default function DashboardLayout({ children })
{
    const { theme } = useContext(ThemeContext)
    return (
        <div className="min-h-full flex overflow-hidden gap-2">
            {/* LEFT */}
            <div className={`w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 ${theme == "light" ? 'bg-bg_light' : 'bg-bg_lightest rounded-md'}`}>
                <Menu />
            </div>
            {/* RIGHT */}
            <div className={`${theme == "light" ? 'bg-bg_light' : 'bg-bg_lightest'} w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] flex  overflow-auto rounded-md pt-3`}>
                {children}
            </div>
        </div>
    );
}
