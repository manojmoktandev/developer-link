import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import CommentReply from './CommentReply';
import CommentReplyForm from './CommentReplyForm';


const CommentItem = ({ deleteComment, postId, comment: { _id, text, name, avatar, user, date, reply }, auth }) => {
  const splitname = name.split(' '),
        avatarName = splitname[0].charAt(0).toUpperCase()+splitname[1].charAt(0).toUpperCase();
    return (
        <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            {/* {avatar && <img
              className="round-img"
              src={avatar}
              alt=""
            />} */}
            
              <div className="avatar-circle">
                <span className="initials">
                  {avatarName}
                </span>
              </div>
            
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
          
          {!auth.loading && user === auth.user._id && ( <button  type="button" className="btn btn-danger" onClick={e=>deleteComment(postId,_id)}>
            <i className="fas fa-times"></i> Delete
          </button>)}
          
          <CommentReplyForm postId={postId} commentId={_id} />
          <div className="comments">
              {reply.map((comment_reply) => (
                <CommentReply key={comment_reply._id} reply={comment_reply} postId={postId} commentId={_id}  />
              ))}
          </div>
        </div>
      </div>
    )
}

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment:PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment})(CommentItem);
