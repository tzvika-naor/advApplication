
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import history from '../History';

function ProductEdit (props) {

    const [categories, setCategories] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/product/category').then((response) => {
            setCategories(response.data.category);
        });
        axios.get('http://localhost:5000/api/product/reviews').then((response) => {
            setReviews(response.data.reviews);
        })
    }, [])
    const [formData, setFormData] = useState({
        id: props.location.product.id,
        title: props.location.product.title,
        price: props.location.product.price,
        review: props.location.product.review,
        category: props.location.product.category,
        description: props.location.product.description,
        image: props.location.product.image,
    })

    const onSubmit = event => {
        event.preventDefault();
        const isEdit = props.location.isEdit;

        if (isEdit) {
            axios.put(`http://localhost:5000/api/product/${formData.id}`, formData).then((response) => {
                history.push('/')
            })
        }
        else {
            axios.post('http://localhost:5000/api/product', formData).then((response) => {
                history.push('/');
            })

        }
    }
    const change = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    const resetForm = (event) => {
        setFormData({
            id: '',
            title: '',
            price: '',
            category: '',
            review: '',
            description: '',
            image: ''
        })
    }
    const goBack = (event) => {
        history.push('/');
    }

    return (
        <div className="col-md-6">
            <div className="card" id="formCard" style={{ height: '700px', top: 0 }}>
                <div className="card-body">
                    {
                        <form onSubmit={onSubmit}>
                            <label>Title</label>
                            <input
                                className="form-control"
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={event => change(event)}
                            />
                            {/* <p>{validators.title}</p> */}
                            <br />
                            <label>Price</label>
                            <input
                                className="form-control"
                                name="price"
                                type="text"
                                value={formData.price}
                                onChange={event => change(event)}
                            />
                            {/* <p>{validators.price}</p> */}
                            <br />
                            <div>
                                <label>Choose a flavor:</label>
                                <input  className="form-control" name={formData.category} list={formData.category} onChange={event => change(event)}/>
                                <datalist id={formData.category} >
                                    {categories.map((item, i) => <option value={item} key={i} >{item}</option>)}
                                    </datalist>
                            </div>
                            <br />
                            <label>Category</label>
                            <select
                                className="form-control"
                                name='category'
                                value={formData.category}
                                onChange={event => change(event)}
                            >
                                {categories.map((item, i) => <option value={item} key={i} >{item}</option>)}
                            </select>
                            <br />
                            <label>Reviews</label>
                            <select
                                className="form-control"
                                name='review'
                                value={formData.review}
                                onChange={event => change(event)}
                            >
                                {reviews.map((item, i) => <option value={item} key={i} >{item}</option>)}
                            </select>
                            <br />
                            <label>Description</label>
                            <textarea
                                rows="6"
                                className="form-control"
                                name="description"
                                type="text"
                                value={formData.description}
                                onChange={event => change(event)}
                            />
                            {/* <p>{validators.description}</p> */}
                            <br />
                            <label>imageUrl</label>
                            <input
                                className="form-control"
                                name="image"
                                type="text"
                                value={formData.image}
                                onChange={event => change(event)}
                            />
                            <img id="card-img-top" src={formData.image} alt={formData.title} style={{ width: '100px', height: '100px', marginTop: '20px' }} />

                            {/* <p>{validators.image}</p> */}
                            <Button type="button" id="goBack" variant="primary" style={{ position: 'absolute', bottom: '0', left: '0' }} onClick={(event) => goBack(event)}>Back</Button>
                            <Button type="submit" id="submit" variant="primary" style={{ position: 'absolute', bottom: '0', right: '0' }}>Submit</Button>
                            <Button type="button" id="reset" variant="danger" style={{ position: 'absolute', bottom: '0', right: '0', marginRight: '80px' }} onClick={(event) => resetForm(event)}>Clear</Button>
                        </form>
                    }</div>
            </div>
        </div>
    )
}
export default ProductEdit;