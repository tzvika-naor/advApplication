import credit from 'payment-icons/min/mono/default.svg';

function Payment (props)  {
    return (
        <div className="row">
            <div className="col-lg-3 offset-9"  onClick={props.goToPayment}>
                <h5>Payment:</h5><img src={credit} alt="" style={{ width: "200px",height:"150px", cursor: "pointer" }} />
            </div>
        </div>
    )
}
export default Payment;