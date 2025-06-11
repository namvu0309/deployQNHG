import Menu from "../../components/client/menu/menu";
import Endow from "../../components/client/endow-blog/endow";
import Detail from "../../components/client/detail-blog/detail";
import Header from "../../components/client/include/header/header";
import Footer from "../../components/client/include/footer/footer";
import RegisterUserPage from "../../pages/client/auth/register";
import LoginUserPage from "../../pages/client/auth/login";
import Branch from "../../components/client/branch/Branch";
import BranchDetail from "../../components/client/BranchDetail/BranchDetail";

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
    path: "/co-so",
    component: <Branch />, // Danh sách chi nhánh
  },
  {
    path: "/co-so/:slug", // Trang chi tiết chi nhánh
    component: <BranchDetail />,
  },
  {
    path: "/endow-page",
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
];

export { clientRoutes };
