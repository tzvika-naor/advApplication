import Product from './Product'
import Smartphone from './Smartphone'
import { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../History';

const List = (props) => {
    const [products, setproducts] = useState([]);
    const [smartphones, setSmartphones] = useState([]);
    const [smartphoneId, setSmartphoneId] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
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
        setSmartphoneId([...smartphoneId, data.id]);
        setTotalPrice(totalPrice => totalPrice + data.price);
    }
    const goToPayment = () => {
        history.push({
            pathname: 'order',
            id: { smartphoneId },
            price: { totalPrice }

        })
    }
    if (props.activeComponent === 'products') {
        if (!props.showQueryRes) {
            return (
                <div className="row">
                    {
                        products.map((product, index) => {
                            return <Product
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
                    props.searchResults.map((product) => {
                        return <Product
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
                    <div className="row">
                        <div className="col-lg-3 offset-9" style={{ marginBottom: "20px" }} onClick={goToPayment}>
                            <h5>Payment:</h5><img src="/images/credit.jpg" alt="" style={{ width: "20%", cursor: "pointer" }} />
                            {/* <div style={{ border: "2px solid"  , backgroundColor:"rgb(51, 119, 255)" , borderRadius :"10px" ,width:"150px", cursor:"pointer" }}>
                                <h5 style={{ display: "inline" , marginLeft:"15px" }}>Payment  </h5> <GrCreditCard size={40} style={{marginLeft:"10px"}}></GrCreditCard>
                            </div> */}
                        </div>
                    </div>
                    <div className="row">
                        {
                            smartphones.map((smartphone, index) => {
                                return <Smartphone
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
            return (<div className="row">
                {
                    props.searchResults.map((smartphone) => {
                        return <Smartphone
                            smartphone={smartphone}
                        />
                    })
                }
            </div>)
        }
    }
    else {
        return (
            <div><p>Nothing to show...</p></div>
        )
    }
}

export default List