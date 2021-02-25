// import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useEffect, useState } from "react";
import Quantity from './Quantity';
import history from '../History';
import io from "socket.io-client";

//const socket = io.connect("http://localhost:5000");
function Order (props) {

    console.log(props)

    var [smartphonesInCart, setSmartphonesInCart] = useState(props.items);
    const [totalPrice, setTotalPrice] = useState(0);
    const [user, setUser] = useState(props.connectedUser)

    useEffect(() => {
       
        calculateTotalPrice(props.items)

    }, [])

    useEffect(() => {
       
        console.log(totalPrice)

    }, [calculateTotalPrice])

    const goBack = () => {
        props.setItems(smartphonesInCart)
        history.push("/smartphones")
    }

    const calculateTotalPrice = smartphones => {
      
    
    }

    return (
        <div >
            {/* <h4> Order Id: {orderId}</h4> */}
            <ul className="list-unstyled" >
                <h4 style={{ marginBottom: "20px", marginTop: "40px", marginLeft: "40px", color: "white" }}> Your Cart </h4>
                <div style={{ marginLeft: "60px", marginBottom: "20px", color: "white" }}>
                    <li><h5>First Name: {user?.firstname}</h5> </li>
                    <li><h5>Last Name: {user?.lastname} </h5></li>
                    <li><h5>Email: {user?.email}</h5></li>
                </div></ul>
            {smartphonesInCart.map((el, index) => (
                <div>
                    <ul className="list-unstyled">
                        <div className="col-md-4">
                            <div className="row" >
                                <div className="col-md-9 offset-1">
                                    <li style={{ height: "120px" }} className="list-group-item">  <img style={{ width: "50px", height: "100px", float: "right" }} src={el.image} alt="" />  <h4>Model: {el.phoneModel}</h4>  <h4>Price: {el.price}$ </h4> </li>
                                </div>
                                <div className="col-md-2">
                                    <div style={{ marginTop: "30px", marginLeft: "20px", width: "60px" }}>
                                        <label>Quantity</label>
                                        <Quantity key={index} index={index} id={el.id} quantity={el.quantity} setQuantity={(id, quantity) => setQuantity(id, quantity)} />
                                        <Button onClick={() => removeFromCart(el.id)}>Remove</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            ))
            }
            <div className="col-md-4" style={{ marginBottom: "30px", marginTop: "30px" }}>
                <div className="row" >
                    <div className="col-md-5 offset-1">
                        <h4>Total Price: {totalPrice}$</h4>
                    </div>
                    <div className="col-md-2">
                        <Button variant="secondary" size="lg" onClick={goBack}>
                            Cancel
                    </Button>
                    </div>
                    <div className="col-md-2">
                        <Button variant="primary" size="lg" onClick={onCheckout}>
                            Payment
                    </Button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Order;