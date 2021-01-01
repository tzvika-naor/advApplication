
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import history from '../History';

function ItemEdit (props) {

    console.log(props)
    const [formData, setFormData] = useState({
        id: props.location.item.id,
        title: props.location.item.title,
        price: props.location.item.price,
        category: props.location.item.category,
        description: props.location.item.description,
        image: props.location.item.image,
    })

    const onSubmit = event => {
        event.preventDefault();
        const isEdit = props.location.isEdit;

        if (isEdit) {
            axios.put(`http://localhost:5000/api/product/${formData.id}`, formData).then((response) => {
                console.log(response);
                history.push('/')
            })
        }
        else {
            axios.post('http://localhost:5000/api/product', formData).then((response) => {
                console.log(response);
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
            description: '',
            image: ''
        })

    }
    const goBack = (event) => {
        const id = props.location.item.id;
        console.log(id)
        history.push('/');
    }


    return (
        <div className="col-md-6">
            <div className="card" id="formCard" style={{ height: '600px', top: 0 }}>
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
                            <label>Category</label>
                            <input
                                className="form-control"
                                name="category"
                                type="text"
                                value={formData.category}
                                onChange={event => change(event)}
                            />
                            {/* <p>{validators.category}</p> */}
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
export default ItemEdit;