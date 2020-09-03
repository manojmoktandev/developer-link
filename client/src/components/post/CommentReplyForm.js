import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replyComment } from '../../actions/post';

const ReplyCommentForm = ({postId,commentId, replyComment }) => {
    const [text, setText] = useState('');
    const handleKeyPress = (e) => {
        if (e.charCode === 13) {
            e.preventDefault();
            if (text.trim()!=='') {
                replyComment({ 'postId':postId,'commentId':commentId,text });
                setText('');
            }
        }
      }
    return (
        <div className="post-form">
            <form className="form my-1" >
            <textarea
                name="text"
                    cols="30"
                    onChange={e=>setText(e.target.value)}
                    rows="2"
                    value={text}
                    placeholder="Reply on this Comment"
                    onKeyPress={e=>handleKeyPress(e)}
                required >
            </textarea>
            
            </form>
        </div>
        
    )
}

ReplyCommentForm.propTypes = {
    replyComment:PropTypes.func.isRequired
}

export default connect(null,{replyComment})(ReplyCommentForm);
