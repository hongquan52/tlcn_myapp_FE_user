import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Contact from '../pages/Contact'
import FoodDetails from '../pages/FoodDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AllFoods from '../pages/AllFoods'
import Admin from '../pages/Admin'
import AdminDetail from '../pages/AdminDetail'
import UserInformation from '../pages/UserInformation'
import Success from '../pages/Success'
import HistoryOrder from '../pages/HistoryOrder'
import SuccessOrder from '../pages/SuccessOrder'
import Delivery from '../pages/Delivery'
import Address from '../pages/Address'
const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/foods' element={<AllFoods />} />
      <Route path='/foods/:productId' element={<FoodDetails />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/admin/:productId' element={<AdminDetail />} />
      <Route path='/userinformation/:userId' element={<UserInformation />} />
      <Route path='/success' element={<Success />} />
      <Route path='/successOrder' element={<SuccessOrder />} />
      <Route path='/historyOrder' element={<HistoryOrder />} />
      <Route path='/delivery/:billId' element={<Delivery />} />
      <Route path='/address/create' element={<Address />} />
      

    </Routes>

  )
}

export default Routers