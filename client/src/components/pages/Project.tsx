import "./pages.css";
import "../Styles/styles.css";
import profilePlaceholder from "../../icons/profile-user.png";
import menu from "../../icons/menu.png"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as paths from "../../constants/routes";
import { ProjectPost } from "../projectPageComponents/ProjectPost";
import { ProjectMember } from "../projectPageComponents/ProjectMember";
import { GeneralSettings } from "../projectPageComponents/GeneralSettings";
import { MemberSettings } from "../projectPageComponents/MemberSettings";
import { RoleSettingsItem } from "../projectPageComponents/RoleSettingsItem";
import { PagePopup, openClosePopup } from "../PagePopup";
import { projects, posts, profiles } from "../../constants/fakeData";
import { Tags } from "../Tags";

//Styling changes needed:
/*
-Move return button to left side of page
-Display project creator's  username
-Display at least 2 tags in header
-Add indicator to whether project is actively being made or not
-Move members to header, also include number of members
-How will members be displayed when they're clicked?
-Add 'gallery' section (No idea what goes in there, though)
-Update project posts section to project forum
-No page scrolling, instead use left/right scroll areas for gallery & forum
-No follow button?
-No more options dropdown?
*/

//This is the Project page component, which contains a layout that allows for displaying project info
//More info and comments on individual parts are found above their respective parts

// *** Multiple components are used in this file, and should be separated into smaller files ***
// *** Information and data may have been shared between components, and separating them may cause issues ***
// *** Code restructuring may be necessary to ensure it still works ***

//current project's id number
let projectId;
//username of project creator
let projectOwner: string;

// dummy project data, used when re-rendering the page after saving settings
const dummyProject = {
  _id: -1,
  name: "dummy project",
  members: [
      {
          userID: 0,
          admin: true,
          owner: true,
          role: "Project Lead"
      },
  ],
  description: "dummy project",
  tags: ["dummy", "project"],
  neededRoles: [
      {
          Role: "dummy",
          amount: 2,
          description: "dummy project",
      },
  ],
  posts: []
}

// default settings for loaded project
let defaultSettings: {projectName: string, projectMembers: {userID: number, admin: boolean, owner: boolean, role: string}[]} = {
  projectName: '',
  projectMembers: []
}
let defaultRoleSettings: {Role: string, amount: number, description: string}[];

// temporary settings, holds changes to settings
// If settings window is closed, this should be reset using defaultSettings
let tempSettings;
let tempRoleSettings;

// used with settings, identifies which tab user is currently on
let currentTab = 'general';

// Many functions below are meant to serve as placeholders, and only call a console.log message
// This is because many of them would involve having to write/read from a completed database, which is not implemented yet
// Not all placeholders may be necessary in the final product, but they can act as a guideline for the needed functionality

//Adds/removes currently viewed project to the user's followed projects
//Will require current user id & project id
//Should only be accessible to non-project members
const followProject = () => {
  console.log('This will let the user follow this project');
  //Get current user id (need session info)
  //Add project id to user's followed project list (need relevant data location)
}

//Adds/removes current user to the list of people interested in joining the current project
//Will require current user id & project id
//Should only be accessible to non-project members
const addInterested = () => {
  console.log('This will add the current user to the list of people interested');
  //Get current user id (need session info)
  //Add project id to user's interested project list (need relevant data location)
  //Add user to project's list of interested people (need relevant data location)
}

//Lets the user create a new post for the project
//Should only be accessible to project members and/or admins
const makeProjectPost = () => {
  console.log("This will let the member create a new project post");
  //Open window or page for making project post
  //No prototype of this found on project page, so I will refrain from adding further for now
}

//Placeholder for entering the virtual space for a project
//Can likely be replaced with a simple redirect funciton with useNavigation
const enterVirtualSpace = () => {
  console.log("This will take the user into the project's virtual space")
}

