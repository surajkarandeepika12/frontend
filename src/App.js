import './App.css';
import { useState } from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import HomePage from './Components/HomePage';
import NavBar from './Components/NavBar';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import About from './Components/About';
import Contact from './Components/Contact';
import FrontPage from './Components/FrontPage';
import Payment from './Components/Payment';
import CartItemsUser from './Components/CartItemsUser';
import SearchItem from './Components/SearchItem';
import Checkout from './Components/Checkout';
import Orders from './Components/Orders';
function App() {
  return (
    <>
     <BrowserRouter>
     <NavBar/>
    <div className="App">
     
      <Routes>
      <Route path='/' element={<FrontPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/Contact" element={<Contact/>}/>
      <Route path="/cart" element={<CartItemsUser/>}/>
      <Route path="/search" element={<SearchItem/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/orders" element={<Orders/>}/>
      <Route path="/payment" element={<Payment/>}/>
      <Route path="/homepage" element={<HomePage/>}></Route>
      </Routes>
      
    </div>
    </BrowserRouter>
    {/* <HomePage/> */}
   
     </>
  );
}

export default App;
