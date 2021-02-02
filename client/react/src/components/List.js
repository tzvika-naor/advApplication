import Smartphone from './Smartphone'
import { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../History';
import Payment from './Payment'
import { json } from 'body-parser';

const List = (props) => {

    const [smartphones, setSmartphones] = useState([]);
    const [smartphonesInCart, setSmartphonesInCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    //const [smartphonesId, setSmartphonesId] = useState([]);
    //var [itemCount, setCount] = useState(0); //Counter fo each smartphone added to order

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

    //Smartphone added to order
    const getId = (data) => {
        var result1 = smartphonesInCart.find(el => el.id === data.id) //Check if the item is already added to cart
        //var result2 = smartphonesId.find(el => el.id === data.id) //Check if the item is already added to order array too
        console.log("RESULT:" , result1);
        
        if(!result1){ //The item not added to cart yet
        setSmartphonesInCart([...smartphonesInCart, {phoneModel: data.phoneModel, price: data.price, id: data.id, image: data.image, itemCount: data.itemCount }]);
        //setSmartphonesId([...smartphonesId, {id: data.id, itemCount: data.itemCount}]);
        }
        else //The item added to cart, update the count
        {
            result1.itemCount++;
            //result2.itemCount++;
        }
        //console.log(smartphonesId);
        setTotalPrice(totalPrice => totalPrice + data.price);
        //setTotalPrice(totalPrice => totalPrice + (data.price * data.itemCount));
    }
    const goToPayment = () => {
        const user = props.connectedUser;
         if (smartphonesInCart.length === 0)
            alert('your cart is empty')
        else {
           
            history.push({
                pathname: 'order',
                smartphonesInCart: { smartphonesInCart },
                totalPrice: { totalPrice },
                //smartphonesId: { smartphonesId },
                user: user
            })
            
        }

    }
    if (props.activeComponent === 'smartphones') {
        if (!props.showQueryRes) { //Else is the same
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
