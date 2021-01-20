import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
function Header (props) {
    console.log(props)
    const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn)
    function click () {
        props.resetSearch(true)
    }
    useEffect(() => {
    setIsLoggedIn(props.isLoggedIn)
    }, [props])
    
    const onLogout = (e) => {
        props.setIsLoggedIn(false)
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" >
            <div className="container">
                <Link to='/' className="navbar-brand" onClick={click}>Start Bootstrap</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    {
                    isLoggedIn ?
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to='/smartphones' onClick={click} className="nav-link">Smartphones</Link>
                            </li>
                        </ul> : <div></div>
                    }
                    {
                    !isLoggedIn ? <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to='/register' className="nav-link">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/login' className="nav-link">Login</Link>
                        </li></ul>
                        : <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to='/' className="nav-link" onClick={onLogout}>Logout</Link>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    )
}
export default Header;