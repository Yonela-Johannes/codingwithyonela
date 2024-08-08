import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

const Text = ({ text }) =>
{
    const { theme } = useContext(ThemeContext)
    return (
        <div className={`${theme == 'light' ? "text-bg_primary" : "text-bg_lightest"} my-2`}>{ReactHtmlParser(text)}</div>
    )
}

export default Text
