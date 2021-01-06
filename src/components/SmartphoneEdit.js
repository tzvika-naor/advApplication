
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import history from '../History';

function SmartphoneEdit (props) {
    console.log(props)
    const [categories, setCategories] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/smartphone').then((response) => {
            console.log(props);
            console.log(response);
        });
    }, [])
    console.log(props)
    const [formData, setFormData] = useState({
        model: props.location.smartphone.model,
        brand: props.location.smartphone.brand,
        display: props.location.smartphone.display,
        frontCamera: props.location.smartphone.frontCamera,
        rearCamera: props.location.smartphone.rearCamera,
        processor: props.location.smartphone.processor,
        batteryCapacity: props.location.smartphone.batteryCapacity,
        price: props.location.smartphone.price,
        image: props.location.smartphone.image,
        id: props.location.smartphone.id
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
            model: '',
            brand: '',
            display: '',
            frontCamera: '',
            rearCamera: '',
            processor: '',
            batteryCapacity: '',
            price: '',
            image: ''
        })

    }
    const goBack = (event) => {
        const id = props.location.product.id;
        console.log(id)
        // history.push('/smartphone');
    }

    return (
        <div>
            <Button type="button" id="edit" variant="success" style={{ marginRight: '10px', marginLeft: "30px" }} onClick={(event) => resetForm(event)}>Edit</Button>
            <Button type="button" id="add" variant="primary" style={{ marginRight: '10px' }} onClick={(event) => resetForm(event)}>Add</Button>
            <Button type="button" id="delete" variant="danger" style={{ marginRight: '10px' }} onClick={(event) => resetForm(event)}>Delete</Button>

            <div className="col-md-6" style={{ marginTop: "20px" }}>
                <div className="card" id="formCard" >
                    <div className="card-body">
                        {
                            <form onSubmit={onSubmit}>
                                <label>Model</label>
                                <input
                                    className="form-control"
                                    name="model"
                                    type="text"
                                    value={formData.model}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Brand</label>
                                <input
                                    className="form-control"
                                    name="brand"
                                    type="text"
                                    value={formData.brand}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Display</label>
                                <input
                                    className="form-control"
                                    name="display"
                                    type="text"
                                    value={formData.display}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Front Camera</label>
                                <input
                                    className="form-control"
                                    name="frontCamera"
                                    type="text"
                                    value={formData.frontCamera}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Rear Camera</label>
                                <input
                                    className="form-control"
                                    name="rearCamera"
                                    type="text"
                                    value={formData.rearCamera}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Processor</label>
                                <input
                                    className="form-control"
                                    name='processor'
                                    value={formData.processor}
                                    onChange={event => change(event)} />
                                <br />
                                <label>Battery Capacity</label>
                                <input
                                    className="form-control"
                                    name='batteryCapacity'
                                    value={formData.batteryCapacity}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Price</label>
                                <input
                                    className="form-control"
                                    name="price"
                                    type="text"
                                    value={formData.price}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Image</label>
                                <input
                                    className="form-control"
                                    name="image"
                                    type="text"
                                    value={formData.image}
                                    onChange={event => change(event)}
                                />
                                <img id="card-img-top" src={formData.image} alt={formData.title} style={{ width: '100px', height: '150px', marginTop: '20px', marginLeft: "40px" }} />
                                <Button type="button" id="goBack" variant="primary" style={{ position: 'absolute', bottom: '0', left: '0' }} onClick={(event) => goBack(event)}>Back</Button>
                                <Button type="submit" id="submit" variant="primary" style={{ position: 'absolute', bottom: '0', right: '0' }}>Submit</Button>
                                <Button type="button" id="reset" variant="danger" style={{ position: 'absolute', bottom: '0', right: '0', marginRight: '60px' }} onClick={(event) => resetForm(event)}>Clear</Button>
                            </form>
                        }
                    </div>
                </div>
            </div >
        </div>
    )
}
export default SmartphoneEdit;