import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserLayout from "./components/Layout/UserLayout.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Profile from "./pages/Profile.jsx"
import CollectionPage from "./pages/CollectionPage.jsx"
import {Toaster} from "sonner"


const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true , v7_relativeSplatPath: true}}>
    <Toaster position="top-right" />
    <Routes>
      <Route path="/" element={<UserLayout /> }>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
      <Route path="Collections/:collection" element={<CollectionPage />} />
      {/* Add more user routes here */}
      </Route>
      {/* <Route>{/*admin layout}</Route> */}
    </Routes>
    </BrowserRouter>
  )
}
export default App