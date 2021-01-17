// import { Link } from 'react-router-dom';

import { useState } from "react";


function Order (props) {
    const [orderItems, setOrderItems] = useState(props.smartphones.location.selectedSmartPhones.selectedSmartPhones)
    console.log(props.smartphones.location.selectedSmartPhones.selectedSmartPhones)
    return (
        <div>
            { orderItems.map(item => (
                <li>{item}</li>
            ))
            }</div>
    )
}
export default Order;