import Smartphone from './Smartphone'
import { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../History';
import Payment from './Payment'
const List = (props) => {

    const [smartphones, setSmartphones] = useState([]);
    const [smartphonesInCart, setSmartphonesInCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [smartphonesIds, setSmartphonesIds] = useState([])
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
    }, []);
    const getId = (data) => {
        // setSmartphonesInCart([...smartphonesInCart, data]);
        setSmartphonesIds([...smartphonesIds, data.id])
        setTotalPrice(totalPrice => totalPrice + data.price);
    }
    const goToPayment = () => {
        const user = props.connectedUser;
        if (smartphonesIds.length === 0)
            alert('your cart is empty')
        else {
            history.push('order');
            const itemsDetails = {
                // smartphonesInCart: smartphonesInCart,
                smartphonesIds: smartphonesIds,
                totalPrice: totalPrice,
                user: user
            }
            props.setItems(itemsDetails)
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
