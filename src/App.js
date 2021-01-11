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
import SmartphoneEdit from './components/SmartphoneEdit'
import './App.css'
function App () {
  const [showQueryRes, setShowQueryRes] = useState('');
  const [searchRes, setSearchRes] = useState([])
  const [isActive, setIsActive] = useState('')
  const searchResults = (data) => {
    console.log(data)
    setSearchRes(data);
    setShowQueryRes(true);
  }
  const resetSearch = (data) => {
    setShowQueryRes(false);
  }
  // const isActive = (data) => {
  // console.log(data)
  // }

  return (
    <Router history={history}>
      <Header resetSearch={resetSearch} />
      <Switch>
        <Route path="/product/:id/edit" component={ProductEdit} />
        <Route path="/product/:id" component={ProductDetails} />
        <Route path="/smartphone/:id/edit" component={SmartphoneEdit} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Fragment>
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <Search searchResults={searchResults} />
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8 col-sm-6">

              <Route path='/products' render={(props) => <List searchResults={searchRes} showQueryRes={showQueryRes} activeComponent={('products')} />} />
              <Route path='/smartphones' render={(props) => <List searchResults={searchRes} showQueryRes={showQueryRes} activeComponent={('smartphones')} />} />
              <Route path='/' render={(props) => <List activeComponent={('blabla')} />} />
            </div>
          </div>
        </Fragment>
      </Switch>
      <Footer />
    </Router >
  )
};
export default App;
