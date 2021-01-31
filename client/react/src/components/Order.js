// import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from "react";
import Smartphone from './Smartphone';
function Order (props) {
    console.log(props)
    const orderDetails = props.items;
    const [order, setOrder] = useState({ smartphonesIds: orderDetails.smartphonesIds, userId: orderDetails.user._id, status: 'completed' })

    useEffect(() => {
        axios.post('http://localhost:5000/api/order', order)
            .then(response => {
                console.log(response.data.order.id)
            })
    }, [])

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
                    <ul className="list-unstyled" style={{ marginLeft: "100px" }}>
                        <div className="row" >
                            <li style={{ height: "120px", width: "500px" }} class="list-group-item">  <img style={{ width: "50px", height: "100px", float: "right" }} src={el.image} alt="" />  <h4>Model: {el.phoneModel}</h4> <h4>ID: {el.id}</h4>  <h4>Price: {el.price} </h4> </li>
                            <div style={{ marginTop: "30px", marginLeft: "20px", width: "60px" }}>
                                <label>Quantity</label>
                                <li><input className="form-control input-lg" type="number" value={order.smartphonesIds[index].qnt} ></input></li>
                            </div></div>
                    </ul>

                </div>

            ))
            }
            <h4>Total Price: {orderDetails.totalPrice}</h4>
        </div>

    )
}
export default Order;