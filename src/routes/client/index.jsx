import Menu from "../../components/client/menu/menu";
import Endow from "../../components/client/endow-blog/endow";
import Detail from "../../components/client/detail-blog/detail";
import Header from "../../components/client/include/header/header";
import Footer from "../../components/client/include/footer/footer"
import Facility from "../../components/client/facility/Facility";

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
    component: <Facility />,
  },
  {
    path: "/endow-page",
    component: <Endow/>,
  },
   {
    path: "/endow-page/detail/:id",
    component: <Detail/>,
  },
   {
    path: "/footer-page",
    component: <Footer/>,
  },
]

export { clientRoutes };