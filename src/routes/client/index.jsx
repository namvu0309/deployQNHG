import Menu from "../../components/client/menu/menu";
import Endow from "../../components/client/endow-blog/endow";
import Detail from "../../components/client/detail-blog/detail";
import Header from "../../components/client/include/header/header";
import Footer from "../../components/client/include/footer/footer";
import Branch from "../../components/client/branch/Branch";
import BranchDetail from "../../components/client/BranchDetail/BranchDetail";
import Contact from "../../components/client/contact/Contact";

const clientRoutes = [
  {
    path: "/header-page",
    component: <Header />,
  },
  {
    path: "/thuc-don",
    component: <Menu />,
  },
  {
    path: "/co-so", // Trang chi tiết chi nhánh
    component: <BranchDetail />,
  },
  {
    path: "/lien-he", // Trang chi tiết chi nhánh
    component: <Contact />,
  },
  {
    path: "/uu-dai", // Trang ưu đãi
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
];

export { clientRoutes };
