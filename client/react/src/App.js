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
const server = "http://localhost:5000";
const socket = io.connect(server);

function App (props) {

  const [items, setItems] = useState([])

  const [showResults, setShowResults] = useState(false);

  const [searchResaults, setSearchResults] = useState([]);

  // if the user was logged in we will 
  // get his details from the localStorage
  // else we will get set this connectedUser
  // var with a callback function from login Component
  const [connectedUser, setConnectedUser] = useState(JSON.parse(localStorage.getItem("user")))

  useEffect(() => {

    console.log(connectedUser)

  }, [])

  useEffect(() => {

    console.log(connectedUser)
    // console.log(localConnectedUser)

  }, [connectedUser])

  const searchResults = (data) => {

    setSearchResults(data);

    setShowResults(true);

  }

  const resetSearch = (data) => {

    setShowResults(false);
  }

  return (
    <Router history={history}>

      <Header resetSearch={resetSearch} connectedUser={connectedUser} />

      <Switch>
        {/* good! */}
        <Route path='/' exact component={Home} />
        {/* good! */}
        <Route path='/ordersHistory' component={OrdersHistory} connectedUser={connectedUser} />
        {/* good! */}
        <Route path="/smartphone/:id/edit" component={SmartphoneEdit} />
        {/* good! */}
        <Route path="/smartphoneDetails/:id" component={SmartphoneDetails} />
        {/* good! */}
        <Route path="/register" component={Register} />
        {/* good! */}
        <Route path="/login" render={() => <Login setConnectedUser={(user) => setConnectedUser(user)} />} />

        <Route path='/order' component={Order} data={props} items={items} />

        <Fragment>
          <div className="row">

            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6" style={{ marginTop: "9%" }}>
              <Search searchResults={searchResults} />
            </div>

            <div className="col-xl-9 col-lg-9 col-md-8 col-sm-6">

              <Route path='/smartphones' render={(props) => <List

                searchResults={searchResaults} showResults={showResults}


                connectedUser={connectedUser}

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
