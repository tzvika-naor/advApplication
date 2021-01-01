import React, { useState } from 'react';
import ItemDetails from './components/ItemDetails';
import ItemEdit from './components/ItemEdit'
import Header from './components/Header';
import SideNav from './components/SideNav';
import List from './components/List';
import Footer from './components/Footer';
import history from './History';
import { Router, Switch, Route } from "react-router-dom";
import { Fragment } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import './App.css'

function App () {
  const [filterBy, setFilterBy] = useState('')
  const [categorySelected, setCategorySelected] = useState('')
  const [product, setProduct] = useState({})
  // const [product, setProduct] = useState()
  // console.log(product)
  // const getItem = (data) => {
  //   setProduct(data);
  //   console.log(data)
  // }
  const selecCategory = (data) => {
    setCategorySelected(data)
    setFilterBy('category');
    console.log(categorySelected)
  }
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route path="/item/:id/edit" component={ItemEdit} />
        <Route path="/item/:id" component={ItemDetails} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />

        <Fragment>
          <div class="container">
            <div class="row">
              <div className="col-lg-3">
                <SideNav data={selecCategory} />
              </div>
              <div className="col-lg-9">
                <Route path='/' component={List} selectCategory={categorySelected} filterBy={filterBy} />
              </div>
            </div>
          </div>
        </Fragment>
      </Switch>
      <Footer />
    </Router >
  )
};
export default App;
