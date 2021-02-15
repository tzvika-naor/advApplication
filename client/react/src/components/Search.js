import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import history from '../History'
function Search (props) {

    const location = useLocation();
    console.log(location);
    const searchResults = (data) => {
        props.searchResults(data);
    }
    const [searchBy, setSearchBy] = useState(true)
    const [brands, setBrands] = useState([]);
    const [batteryCapacity, setBatteryCapacity] = useState([]);
    const [display, setDisplay] = useState([])
    const [rearCamera, setRearCamera] = useState([]);
    const [frontCamera, setFrontCamera] = useState([]);
    const [processor, setProcessor] = useState([])
    useEffect((props) => {
        axios.get('http://localhost:5000/api/smartphone')
            .then(response => {
                const data = response.data.unique;
                setBrands(data.brand)
                setBatteryCapacity(data.batteryCapacity)
                setDisplay(data.display)
                //
                setRearCamera(data.rearCamera)
                setFrontCamera(data.frontCamera)
                setProcessor(data.processor)
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
        if(searchBy) {
        axios.post('http://localhost:5000/api/smartphone/searchquery', searchForm)
            .then(response => {
                props.searchResults(response.data.smartphone);
            })
        }
        else {
            axios.post('http://localhost:5000/api/smartphone/searchByProcessor', searchForm)
                .then(response => {
                    props.searchResults(response.data.smartphone);
                })
            }
    }

    useEffect(() => {
        console.log(searchBy)
    }, [searchBy])
    return (

        <div style={{ border: "1px black solid", padding: "100px 40px", marginLeft: "20px" }}>
           
            <div style={{marginBottom:"50px"}}>
            <label htmlFor="">Search By</label>
            <Button type="button" onClick={() => setSearchBy(true)} style={{ marginTop: "10px", marginLeft: "20px" }}>Brand/Battery/Display</Button>
            <Button type="button" onClick={() => setSearchBy(false)} style={{ marginTop: "10px", marginLeft: "20px" }}>Rear Camera/Processor/FrontCamera</Button>
            </div>
            { searchBy ? <div>
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
            </div> :
                <div>
                    <h1 className="my-4" style={{ position: "absolute", top: "20px" }}>Search Product</h1>
                    <div className="row">
                        <div className="col-lg-12">
                            <label>Rear Camera</label>
                            <select
                                name='rearCamera'
                                value={searchForm.rearCamera}
                                onChange={onChange}
                                style={{ width: "100%", marginBottom: "50px" }}
                            >
                                {rearCamera.map((item, i) => <option value={item} key={i} >{item}</option>)}
                            </select>
                        </div>
                        <div className="col-lg-12">
                            <label>Processor</label>
                            <select
                                name='processor'
                                value={searchForm.Processor}
                                onChange={onChange}
                                style={{ width: "100%", marginBottom: "50px" }}
                            >
                                {processor.map((item, i) => <option value={item} key={i} >{item}</option>)}
                            </select>
                        </div>
                        <div className="col-lg-12">
                            <label>FrontCamera</label>
                            <select
                                name='frontCamera'
                                value={searchForm.frontCamera}
                                onChange={onChange}
                                style={{ width: "100%", marginBottom: "50px" }}
                            >
                                {frontCamera.map((item, i) => <option value={item} key={i} >{item}</option>)}
                            </select>
                        </div>
                        <Button type="button" onClick={onClick} style={{ marginTop: "50px", marginLeft: "100px" }}>Submit</Button>
                    </div>
                </div>
            }
        </div>
    )




}
export default Search;