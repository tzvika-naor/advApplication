import Smartphone from './Smartphone'
import { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../History';
import Payment from './Payment'

const List = (props) => {

    const [smartphones, setSmartphones] = useState([]);
    const [smartphoneBuy, setSmartphoneBuy] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [smartphoneId, setSmartphoneId] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/api/smartphone')
            .then(response => {
                const data = response.data.smartphones;
                let obj = data.map(smartphone => {
                    smartphone.id = smartphone._id
                    delete smartphone._id
                    return smartphone;
                })
                setSmartphones(obj);
            })
        // }
    }, []);

    const getId = (data) => {
        setSmartphoneBuy([...smartphoneBuy, data]);
        setSmartphoneId([...smartphoneId, data.id]);
        setTotalPrice(totalPrice => totalPrice + data.price);
    }
    const goToPayment = () => {
        const user =props.connectedUser;
         if (smartphoneBuy.length === 0)
            alert('your cart is empty')
        else {
            history.push({
                pathname: 'order',
                smartphoneBuy: { smartphoneBuy },
                totalPrice: { totalPrice },
                smartphoneId: { smartphoneId },
                user: user
            })
        }

    }
    if (props.activeComponent === 'smartphones') {
        if (!props.showQueryRes) {
            return (
                <div>
                    <Payment goToPayment={goToPayment} />
                    <div className="row">
                        {
                            smartphones.map((smartphone, index) => {
                                return <Smartphone
                                    key={index}
                                    smartphone={smartphone}
                                    getId={(data) => getId(data)}
                                />
                            })
                        }
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Payment goToPayment={goToPayment} />
                    <div className="row">
                        {
                            props.searchResults.map((smartphone, index) => {
                                return <Smartphone
                                    key={index}
                                    smartphone={smartphone}
                                    getId={(data) => getId(data)}
                                />
                            })
                        }
                    </div>
                </div>
            )
        }
    }
    else {
        return (
            <div><p>Nothing to show...</p></div>
        )
    }
}
export default List
