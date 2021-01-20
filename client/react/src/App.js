import React, { useEffect, useState } from 'react';
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
import Order from './components/Order'
import Home from './components/Home';
import Payment from './components/Payment'
import './App.css'
function App (props) {
  console.log(props);
  const [showQueryRes, setShowQueryRes] = useState('');
  const [resaults, setResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchResults = (data) => {
    console.log(data)
    setResults(data);
    setShowQueryRes(true);
  }
  const resetSearch = (data) => {
    setShowQueryRes(false);
  }
  useEffect(() => {
    console.log(isLoggedIn)
  }, [isLoggedIn])

  return (
    <Router history={history}>
      <Header resetSearch={resetSearch} isLoggedIn={isLoggedIn} setIsLoggedIn={(data) => setIsLoggedIn(data)} />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path="/product/:id/edit" component={ProductEdit} />
        <Route path="/product/:id" component={ProductDetails} />
        <Route path="/smartphone/:id/edit" component={SmartphoneEdit} />
        <Route path="/register" component={Register} />
        <Route path="/login" render={() => <Login setIsLoggedIn={(data) => setIsLoggedIn(data)} />} />
        <Route path='/order' render={(props) => <Order activeComponent={('order')} data={props} />} />
        <Fragment>
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <Search searchResults={searchResults} />
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8 col-sm-6">
              <Route path='/products' render={() => <List searchResults={resaults} showQueryRes={showQueryRes} activeComponent={('products')} />} />
              <Route path='/smartphones' render={(props) => <List searchResults={resaults} showQueryRes={showQueryRes} activeComponent={('smartphones')} user={props} />} />
            </div>
          </div>
        </Fragment>
      </Switch>
      <Footer />
    </Router >
  )
};
export default App;
