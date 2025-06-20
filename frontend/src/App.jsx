import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserLayout from "./components/Layout/UserLayout.jsx"
import Home from "./pages/Home.jsx"

const App = () => {
  return (
    <BrowserRouter>
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