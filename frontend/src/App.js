import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webFont from "webfontloader";
import React, { useEffect, useState } from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import UserOption from "./component/layout/Header/UserOption.js";
import { useSelector } from "react-redux";
import { loadUser } from "./action/userAction";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/RestPassword.js";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import axios from "axios";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList.js"
import NewProduct from './component/Admin/NewProduct.js';
import UpdateProduct from './component/Admin/UpdateProduct.js';
import ProcessOrder from './component/Admin/ProcessOrder.js';
import OrderList from './component/Admin/OrderList.js';
import UsersList from './component/Admin/UsersList.js';
import UpdateUser from './component/Admin/UpdateUser.js';
import ProductReviews from './component/Admin/ProductReviews.js';
import Contact from './component/layout/Contact/Contact.js';
import AdminPage from "./pages/AdminPage";
import ExerciseDetail from './pages/ExcerciseDetail';
import Exercise from './pages/Exercise';
import ChatBox from "./component/ChatBox";
import AboutUs from "./component/layout/About/About.js";






function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
   
  }, []);

  return (
    <Router>
      <Header />
      
      {isAuthenticated && <UserOption user={user} />}
      {isAuthenticated && <ChatBox user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/exercises" element={<Exercise />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        


        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/shipping" element={ <Shipping /> } />
          <Route path="/order/confirm" element={ <ConfirmOrder /> } />
          <Route path="/success" element={ <OrderSuccess /> } />
          <Route path="/orders" element={ <MyOrders /> } />
            <Route path="/order/:id" element={ <OrderDetails /> } />
            <Route path="/process/payment" element={ <Payment/> } />
            <Route path="/admin/dashboard" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <Dashboard /> </ProtectedRoute> } />
            <Route path="/admin/products" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <ProductList /> </ProtectedRoute> } />
            <Route path="/admin/product" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <NewProduct /> </ProtectedRoute> } />
            <Route path="/admin/product/:id" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <UpdateProduct /> </ProtectedRoute> } />
            <Route path="/admin/orders" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <OrderList /> </ProtectedRoute> } />
            <Route path="/admin/order/:id" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <ProcessOrder /> </ProtectedRoute> } />
            <Route path="/admin/users" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <UsersList /> </ProtectedRoute> } />
            <Route path="/admin/user/:id" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <UpdateUser /> </ProtectedRoute> } />
            <Route path="/admin/reviews" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <ProductReviews /> </ProtectedRoute> } />
            <Route path="/admin" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <AdminPage /> </ProtectedRoute> } />
        </Route>
        <Route path="/password/forgot" element={ <ForgotPassword /> } />
        <Route path="/password/reset/:token" element={ <ResetPassword /> } />
       
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
