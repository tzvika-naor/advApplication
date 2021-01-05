import Product from './Product'
import { useState, useEffect } from 'react';
import axios from 'axios';
const List = (props) => {
    console.log(props.searchResults)
    const [products, setproducts] = useState([]);

    useEffect(() => {
    
            axios.get('http://localhost:5000/api/product')
                .then(response => {
                    const data = response.data.products;

                    let obj = data.map(product => {
                        product.id = product._id
                        delete product._id
                        return product;
                    })
                    // var reviewArr = []
                    setproducts(data);
                    // setReviewArr(reviewArr = obj.map(el => {
                    //     return el.reviews;
                    // }))
                })
        // }
    }, []);

    if (!props.showQueryRes) {
        return (
            <div className="row">
                {
                    products.map((product) => {
                        return <Product
                            price={product.price}
                            category={product.category}
                            image={product.image}
                            description={product.description}
                            title={product.title}
                            review={product.reviews}
                            id={product.id}
                            key={product.id}
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

export default List