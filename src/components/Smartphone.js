import React from 'react';
import { Link } from "react-router-dom";


function Smartphone (props) {
    console.log(props)
    return (

        <div className="col-lg-4 col-md-6 mb-4">
            <div id="card">
                <Link to={{
                    pathname: `/smartphone/${props.id}`, smartphone: props
                }}><img id="card-img-top" src={props.image} alt={props.model} style={{ marginLeft: '10%', marginRight: '10%', marginTop: '10%', marginBottom: '10%', width: '60%', height: '150px' }} /></Link>
                <div id="card-body">
                    <h5 className="card-title">
                        <Link to="">{props.model}</Link>
                    </h5>
                    <h5>{props.price}$</h5>
                    <p className="card-text">{props.brand}</p>
                    <p className="card-text">{props.frontCamera}</p>
                    <p className="card-text">{props.rearCamera}</p>
                </div>
                {/* <div className="card-footer">
                 
                    <small className="text-muted">{props.reviews}★ ★ ★ ★ ☆</small>
                </div> */}
            </div>
        </div>


    )
}


export default Smartphone