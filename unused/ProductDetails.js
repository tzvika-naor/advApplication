import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../client/react/src/History';

function ProuctDetails (props) {
    const product = props.location.product;

    const onDelete = (event) => {
        const deleteproduct = props.location.product.id;
        axios.delete('http://localhost:5000/api/product/' + deleteproduct)
            .then(response => {
                history.push('/')
            })
    }
    return (
        <div className="col-lg-4 col-md-6 offset-lg-4 offset-lg-3" style={{ marginBottom: "140px" }} >
            <div className="card-productDetails" style={{ marginTop: '10%' }}>
                <h5 className="card-title" style={{ marginBottom: '15px' }}>
                    <Link to="/">{product.title}</Link>
                    <span style={{ float: 'right' }}><h5>{product.price}$</h5></span>
                </h5>
                <img className="card-img-top" src={product.image} alt={product.title} style={{ width: '60%', height: '300px', marginLeft: '20%' }} />
                <div className="card-body">
                    <p className="card-text">{product.description}</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">★ ★ ★ ★ ☆</small>
                </div>
                <Link to='/'><Button id="goBack" variant="primary" type="button">Back</Button></Link>
                <Link to={{ pathname: `/product/${product.id}/edit`, product: product, isEdit: false }}>
                    <Button id="add" variant="success" type="button" style={{ marginLeft: "20px" }}>Add</Button>
                </Link>
                <Button id="delete" variant="danger" onClick={(event) => onDelete(event)} style={{ marginLeft: "20px" }}>Delete</Button>
                <Link to={{ pathname: `/product/${product.id}/edit`, product: product, isEdit: true }}><Button id="edit" variant="info" style={{ marginLeft: "20px" }}>Edit</Button></Link>
                <Button id="addToCart" variant="primary" style={{marginLeft: "20px" }}>Buy</Button>
            </div>
        </div>
    )
}
export default ProuctDetails;