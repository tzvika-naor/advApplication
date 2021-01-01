import React from 'react';
import './Item.css'
import { Link } from "react-router-dom";


function Item (props) {
    return (

        <div className="col-lg-4 col-md-6 mb-4">
            <div id="card">
                <Link to={{
                    pathname: `/item/${props.id}`, item: props
                }}><img id="card-img-top" src={props.image} alt={props.title} style={{ marginLeft: '10%', marginRight: '10%', marginTop: '10%', marginBottom: '10%', width: '60%', height: '150px' }} /></Link>
                <div id="card-body">
                    <h5 className="card-title">
                        <Link to="">{props.title}</Link>
                    </h5>
                    <h5>{props.price}$</h5>
                    <p className="card-text">{props.description.slice(0, 30).toLowerCase()}...</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">★ ★ ★ ★ ☆</small>
                </div>
            </div>
        </div>


    )
}


export default Item