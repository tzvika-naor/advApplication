import React, { useEffect, useState } from 'react';
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
import OrdersHistory from './components/OrdersHistory';
import SmartphoneDetails from './components/SmartphoneDetails'
import './App.css';
import io from "socket.io-client";
//const server = "https://localhost:5000";
//const socket = io.connect("http://localhost:5000"); //Connect to webSocket for event 'connection'

function App (props) {
  const [items, setItems] = useState([])
  const [showResults, setShowResults] = useState(false);
  const [searchResaults, setSearchResults] = useState([]);
  const [connectedUser, setConnectedUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchResults = (data) => {
    console.log(data)
    setSearchResults(data);
    setShowResults(true);
  }

  const resetSearch = (data) => {
    setShowResults(false);
  }

  useEffect(() => {
    console.log(isLoggedIn)
  }, [isLoggedIn])

  return (
    <Router history={history}>
      <Header resetSearch={resetSearch} isLoggedIn={isLoggedIn} setIsLoggedIn={(data) => setIsLoggedIn(data)} />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/ordersHistory' render={(props) => <OrdersHistory connectedUser={connectedUser} />} />
        <Route path="/smartphone/:id/edit" component={SmartphoneEdit} />
        <Route path="/smartphone-details/:id" component={SmartphoneDetails} />
        <Route path="/register" component={Register} />
        <Route path="/login" render={() => <Login setIsLoggedIn={(data) => setIsLoggedIn(data)} connectedUser={(user) => setConnectedUser(user)} />} />
        <Route path='/order' render={(props) => <Order activeComponent={('order')} data={props} items={items} />} />
        <Fragment>
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6" style={{ marginTop: "9%" }}>
              <Search searchResults={searchResults}  />
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8 col-sm-6">
              <Route path='/smartphones' render={(props) => <List
                searchResults={searchResaults} showResults={showResults}
                connectedUser={connectedUser} isLoggedIn={isLoggedIn}
                user={props} setItems={data => setItems(data)} resetSearch={resetSearch}
              />} />
            </div>
          </div>
        </Fragment>
      </Switch>
      <Footer />
    </Router >
  )
};
export default App;
