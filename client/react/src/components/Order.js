// import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from "react";
import history from '../History';
//import { Button } from 'react-bootstrap';

function Order (props) {
    var [smartphonesInCart, setSmartphonesInCart] = useState(props.data.location.smartphonesInCart.smartphonesInCart)
    const [orderId, setOrderId] = useState([]);
    const [totalPrice, setTotalPrice] = useState(props.data.location.totalPrice.totalPrice);
    // this.costumer = {
    //     firstname: "Omer"
    // }
    console.log("Order props",props)
    var order = {
        //smartphones: props.data.location.smartphonesId.smartphonesId,
        // smartphones: props.data.location.smartphonesInCart.smartphonesInCart.map((el)=>{
        //     return {
        //         id: el.id,
        //         itemCount: el.itemCount
        //     }
        // }),
        smartphones: props.data.location.smartphonesInCart.smartphonesInCart,
        userId: props.data.location.user._id,  
        totalPrice: props.data.location.totalPrice.totalPrice,
        user: props.data.location.user//Don't send to create order post
    }



    useEffect(() => {
        order.smartphones = order.smartphones.map(obj => {
        return {
            id: obj.id,
            itemCount: obj.itemCount
        }});
        axios.post('http://localhost:5000/api/order', order)
        .then(response => {
            setOrderId(response.data.order.id)
            console.log(response)
        })
    }, [] )

    const calculateTotalPrice = smartphones => {
        var newTotalPrice = 0;
        console.log(smartphones)
        smartphones.map(item =>  
        {
            console.log("Item",item);
            newTotalPrice += item.itemCount * item.price;
        });

        setTotalPrice(newTotalPrice);
    }

    const removeItem = (id) => {
        const user = props.connectedUser;
        var result = smartphonesInCart.find(el => el.id === id) // find the smartphone in the cart array by id
                if (result.itemCount > 1) {
            result.itemCount--;

            console.log(result)
        }
        else {
            smartphonesInCart = smartphonesInCart.filter(item => item.id !== id) //Remove the smartphone from the cart array
            setSmartphonesInCart(smartphonesInCart);
            console.log("Result after count 0",smartphonesInCart)
        }
        //   history.push({
        //        pathname: 'order',
        //        smartphonesInCart: { smartphonesInCart },
        //        totalPrice: { totalPrice },
        //        smartphonesId: { smartphonesId },
        //        user: user
        //    })
        calculateTotalPrice(smartphonesInCart);
    }

    const addItem = id =>{
        axios.post('http://localhost:5000/api/order/smartphone/add', {
            id : id
        })
        .then(response => {
            [smartphonesInCart] = response.data.smartphones// to fix
            //setCount(count + 1)
        })
        .err( (err,log,xhr) =>{
            console.error(err);
            console.error(log);
            console.error(xhr);
        });
    }

    const deleteOrder = id => {
        axios.delete(`http://localhost:5000/api/order/delete/${id}`, {
            id : id
        })
        .then(response => {
            console.log(id);
            console.log(response);
            console.log(response.data);
            alert(`Order Deleted ! `);
            history.push('./smartphones');

        })
        // .err( (err,log,xhr) =>{
        //     console.error(err);
        //     console.error(log);
        //     console.error(xhr);
        // });
    }

    const updateOrderBeforeCheckout = (id) => {
        
        let smartphonesAfterUpdate = smartphonesInCart.map((el)=>{
            return {
                id: el.id,
                itemCount: el.itemCount
            }
        });
        const updatedOrder = {
            id : id,
            smartphones : smartphonesAfterUpdate,
            totalPrice : totalPrice,
            userId: order.userId
        }
        axios.put(`http://localhost:5000/api/order/checkout/${id}`, updatedOrder)
        .then(response => {
            console.log(id);
            console.log(response);
            console.log(response.data);
            console.log(response.data.order);
            //alert(`Checkout ! `);
            history.push('./order/checkout');
            // history.push({
            //     pathname: 'order',
            //     smartphonesInCart: { smartphonesInCart },
            //     totalPrice: { totalPrice },
            //     smartphoneId: { smartphoneId },
            //     user: user
            // })

        })
        // .err( (err,log,xhr) =>{
        //     console.error(err);
        //     console.error(log);
        //     console.error(xhr);
        //     alert(`Error ${err}`);
        // });
    }

    const SmartPhone = (data) => {
        console.log(data);
        return (<li style={{ height: "120px", width: "500px" }} class="list-group-item">
                    <img style={{ width: "50px", height: "100px", float: "right" }} src={data.data.image} alt="" />
                    <h4>Model: {data.data.phoneModel}</h4>
                    <h4>ID: {data.data.id}</h4>
                    <h4>Price: {data.data.price}  ,  Count: {data.data.itemCount}</h4>
                    <button style={{ 'position': 'absolute', 'top': '0', 'right': '0' }} onClick={()=>removeItem(data.data.id)}>X</button>
                    <button style={{ 'position': 'absolute', 'bottom': '0', 'right': '0' }} onClick={()=>addItem(data.data.id)}>+</button>
                </li>);
    }



    return (
        <div >
            <h4> Order Id: {orderId}</h4>
            <ul className="list-unstyled" >
                <h4 style={{ marginBottom: "20px", marginTop: "20px", marginLeft: "40px" }}> User Details</h4>
                <div style={{ marginLeft: "60px", marginBottom: "20px" }}>
                    <li><h5>First Name: {order.user.firstname}</h5> </li>
                    <li><h5>Last Name: {order.user.lastname} </h5></li>
                    <li><h5>Email: {order.user.email}</h5></li>
                </div>
            </ul>
            <ul>
            {smartphonesInCart.map(el => (
                <SmartPhone data={el}/>
            ))
            }
            </ul>
            <button onClick={()=>deleteOrder(orderId)}>Delete Order</button>
            <button onClick={()=>updateOrderBeforeCheckout(orderId)}>Checkout</button>
            <h4>Total Price: {totalPrice}</h4>
        </div>

    )
}
export default Order;