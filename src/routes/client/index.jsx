import Menu from "@components/client/include/menu/menu";
import Endow from "../../components/client/endow-blog/endow";
import Detail from "../../components/client/detail-blog/detail";
import Header from "../../components/client/include/header/header";
import Footer from "../../components/client/include/footer/footer";

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
    path: "/endow-page",
    component: <Endow />,
  },
  {
    path: "/endow-page/detail/:id",
    component: <Detail />,
  },
  {
    path: "/footer-page",
    component: <Footer />,
  },
];

export { clientRoutes };
