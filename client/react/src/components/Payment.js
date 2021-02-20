import credit from 'payment-icons/min/mono/default.svg';
import './Payment.css'

function Payment (props)  {
    return (
        <div className="row">
            <div className="col-lg-3 offset-9"  onClick={props.goToPayment}>
                <h5 className = "payment">Payment:</h5><button className = "addToCart">Go To Payment</button>
            </div>
        </div>
    )
}
export default Payment;