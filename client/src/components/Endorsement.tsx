import { projects } from "../constants/fakeData";
import { profiles } from "../constants/fakeData";
import profilePicture from "../images/blue_frog.png";
import { Tags } from "./Tags";

export const Endorsement = ({endorsement, endorsedID}) => {
    let user = profiles[endorsedID]
    return (
        <div className="endorsement">
            <img id="endorsement-profile-picture" src={profilePicture} alt={profiles[endorsement.endorserID].name}/>
            <div id = "endorsement-body">
                <p id = "endorsement-text"><b>"{endorsement.endorsement}"</b></p>
                <p>From {profiles[endorsement.endorserID].name} for work on <b>{projects[endorsement.endorseProjectID].name}</b></p>
                <div id = "profile-endorsement-skills" className="profile-list">
                    {
                        endorsement.skills.map(skill => <Tags>{user.skills[skill].skill}</Tags>)
                    }
                </div>
            </div>
        </div>
    )
}