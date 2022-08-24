import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {

  getSubTotal = () => {
    let total = 0
    for (let item of this.props.cart){
      total += parseFloat(item.price)
    }
    return total.toFixed()
  }

  render() {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
         <div className="container-fluid">
           <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon"></span>
          </button>
           <div className="collapse navbar-collapse" id="navbarSupportedContent">
             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                 <Link className="nav-link active" aria-current="page" to="/">Home</Link>
               </li>
               <li className="nav-item">
                 <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                 <Link className="nav-link" to="/todolist">To Do List</Link>
              </li>

              {this.props.user.username ?
                <>
                  <li className="nav-item">
                  <p className="nav-link" >Hello, {this.props.user.username}</p>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={this.props.logMeOut}>Log Out</Link>
                  </li>
                </>
              
              : 
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
              </>
              }

              <li className="nav-item">
                <Link className="nav-link" to="/shop">Shop</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">{this.props.cart.length} | {this.getSubTotal()}</Link>
              </li>
             </ul>
             <form className="d-flex" role="search">
               <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
               <button className="btn btn-outline-success" type="submit">Search</button>
             </form>
           </div>
         </div>
       </nav> 
    )
  }
} 