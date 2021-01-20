import { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import history from '../History';

const Login = (props) => {
    console.log(props)
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
    const onSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/user/login', formData)
            .then(response => {
                const user = response.data.user;
                if (response.data.user) {
                    alert(`${response.data.user.firstname} ${response.data.user.lastname} is logged in `)
                    props.setIsLoggedIn(true)
                    props.connectedUser(user)
                    history.push('./smartphones')
                }
            })
    }
    return (
        <div>
            <h4 style={{ textAlign: "center" }}>Login</h4>
            <div className="col-md-4 offset-4" style={{ marginBottom: "30px", border: "1px solid", boxShadow: "2px 2px", padding: "10px" }}>
                <div className="card" id="formCard" style={{ height: '300px', top: 0 }}>
                    <div className="card-body">
                        {
                            <form onSubmit={onSubmit}>
                                <br />
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    name="email"
                                    type="text"
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
                                <Button className="btn btn-block" type="submit" id="submit" variant="primary" style={{ marginTop: "80px" }} >Submit</Button>
                            </form>
                        }</div>
                </div>
            </div>
        </div>
    )
}


export default Login;