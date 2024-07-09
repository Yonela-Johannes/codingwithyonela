import { cn } from "../../lib/utils";

import { Link } from "react-router-dom";
import HoverUnderLine from "../HoverUnderLine";

export default function Top({name, title, description}) {
  return (
    <>
      <section className="space-y-6 pb-4 pt-6 md:pb-12 md:mt-10 lg:py-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-md sm:text-4xl md:text-2xl lg:text-5xl font-black text-balance">
            {title} <span className="text-clr_alt">{name}</span>
          </h1>
          <p className="max-w-[42rem] text-muted-foreground text-base md:text-xl text-balance">
            {description}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row cursor-pointer font-bold">
            <HoverUnderLine>
              <Link to="/blogs" className={cn("w-full sm:w-fit")}>
                My Portfolio
              </Link>
            </HoverUnderLine>
            <HoverUnderLine>
              <Link
                href="https://github.com/yonela-johannes"
                target="_blank"
                rel="noreferrer"
                className={cn("w-full sm:w-fit")}
              >
                GitHub
              </Link>
            </HoverUnderLine>
          </div>
        </div>
      </section>
    </>
  );
}
