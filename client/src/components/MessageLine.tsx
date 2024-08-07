import React from "react";
import { messages, profiles } from "../constants/fakeData";
import { useNavigate } from 'react-router-dom';
import * as paths from "../constants/routes";

export const MessageLine = ({ msg, username, type }) => {
    console.log(msg);

    const navigate = useNavigate();
    let profile;
    for (let p of profiles) {
        if (username == p.username) {
            profile = p;
        }
    }
    const pathQuery = `?profID=${profile._id}`;
    
    return (
        <div className={type}>
            <p className="message-line-user"onClick={() => navigate(paths.routes.PROFILE + pathQuery)}><b>{username}</b></p>
            <p>{msg.messageContent}</p>
            <p className="date-stamp"><i>{msg.sentDate}</i></p>
        </div>
    )
}