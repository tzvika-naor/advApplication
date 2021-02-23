import Smartphone from './Smartphone'
import { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../History';
import Payment from './Payment';

const List = (props) => {

    const [smartphones, setSmartphones] = useState([]);
    const [smartphonesInCart, setSmartphonesInCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);

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
        localStorage.setItem("cart", JSON.stringify(smartphonesInCartCopy));
        //lifting up the items that are in the cart. the user will be able to access it from the shopping-cart-icons
        // props.
    }

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('user'))) {
            history.push('/')
        }
        let cart = JSON.parse(localStorage.getItem('cart'))
        let totalPrice = JSON.parse(localStorage.getItem('totalPrice'))
        if (cart && totalPrice) {
            setSmartphonesInCart(cart)
            setTotalPrice(totalPrice)
        }


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

        if (smartphonesInCart.length === 0)
            alert('your cart is empty')
        else {
            history.push('order');
            const itemsDetails = {
                smartphonesInCart: smartphonesInCart,
                totalPrice: totalPrice,
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
                                addToCart={(data) => addToCart(data)}
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
                            />
                        })
                    }
                </div>
            </div>
        )
    }
}

export default List