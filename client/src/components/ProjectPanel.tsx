import profilePicture from "../images/blue_frog.png";
//Component that will contain info about a project, used in the discovery page
//Smaller and more concise than ProjectCard.tsx

//Currently, this component serves as a placeholder

//Takes in a 'project' value which contains info on the project it will display
export const ProjectPanel = ({width, data}) => {
  return (
    <div className={'project-panel'} style={{width: width}}>
      <img src={profilePicture} alt={"project iamge"}/>

      <h2 id="project-panel-name">{data.name}</h2>

      <div id="project-panel-desc">{data.description}</div>

      <div id="project-panel-tags-wrapper">
        <span id="project-panel-tag">{data.tags[0]}</span>
        <span id="project-panel-tag">{data.tags[1]}</span>
        <span id="project-panel-tag">{data.tags[2]}</span>
      </div>
    </div>
  )
}