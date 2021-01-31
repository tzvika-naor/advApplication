import { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../History';
import Spinner from 'react-bootstrap/Spinner'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import './Login.css';


const Login = (props) => {
    const [loading, setLoading] = useState(false);
    const { errors, register, handleSubmit } = useForm();

    const onSubmit = data => {
        axios.post('http://localhost:5000/api/user/login', data)
            .then(response => {
                const user = response.data.user;
                if (response.data.user) {
                    alert(`${response.data.user.firstname} ${response.data.user.lastname} is logged in `)
                    setLoading(true);
                    props.setIsLoggedIn(true)
                    props.connectedUser(user)
                    setTimeout(() => {
                        history.push('./smartphones')
                    }, 200);
                }
            })
    }

    return (
        <div>
            { loading ? <Spinner animation="border" role="status" size="xl" style={{ marginLeft: "45%", marginTop: "10%", marginBottom: "25%", width: "200px", height: "200px" }} >
                <span className="sr-only">Loading...</span>
            </Spinner > : <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div id="wrapper" className="d-flex justify-content-center" style={{ marginTop: "100px", marginBottom: "645px" }}>
                            <div className="box">
                                <div className="form-group">
                                    <div className="d-flex flex-column mt-5">
                                        <h1 className="align-self-center" style={{ fontWeight: "bold" }}>Login</h1>
                                        <input className="form-control form-control-lg align-self-center w-75 mb-3 mt-2"
                                            type="text"
                                            placeholder="Email"
                                            name="email"
                                            ref={register({ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                                        />
                                        <div className="validations-error">
                                            {errors.email && errors.email.type === "required" && (<h5>Email is required</h5>)}
                                            {errors.email && errors.email.type === "pattern" && (<h5>Must be Type of an Email</h5>)}
                                        </div>
                                        <input className="form-control form-control-lg align-self-center w-75 mb-3 mt-2"
                                            type="text"
                                            placeholder="Password"
                                            name="password"
                                            ref={register({ required: true, minLength: 4 })}
                                        />
                                        <div className="validations-error">
                                            {errors.password && errors.password.type === "required" && (<h5>Password is required</h5>)}
                                            {errors.password && errors.password.type === "minLength" && (<h5>Min Lenght of 4</h5>)}
                                        </div>
                                        <input className="login align-self-center mt-5" type="submit" value="Login" />
                                        <Link to="signup" className="link align-self-center">Forgot password?</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>}
        </div >
    )
}


export default Login;