//Lets the user block this project, preventing it from appearing for them
//Should only be accessible to non-project members
const blockProject = () => {
  console.log('This will allow a user to block the current project');
  //Get current user id
  //Add project to user's block projects list
}

//Lets the user open a report popup, which can then be used to report an inappropriate project to site admins
//Should only be accessible to non-project members
const reportProject = () => {
  console.log('This will let the user report the project to moderators');
  //Get project id & user id (if user is not anonymous)
  //Send a report for admins to review filled with relevant info (need location for reports)
}

//Lets the user leave the project
//Should only be accessible to project members
const leaveProject = () => {
  console.log('This will let a project member leave a project (Likely after another confirmation)');
  //Get current user id
  //remove user from project members list
}

//Checks the number of members in the project & returns it for displaying in the header
//If the number of members is higher than certain numbers, it will be abbreviated
const createMemberCount = (projectData) => {
  if (projectData.members.length >= 1000){
    if (projectData.members.length >= 1000000) {
      return (`${Math.trunc(projectData.members.length/1000000)} Members`);
    }
    return (`${Math.trunc(projectData.members.length/1000)} Members`);
  } else if (projectData.members.length === 1) {
    return (`1 Member`);
  } else {
    return (`${projectData.members.length} Members`);
  }
}

//Opens/closes the additional project options dropdown menu
//Works for both the project member and non-project member views
const toggleOptionDisplay = () => {
  let popup = document.getElementById("more-options-popup");
  popup ? popup.classList.toggle("show") : console.log('element not found');
}

//Removes project from database and redirects user
//Ensure that all other functions come before the redirect function, as changing pages may stop the funciton
//Should only be accessible to the project's creator
const deleteProject = (callback) => {
  //Delete project from database
  //Error caused by typescript, code still runs correctly
  projects.splice(projects.indexOf(projects.find(p => p._id === projectId)), 1);
  //Redirect to the MyProjects page
  callback(paths.routes.MYPROJECTS);
}

// Small component used as part of a popup containing project member info
// Since both member and non-member views will need to use this, it will be used in the main Project.tsx component
// projectData is passed in through props, containing the current project's data

// *** Separate component that should be moved to another file in the future ***
const ProjectMemberPopup = (props) => {
  let key = 0; //not required, but react will give errors if key isn't used in .map function
  return (
    <>
    <h1>Members</h1>
    <hr/>
    <div id='project-member-chart'>
      {
        props.projectData.members.map(member => {
          return (
            <ProjectMember onClick={() => window.location.href="profile"} memberId={member.userID} role={member.role}  key={key++}/>
          );
        })
      }
    </div>
    </>
  )
}

// Page header that displays for users that are not members of the project
// Includes options to follow, block, report, or show interest in joining the project
// When loading page, should check to see if the current user is part of the loaded project to determine which header to load

// *** Separate component that should be moved to another file in the future ***
// Could also move some comments into html of component

// projectData is passed in through props, containing data on the project
const ProjectHeader = (props) => {
  let key = 0; //key is not required for functionality, but react will give an error without it when using the .map function later
  return (
    <div id='project-info'>
      <img id='project-picture' src={profilePlaceholder} alt=''/>

      <div id='project-header'>
        <h1 id='project-title'>{props.projectData.name}</h1>
        <div id='project-owner'>Created by: {projectOwner}</div>
        <div id='project-tags'>
          <Tags className='project-tag'>{props.projectData.tags[0]}</Tags>
          <Tags className='project-tag'>{props.projectData.tags[1]}</Tags>
        </div>
        <div id='project-status'>Status: Active</div>
        <div id='project-member-count'>{createMemberCount(props.projectData)}</div>
        <div id='project-member-preview'>
          <img id='member-preview-1' src={profilePlaceholder}/>
          <img id='member-preview-2' src={profilePlaceholder}/>
          <img id='member-preview-3' src={profilePlaceholder}/>
          <span onClick={props.callback2}>Show all members</span>
        </div>
        <div id='header-buttons'>
          <button id='follow-project' className='orange-button' onClick={followProject}>Follow</button>
          <div id='more-options'>
            <button id='more-options-button' className='icon-button' onClick={toggleOptionDisplay}><img src = {menu}></img></button>
            <div id='more-options-popup' className='hide'>
              <button className='white-button' onClick={blockProject}>Block</button>
              <button className='white-button' onClick={reportProject}>Report</button>
            </div>
          </div>
        </div>
      </div>

      <p id='project-desc'>{props.projectData.description}
      </p>

      <div id='project-listings'>
        <h3>Looking for</h3>
        <hr/>
        {
          props.projectData.neededRoles.map(role => {
            return(
              <div key={key++}>{role.Role} &#40;{role.amount}&#41;</div>
            );
          })
        }

        <button id='interested-button' className='white-button' onClick={addInterested}>Interested</button>
      </div>
    </div>
  )
}

