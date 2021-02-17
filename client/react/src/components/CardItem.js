import { Card } from 'react-bootstrap';
import { useState } from 'react';
function CardItem (props) {
    const [order, setOrder] = useState(props.order)

    return (
        <div style={{ width: "400px", marginLeft: "20px", marginTop: "20px" }} >
            <Card>
                <Card.Header><h4>Status: {order.status}</h4>   <h4> Date: {order.date.substring(0, 10)}</h4>
                </Card.Header>
                <Card.Body>
                    <Card.Title> Order Number: {order._id}</Card.Title>
                    <Card.Text>
                        {order.smartphones.map(item => <div>
                            <p>Model: {item.id.phoneModel} | Price: {item.id.price} | Quantity: {item.quantity}</p>
                        </div>)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div >
    )
}
export default CardItem