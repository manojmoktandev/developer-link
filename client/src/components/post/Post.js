import React, { useEffect,Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';
import CommentForm from './CommentForm';
import { Link } from 'react-router-dom';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id)
    }, [getPost,match.params.id])
    return loading || post === null ? <Spinner /> : <Fragment>
        <Link to='/posts' className='btn'>Back to post</Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <div className="comments">
       {post.comment.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))} 
      </div>
        
    </Fragment>
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post : PropTypes.object.isRequired,

}
const mapStateToProps = state =>({
    post:state.post
})

export default connect(mapStateToProps,{getPost})(Post)
