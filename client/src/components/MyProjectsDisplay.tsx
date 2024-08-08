import React from "react";
import { ProjectCard } from "./ProjectCard";
import { profiles } from "../constants/fakeData";
import { projects } from "../constants/fakeData";
import { SearchBar } from "./SearchBar";
import { useState, useCallback } from "react"; 

//used on my projects page to display the projects in a container
//and to search them 

export const MyProjectsDisplay = ({userID}) => {

    
    // --- Searching ---
    const [filteredProjects, setFilteredProjects] = useState(projects);

    const HandleSearch = useCallback((results) => {
        setFilteredProjects(results[0]);
      }, []);

    //--------------------------

    return (
        <div>
            <SearchBar dataSets={[{ data: projects }]} onSearch={HandleSearch}></SearchBar>

            {filteredProjects.map(proj => {
                let prof = profiles[0];
                for(let p of profiles){
                    if(p._id == userID){
                        prof = p;
                        break;
                    }
                }

                if(prof.projects.includes(proj._id)){
                    return <ProjectCard project={proj} />
                }
            })}
        </div>
    );
}