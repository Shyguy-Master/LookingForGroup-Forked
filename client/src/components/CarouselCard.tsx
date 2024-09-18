import React from "react";
import { Tags } from "./Tags";
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as paths from "../constants/routes";

import profilePicture from "../images/blue_frog.png";
import followPicture from "../images/heart.png";

import { projects } from "../constants/fakeData";

// This is used by the Discover Page to display Project information in a carousel 
export const ProjectCard = ({project}) => {
    // Updates the url to point toward the project being clicked
    const navigate = useNavigate();
    let pathQuery = `?projID=${project._id}`;
    let projDesc = project.description;
    return (
        <div className="carousel-card">
            <img id="carousel-card-profile-picture" src={profilePicture} alt={project.name}/>
            <div id="carousel-card-body">
                {/* When the title is clicked it navigates to the project page */}
                <h2 id="carousel-card-name" onClick={() => navigate(paths.routes.PROJECT + pathQuery)}>
                    {project.name}
                </h2>
                
                {/* Character limit is currently 200; there's no specific reason why 200 */}
                <p id="carousel-card-description">
                    {/* {projDesc.length > 200 ? projDesc.substring(0, 200).concat("...") : projDesc} */}
                    {projDesc}
                </p>
                
                <div id="carousel-card-tag-wrapper">
                    <Tags>{project.tags[0]}</Tags>
                    <Tags>{project.tags[1]}</Tags>
                    <Tags>{project.tags[2]}</Tags>
                </div>
                
                {/* The needed roles are pulled from an array in fakeData.ts and are mapped along with the needed amounts */}
                <p id="carousel-card-needed-roles">
                    <b>Looking for:</b> {project.neededRoles.map(r => `${r.Role}(${r.amount})`).join(", ")}
                </p>
            </div>
        </div>
    );
}

