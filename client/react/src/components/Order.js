// import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useEffect, useState } from "react";
import Smartphone from './Smartphone';
import Quantity from './Quantity';
function Order (props) {
    //set the total price with array reduce
    console.log(props)
    const orderDetails = props.items;
    const [order, setOrder] = useState({ smartphonesIds: orderDetails.smartphonesIds, userId: orderDetails.user._id, status: 'completed' })
    const [value, setValue] = useState(order.smartphonesIds.map(item => item.qnt))


    useEffect(() => {
        axios.post('http://localhost:5000/api/order', order)
            .then(response => {
                console.log(response.data.order.id)
            })
    }, [])

    useEffect(() => {
        console.log(value)
    }, [value])
    const onChange = (index) => {
        console.log(index.target.value)
    }
    const setItem = (data) => {
        console.log(data)
        const valueCopy = value;
        valueCopy[data.index] = data.value;
        setValue(valueCopy)
        console.log(value)
    }
    const onCheckout = () => {
        const orderCopy = order // saving the copy
        orderCopy.smartphonesIds.map((item, index) => {
            item.qnt = value[index];
            // updating the latest quantity
        })
        setOrder(orderCopy);
        axios.post('http://localhost:5000/api/order', orderCopy)
            .then(response => {
                console.log(response.data)
            })
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
                                    <li style={{ height: "120px" }} class="list-group-item">  <img style={{ width: "50px", height: "100px", float: "right" }} src={el.image} alt="" />  <h4>Model: {el.phoneModel}</h4> <h4>ID: {el.id}</h4>  <h4>Price: {el.price} </h4> </li>
                                </div>
                                <div className="col-md-2">
                                    <div style={{ marginTop: "30px", marginLeft: "20px", width: "60px" }}>
                                        <label>Quantity</label>
                                        <Quantity index={index} value={value[index]} setItem={(data) => setItem(data)} />
                                        {/* <li><input className="form-control input-lg" type="number" defaultValue={value[index]} onChange={event => setValue(event.target.value)}></input></li> */}
                                    </div>
                                </div>
                            </div></div>
                    </ul>
                </div>
            ))
            }
            <div className="col-md-4" style={{ marginBottom: "30px", marginTop: "30px" }}>
                <div className="row" >
                    <div className="col-md-7 offset-1">
                        <h4>Total Price: {orderDetails.totalPrice}</h4>
                    </div>
                    <div className="col-md-2">
                        <Button variant="primary" size="lg" onClick={onCheckout}>
                            Checkout
                    </Button>
                    </div>
                </div></div>
        </div>

    )
}
export default Order;