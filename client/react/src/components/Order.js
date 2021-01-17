// import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from "react";


function Order (props) {
    const [smartphoneId, setSmartphoneId] = useState(props.smartphones.location.id.smartphoneId)
    const [total, setTotal] = useState(props.smartphones.location.price.smartphonePrice)
    const [orderId, setOrderId] = useState('')
    const item = {
        id: smartphoneId,
        totalPrice: total
    }
    console.log(props.smartphones.location)
    console.log(smartphoneId.length);
    useEffect(() => {
        axios.post('http://localhost:5000/api/order', item)
            .then(response => {
                setOrderId(response.data.order.id)
                console.log(response)
            }, [])
    })
    return (
        <div>
            <p>Order Id: {orderId}</p>
            {smartphoneId.map(el => (
                <li>{el}</li>
            ))
            }
        </div>
    )
}
export default Order;