import React from 'react';
import { Link } from "react-router-dom";


function Product (props) {

    return (

        <div className="col-lg-4 col-md-6 mb-4" style={{marginTop:"20px"}}>
            <div id="card" style={{width:"80%"}}>
                <Link to={{
                    pathname: `/product/${props.id}`, product: props
                }}><img id="card-img-top" src={props.image} alt={props.title} style={{ marginLeft: '30%', marginBottom: '10%', width: '40%', height: '100%' }} /></Link>
                <div id="card-body">
                    <h5 className="card-title" style={{ textAlign: "center" }}>
                        <Link to="/">{props.title}</Link>
                    </h5>
                    <p className="card-text">{props.description.slice(0,60)}...</p>
                    <Link  to="/"><span style={{ float: "right" }}><h5>{props.price}$</h5></span></Link>
                </div>
                <div className="card-footer">
                    <p className="reviews">Reviews: {props.review}★</p>
                </div>
            </div>
        </div>


    )
}


export default Product