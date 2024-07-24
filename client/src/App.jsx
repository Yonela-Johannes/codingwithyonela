import { useEffect } from "react";
import Layout from "./shared/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import SuggestionScreen from "./pages/SuggestionScreen";
import QuestionScreen from "./pages/QuestionScreen";
import Blog from "./pages/Blog";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Testimonials from "./pages/Testimonials";
import Signin from "./pages/Signin";
import CreateBlog from "./dashboard/components/blog/CreateBlog";
import About from "./pages/About";
import Collaboration from "./pages/Collaboration";
import { useSelector } from "react-redux";
import Dashboard from "./dashboard/pages/Dashboard";
import ScrollToTop from './dashboard/components/ScrollToTop'
import PostsPage from "./dashboard/pages/PostsPage";
import SignUp from "./pages/SignUp";
import Recommendations from "./pages/Recommenations";
import RootLayout from "./_root/RootLayout";
import Showcase from './pages/showcase/Showcase'
import Project from "./pages/projects/Project";
import CreateProject from "./components/donation/CreateProject";
import MyProjects from "./pages/projects/MyProjects";
import PostDetails from "./pages/PostDetails";
import Todopage from "./pages/Todopage";
import ProjectsTask from "./pages/ProjectsTask";
import Verify from "./pages/Verify";
import { NewNote } from "./pages/note/NewNote";
import AllUsers from "./pages/AllUsers";
import Profile from "./pages/EditAccount";
import NotFoundPage from './pages/404'
import EditAccount from "./pages/EditAccount";

function App()
{
  const { currentUser } = useSelector((state) => state.user)
  useEffect(() =>
  {

  }, [currentUser])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/posts" element={<RootLayout><PostsPage /></RootLayout>} />
          <Route path="/post/:slug" element={<PostDetails />} />
          <Route path="/suggestions" element={<SuggestionScreen />} />
          <Route path="/questions" element={<QuestionScreen />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/recommendation" element={<Recommendations />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify_account/:token" element={<Verify />} />
          <Route path="/about" element={<About />} />
          <Route path="/project-descussion" element={<Collaboration />} />
          <Route path="/project-status" element={<ProjectsTask />} />
          <Route path="/project/:id/todo" element={<Todopage />} />
          <Route path="/version-control" element={<Showcase />} />
          <Route path="/project/add" element={<CreateProject />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-account" element={<EditAccount />} />
          <Route path="/projects/my-projects/user/:id" element={<MyProjects />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/create-blog" element={<CreateBlog />} />


          <Route path="/friends" element={<AllUsers />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
