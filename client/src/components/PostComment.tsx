import "./styles.css";
import { useNavigate } from 'react-router-dom';
import * as paths from "../constants/routes";
import profilePlaceholder from "../img/profile-user.png";
import { profiles, comments } from "../constants/fakeData";

//This component is used in the Project Post page, and contains code for structuring the full length of a comment
//  This includes the comment itself, as well as any replies the comment has.
//  Comprised of 2 different components that are repeatedly used to fully construct a full comment
//Similarly to ProjectPostPage.tsx, any profile names can be clicked to navigate to the profile page
//  In the future, it should also redirect specifically to the respective profile that is clicked

let i = 0;

//A function that allows for the hiding/showing of a comment's replies
//i - the current ID of the comment element this is being made for
const showRepliesToggle = (i) => {
  let currentId = i;
  //Get reply set with currently selected ID. If it exists, show/hide the replies in the set
  let currentButton = document.getElementById(currentId);
  if (currentButton !== null){
    currentButton.classList.toggle('show');
  }
}

//Component used in conjuction with 'PostComment', which creates a set of replies for the comment
//Contains a button that shows/hides the replies, as well as the full list of replies
//  Each reply is rendered with another 'PostComment' component, 
//  causing it to loop until all subsequent replies & comments are rendered
//If the current comment has no replies, returns an empty element

//A comment value and callback function are passed in through props
//  'comment' contains data on the current comment to reference when constructing
//  the callback function should be the 'changeReplyTarget' function, found in ProjectPostPage.tsx line 32
//    (This is only to pass it onto more 'PostComment' components, it is not directly used here)
const CommentReplies = (props) => {
  if (props.comment.replies.length !== 0){
    i++;
    let currentId = 'show-reply-set-' + i;
    return(
      <div className='comment-replies'>
        <button onClick={() => showRepliesToggle(currentId)}>----- View Replies</button>
        <div id={'show-reply-set-' + i} className='hide'>
          {
            props.comment.replies.map(reply => {
              return(
                <PostComment commentId={reply} callback={props.callback}/>
              )
            })
          }
        </div>
      </div>
    )
  } else {
    return(
      <></>
    )
  }
}

//Main component, which is exported from this file
//Used as the base for a post comment, which contains the comment content, author & comment info, and options
//  No functionality added to options yet, requires implementation
//Utilizes 'CommentReplies' component when rendering the replies of the current comment

//A commentId value and a callback funciton are passed in through props
//  commentId represent the current id of the comment being rendered
//  the callback function should be the 'changeReplyTarget' function, found in ProjectPostPage.tsx line 32
export const PostComment = (props) => {
  let navigate = useNavigate();
  let comment = comments[props.commentId];
  return(
    <div className='post-comment'>
      <img className='comment-profile' src={profilePlaceholder} alt='profile'/>
      <div className='comment-header'>
        <span className='comment-author' onClick={() => navigate(paths.routes.PROFILE)}>{profiles[comment.author].username}</span>
        <span className='comment-date'> {comment.createdDate}</span>
      </div>

      <div className='comment-content'>
        {comment.content}
      </div>

      <button className='comment-options'>...</button>
      <button className='comment-like'><img src='' alt='heart'/></button>

      <button className='comment-reply' onClick={() => props.callback(props.commentId)}>Reply</button>

      <CommentReplies comment={comment} callback={props.callback}/>
    </div>
  )
}