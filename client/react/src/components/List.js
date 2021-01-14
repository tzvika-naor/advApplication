import Product from './Product'
import Smartphone from './Smartphone'

import { useState, useEffect } from 'react';
import axios from 'axios';
const List = (props) => {
    const [products, setproducts] = useState([]);
    const [smartphones, setSmartphones] = useState([]);

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

    if (props.activeComponent === 'products') {
        if (!props.showQueryRes) {
            return (
                <div className="row">
                    {
                        products.map((product, index) => {
                            return <Product
                                price={product.price}
                                category={product.category}
                                image={product.image}
                                description={product.description}
                                title={product.title}
                                review={product.reviews}
                                id={product.id}
                                key={product.id}
                                index={index}

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
                            price={product.price}
                            category={product.category}
                            image={product.image}
                            description={product.description}
                            title={product.title}
                            review={product.reviews}
                            id={product._id}
                            key={product.id}
                        />
                    })
                }
            </div>)
        }
    }
    else if (props.activeComponent === 'smartphones') {
        if (!props.showQueryRes) {
            return (
                <div className="row">
                    {
                        smartphones.map((smartphone, index) => {
                            return <Smartphone
                                phoneModel={smartphone.phoneModel}
                                brand={smartphone.brand}
                                display={smartphone.display}
                                frontCamera={smartphone.frontCamera}
                                rearCamera={smartphone.rearCamera}
                                processor={smartphone.processor}
                                batteryCapacity={smartphone.batteryCapacity}
                                price={smartphone.price}
                                image={smartphone.image}
                                id={smartphone.id}
                                key={smartphone.id}
                                index={index}
                            // smartphone={smartphones}
                            />
                        })
                    }
                </div>

            )
        }
        else {
            return (<div className="row">
                {
                    props.searchResults.map((smartphone) => {
                        return <Smartphone
                            phoneModel={smartphone.phoneModel}
                            brand={smartphone.brand}
                            display={smartphone.display}
                            frontCamera={smartphone.frontCamera}
                            rearCamera={smartphone.rearCamera}
                            processor={smartphone.rearCamera}
                            batteryCapacity={smartphone.batteryCapacity}
                            price={smartphone.price}
                            image={smartphone.image}
                            id={smartphone.id}
                            key={smartphone.id}
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