// Page header that displays for users that are members of the project
// Includes options to access project settings, leave the project, and edit what is displayed in the 'looking for' window
// May need further variants depending on whether the user is a regular member, an admin, or the owner
// When loading page, should check to see if the current user is part of the loaded project to determine which header to load

// To-do: add new header layout elements to this component
// This will be mostly identical to the non-member component above, aside from buttons

// *** Separate component that should be moved to another file in the future ***

// Utilizes the 'PagePopup' component for project settings, and 'GeneralSettings' as the first rendered tab within it
// projectData and a callback for resetProjectData are passed in through props
// projectData is a reference to the current project's info
const ProjectHeaderMember = (props) => {
  const navigate = useNavigate(); // Hook for navigation

  let key = 0; //key is not required for functionality, but react will give an error without it when using the .map function later
  let key2 = 0;

  //UseState variables used alongside popup components
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showPopup3, setShowPopup3] = useState(false);

  //Function used to update a specific member's setting
  //It is placed before other variables so that it can be used for one
  //'setting' indicates what setting is being modified
  // 0 - member role; 1 - toggle admin; 2 - toggle mentor(?); 3 - remove member; 4 - undo remove member;
  //'memberId' indicates which member to change via their id
  //'roleName' holds whatever new role name will be used if 'setting' is 0
  //nothing needs to be passed into 'rolename' if 'setting' is anything other than 0
  const updateMemberSettings = (setting, memberId, roleName = undefined) => {
    let editingMember: {userID: number, admin: boolean, owner: boolean, role: string} = 
      tempSettings.projectMembers.find(member => member.userID === Number(memberId));
    if (editingMember === undefined && setting !== 4){
      console.log('member not found');
      return;
    }
    switch(setting){
      case 0:
        if (roleName !== undefined) {
          editingMember.role = roleName;
        }
        break;
      case 1:
        editingMember.admin ? editingMember.admin = false : editingMember.admin = true;
        console.log('admin status updated');
        break;
      case 2:
        //Meant to toggle mentor role, but no such thing appears in data at the moment
        console.log('mentor toggle');
        break;
      case 3:
        //Get the array index of the member being deleted
        //References defaultSettings instead of tempSettings due to potential index changes caused by other member removals
        let deletedItem = defaultSettings.projectMembers.find(member => member.userID === memberId);
        let deletedItemIndex;
        deletedItem ? deletedItemIndex = defaultSettings.projectMembers.indexOf(deletedItem) : 
          console.log('error getting item index');
        //Add index of deleted member to deletedMemberIndexList
        deletedMemberIndexList.push(deletedItemIndex);
        //Remove the relevant member from tempSettings
        tempSettings.projectMembers.splice(tempSettings.projectMembers.indexOf(editingMember), 1);
        break;
      case 4:
        //Get the original array index of the member being restored
        //Gets data on the member using memberId, then finds the index of that data in defaultSettings
        let deletedMember = defaultSettings.projectMembers.find(member => member.userID === memberId);
        if (deletedMember === undefined){
          console.log('deleted member not found');
          return;
        }
        let deletedMemberIndex = defaultSettings.projectMembers.indexOf(deletedMember);
        //Also assign an originalIndex value as a reference to the original index value
        //original index is used for comparison, while deletedMemberIndex is changed depending on the comparison
        let originalIndex = defaultSettings.projectMembers.indexOf(deletedMember);
        for (let i = 0; i < deletedMemberIndexList.length; i++) {
          if (originalIndex > deletedMemberIndexList[i]){
            deletedMemberIndex--;
          }
        }
        //Insert member data back into tempSettings
        tempSettings.projectMembers.splice(deletedMemberIndex, 0, deletedMember);
        break;
      default:
        return;
    }
  }

  //Store settings tab components for switching between tabs
  let generalTab = <GeneralSettings projectId={projectId} tempSettings={tempSettings}/>
  let membersTab = <MemberSettings projectId={projectId} tempSettings={tempSettings} updateMemberSettings={updateMemberSettings}/>

  //useState variable used to set what is displayed in settings popup
  let [tabContent, setTabContent] = useState(generalTab);

  //useState variables used when rendering edit roles interface
  let [currentlyNeededRoles, setCurrentlyNeededRoles] = useState(tempRoleSettings);

  //Used to track which members have been deleted
  let deletedMemberIndexList: number[] = [];
  //Used to track the indexes of deleted roles
  let deletedRoleIndexList: number[] = [];

  //Opens settings and resets any setting inputs from previous opening
  const openSettings = () => {
    tempSettings = JSON.parse(JSON.stringify(defaultSettings)); //Json manipulation here is to help create a deep copy of the settings object
    if (currentTab === 'general') {
      //The 2 lines of code in these 2 if/else if statements are roundabout ways to reset the content
      //On the tabs. A better solution to accomplish this may be possible.
      setTabContent(membersTab);
      setTimeout(() => setTabContent(<GeneralSettings projectId={projectId} tempSettings={tempSettings}/>), 1);
    } else if (currentTab === 'members') {
      setTabContent(generalTab);
      setTimeout(() => setTabContent(<MemberSettings projectId={projectId} tempSettings={tempSettings} updateMemberSettings={updateMemberSettings}/>), 1);
    }
    //Timeout is set here to prevent asynchronous tab changes from the 'setTabContent' functions above from being visible
    setTimeout(() => openClosePopup(showPopup1, setShowPopup1), 20);
  }

  //Updates tempSettings with any inputted setting changes, called when switching tabs or when saving settings
  const updateSettings = () => {
    if (currentTab === 'general') {
      let nameInput = document.getElementById('name-edit');
      nameInput ? tempSettings.projectName = nameInput.value : console.log('error'); //error on 'value' is due to typescript, code still functions correclty
    }
  }

  //Closes settings window and saves changed settings
  //Will require code to take the input from settings and write to the database
  const saveSettings = () => {
    updateSettings();
    let currentProject = projects.find(p => p._id === Number(projectId));
    if (currentProject !== undefined) {
      currentProject.name = tempSettings.projectName;
      currentProject.members = tempSettings.projectMembers;
    }
    defaultSettings = tempSettings;

    props.callback();
    
    //Closes the settings popup
    openClosePopup(showPopup1, setShowPopup1);
  }

  //Called when a tab is changed in the settings window
  //tab - a string value denoting which tab is being switched to.
  const changeTabs = (tab) => {
    //Depending on tab selected, switches settings content to that tab, while also applying styling rules to 
    //the relevant tabs themselves

    //Could use useState to change tab display instead
    if (tab === 'general') {
      currentTab = 'general';
      setTabContent(generalTab);
      let generalTabElement = document.getElementById('general-tab');
      let memberTabElement = document.getElementById('member-tab');
      if (generalTabElement && memberTabElement){
        generalTabElement.className = 'tab-selected';
        memberTabElement.className = 'tab';
      }
    } else if (tab === 'members') {
      updateSettings();
      currentTab = 'members';
      setTabContent(membersTab);
      let generalTabElement = document.getElementById('general-tab');
      let memberTabElement = document.getElementById('member-tab');
      if (generalTabElement && memberTabElement){
        generalTabElement.className = 'tab';
        memberTabElement.className = 'tab-selected';
      }
    }
  }

  //Called when 'add role' is pressed in edit roles interface
  //Adds a role to tempRoleSettings
  const addRole = () => {
    //get input values
    let nameInput = document.getElementById('role-name-input-box').value;
    let numInput = document.getElementById('role-num-input-box').value;
    let descInput = document.getElementById('role-desc-input-box').value;
    //check to make sure all values contain data, cancels function if not
    // * Will also require checks or encryption to prevent code injection
    if (nameInput === '' || numInput === '' || descInput === '') {
      console.log('all fields must have an appropriate input (display this on interface later)');
      return;
    }
    //create new role
    let newRole: {Role: string, amount: number, description: string} = 
      {Role: nameInput, amount: numInput, description: descInput};
    //add new role to project
    tempRoleSettings.push(newRole);
    //update currentlyNeededRoles usestate
    setCurrentlyNeededRoles(defaultRoleSettings);
    setTimeout(() => setCurrentlyNeededRoles(tempRoleSettings), 1);
  }

  //Called when a delete button is clicked on the role list
  //Adds the index of the role to an list of indexes that will be deleted upon saving
  const removeRole = (roleIndex) => {
    deletedRoleIndexList.push(roleIndex);
  }

  //Undoes a role deletion & removes its index from deletedRoleIndexList
  const undoRemoveRole = (roleIndex) => {
    deletedRoleIndexList.splice(deletedRoleIndexList.indexOf(roleIndex), 1);
  }

  //Called when user is done editing a role's details
  //roleIndex passes in a number to use as an index reference for the role
  //note: since there is no id number for roles, need to manipulate deleted index numbers to update correct role
  const updateRoleSettings = (roleIndex, roleObject) => {
    tempRoleSettings[roleIndex] = roleObject;
  }

  //Called when 'save changes' is pressed in edit roles interface
  //Takes data in tempRoleSettings and updates project data with it
  const saveRoleSettings = () => {

    //Runs through deletedRoleIndexList and removes all items from tempRoleSettings with these indexes
    //Sorts indexes from greatest to least first to prevent erroneous deletions
    deletedRoleIndexList.sort(function(a, b){return b-a});
    //Delete items at specified indexes
    deletedRoleIndexList.forEach(index => {
      tempRoleSettings.splice(index, 1);
    });
    //Clean out deletedRoleIndexList
    deletedRoleIndexList = [];

    //Saves new role data to project data
    let currentProject = projects.find(p => p._id === Number(projectId));
    if (currentProject !== undefined) {
      currentProject.neededRoles = tempRoleSettings;
    }
    //Resets defaultRoleSettings with new info
    defaultRoleSettings = tempRoleSettings;

    //Updates page display & closes interface
    props.callback();
    openClosePopup(showPopup3, setShowPopup3);
  }

  //Reloads roles on edit roles interface
  const resetEditRoles = () => {
    setCurrentlyNeededRoles([]);
    setTimeout(() => setCurrentlyNeededRoles(defaultRoleSettings), 1);
  }

  //uses resetEditRoles & opens edit roles interface
  //Mainly for using both in a single onClick function
  const openEditRoles = () => {
    resetEditRoles();
    openClosePopup(showPopup3, setShowPopup3);
  }

  // Some comments may be moved inside html
  // html can also utilize useState and useEffect later to better represent data updates
  return (
    <div id='project-info-member'>
      <img id='project-picture' src={profilePlaceholder} alt=''/>


      <div id='project-header'>
        <h1 id='project-title'>{props.projectData.name}</h1>
        <div id='header-buttons'>
          <div id='more-options'>
            <button id='more-options-button' className='icon-button' onClick={toggleOptionDisplay}>
            <img src = {menu}></img></button>
            <div id='more-options-popup' className='hide'>
              <button className='white-button' onClick={openSettings}>Project Settings</button>
              <button className='white-button' onClick={leaveProject}>Leave Project</button>
            </div>
          </div>
        </div>
      </div>

      <p id='project-desc'>{props.projectData.description}
      </p>

      <div id='member-buttons'>
        <button id='virtual-space-entrance' className='white-button' onClick={enterVirtualSpace}>Enter virtual space</button>
        <button id='make-post-button' className='white-button' onClick={makeProjectPost}>+ New Post</button>
      </div>

      <div id='project-listings'>
        <h3>Looking for</h3>
        <hr/>
        {
          props.projectData.neededRoles.map(role => {
            if (role === undefined || role === null){
              console.log('could not find role')
              return;
            }
            return(
              <div key={key++}>{role.Role} &#40;{role.amount}&#41;</div>
            );
          })
        }

        <button id='edit-roles-button' className='white-button' onClick={openEditRoles}>Edit Roles</button>
      </div>

      <PagePopup width={'80vw'} height={'80vh'} popupId={0} zIndex={3} show={showPopup1} setShow={setShowPopup1}>
        <div id='settings-window-test'>
            <h1>Project Settings</h1>
            <div id='settings-tabs'>
              <button id='general-tab' className='tab-selected' onClick={() => {changeTabs('general')}}>General</button>
              <button id='member-tab' className='tab' onClick={() => {changeTabs('members')}}>Members</button>
              <button id='delete-project' onClick={() => openClosePopup(showPopup2, setShowPopup2)}>Delete Project</button>
            </div>
            <hr/>
            <div id='settings-content'>
            {tabContent}
            </div>
            <button id='settings-cancel' className='white-button' onClick={() => openClosePopup(showPopup1, setShowPopup1)}>Cancel</button>
            <button id='settings-save' className='orange-button' onClick={saveSettings}>Save</button>
        </div>
      </PagePopup>

      <PagePopup width={'600px'} height={'400px'} popupId={2} zIndex={3} show={showPopup3} setShow={setShowPopup3}>
        <div id='edit-roles-window'>
          <h1>Edit Roles</h1>
          <div id='edit-roles-options'>
            <div id='role-name-input'>
              <div>role name</div>
              <input id='role-name-input-box' type='text'></input>
            </div>
            <div id='role-spots-input'>
              <div>open spots</div>
              <input id='role-num-input-box' type='number'></input>
            </div>
            <div id='role-desc-input'>
              <div>role description</div>
              <textarea id='role-desc-input-box'></textarea>
            </div>
            <button id='role-add-button' onClick={addRole}>Add role</button>
            <div id='roles-list'>
              {
                currentlyNeededRoles.map(currentRole => {
                  return(
                    <RoleSettingsItem role={currentRole} num={key2} key={key2++} 
                    updateRoleSettings={updateRoleSettings} removeRole={removeRole} undoRemoveRole={undoRemoveRole}/>
                  )
                })
              }
            </div>
          </div>
          <button className='orange-button' onClick={saveRoleSettings}>Save Changes</button>
        </div>
      </PagePopup>

      <PagePopup width={'300px'} height={'150px'} popupId={1} zIndex={4} show={showPopup2} setShow={setShowPopup2}>
        <div id='project-delete-check'>
          <h3>Are you sure you want to delete this project?</h3>
          <button id='project-delete-cancel' onClick={() => openClosePopup(showPopup2, setShowPopup2)}>Cancel</button>
          <button id='project-delete-final' onClick={() => deleteProject(navigate)}>DELETE</button>
        </div>
      </PagePopup>
      
    </div>
  )
}

