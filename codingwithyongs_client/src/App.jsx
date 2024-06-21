import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "./shared/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import SuggestionScreen from "./pages/SuggestionScreen";
import QuestionScreen from "./pages/QuestionScreen";
import Blog from "./pages/Blog";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Testimonials from "./pages/Testimonials";
import Signin from "./pages/Signin";
import DashboardLayout from "./dashboard/shared/DashboardLayout";
import CreateBlog from "./dashboard/components/blog/CreateBlog";
import { LinkedInCallback } from 'react-linkedin-login-oauth2'
import Recommendations from "./pages/Recommenations";
import About from "./pages/About";
import Friends from "./pages/Friends";
import Collaboration from "./pages/Collaboration";
import Events from "./components/Events";
import { useSelector } from "react-redux";
import Dashboard from "./dashboard/pages/Dashboard";
import ScrollToTop from './dashboard/components/ScrollToTop'
import PostPage from "./dashboard/pages/PostPage";
import PostsPage from "./dashboard/pages/PostsPage";
import SignUp from "./dashboard/pages/SignUp";

function App()
{
  useEffect(() =>
  {
    const fetchData = async () =>
    {
      const response = await axios.get("http://127.0.0.1:8000/api/");
      console.log(response);
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* <DashboardLayout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/posts" element={<PostsPage />} />
          <Route exact path="/post" element={<PostPage />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/submitted-blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/suggestion-settings" element={<SuggestionScreen />} />
          <Route path="/questions-settings" element={<QuestionScreen />} />
          <Route path="/testimonials-settings" element={<Testimonials />} />
        </Routes>
      </DashboardLayout> */}

      {/* <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/search' element={<Search />} />
      <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      <Route element={<OnlyAdminPrivateRoute />}>
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/update-post/:postId' element={<UpdatePost />} /> */}


      {/* <Route path='/projects' element={<Projects />} />
      <Route path='/post/:postSlug' element={<PostPage />} /> */}

      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/suggestions" element={<SuggestionScreen />} />
          <Route path="/questions" element={<QuestionScreen />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/project-status" element={<Collaboration />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<Collaboration />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
