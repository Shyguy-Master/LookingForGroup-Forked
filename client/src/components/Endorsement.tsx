import { projects } from "../constants/fakeData";
import { profiles } from "../constants/fakeData";

export const Endorsement = ({endorsement}) => {
    return (
        <div className="endorsement">
            <p><b>"{endorsement.endorsement}"</b></p>
            <p>-{profiles[endorsement.endorserID].name} on {projects[endorsement.endorseProjectID].name}</p>
        </div>
    )
}