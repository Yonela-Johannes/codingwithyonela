import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "./shared/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import ChatScreen from "./pages/ChatScreen";
import SuggestionScreen from "./pages/SuggestionScreen";
import QuestionScreen from "./pages/QuestionScreen";
import Blog from "./pages/Blog";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Testimonials from "./pages/Testimonials";
import Signin from "./pages/Signin";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/");

      console.log(response);
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/chats" element={<ChatScreen />} />
          <Route path="/suggestions" element={<SuggestionScreen />} />
          <Route path="/questions" element={<QuestionScreen />} />
          <Route path="/Testimonials" element={<Testimonials />} />
          <Route path="/sign-in" element={<Signin />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
