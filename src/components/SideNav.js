import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function SideNav (props) {
    const priceFilter = ['low to high', 'high to low']
    const [items, setItems] = useState([]); //all item
    const [categories, setCategories] = useState([])// all categories
    const [selected, setCSelected] = useState('') // the selected category
    // const [optionState,setOptionState] = useState('')  
    useEffect(() => {

        axios.get('http://localhost:5000/api/product')
            .then(response => {
                const data = response.data.products;
                console.log(data)
                setCategories(response.data.category);
                let obj = data.map(item => {
                    item.id = item._id
                    delete item._id
                    return item;
                })
                setItems(obj);

            })
    }, []);
    const selectCategory = (event) => {
        setCSelected(event.target.value);
        props.data(event.target.value);
    }
    const priceHighToLow = (event) => {
        setCSelected(event.target.value);

    }

    const func = () => {

    }
    return (
        <div>
            <h1 className="my-4">Search</h1>
            <div className="row">
                <div className="col-lg-12">
                    <input type="text" placeholder="item name" onChange={(event => func(event))} />
                </div>
                <div className="col-lg-12">
                    <select
                        value={selected}
                        onChange={selectCategory}
                        style={{ width: "80%", marginTop: "40px" }}
                    >
                        {categories.map((item, i) => <option value={item} key={i} >{item}</option>)}
                    </select>
                </div>
                <div className="col-lg-12">

                    <select
                        value={selected}
                        onChange={priceHighToLow}
                        style={{ width: "80%", marginTop: "40px" }}
                    >
                        {priceFilter.map((item, i) => <option value={item} key={i} >{item}</option>)}
                    </select>
                </div>
            </div>
        </div >
    )
}

export default SideNav;