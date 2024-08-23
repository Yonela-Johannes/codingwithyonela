import Layout from "./shared/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateBlog from "./components/blog/CreateBlog";
import About from "./pages/About";
import Collaboration from "./pages/Collaboration";
import ScrollToTop from './components/ScrollToTop'
import Recommendations from "./pages/Recommenations";
import CreateProject from "./components/project/CreateProject";
import Todopage from "./pages/Todopage";
import ProjectsTask from "./pages/ProjectsTask";
import Verify from "./pages/Verify";
import NotFoundPage from './pages/404'
import EditAccount from "./pages/EditAccount";
import Chill from "./components/chill/Chill";
import PrivateRoute from "./utils/PrivateRoute";
import AdminPrivateRoute from "./utils/AdminRoute";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import { Theme } from '@radix-ui/themes';
import AdminPage from "./pages/dashboard";
import DashboardLayout from "./shared/dashboard/Layout";
import BigCalendar from "./components/dashboard/BigCalender";
import Users from "./components/dashboard/list/Users";
import AdminRecommendations from "./components/dashboard/list/Recommendations";
import AdminProjects from "./components/dashboard/list/Projects";
import AdminBlogs from "./components/dashboard/list/Blogs";
import AdminPosts from "./components/dashboard/list/Posts";

function App()
{

  return (
    <div>
      <Theme>
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/blog" element={<Blogs />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="/chill" element={<Chill />} />
              <Route path="/recommendation" element={<Recommendations />} />
              <Route path="/verify_account/:token" element={<Verify />} />
              <Route path="/about" element={<About />} />
              <Route path="/project-descussion" element={<Collaboration />} />
              <Route path="/project-status" element={<ProjectsTask />} />
              <Route path="/project/:id/todo" element={<Todopage />} />
              <Route exact path="/search" element={<Search />} />
              <Route path="events" element={<BigCalendar />} />
              {/* user routes */}
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/edit-account" element={<PrivateRoute><EditAccount /></PrivateRoute>} />
              {/* admin routes */}
              <Route path="/admin">
                <Route path="/admin" element={<AdminPrivateRoute><AdminPage /></AdminPrivateRoute>} />
                <Route path="users" element={<AdminPrivateRoute><Users /></AdminPrivateRoute>} />
                <Route path="recommendations" element={<AdminPrivateRoute><AdminRecommendations /></AdminPrivateRoute>} />
                <Route path="project" element={<AdminPrivateRoute><AdminProjects /></AdminPrivateRoute>} />
                <Route path="blogs" element={<AdminPrivateRoute><AdminBlogs /></AdminPrivateRoute>} />
                <Route path="feedback" element={<AdminPrivateRoute><AdminPage /></AdminPrivateRoute>} />
                <Route path="new-blog" element={<AdminPrivateRoute><CreateBlog /></AdminPrivateRoute>} />
                <Route path="new-project" element={<AdminPrivateRoute><CreateProject /></AdminPrivateRoute>} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </Theme>
    </div>
  );
}

export default App;
