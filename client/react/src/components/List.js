import Smartphone from './Smartphone'
import { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../History';
import Payment from './Payment'
const List = (props) => {

    const isAdmin = useState(props.connectedUser.isAdmin);
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
    const addToOrder = (data) => {
        console.log(data);
        const newData = {
            id: data.id,
            qnt: 1
        }
        const itemIndex = smartphonesIds.findIndex(item => item.id === data.id);
        var newSmartIds = smartphonesIds.filter(item => item.id !== data.id);

        if (itemIndex > -1) {
            // the item is already in the cart no need to add into setSmartphonesInCart
            var newItem = smartphonesIds[itemIndex]
            newItem.qnt += 1;
            newSmartIds.push(newItem)
            setSmartphonesIds(newSmartIds)
        }
        else {
            setSmartphonesInCart([...smartphonesInCart, data]);
            setSmartphonesIds([...smartphonesIds, newData])
        }
        setTotalPrice(totalPrice => totalPrice + data.price);
    }
    const goToPayment = () => {
        const user = props.connectedUser;
        if (smartphonesIds.length === 0)
            alert('your cart is empty')
        else {
            history.push('order');
            const itemsDetails = {
                smartphonesInCart: smartphonesInCart,
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
                                    addToOrder={(data) => addToOrder(data)}
                                    isAdmin={isAdmin}
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
                                    addToOrder={(data) => addToOrder(data)}
                                    isAdmin={isAdmin}
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
