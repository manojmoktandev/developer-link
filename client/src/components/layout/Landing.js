import React,{useEffect,Fragment} from 'react';
import { Link,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AnimatedNumber from 'animated-number-react';
import PropTypes from 'prop-types';
import { loadDashboard } from '../../actions/auth';

const Landing = ({ isAuthenticated, dashboardCount:{dev,post}, loadDashboard}) => {
  useEffect(() => {
    loadDashboard()
  }, [loadDashboard]);
  
  const formatValue = (value) => value.toFixed(0);
 
  if (isAuthenticated) {
    return <Redirect to='/Dashboard'/>
  }
    return (
      <Fragment>
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Developer Link</h1>
            <p className="lead">
              Create a developer profile/portfolio, share posts and get help from
              other developers
            </p>
            <div className="buttons">
              <Link to='/register' className="btn btn-primary"> <i className="fa fa-user-plus" aria-hidden="true"></i>  Sign Up</Link>
              <Link to='/login' className="btn btn-light"> <i className="fa fa-sign-in" aria-hidden="true"></i> Login</Link>
            </div>
              <div className="card-wrapper">
                <div className="card">
                  <span className="card-title">Developers</span > 
                  &nbsp;&nbsp;
                  <span className="card-val"> <AnimatedNumber
                  value={dev}
                  duration ="2000"
                    delay="3"
                    formatValue={formatValue}
                /></span>
                </div>
                <div className="card-post">
                  <span className="card-title">Posts</span> 
                  &nbsp;&nbsp;
                  <span className="card-val">
                    <AnimatedNumber
                      value={post}
                      duration ="2000"
                      delay="3"
                      formatValue={formatValue}
                    />
                  </span>
                 
              </div>
                
            </div>
             
          </div>
        </div>
        </section>
        </Fragment>
    )
}
Landing.propTypes = {
  loadDashboard: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  dashboardCount:state.auth.dashboardCount,
});
export default connect(mapStateToProps,{ loadDashboard })(Landing);

