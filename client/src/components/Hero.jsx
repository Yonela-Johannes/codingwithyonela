import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuotes } from "../features/quote/quoteSlice";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Hero()
{
  const { theme } = useContext(ThemeContext)
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
    quote && quote.quote ? (
      <div className="flex w-full gap-3 flex-col justify-center">
        <div className={`${theme == "light" ? "text-black" : "text-white"}bg-bg_lighter rounded-md max-w-[500px]`}>
          <span className={`${theme == "light" ? "text-black" : "text-white"} text-lg`}>"{quote?.quote}"
          </span>
          <p className={`${theme == "light" ? "text-black" : "text-white"} text-sm italic`}>- {quote?.author}</p>
        </div>
      </div>

    ) : ""
  );
}

export default Hero;
