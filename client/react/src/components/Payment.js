import credit from 'payment-icons/min/mono/default.svg';
import './Payment.css'

function Payment (props)  {
    return (
        <div className="row">
            <div className="col-lg-3 offset-9"  onClick={props.goToPayment}>
                <button className = "addToCart">Your Cart</button>
            </div>
        </div>
    )
}
export default Payment;