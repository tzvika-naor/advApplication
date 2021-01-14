import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
function SearchSmartPhone (props) {

    const [brands, setBrands] = useState([]);
    const [batteryCapacity, setBatteryCapacity] = useState([]);
    const [display, setDisplay] = useState([])
    // const [phoneModel, setModel] = useState([]);
    // const [frontCamera, setFronCamera] = useState([])
    // const [rearCamera, setRearCamera] = useState([])
    // const [processor, setProcessor] = useState([]);
    useEffect((props) => {

        axios.get('http://localhost:5000/api/smartphone')
            .then(response => {
                const data = response.data.unique;
                setBrands(data.brand)
                setBatteryCapacity(data.batteryCapacity)
                setDisplay(data.display)
                // setModel(data.phoneModel)
                // setFronCamera(data.frontCamera)
                // setRearCamera(data.rearCamera)
                // setProcessor(data.processor)
            })
    }, []);

    const [searchForm, setSearchForm] = useState({
        batteryCapacity: '',
        brand: '',
        display: '',
        frontCamera: '',
        image: '',
        phoneModel: '',
        price: 0,
        processor: '',
        rearCamera: ''
    })

    const onChange = (event) => {
        setSearchForm({ ...searchForm, [event.target.name]: event.target.value })
    }

    const onClick = () => {
        axios.post('http://localhost:5000/api/smartphone/searchquery', searchForm)
            .then(response => {
                // console.log(response.data.smartphone)
                props.searchResults(response.data.smartphone);
            })
    }

    return (
        <div style={{ border: "1px black solid", padding: "150px 40px", marginLeft: "20px" }}>
            <h1 className="my-4" style={{ position: "absolute", top: "20px" }}>Search Product</h1>
            <div className="row">
                <div className="col-lg-12">
                    <label>Brand</label>
                    <select
                        name='brand'
                        value={searchForm.brand}
                        onChange={onChange}
                        style={{ width: "100%", marginBottom: "50px" }}
                    >
                        {brands.map((item, i) => <option value={item} key={i} >{item}</option>)}
                    </select>
                </div>
                <div className="col-lg-12">
                    <label>Battery Capacity</label>
                    <select
                        name='batteryCapacity'
                        value={searchForm.batteryCapacity}
                        onChange={onChange}
                        style={{ width: "100%", marginBottom: "50px" }}
                        >
                        {batteryCapacity.map((item, i) => <option value={item} key={i} >{item}</option>)}
                    </select>
                </div>
                <div className="col-lg-12">
                    <label>Display</label>
                    <select
                        name='display'
                        value={searchForm.display}
                        onChange={onChange}
                        style={{ width: "100%", marginBottom: "50px" }}
                        >
                        {display.map((item, i) => <option value={item} key={i} >{item}</option>)}
                    </select>
                </div>
                <Button type="button" onClick={onClick} style={{ marginTop: "50px", marginLeft: "100px" }}>Submit</Button>
            </div>
        </div >
    )
    
}

export default SearchSmartPhone;