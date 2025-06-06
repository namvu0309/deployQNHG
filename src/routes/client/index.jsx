import Menu from "../../components/client/menu/menu";
import Endow from "../../components/client/endow-blog/endow";
import Detail from "../../components/client/detail-blog/detail";
import Header from "../../components/client/include/header/header";
import Footer from "../../components/client/include/footer/footer"
// import BaDinhDetail from "../../components/client/detail-branch/BranchDetail";
import Branch from "../../components/client/branch/Branch";
import BranchDetail from "../../components/client/detail-branch/BranchDetail";

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
    component: <Branch />,
  },
  {
    path: "/endow-page",
    component: <Endow/>,
  },
   {
    path: "/endow-page/detail/:slug",
    component: <Detail/>,
  },
   {
    path: "/footer-page",
    component: <Footer/>,
  },
  {
  path: "/ba-dinh-detail",
  component: <BranchDetail />,
},

]

export { clientRoutes };