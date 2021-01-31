// import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from "react";
import Smartphone from './Smartphone';
function Order (props) {

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
            {/* <h4> Order Id: {orderId}</h4>
            <ul className="list-unstyled" >
                <h4 style={{ marginBottom: "20px", marginTop: "20px", marginLeft: "40px" }}> User Details</h4>
                <div style={{ marginLeft: "60px", marginBottom: "20px" }}>
                    <li><h5>First Name: {item.user.firstname}</h5> </li>
                    <li><h5>Last Name: {item.user.lastname} </h5></li>
                    <li><h5>Email: {item.user.email}</h5></li>
                </div></ul>
            {smartphone.map(el => (
                <ul>
                    <div >
                        <li style={{ height: "120px", width: "500px" }} class="list-group-item">  <img style={{ width: "50px", height: "100px", float: "right" }} src={el.image} alt="" />  <h4>Model: {el.phoneModel}</h4> <h4>ID: {el.id}</h4>  <h4>Price: {el.price} </h4> </li>
                    </div>
                </ul>
            ))
            }
            <h4>Total Price: {location.totalPrice.totalPrice}</h4> */}
        </div>

    )
}
export default Order;