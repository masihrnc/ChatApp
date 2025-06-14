 import {
  createBrowserRouter,

} from "react-router";
import App from "./App"
import signup from "./pages/signup";
import home from "./pages/home";
import login from "./pages/login";
import message from "./pages/chat";
import setAvatar from "./components/SetAvatar"; 


 const  router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: home },
      { path: "signup", Component: signup },
        { path: "login", Component: login },
          { path: "Chat", Component: message },
           { path: "setAvatar", Component: setAvatar },
    ]
     
  },
]);
export default router