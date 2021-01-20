import { Link } from "react-router-dom";
import { FiShoppingCart } from 'react-icons/fi';
import history from '../History';
// import credit from '/credit.jpg';
function Smartphone (props) {
    console.log(props)
    const click = (event, i) => {
        console.log(props)
        alert(`${props.smartphone.phoneModel} added to your order`);
        const addItem = {
            phoneModel: props.smartphone.phoneModel,
            price: +props.smartphone.price,
            id: props.smartphone.id,
            image: props.smartphone.image
        }
        props.getId(addItem);
    }
    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div id="card" style={{ marginBottom: '20px' }}>

                <h3 className="card-title" style={{ marginLeft: "20px" }} > <span style={{ float: "right", cursor: "pointer", marginRight: "180px" }} ><FiShoppingCart onClick={(event, i) => click(event, i)} /></span>
                    <Link to={{
                        pathname: `/smartphone/${props.smartphone.id}/edit`, smartphone: props
                    }}>{props.smartphone.phoneModel}</Link>
                </h3>
                <Link to={{
                    pathname: `/smartphone/${props.smartphone.id}/edit`, smartphone: props
                }}><img id="card-img-top" src={props.smartphone.image} alt={props.smartphone.phoneModel} style={{ marginLeft: '20%', marginRight: '20%', marginBottom: '10px%', width: '30%', height: '300px' }} /></Link>
                <div id="card-body">
                    <small><p className="card-text">Brand: {props.smartphone.brand}</p></small>
                    <small><p className="card-text">Display: {props.smartphone.display}</p></small>
                    <small><p className="card-text">Front Camera: {props.smartphone.frontCamera}</p></small>
                    <small><p className="card-text">Rear Camera: {props.smartphone.rearCamera}</p></small>
                    <small><p className="card-text">Processor: {props.smartphone.processor}</p></small>
                    <small><p className="card-text">Battery Capacity: {props.smartphone.batteryCapacity}</p></small>
                    <Link to={{
                        pathname: `/smartphone/${props.smartphone.id}/edit`, smartphone: props
                    }}><h5 style={{ marginTop: '10px' }}>Sales For:  {props.smartphone.price}$</h5></Link>

                </div>
            </div>
        </div>


    )
}


export default Smartphone