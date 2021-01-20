import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
function SearchProduct (props) {
    const location = useLocation();
    const priceRange = ['', '0+', '20+', '50+', '100+', '200+', '500+'];
    const priceOrder = ['', 'high to low ↓', 'low to high ↑'];
    const reviews = ['', '+1', '+2', '+3', '+4', '+5'];

    const [categories, setCategories] = useState([])// all categories
    const [brands, setBrands] = useState([]);
    useEffect((props) => {
        axios.get('http://localhost:5000/api/product')
            .then(response => {
                const categories = response.data.category;
                categories.unshift('');
                setCategories(categories);
            });
    }, []);
    const [searchForm, setSearchForm] = useState({
        reviews: '',
        category: '',
        minPrice: '',
        priceOrder: '',
        orderBy: ''
    })
    const onChange = (event) => {
        setSearchForm({ ...searchForm, [event.target.name]: event.target.value })
    }
    const onClick = () => {
        if (searchForm.priceOrder === 'high to low ↓')
            setSearchForm({ ...searchForm, orderBy: 1 })
        else
            setSearchForm({ ...searchForm, orderBy: -1 })
        axios.post('http://localhost:5000/api/product/searchquery', searchForm)
            .then(response => {
                props.searchResults(response.data.products);
            })
    }
    return (
        <div style={{ border: "1px black solid", padding: "150px 40px", marginLeft: "20px" }}>
            <h1 className="my-4" style={{ position: "absolute", top: "20px" }}>Search Product</h1>
            <div className="row">
                <div className="col-lg-12">
                    <label>Category</label>
                    <select
                        name='category'
                        value={searchForm.category}
                        onChange={onChange}
                        style={{ width: "100%", marginBottom: "50px" }}
                    >
                        {categories.map((item, i) => <option value={item} key={i} >{item}</option>)}
                    </select>
                </div>
                <div className="col-lg-12">
                    <label>Price</label>
                    <select
                        name='minPrice'
                        value={searchForm.minPrice}
                        onChange={onChange}
                        style={{ width: "100%", marginBottom: "50px" }}
                    >
                        {priceRange.map((item, i) => <option value={item} key={i} >{item}</option>)}
                    </select>
                </div>
                <div className="col-lg-12">
                    <label>Minimum Reviews</label>
                    <select
                        name='reviews'
                        value={searchForm.reviews}
                        onChange={onChange}
                        style={{ width: "100%", marginBottom: "50px" }}
                    >
                        {reviews.map((item, i) => <option value={item} key={i} >{item}</option>)}
                    </select>
                </div>
                <div className="col-lg-12">
                    <label>Price Order</label>
                    <select
                        name='priceOrder'
                        value={searchForm.priceOrder}
                        onChange={onChange}
                        style={{ width: "100%", marginBottom: "50px" }}
                    >
                        {priceOrder.map((item, i) => <option value={item} key={i} >{item}</option>)}
                    </select>
                </div>
                <Button type="button" onClick={onClick} style={{ marginTop: "50px", marginLeft: "100px" }}>Submit</Button>
            </div>
        </div >
    )

}

export default SearchProduct;