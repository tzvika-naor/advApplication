// import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from "react";
function Order (props) {
    console.log(props)
    const item = {
        id: props.data.location.smartphoneBuy.smartphoneBuy.smartphoneId,
        totalPrice: props.data.location.totalPrice.totalPrice,
        userId: props.data.location.user._id,
        user: props.data.location.user
    }
    const order = {
        smartphones: props.data.location.smartphoneId.smartphoneId,
        userId: props.data.location.user._id,  
    }
    const [smartphone] = useState(props.data.location.smartphoneBuy.smartphoneBuy)
    const [orderId, setOrderId] = useState([]);

    useEffect(() => {
            console.log(item)
        axios.post('http://localhost:5000/api/order', order)
            .then(response => {
                setOrderId(response.data.order.id)
                console.log(response)
            })
    }, [] )

    return (
        <div >
            <h4> Order Id: {orderId}</h4>
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
            <h4>Total Price: {props.data.location.totalPrice.totalPrice}</h4>
        </div>

    )
}
export default Order;