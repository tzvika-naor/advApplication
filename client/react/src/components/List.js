import Smartphone from './Smartphone'
import { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../History';
import Payment from './Payment';

const List = (props) => {

    const isAdmin = useState(props.connectedUser.isAdmin);
    const [smartphones, setSmartphones] = useState([]);
    const [smartphonesInCart, setSmartphonesInCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    let localCart = localStorage.getItem("smartphonesInCart");


    const addToCart = (smartphone) => {
        let smartphonesInCartCopy = [...smartphonesInCart];
            
        let itemToAdd = smartphonesInCartCopy.find(item => item.id === smartphone.id);

        if (itemToAdd) { // the item is already in the cart no need to add into setSmartphonesInCart
            itemToAdd.quantity += 1;
        }
        else { //The item is not in the cart yet
            smartphonesInCartCopy = [...smartphonesInCartCopy, { phoneModel: smartphone.phoneModel, price: smartphone.price, id: smartphone.id, image: smartphone.image, quantity: 1 }]
        }

        setSmartphonesInCart(smartphonesInCartCopy);

        setTotalPrice(totalPrice => totalPrice + smartphone.price);

        //make cart a string and store in local space
        let stringCart = JSON.stringify(smartphonesInCartCopy);
        localStorage.setItem("smartphonesInCart", stringCart);
    }

    //this is called on component mount
    useEffect(() => {
        //turn it into js
        localCart = JSON.parse(localCart);
        //load persisted cart into state if it exists
        if (localCart) 
        setSmartphonesInCart(localCart)
    }, []) //the empty array ensures useEffect only runs once




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


    const goToPayment = () => {
        if (!props.isLoggedIn) {
            alert(`Please login before checkout`);
        }
        else {
            const user = props.connectedUser;
            if (smartphonesInCart.length === 0)
                alert('your cart is empty')
            else {
                history.push('order');
                const itemsDetails = {
                    smartphonesInCart: smartphonesInCart,
                    totalPrice: totalPrice,
                    user: user
                }
                props.setItems(itemsDetails)
            }
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
                                addToCart={(data) => addToCart(data)}
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
                                addToCart={(data) => addToCart(data)}
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