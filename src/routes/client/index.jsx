import Menu from "@components/client/include/menu/menu";
import Endow from "../../components/client/include/endow/endow";
import Detail from "../../components/client/include/seenow/detail";
import Header from "../../components/client/include/header/header"

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
    component: <Endow/>,
  },
   {
    path: "/endow-page/detail/:id",
    component: <Detail/>,
  },
]

export { clientRoutes };