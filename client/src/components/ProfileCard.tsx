import React from "react";
import { Tags } from "./Tags";

import profilePicture from "../images/blue_frog.png";
import followPicture from "../images/heart.png";

import { projects } from "../constants/fakeData";

export const ProfileCard = ({profile}) => {
    return (
        <div className="discover-card">
            <img id="discover-card-profile-picture" src={profilePicture} alt={profile.name}/>
            <div id="discover-card-body">
                <span><h2 id="discover-card-name" onClick={() => window.location.href="profile"}>{profile.name}</h2>
                <p id="discover-card-pronouns">{profile.pronouns.map(p => `${p}`).join("/")}</p></span>
                <p id="discover-card-description">{profile.bio}</p>
                <div id="discover-card-tag-wrapper">
                    <Tags>{profile.skills[0].skill}</Tags>
                    <Tags>{profile.skills[1].skill}</Tags>
                    <Tags>{profile.skills[2].skill}</Tags>
                </div>
            </div>
            {/* <button id="profile-card-follow" >
                <img src={followPicture}/>
            </button> */}
        </div>
    );
}

