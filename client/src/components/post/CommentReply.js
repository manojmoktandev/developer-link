import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
///import { deleteComment } from '../../actions/post';

const CommentReply = ({deleteComment, postId,reply:{_id,text,name,avatar,user,date},auth}) => {
    return (
        <div className="post comment bg-white my-4">
            <div>
                <Link to={`/profile/${user}`}>
                <img
                    className="round-img"
                    src={avatar}
                    alt=""
                />
                        <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                {text}
                </p>
                <p className="post-date">
                        Posted on <Moment format="ll">{date}</Moment>
                </p>
            </div>
        </div>
    )
}

CommentReply.propTypes = {
    postId: PropTypes.string.isRequired,
  //  reply: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
 
}
const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps)(CommentReply);
