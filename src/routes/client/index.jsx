import Menu from "../../components/client/menu/menu";
import Endow from "../../components/client/endow-blog/endow";
import Detail from "../../components/client/detail-blog/detail";
import Header from "../../components/client/include/header/header";
import Footer from "../../components/client/include/footer/footer";
import RegisterUserPage from "../../pages/client/auth/register";
import LoginUserPage from "../../pages/client/auth/login";
import BranchDetail from "../../components/client/BranchDetail/BranchDetail";
import Contact from "../../components/client/contact/Contact";
import Home from "../../components/client/home/home"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
const clientRoutes = [
  {
    path: "/header-page",
    component: <Header />,
  },
  {
    path: "/menu-page",
    component: <Menu />,
  },
  {
    path: "/branch-page", // Trang chi tiết chi nhánh
    component: <BranchDetail />,
  },
  {
    path: "/contact-page", // Trang chi tiết chi nhánh
    component: <Contact />,
  },
  {
    path: "/endow-page", // Trang ưu đãi
    component: <Endow />,
  },
  {
    path: "/endow-page/detail/:slug",
    component: <Detail />,
  },
  {
    path: "/footer-page",
    component: <Footer />,
  },
   {
    path: "/register-page",
    component: <RegisterUserPage/>,
  },
   {
    path: "/login-page",
    component: <LoginUserPage/>,
  },
   {
    path: "/home-page",
    component: <Home/>,
  },
];

export { clientRoutes };
