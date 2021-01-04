import React, { useState } from 'react';
import ProductDetails from './components/ProductDetails';
import ProductEdit from './components/ProductEdit'
import Header from './components/Header';
import Search from './components/Search';
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

  const selectCategory = (data) => {
    setCategorySelected(data)
    setFilterBy('category');
    console.log(categorySelected)
  }
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route path="/product/:id/edit" component={ProductEdit} />
        <Route path="/product/:id" component={ProductDetails} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />

        <Fragment>

          <div className="row">
            <div className="col-lg-3">
              <Search data={selectCategory} filterBy={filterBy} />
            </div>
            <div className="col-lg-9">
              <Route path='/' component={List} selectCategory={categorySelected} filterBy={filterBy} />
            </div>
          </div>

        </Fragment>
      </Switch>
      <Footer />
    </Router >
  )
};
export default App;
