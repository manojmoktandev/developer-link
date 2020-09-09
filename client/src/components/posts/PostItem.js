import React, { Fragment }from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { addLike, removeLike, removePost } from '../../actions/post';
import {
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton
} from "react-share";
import {
  FacebookShareCount
} from "react-share";
import {
  FacebookIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  PinterestIcon,
  TwitterIcon,
  ViberIcon,
  WhatsappIcon
} from "react-share";
const shareUrl = String(window.location); // to share current page
const PostItem = ({addLike,removeLike,removePost, auth, post: { _id, name,text, avatar, user, likes, comment, date },showActions }) => (
    <div className="post bg-white p-1 my-1">
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
                Posted on 
                <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      {showActions && <Fragment>
        <div>
          <span>{likes.length > 0 && (<span className='comment-count'>{likes.length}</span>)} Likes</span>
          &nbsp;
          <span><span className='comment-count'>10</span> shares</span>
          &nbsp;
          <span>{comment.length > 0 && (<span className='comment-count'>{comment.length}</span>)} Comments</span>
        </div>
        <span>
        <i className="fa fa-thumbs-o-up" onClick={e => addLike(_id)}></i>
        &nbsp;
        <i className="fa fa-thumbs-o-down" onClick={e => removeLike(_id)}></i>
        &nbsp;
        <Link to={`/post/${_id}`} >
            <i className="fa fa-comments-o" aria-hidden="true"></i>
          </Link>
        </span>

        &nbsp;
        {!auth.loading && user === auth.user._id && (
          <i className="fa fa-trash-o" onClick={e=>removePost(_id)}></i>
          )}
        
        &nbsp;
   
        <FacebookShareButton  url={shareUrl}
        title={text}>
          <FacebookShareCount url={shareUrl}>
            {count => <span className="myShareCountWrapper">{count && count > 0}</span>}
          </FacebookShareCount> 
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>

        <InstapaperShareButton  url={shareUrl}
        title={text}>
          <InstapaperIcon size={32} round={true} />
        </InstapaperShareButton>
        <LineShareButton  url={shareUrl}
        title={text}>
          <LineIcon size={32} round={true} />
        </LineShareButton>
        <LinkedinShareButton  url={shareUrl}
        title={text}>
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>

        <PinterestShareButton  url={shareUrl}
        title={text}>
          <PinterestIcon size={32} round={true} />
        </PinterestShareButton>

        <TwitterShareButton  url={shareUrl}
        title={text}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>

        <ViberShareButton  url={shareUrl}
        title={text}>
          
          <ViberIcon size={32} round={true} />
        </ViberShareButton>
        <WhatsappShareButton  url={shareUrl}
        title={text}>
         
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
     
           
      </Fragment>}
      
    </div>
  </div>
)
PostItem.defaultProps = {
  showActions: true
}
PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike:PropTypes.func.isRequired,
    removePost:PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    auth : state.auth
})

export default connect(mapStateToProps,{addLike,removeLike,removePost})(PostItem);
