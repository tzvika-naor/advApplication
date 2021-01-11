import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FiShoppingCart } from 'react-icons/fi';

function Smartphone (props) {
    const [id, setId] = useState([]);
   
    const click = (event,i) => {
        setId(id => [...id, (props.id).slice(0) ]);
    }
    return (  
        <div className="col-lg-4 col-md-6 mb-4">
            <div id="card" style={{ marginBottom: '20px' }}>
                <h3 className="card-title"> <span style={{ float: "right", cursor: "pointer", marginRight: "100px" }} ><FiShoppingCart onClick={(event,i) => click(event,i)} /></span>
                    <Link to={{
                        pathname: `/smartphone/${props.id}/edit`, smartphone: props
                    }}>{props.phoneModel}</Link>
                </h3>
                <Link to={{
                    pathname: `/smartphone/${props.id}/edit`, smartphone: props
                }}><img id="card-img-top" src={props.image} alt={props.phoneModel} style={{ marginLeft: '20%', marginRight: '20%', marginBottom: '10px%', width: '50%', height: '300px' }} /></Link>
                <div id="card-body">
                    <small><p className="card-text">Brand: {props.brand}</p></small>
                    <small><p className="card-text">Display: {props.display}</p></small>
                    <small><p className="card-text">Front Camera: {props.frontCamera}</p></small>
                    <small><p className="card-text">Rear Camera: {props.rearCamera}</p></small>
                    <small><p className="card-text">Processor: {props.processor}</p></small>
                    <small><p className="card-text">Battery Capacity: {props.batteryCapacity}</p></small>
                    <Link to={{
                        pathname: `/smartphone/${props.id}/edit`, smartphone: props
                    }}><h5 style={{ marginTop: '10px' }}>Sales For:  {props.price}$</h5></Link>

                </div>
            </div>
        </div>


    )
}


export default Smartphone