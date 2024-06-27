import "./pages.css";
import { ProjectCard } from "../ProjectCard";
import { ProfileCard } from "../ProfileCard";
import { DiscoverButton } from "../DiscoverButton";
import { NotifButton } from "../NotificationButton";
import { SearchBar } from "../SearchBar";
import "../styles.css";
import { projects } from "../../constants/fakeData";
import { profiles } from "../../constants/fakeData";
import { Children } from "react";
import {useState} from 'react';

const Home = (props) => {

    // THINGS TO DO:
    // ADD FOLLOWING BUTTON AND OTHER STUFF TO CARDS
    // MAKE PAGE MOBILE FRIENDLY
    // ADD SEARCH BAR
    // MAKE THINGS ON THE CARD CLICKABLE
    // MORE

    let DEFAULT_TAB = 'Projects';
    let [selectedTab, setSelectedTab] = useState(DEFAULT_TAB);

    let projectContent = <>{
        projects ?
            projects.length > 0 ?
                projects.map((project) => (
                    <ProjectCard project={project}></ProjectCard>
                ))
                :null
                    :null
    }</>;

    let profileContent = <>{
        profiles ?
            profiles.length > 0 ?
                profiles.map((profile) => (
                    <ProfileCard profile={profile}></ProfileCard>
                ))
                :null
                    :null
    }</>;

    let discoverContent = selectedTab === 'Projects' ? projectContent : profileContent;

    const handleButtonClick = (selectedButton) => {
        setSelectedTab(selectedButton);
    }

    // --- Searching ---
    const [query, setQuery] = useState('');

    const HandleSearch = (discoverContent) => {
        setQuery(discoverContent.target.value);
    }

    let filteredSearch = projects.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
    )

    let filteredProfiles = profiles.filter(person =>
        person.name.toLowerCase().includes(query.toLowerCase())
    )

    if(selectedTab === "Projects"){
        discoverContent = <>{filteredSearch.map((project) => (
            <ProjectCard project={project}></ProjectCard>
        ))}</>
    }
    else{
        discoverContent = <>{filteredProfiles.map((profile) => (
            <ProfileCard profile={profile}></ProfileCard>
        ))}</>

    }
    
    return (
        <div className="page">
            <div id="containerId"><NotifButton></NotifButton></div>
            
            <h1 className="page-title">Discover</h1>
            
            <div id="discover-button-wrapper">                
                <DiscoverButton isActive={selectedTab === 'Projects'} onClick={() => handleButtonClick('Projects')}>Projects</DiscoverButton>
                <DiscoverButton isActive={selectedTab === 'People'} onClick={() => handleButtonClick('People')}>People</DiscoverButton>
                <SearchBar data={projects} HandleChange={HandleSearch}></SearchBar>
                
            </div>

            {/* Prints all projects in the fake dataset on screen */}
            {discoverContent}
            {/* <ProfileCard profile={profiles[0]}></ProfileCard> */}
        </div>
    );
}

export default Home;