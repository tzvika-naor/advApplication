import { useState } from "react";
import { Button } from 'react-bootstrap';
import history from '../History';
import axios from 'axios';
function Register () {


    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        password: '',
        email: '',
        phone: ''
    })
    const change = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    const goBack = () => {
        history.push('/')
    }

    const onSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/user/signup', formData)
            .then(response => { 
                // history.push('/')
            })
    }
    return (
        <div>
            <h4 style={{ textAlign: "center" }}>Create New User</h4>
            <div className="col-md-4 offset-4" style={{ marginBottom: "30px", border: "1px solid", boxShadow: "2px 2px", padding: "10px" }}>
                <div className="card" id="formCard" style={{ height: '500px', top: 0 }}>
                    <div className="card-body">
                        {
                            <form onSubmit={onSubmit}>
                                <label>First Name</label>
                                <input
                                    className="form-control"
                                    name="firstname"
                                    type="text"
                                    value={formData.firstname}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Last Name</label>
                                <input
                                    className="form-control"
                                    name="lastname"
                                    type="text"
                                    value={formData.lastname}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Password</label>
                                <input
                                    className="form-control"
                                    name="password"
                                    type="text"
                                    value={formData.password}
                                    onChange={event => change(event)}
                                />
                                <br />
                                <label>Phone</label>
                                <input
                                    className="form-control"
                                    name="phone"
                                    type="text"
                                    value={formData.phone}
                                    onChange={event => change(event)}
                                />
                                <Button className="btn btn-block" type="submit" id="submit" variant="primary" style={{ marginTop: "80px" }}>Submit</Button>
                                <Button className="btn btn-block" type="button" id="cancle" variant="danger" style={{}} onClick={(event) => goBack(event)}>Cancle</Button>
                            </form>
                        }</div>
                </div>
            </div>
        </div>
    )
}
export default Register;