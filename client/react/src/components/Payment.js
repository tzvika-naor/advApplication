
function Payment (props)  {
    return (
        <div className="row">
            <div className="col-lg-3 offset-9" style={{ marginBottom: "20px" }} onClick={props.goToPayment}>
                <h5>Payment:</h5><img src="/images/credit.jpg" alt="" style={{ width: "20%", cursor: "pointer" }} />
            </div>
        </div>
    )
}
export default Payment;