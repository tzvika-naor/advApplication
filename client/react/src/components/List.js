import Product from './Product'
import Smartphone from './Smartphone'
import { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../History';
import Payment from './Payment'

const List = (props) => {

    const [products, setproducts] = useState([]);
    const [smartphones, setSmartphones] = useState([]);
    const [smartphoneBuy, setSmartphoneBuy] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [smartphoneId, setSmartphoneId] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/api/product')
            .then(response => {
                const data = response.data.products;
                let obj = data.map(product => {
                    product.id = product._id
                    delete product._id
                    return product;
                })
                setproducts(obj);
            })
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
        console.log(data)
        setSmartphoneBuy([...smartphoneBuy, data]);
        setSmartphoneId([...smartphoneId, data.id]);
        setTotalPrice(totalPrice => totalPrice + data.price);
    }
    const goToPayment = () => {
        // console.log(props.history.location)
         const user = props.user.history.location.user.user;
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
    if (props.activeComponent === 'products') {
        if (!props.showQueryRes) {
            return (
                <div className="row">
                    {
                        products.map((product, index) => {
                            return <Product
                                key={index}
                                product={product}
                            />
                        })
                    }
                </div>
            )
        }
        else {
            return (<div className="row">
                {
                    props.searchResults.map((product, index) => {
                        return <Product
                            key={index}
                            product={product}
                        />
                    })
                }
            </div>)
        }
    }

    else if (props.activeComponent === 'smartphones') {
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




{/* <div style={{ border: "2px solid"  , backgroundColor:"rgb(51, 119, 255)" , borderRadius :"10px" ,width:"150px", cursor:"pointer" }}>
<h5 style={{ display: "inline" , marginLeft:"15px" }}>Payment  </h5> <GrCreditCard size={40} style={{marginLeft:"10px"}}></GrCreditCard>
</div> */}