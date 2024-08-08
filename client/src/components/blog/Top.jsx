import { cn } from "../../lib/utils";
import HoverUnderLine from "../HoverUnderLine";

export default function Top({ name, title, description, theme })
{
  return (
    <>
      <section className="space-y-6 pb-4 md:pb-12 md:mt-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-md sm:text-4xl md:text-2xl lg:text-5xl font-black text-balance">
            {title} <span className="text-clr_alt">{name}</span>
          </h1>
          <p className="max-w-[42rem] text-muted-foreground text-base md:text-xl text-balance">
            {description}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row cursor-pointer font-bold">
            <HoverUnderLine>
              <button className={`${theme == "light" ? "" : "border-clr_alt"} shadow-none bg-clr_alt text-white px-2 py-1 lg:px-4 lg:py-2`}>
                <a href="https://portfolio-beta-red-17.vercel.app/" target="_blank" className={cn("w-full sm:w-fit")}>
                  My Portfolio
                </a>
              </button>
            </HoverUnderLine>
            <HoverUnderLine>
              <button className={`${theme == "light" ? "shadow-none" : "border-none"} px-2 py-1 lg:px-4 lg:py-2`}>
                <a
                  href="https://github.com/yonela-johannes"
                  target="_blank"
                  rel="noreferrer"
                  className={cn("w-full sm:w-fit ")}
                >
                  GitHub
                </a>

              </button>
            </HoverUnderLine>
          </div>
        </div>
      </section>
    </>
  );
}
