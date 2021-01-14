import { Link } from 'react-router-dom';
function Header (props) {


    function click () {
        props.resetSearch(true)
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <Link to='/' className="navbar-brand" onClick={click}>Start Bootstrap</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to='/products' onClick={click} className="nav-link">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/smartphones' onClick={click} className="nav-link">Smartphones</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to='/register' className="nav-link">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/login' className="nav-link">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Header;