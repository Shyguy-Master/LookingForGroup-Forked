import React from "react";


export const SearchBar = ({currentSelection}) => {

    let result;
    let placeholderText = "Search ";
    result = placeholderText.concat(currentSelection);

    return (
        <>
            <div className="search-wrapper">
                <form className="search-bar">
                    <button type="submit" className="search-button"><i className="fa fa-search"></i></button>
                    <input className="search-input" type="text" placeholder={result}></input>
                </form>
            </div>
        </>
    )
}