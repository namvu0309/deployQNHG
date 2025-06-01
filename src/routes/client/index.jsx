import Profile from "@components/client/include/menu/profile";
import Endow from "../../components/client/include/uudai/uudai";
import Detail from "../../components/client/include/xemngay/detail";

const clientRoutes = [
    {
    path: "/home-page",
    component: <Profile />,
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