// Main content of the Project page, which is exported from this file
// When loading page, should check to see if the current user is part of the loaded project to determine which header to load
// Utilizes the 'ProjectHeader' and 'ProjectHeaderMember' components for headers, 'ProjectMember' component for listing project members,
//    and 'ProjectPost' component for displaying posts the project has made

// No data is passed in through props

// The 'select' element is for testing different projects with this layout, it should not be included in the final product
const Project = (props) => {
  window.scrollTo(0,0);

  let keys = [0, 0, 0, 0]; //keys are not required for functionality, but react will give an error without it when using .map functions later

  //useState for members popup
  const [showPopup, setShowPopup] = useState(false);

  //*** Pulls project ID number from search query (should be stored as 'p') ***
  //(ex. [site path]/project?p=x , where x = the project ID number)
  let urlParams = new URLSearchParams(window.location.search);
  projectId = urlParams.get('projID');

  //If search query doesn't yield anything, use a default project id
  if (projectId === null) {
    console.log('No query in url, loading default');
    projectId = '0';
  }

  //Find project using project ID
  const currentProject = projects.find(p => p._id === Number(projectId)) || projects[0];

  //Pass project settings into variables for use in settings tabs
  defaultSettings.projectName = currentProject.name;
  defaultSettings.projectMembers = [];
  defaultRoleSettings = currentProject.neededRoles;
  currentProject.members.forEach(member => {
    defaultSettings.projectMembers.push(member);
  });
  tempSettings = JSON.parse(JSON.stringify(defaultSettings));
  tempRoleSettings = JSON.parse(JSON.stringify(defaultRoleSettings));

  //Pass project data for rendering purposes
  const [projectData, setProjectData] = useState(currentProject);

  //Store project owner's username
  projectOwner = profiles.find(p => p._id === projectData.members.find(p => p.owner === true).userID).username;

  //Workaround function to update data on a project save
  //Necessary due to how setting useState variables works
  //If there's a better solution for this, please use it.
  const resetProjectData = () => {
    //First line is to change state to something other than what's being used
    //If it were set to the same project as before, it wouldn't recognize it as a change & wouldn't do anything
    setProjectData(dummyProject);
    //Second line delays the resetting of the project data
    //This is due to the set state function being partly asynchronous, and this allows the first line to finish before continuing
    setTimeout(() => {setProjectData(projects.find(p => p._id === Number(projectId)) || projects[0])}, 1);
  }

  //First select element is used for testing/debugging purposes, it should be removed in the final product
  //Some comments may be move into html
  return (
    <div id='project-page' className='page'>

      <select onChange={e => {
        setProjectData(projects[e.target.value]);
      }}>
        {
          projects.map(project => {
            return(
              <option value={project._id} key={keys[0]++}>{project.name}</option>
            )
          })
        }
      </select>

      <div id='return-button-container'>
      <button id='return-button' className='white-button' onClick={() => window.history.back()}>&lt; return</button>
      </div>

      <ProjectHeaderMember callback={resetProjectData} callback2={() => openClosePopup(showPopup, setShowPopup, [showPopup])} projectData={projectData}/>

      <div id='member-divider'>
        <hr/>
        <span>Members</span>
        <hr/>
      </div>
      

      <div id='project-members'>
        {
          projectData.members.map(member => {
            return (
              <ProjectMember onClick={() => window.location.href="profile"} memberId={member.userID} role={member.role}  key={keys[1]++}/>
            );
          })
        }
      </div>
      <hr/>

      <div id='project-posts'>
        {
          projectData.posts.map(postNum => {
            return(
              <ProjectPost postID={posts[postNum]._id} key={keys[2]++}/>
            );
          })
        }
      </div>

      <PagePopup width={'80vw'} height={'80vh'} popupId={3} zIndex={3} show={showPopup} setShow={setShowPopup}>
        <ProjectMemberPopup projectData={projectData}/>
      </PagePopup>
    </div>
  );
}

export default Project;