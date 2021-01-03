import Item from './Item'
import { useState, useEffect } from 'react';
import axios from 'axios';
const List = (props) => {
    console.log(props)

    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/product')
            .then(response => {
                const data = response.data.products;
                console.log(data)
                setItems(data);
                let obj = data.map(item => {
                    item.id = item._id
                    delete item._id
                    return item;
                })
            })
    }, []);

    return (

        <div className="row">
            {
                items.map((item) => {
                    return <Item
                        price={item.price}
                        category={item.category}
                        image={item.image}
                        description={item.description}
                        title={item.title}
                        id={item.id}
                        key={item.id}
                    />
                })
            }
        </div>
    )
}
export default List