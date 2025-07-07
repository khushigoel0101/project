import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserLayout from "./components/Layout/UserLayout.jsx"
import Home from "./pages/Home.jsx"
import {Toaster} from "sonner"

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true , v7_relativeSplatPath: true}}>
    <Toaster position="top-right" />
    <Routes>
      <Route path="/" element={<UserLayout /> }>
      <Route index element={<Home />} />
      </Route>
      {/* <Route>{/*admin layout}</Route> */}
    </Routes>
    </BrowserRouter>
  )
}
export default App