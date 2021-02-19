// import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useEffect, useState } from "react";
import Quantity from './Quantity';
import history from '../History';
import io from "socket.io-client";

//const socket = io.connect("http://localhost:5000");
function Order (props) {
    //set the total price with array reduce

    console.log(props)
    const orderDetails = props.items;
    var [smartphonesInCart, setSmartphonesInCart] = useState(orderDetails.smartphonesInCart);
    const [totalPrice, setTotalPrice] = useState(orderDetails.totalPrice)

    const setQuantity = (id,quantity) => {
        const item = smartphonesInCart.find(item => item.id === id);
        console.log("ITEM",item);  
        item.quantity = +quantity;
        console.log("ARRAY",smartphonesInCart);
        calculateTotalPrice(smartphonesInCart);
    }
    const onCheckout = () => {
        // create a new order copy
        console.log("ARRAY BEFORE CHECKOUT",smartphonesInCart);
        var smartphonesForOrder = smartphonesInCart.map(item => {
            return {
                id: item.id,
                quantity: item.quantity
            }});

        console.log("ORDER BEFORE CHECKOUT",smartphonesForOrder);

        var newOrder = {
            smartphones: smartphonesForOrder,
            totalPrice: totalPrice,  
            userId: orderDetails.user._id, 
            status: 'completed' 
        };

        axios.post('http://localhost:5000/api/order', newOrder)
            .then(response => {
                console.log("ORDER COMPLETED", response.data)
            })
            //add websocket new order
            //socket.emit('newOrder');
        alert(`Order completed`);

        
        history.push('/smartphones')
    }


    const goBack = () => {
        history.push("/smartphones")
    }

    const calculateTotalPrice = smartphones => {
        var newTotalPrice = 0;
        console.log(smartphones)
        smartphones.map(item =>  
        {
            console.log("Item",item);
            newTotalPrice += item.quantity * item.price;
        });

        setTotalPrice(newTotalPrice);
    }

    const removeItem = (id) => {

        smartphonesInCart = smartphonesInCart.filter(item => item.id !== id); //Remove the smartphone from the cart array
        setSmartphonesInCart(smartphonesInCart);
        calculateTotalPrice(smartphonesInCart);

        //If there is no more items in cart
        if (!(Array.isArray(smartphonesInCart) && smartphonesInCart.length)){
            alert('your cart is empty');
            history.push('/smartphones');
        }
    }

    return (
        <div >
            {/* <h4> Order Id: {orderId}</h4> */}
            <ul className="list-unstyled" >
                <h4 style={{ marginBottom: "20px", marginTop: "20px", marginLeft: "40px" }}> User Details</h4>
                <div style={{ marginLeft: "60px", marginBottom: "20px" }}>
                    <li><h5>First Name: {orderDetails.user.firstname}</h5> </li>
                    <li><h5>Last Name: {orderDetails.user.lastname} </h5></li>
                    <li><h5>Email: {orderDetails.user.email}</h5></li>
                </div></ul>
            {orderDetails.smartphonesInCart.map((el, index) => (
                <div>
                    <ul className="list-unstyled">

                        <div className="col-md-4">
                            <div className="row" >
                                <div className="col-md-9 offset-1">
                                    <li style={{ height: "120px" }} className="list-group-item">  <img style={{ width: "50px", height: "100px", float: "right" }} src={el.image} alt="" />  <h4>Model: {el.phoneModel}</h4> <h4>ID: {el.id}</h4>  <h4>Price: {el.price} </h4> </li>
                                </div>
                                <div className="col-md-2">
                                    <div style={{ marginTop: "30px", marginLeft: "20px", width: "60px" }}>
                                        <label>Quantity</label>                                    
                                        <Quantity index={index} id={el.id} quantity={el.quantity} setQuantity={(id,quantity) => setQuantity(id,quantity)} />
                                        <Button onClick={()=>removeItem(el.id)}>Remove</Button>
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
                        <h4>Total Price: {totalPrice}</h4>
                    </div>
                    <div className="col-md-2">
                        <Button variant="secondary" size="lg" onClick={goBack}>
                            Cancel
                    </Button>
                    </div>
                    <div className="col-md-2">
                        <Button variant="primary" size="lg" onClick={onCheckout}>
                            Checkout
                    </Button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Order;