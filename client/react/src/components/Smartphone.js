import { Link } from "react-router-dom";
import { FiShoppingCart } from 'react-icons/fi';
import { ImPencil2 } from 'react-icons/im';
import history from '../History';
function Smartphone (props) {
    // console.log(props);
  
    const click = (event, i) => {
        alert(`${props.smartphone.phoneModel} added to your order`);
        props.addToOrder(props.smartphone)
    }
  
    const edit = () => {
        history.push({ pathname: `/smartphone/${props.smartphone.id}/edit`, smartphone: props });
    }
  
    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div id="card" style={{ marginBottom: '20px', backgroundColor: "white", marginRight: "50px", padding: "20px" }}>
                <h3 className="card-title" style={{ marginLeft: "20px" }} >
                  <span style={{ float: "right", cursor: "pointer" }} ><FiShoppingCart onClick={(event, i) => click(event, i)} /></span>
                    {props.isAdmin[0] ? <div> <span style={{ float: "right", cursor: "pointer", marginRight: "5px" }} ><ImPencil2 onClick={(event, i) => edit(event, i)} /></span>
                    {props.smartphone.phoneModel} </div> : <div>{props.smartphone.phoneModel}</div>}
                </h3>
                <img id="card-img-top" src={props.smartphone.image} alt={props.smartphone.phoneModel} style={{ marginLeft: '20%', marginRight: '20%', marginBottom: '10px%', width: '30%', height: '300px' }} />
                <div id="card-body">
                    <small><p className="card-text">Brand: {props.smartphone.brand}</p></small>
                    <small><p className="card-text">Display: {props.smartphone.display}</p></small>
                    <small><p className="card-text">Front Camera: {props.smartphone.frontCamera}</p></small>
                    <small><p className="card-text">Rear Camera: {props.smartphone.rearCamera}</p></small>
                    <small><p className="card-text">Processor: {props.smartphone.processor}</p></small>
                    <small><p className="card-text">Battery Capacity: {props.smartphone.batteryCapacity}</p></small>
                    <h5 style={{ marginTop: '10px' }}>Sales For:  {props.smartphone.price}$</h5>
                </div>
            </div>
        </div>
    )
}


export default Smartphone