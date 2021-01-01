import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ItemDetails.css'
import history from '../History';

function ItemDetails (props) {

    const [item, setItem] = useState(props.location.item);

    const onDelete = (event) => {
        const deleteItem = props.location.item.id;
        axios.delete('http://localhost:5000/api/product/' + deleteItem)
            .then(response => {
                console.log(response);
                history.push('/')
            })
    }
    return (
        <div className="col-lg-4 offset-4" style={{ marginBottom: "140px" }} >
            <div className="card-itemDetails" style={{ marginTop: '10%' }}>
                <h5 className="card-title" style={{ marginBottom: '15px' }}>
                    <Link to="">{item.title}</Link>
                    <span style={{ float: 'right' }}><h5>{item.price}$</h5></span>
                </h5>
                <img className="card-img-top" src={item.image} alt={item.title} style={{ width: '60%', height: '300px', marginLeft: '20%' }} />
                <div className="card-body">
                    <p className="card-text">{item.description}</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">★ ★ ★ ★ ☆</small>
                </div>
                <Link to='/'><Button id="goBack" variant="primary" type="button">Back</Button></Link>
                <Link to={{ pathname: `/item/${item.id}/edit`, item: item, isEdit: false }}>
                    <Button id="add" variant="success" type="button" style={{ marginLeft: "100px" }}>Add</Button>
                </Link>
                <Button id="delete" variant="danger" onClick={(event) => onDelete(event)} style={{ marginLeft: "30px" }}>Delete</Button>
                <Link to={{ pathname: `/item/${item.id}/edit`, item: item, isEdit: true }}><Button id="edit" variant="info" style={{ marginLeft: "30px" }}>Edit</Button></Link>
                <Button id="addToCart" variant="primary" style={{ position: "absolute", bottom: "0", right: "0" }}>Buy</Button>
            </div>
        </div>
    )
}
export default ItemDetails;