import { Card } from 'react-bootstrap';
import { useState } from 'react';

function CardItem(props) {
    return (
        <div style={{ width: "400px", marginLeft: "20px", marginTop: "20px" }} >
            <Card>
                <Card.Header><h4>Status: {props.order.status}</h4>   <h4> Date: {props.order.date.substring(0, 10)}</h4>
                </Card.Header>
                <Card.Body>
                    <Card.Title> Order Number: {props.order._id}</Card.Title>
                    <Card.Text>
                        {props.order.smartphones.map(item => <div>
                            <p>Model: {item.id.phoneModel} | Price: {item.id.price}$ | Quantity: {item.quantity}</p>
                        </div>)}
                    </Card.Text>
                    <h4>Total Price: {props.order.totalPrice}$</h4>
                </Card.Body>
            </Card>
        </div >
    )
}
export default CardItem