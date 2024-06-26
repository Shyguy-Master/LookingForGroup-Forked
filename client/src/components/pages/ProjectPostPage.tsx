import "./pages.css";
import "../styles.css";
import profilePlaceholder from "../../img/profile-user.png";
import { PostComment } from "../PostComment";
import { projects, profiles, posts } from "../../constants/fakeData";

//List the post and project ids, used throughout component
const postId = 0;
const projectId = 0;

const PostReplies = (props) => {
  if (posts[postId].comments.length !== 0){
    return(
      <div>
        {
          posts[postId].comments.map(comment => {
            return(
              <PostComment commentId={comment}/>
            )
          })
        }
      </div>
    )
  } else {
    console.log('no comment found');
    return(
      <div>No comments</div>
    );
  }
}

const ProjectPostPage = (props) => {
  return(
    <div className='page'>
      <div id='post-page-nav-buttons'>
        <button className='white-button'>return</button>
        <hr/>
        <button className='white-button'>to project</button>
      </div>

      <div id='post-header'>
        <img id='post-project-image' src={profilePlaceholder} alt='project image'/>
        <h2 id='post-project-name'>{projects[projectId].name}</h2>
        <button className='orange-button'>Follow</button>
        <button className='white-button'>...</button>
      </div>

      <hr/>

      <div id='post-page-content'>
        <div id='post'>
          <h3 id='post-name'>{posts[postId].title}</h3>
          <button id='post-options'>...</button>

          <div id='post-content'>
            {posts[postId].postText}
          </div>

          <div id='post-info'>
            <div>
              Posted by: <span id='post-author'>{profiles[posts[postId].author].name}</span>
              <span id='author-role'> {projects[projectId].members[posts[postId].author].role}</span>
            </div>
            <div>{posts[postId].createdDate}</div>
          </div>

          <button id='post-share'>share</button>
          
        </div>

        <div id='comments'>
          <div id='comments-content'>
            <PostReplies />
          </div>

          <div id='reply-content'>
            <div id='reply-prompt'>Replying to...</div>

            <input type='text' id='reply-input'></input>

            <div id='reply-attach-buttons'>
              <button id='reply-attach-1'>attach1</button>
              <button id='reply-attach-2'>attach2</button>
              <button id='reply-attach-3'>attach3</button>
            </div>

            <button id='reply-submit'>send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPostPage