import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuotes } from "../features/quote/quoteSlice";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useLocation } from "react-router-dom";

function Hero()
{
  const { theme } = useContext(ThemeContext)
  const [quote, setQuote] = useState("")
  const { quotes } = useSelector((state) => state.quotes)
  const dispatch = useDispatch()
  const path = useLocation().pathname
  let random;

  useEffect(() =>
  {
    if (path == '/')
    {
      setTimeout(() =>
      {
        dispatch(getAllQuotes())
      }, 3000000)
    }
  }, [path])

  useEffect(() =>
  {
    if (quotes)
    {
      random = Math.floor(Math.random() * quotes?.length)
      setQuote(quotes[random || 0])
    }
  }, [quotes])

  return (
    quote && quote.quote ? (
      <div className="flex w-full gap-3 flex-col justify-center">
        <div className={`${theme == "light" ? "text-black" : "text-white"}bg-bg_lighter rounded-md max-w-[500px]`}>
          <span className={`${theme == "light" ? "text-black" : "text-white"} text-xs p-0 m-0 leading-3 lg:text-lg`}><FaQuoteLeft size={12} />{quote?.quote}<FaQuoteRight size={12} />
          </span>
          <p className={`${theme == "light" ? "text-black" : "text-white"} text-xs lg:text-sm italic`}>- {quote?.author}</p>
        </div>
      </div>

    ) : ""
  );
}

export default Hero;
