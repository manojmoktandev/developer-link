import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Alert = ({ alerts }) => {
    const { alertType, msg } = alerts.length>0?alerts[0]:alerts;
    let toastMessage = '';
    switch (alertType!=='') {
        case alertType ==='success':
            toastMessage = toast.success(msg);
            break;
        case alertType ==='error':
                toastMessage = toast.error(msg);
            break;
        case alertType ==='warning':
                toastMessage = toast.warning(msg, {
                    position: "bottom-right",
                    autoClose: 300,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: 1,
                });
                break;
        default:
            break;
    }

    return (
        <Fragment>
            {toastMessage}
            <ToastContainer position="bottom-right"
                autoClose={true}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
        </Fragment>
    )
  }
  
Alert.propTypes = {
    alerts:PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    alerts:state.alert
})

export default connect(mapStateToProps)(Alert);