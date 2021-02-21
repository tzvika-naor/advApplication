import { useState, useEffect } from 'react';
import axios from 'axios';
import CardItem from './CardItem'
function OrdersHistory (props) {
    const [status, SetStatus] = useState([])
    const [orders, setOrders] = useState([])
    const [dates, setDates] = useState([])
    const [user, setUser] = useState(props.connectedUser)

    let localUser = localStorage.getItem("localConnectedUser");
    localUser = JSON.parse(localUser);

    useEffect(() => {
        var id = localUser._id
        axios.get(`http://localhost:5000/api/order/user/${id}`).then(
            res => {
                //console.log(res.data.orders)
                setOrders(res.data.orders);
                if (res.data.orders)
                    SetStatus(res.data.status);
                setDates(res.data.dates);
            }
        )
    }, [])


    const [searchForm, setSearchForm] = useState({
        status: '',
        data_from: '',
        date_to: ''
    })

    // const GetTotalOrdersAmountByUser(){

    // }

    const onChange = (event) => {
        setSearchForm({ ...searchForm, [event.target.name]: event.target.value })
    }

    return (


        <div style={{ marginTop: "60px", marginLeft: "130px" }}>
            User Details
            <h4>Name: {localUser.firstname} {localUser.lastname}</h4>
            <h4>Email: {localUser.email}</h4>
            <h4>Phone: {localUser.phone}</h4>

            <div className="row" >
                
                    {
                        orders.map((order, index) => {
                            return (
                                <CardItem order={order} key={index} />
                            )
                        })
                    }
                
            </div>
        </div >)
}
export default OrdersHistory;