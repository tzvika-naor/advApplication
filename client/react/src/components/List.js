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
    //const [smartphonesIds, setSmartphonesIds] = useState([])

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
        // console.log(data);
        // const newData = {
        //     id: data.id,
        //     quantity: 1
        // }
        //const itemIndex = smartphonesInCart.findIndex(item => item.id === data.id);
        const itemToAdd = smartphonesInCart.find(item => item.id === data.id);
        //var newSmartIds = smartphonesIds.filter(item => item.id !== data.id);

        if (itemToAdd) { // the item is already in the cart no need to add into setSmartphonesInCart
            
            // var newItem = smartphonesIds[itemIndex]
            // newItem.quantity += 1;
            // newSmartIds.push(newItem)
            // setSmartphonesIds(newSmartIds)
            itemToAdd.quantity +=1;
        }
        else { //The item is not in the cart yet
            setSmartphonesInCart([...smartphonesInCart, {phoneModel: data.phoneModel, price: data.price, id: data.id, image: data.image, quantity: 1 }]);
            //setSmartphonesIds([...smartphonesIds, newData])
        }
        setTotalPrice(totalPrice => totalPrice + data.price);
    }

    const goToPayment = () => {
        const user = props.connectedUser;
        if (smartphonesInCart.length === 0)
            alert('your cart is empty')
        else {
            history.push('order');
            const itemsDetails = {
                smartphonesInCart: smartphonesInCart,
                //smartphonesIds: smartphonesIds,
                totalPrice: totalPrice,
                user: user
            }
            props.setItems(itemsDetails)
        }
    }

    if (!props.showResults) {
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
    //has a bug needs to lift up state in order to work!!! would make the code much messi 
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

export default List
