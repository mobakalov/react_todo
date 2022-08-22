import React, { Component } from 'react';
import Contact from './views/Contact';
import Home from './views/Home';
import Nav from './components/Nav';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import ToDoList from './views/ToDoList';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      user: {},
      name: 'Mo',
      age: 26
    }
  }

  addToAge = () => {
    this.setState({age: this.state.age + 1})
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />

          {/* <button onClick={this.addToAge} type="button" className="btn btn-info">Happy Birthday!</button>            */}
            <Routes>
              <Route path='/' element={<Home name={this.state.name} age={this.state.age}/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path='/todolist' element={<ToDoList/>}/>
            </Routes>

        </div>
      </BrowserRouter>
      
    )
  }
}