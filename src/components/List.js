import Product from './Product'
import { useState, useEffect } from 'react';
import axios from 'axios';
const List = (props) => {
    const [products, setproducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/product')
            .then(response => {
                const data = response.data.products;
                // console.log(data)

                let obj = data.map(product => {
                    product.id = product._id
                    delete product._id
                    return product;
                })
                setproducts(obj);
            })
    }, []);

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
                        reviews={product.reviews}
                        id={product.id}
                        key={product.id}
                    />
                })
            }
        </div>
    )
}
export default List