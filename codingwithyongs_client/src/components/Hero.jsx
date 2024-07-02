import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuotes } from "../features/quote/quoteSlice";
import { useEffect, useState } from "react";

function Hero()
{
  const [quote, setQuote] = useState("")
  const { quotes } = useSelector((state) => state.quotes)
  const dispatch = useDispatch()
  let random;

  useEffect(() =>
  {
    dispatch(getAllQuotes())
  }, [])


  useEffect(() =>
  {
    random = Math.floor(Math.random() * quotes?.length)
    setQuote(quotes[random])
  }, [quotes])

  setTimeout(() =>
  {
    setQuote(quotes[random])
  }, 120000)


  return (
    <div className="flex w-full mb-4 mt-6 gap-3 flex-col justify-center md:pt-14 md:pb-7">
      <div className="bg-bg_lighter rounded-md max-w-[480px]">
        <span className="italic">{quote?.quote}
        </span>
        <p className="text-xs">{quote?.author}</p>
      </div>
    </div>
  );
}

export default Hero;
