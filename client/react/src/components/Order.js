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

    var [smartphonesInCart, setSmartphonesInCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);
    const [user, setUser] = useState([])

    let localUser = JSON.parse(localStorage.getItem("user"))
    let localCart = JSON.parse(localStorage.getItem("cart"))
    //this is called on component didmount
    useEffect(() => {

        if (localCart) {
            setSmartphonesInCart(localCart);
            calculateTotalPrice(localCart);
            setUser(localUser);
        }
        else {
            history.push('');
        }
    }, [])

    const removeFromCart = (id) => {

        let smartphonesInCartCopy = [...smartphonesInCart];
        smartphonesInCartCopy = smartphonesInCartCopy.filter(item => item.id !== id);

        setSmartphonesInCart(smartphonesInCartCopy);
        calculateTotalPrice(smartphonesInCartCopy);

        //make cart a string and store in local space
        localStorage.setItem("cart", JSON.stringify(smartphonesInCartCopy));

        //If there is no more items in cart
        //the smartphonesInCart.length becomes 0 after the setState 
        if (smartphonesInCart.length === 1) {
            localStorage.removeItem("cart");
            localStorage.removeItem("totalPrice");
            alert('your cart is empty');
            history.push('/smartphones');
        }
    }

    const setQuantity = (id, quantity) => {
        let smartphonesInCartCopy = [...smartphonesInCart];

        //find if item exists, just in case
        let existentItem = smartphonesInCartCopy.find(item => item.id === id);

        // //if it doesnt exist simply return
        // if (!existentItem) return

        existentItem.quantity = +quantity;

        setSmartphonesInCart(smartphonesInCartCopy);
        //set Totalprice in this function
        calculateTotalPrice(smartphonesInCartCopy);

        //make cart a string and store in local space
        localStorage.setItem("cart", JSON.stringify(smartphonesInCartCopy));
    }


    const onCheckout = () => {
        // create a new order copy
        console.log("ARRAY BEFORE CHECKOUT", smartphonesInCart);
        var smartphonesForOrder = smartphonesInCart.map(item => {
            return {
                id: item.id,
                quantity: item.quantity
            }
        });

        console.log("ORDER BEFORE CHECKOUT", smartphonesForOrder);

        var newOrder = {
            smartphones: smartphonesForOrder,
            totalPrice: totalPrice,
            userId: localUser._id,
            status: 'completed'
        };

        axios.post('http://localhost:5000/api/order', newOrder)
            .then(response => {
                if (response.status === 201)
                    alert(`Order completed`);
            }, error => {
                console.log(error)
                if (error.response.status === 500) {
                    console.log("Error creating order")
                    alert('Error creating order')
                }
            })

        localStorage.removeItem("cart");
        localStorage.removeItem("totalPrice");
        history.push('/smartphones')
    }


    const goBack = () => {
        history.push("/smartphones")
    }

    const calculateTotalPrice = smartphones => {
        var newTotalPrice = 0;
        //console.log(smartphones)
        smartphones.map(item => {
            console.log("Item", item);
            newTotalPrice += item.quantity * item.price;
        });

        setTotalPrice(newTotalPrice);
        localStorage.setItem("totalPrice", newTotalPrice)
    }


    console.log("smartphonesInCart !!", smartphonesInCart)
    return (
        <div >
            {/* <h4> Order Id: {orderId}</h4> */}
            <ul className="list-unstyled" >
                <h4 style={{ marginBottom: "20px", marginTop: "40px", marginLeft: "40px", color: "white" }}> Your Cart </h4>
                <div style={{ marginLeft: "60px", marginBottom: "20px", color: "white" }}>
                    <li><h5>First Name: {localUser?.firstname}</h5> </li>
                    <li><h5>Last Name: {localUser?.lastname} </h5></li>
                    <li><h5>Email: {localUser?.email}</h5></li>
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