import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserLayout from "./components/Layout/UserLayout.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Profile from "./pages/Profile.jsx"
import CollectionPage from "./pages/CollectionPage.jsx"
import {Toaster} from "sonner"
import ProductDetails from "./components/products/ProductDetails.jsx"
import Checkout from "./components/cart/Checkout.jsx"
import OrderConfirmationPage from "./pages/OrderConfirmationPage.jsx"
import { OrderDetailsPage } from "./pages/OrderDetailsPage.jsx"
import MyOrdersPage from "./pages/MyOrdersPage.jsx"
import AdminLayout from "./components/admin/AdminLayout.jsx"
import AdminHomepage from "./pages/AdminHomepage.jsx"
import UserManagement from "./components/admin/UserManagement.jsx"
import ProductManagement from "./components/admin/ProductManagement.jsx"
import EditProductPage from "./components/admin/EditProductPage.jsx"
import OrderManagement from "./components/admin/OrderManagement.jsx"

import {Provider } from "react-redux";
import store from "./redux/store"


const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter future={{ v7_startTransition: true , v7_relativeSplatPath: true}}>
    <Toaster position="top-right" />
    <Routes>
      <Route path="/" element={<UserLayout /> }>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
      <Route path="Collections/:collection" element={<CollectionPage />} />
      <Route path="products/:id" element={<ProductDetails/>} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="order-confirmation" element={<OrderConfirmationPage />} />
      <Route path="order/:id" element={<OrderDetailsPage />} />
      <Route path="my-orders" element={<MyOrdersPage />} />
      {/* Add more user routes here */}
      </Route>
      {/* <Route>{/*admin layout}</Route> */}
      <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminHomepage />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="products" element={<ProductManagement />} />
      <Route path="products/:id/edit" element={<EditProductPage />} />
      <Route path="orders" element={<OrderManagement />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}
export default App