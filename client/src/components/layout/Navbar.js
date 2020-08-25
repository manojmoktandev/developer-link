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
                    <i className='fas user-circle' />{' '}
                    Dashboard
                </Link>
            </li>
            <li>
                <Link to='/posts'>
                    <i className='fas fa-user' />{' '}
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
                    <i className='fas fa-tachometer' />{' '}
                    Dashboard
                </Link>
            </li>
            <li>
                <Link to='/profiles'>
                    <i className='fas fa-user' />{' '}
                    Profile
                </Link>
            </li>
            <li><Link to='/Register'>Register</Link>
            </li>
            <li><Link to='/Login'>Login</Link></li>
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
