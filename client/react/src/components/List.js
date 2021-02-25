import Smartphone from './Smartphone'
import { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../History';

const List = (props) => {

    const [smartphones, setSmartphones] = useState([]);
    const [smartphonesInCart, setSmartphonesInCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);

    const addToCart = (smartphone) => {
            console.log(smartphone)
        // let smartphonesInCartCopy = [...smartphonesInCart];

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
       
        //lifting up the items that are in the cart. the user will be able to access it from the shopping-cart-icons 
        props.setItems(smartphone); 
        props.setTotalPrice(totalPrice)

    }
  

    useEffect(() => {
        console.log(smartphonesInCart)
    },[smartphonesInCart])


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

    if (!props.showResults) {
        return (

            <div className="row" style={{ width: "98%", marginLeft: "1%", marginTop: "2%", marginBottom: "2%" }}>
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
        )
    }
    //has a bug needs to lift up state in order to work!!! would make the code much messi 
    else {
        return (

            <div className="row" style={{ width: "98%", marginLeft: "1%" }}>
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
        )
    }
}

export default List