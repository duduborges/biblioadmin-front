import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/home"
import { Signin } from "./pages/signin"
import Login from "./pages/login"




const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path:'/signin',
    element: <Signin/>
  },
  {
    path:'/login',
    element: <Login/>
  }
  

])

export { router }