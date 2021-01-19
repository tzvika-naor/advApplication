// import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from "react";
function Order (props) {
    console.log(props)
    const item = {
        id: props.smartphones.location.smartphoneBuy.smartphoneBuy.smartphoneId,
        totalPrice: props.smartphones.location.totalPrice.totalPrice,
    }
    const [smartphone, setSmartphone] = useState(props.smartphones.location.smartphoneBuy.smartphoneBuy)
    const [orderId, setOrderId] = useState([]);
    const [itemId, setItemId] = useState(props.smartphones.location.smartphoneBuy.smartphoneBuy.id)

    useEffect(() => {
        
            axios.post('http://localhost:5000/api/order', item)
                .then(response => {
                    setOrderId(response.data.order.id)
                    console.log(response)
                })
    }, [])

    return (
        <div >
            <h4> Order Id: {orderId}</h4>
            {smartphone.map(el => (
                <ul>
                    <div >
                        <li style={{ height: "120px", width: "500px" }} class="list-group-item">  <img style={{ width: "50px", height: "100px", float: "right" }} src={el.image} />  <h4>Model: {el.phoneModel}</h4> <h4>ID: {el.id}</h4>  <h4>Price: {el.price} </h4> </li>
                    </div>
                </ul>
            ))
            }
            <h4>Total Price: {props.smartphones.location.totalPrice.totalPrice}</h4>
        </div>

    )
}
export default Order;