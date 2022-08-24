import React, { useState, useEffect } from 'react';
import Contact from './views/Contact';
import Home from './views/Home';
import Nav from './components/Nav';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import ToDoList from './views/ToDoList';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Shop from './views/Shop';
import SingleProduct from './views/SingleProduct';
import Cart from './views/Cart';

export default function App (){
  // constructor() {
  //   super();
  //   this.state = {
  //     user: {},
  //     cart: []
  //   }
  // }
  const getUserFromLocalStorage = () => {
    const foundUser = localStorage.getItem('user')
    if (foundUser){
      return JSON.parse(foundUser)
    }
    return {}
  };

  const [user, setUser] = useState(getUserFromLocalStorage())
  const [cart, setCart] = useState([])

  // logMeIn = (user) => {
  //   this.setState({
  //     user: user
  //   })
  // }



  const logMeIn = (user) => {
    setUser(user)
    getCart(user)
    localStorage.setItem('user', JSON.stringify(user))
  };

  const logMeOut = () => {
    console.log(logMeOut)
    setUser({})
    localStorage.removeItem('user')
  }

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (product) => {
    const newCart = [...cart]
    for (let i=cart.length-1; i>=0; i--){
      if (product.id === cart[i].id){
        newCart.splice(i, 1)
        break
      }
    }
    setCart(newCart)
  }

  const getCart = async (user)   => {
    if(user.token){
      const res = await fetch('http://localhost:5000/api/cart',{
      method: "GET",
      headers: {Authorization: `Bearer ${user.token}`}
      });
      const data = await res.json();
      if (data.status === 'ok'){
        setCart(data.cart)
      }
      else{
        setCart([])
      }
    }
    else{
      setCart([])
    }
  }
    
  useEffect(()=> {
    getCart(user)
  },[user]);



  return (
    <BrowserRouter>
      <div>
        <Nav user={user} cart = {cart} logMeOut={logMeOut}/>

        <Routes>
          <Route path='/' element={<Home name={"Mo"} age={9000}/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/todolist' element={<ToDoList/>}/>
          <Route path='/login' element={<Login logMeIn={logMeIn}/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/shop' element={<Shop addToCart={addToCart} user={user}/>}/>
          <Route path='/shop/:productId' element={<SingleProduct/>}/>
          <Route path='/cart' element={<Cart cart={cart} removeFromCart={removeFromCart} user={user} />}/>
        </Routes>

      </div>
    </BrowserRouter>
    
  )
}
