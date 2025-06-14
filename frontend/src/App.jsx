import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserLayout from "./components/Layout/UserLayout.jsx"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserLayout /> }>{/* user layout */}</Route>
      <Route>{/*admin layout*/}</Route>
    </Routes>
    </BrowserRouter>
  )
}
export default App