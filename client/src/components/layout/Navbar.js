import React,{Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <Link to='/dashboard'>
                   <i className="fa fa-tachometer" aria-hidden="true"></i> {' '}
                    Dashboard
                </Link>
            </li>
            <li>
                <Link to='/posts'>
                    <i className="fas fa-books    "></i>{' '}
                    Posts
                </Link>
            </li>
            <li>
                <Link to='/profiles'>
                    <i className='fas fa-user' />{' '}
                    Profile
                </Link>
            </li>
            <li>
                <a onClick={logout} href="#!"><i className="fas fa-sign-out-alt"/>{' '}
            <span className="hide-sm">Logout</span></a>
            </li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li>   <Link to='/dashboard'>
                    <i className="fa fa-tachometer" aria-hidden="true"></i> {' '}
                    Dashboard
                </Link>
            </li>
            <li>
                <Link to='/profiles'>
                    <i className='fas fa-user' />{' '}
                    Profile
                </Link>
            </li>
            <li><Link to='/Register'>
            <i className="fa fa-user-plus" aria-hidden="true"></i>
            {' '} Register</Link>
            </li>
            <li><Link to='/Login'><i className="fa fa-sign-in" aria-hidden="true"></i>{' '}Login</Link></li>
        </ul>
        
    )
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'><i className="fas fa-code"></i> Developer Link</Link>
            </h1>
            {!loading && (<Fragment>{isAuthenticated?authLinks:guestLinks}</Fragment>)}
            
        </nav>
    )
}
Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
const mapStateToProps = state => ({
auth: state.auth
});
  
export default connect(
mapStateToProps,
{ logout }
)(Navbar);
