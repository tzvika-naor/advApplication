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

  const [totalPrice, setTotalPrice] = useState(localStorage.getItem("totalPrice"))

  const [items, setItems] = useState([]);

  const [showResults, setShowResults] = useState(false);

  const [searchResaults, setSearchResults] = useState([]);

  const [connectedUser, setConnectedUser] = useState(JSON.parse(localStorage.getItem("user")))

  
  useEffect(() => {
    // we can also take it stright from the setSmartphones under total value
    localStorage.setItem("totalPrice", JSON.parse(totalPrice));

  }, [totalPrice])
  
  useEffect(() => {
      
    //this has to go after the setItems() because the placing a hook is an async task and 
    //has to preform after the cycle ended or we will end up losing the last value
    localStorage.setItem("cart",JSON.stringify(items));

  }, [items])


  const searchResults = (data) => {

    setSearchResults(data);

    setShowResults(true);

  }

  const resetSearch = (data) => {
    setShowResults(false);
  }
  const setSmartphones = (data, total) => {
        console.log(items)
    if (!items.includes(data)) {
      setItems(items.concat(data))
      setTotalPrice(total)
    }
  }

  return (
    <Router history={history}>

      <Header resetSearch={resetSearch} connectedUser={connectedUser} items={items} />

      <Switch>
        {/* good! */}
        <Route path='/' exact component={Home} />
        {/* good! */}
        <Route path='/ordersHistory' render={() => <OrdersHistory connectedUser={connectedUser} />} />
        {/* good! */}
        <Route path="/smartphone/:id/edit" component={SmartphoneEdit} />
        {/* good! */}
        <Route path="/smartphoneDetails/:id" component={SmartphoneDetails} />
        {/* good! */}
        <Route path="/register" component={Register} />
        {/* good! */}
        <Route path="/login" render={() => <Login setConnectedUser={(user) => setConnectedUser(user)} />} />
        {/* good */}
        <Route path='/order' render={() => <Order items={items} setItems={data => setItems(data)}

          connectedUser={connectedUser} totalPrice={totalPrice} />} />

        <Fragment>

          {/* good */}
          <div className="d-flex justify-content-center" style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}>

            <Search searchResults={searchResults} />

          </div>

          <div >
            {/* good */}

            <Route path='/smartphones' render={(props) => <List searchResults={searchResaults} showResults={showResults}

              setSmartphones={(data, totalPrice) => setSmartphones(data, totalPrice)}


            />} />

          </div>


        </Fragment>

      </Switch>

      <Footer />
    </Router >
  )
};
export default App;
