import "./styles.css";

// How to use:
// 1. import component with 'import { PagePopup, openClosePopup } from "../PagePopup";'
// 2. choose a location where the popup would be relevant & choose parameters
//      - An example would be '<PagePopup width={x} height={y} popupId={z} z-index={q}>  </PagePopup>'
//      - x & y = popup width/height, respectively; z = number ID to identify this popup; q = the z-index layer of the popup
// 3. Place whatever content you want within the popup (including elements, components, etc.);
// 4. Have somewhere for the user to trigger the 'openClosePopup' function to open the popup (it can't open itself!)
//      - Use the relevant popup's ID number as the parameter for this function to indicate which popup to open
//      - Example: <button onClick={() => openClosePopup(z)}>Click me!</button>; Where z = the popup's ID number

// Created by Joseph Dunne, if there is an issue you cannot solve regarding popups, let me know

let scrollLock = false;

export const openClosePopup = (popupId) => {
  document.getElementById(`popup-cover-${popupId}`).classList.toggle('popup-cover-show');
  document.getElementById(`popup-container-${popupId}`).classList.toggle('popup-show');
  console.log(document.getElementsByClassName('popup-show'));
  //If a popup is open, disables scrolling of page
  //When all popups are closed, re-enables page scrolling
  if (document.getElementsByClassName('popup-show').length !== 0 && !scrollLock) {
    let page = document.getElementsByClassName('page');
    page[0].style.top = `-${window.scrollY}px`;
    page[0].classList.toggle('page-scroll-lock');
    scrollLock = true;
  } else if(document.getElementsByClassName('popup-show').length === 0){
    let page = document.getElementsByClassName('page');
    let scrollY = page[0].style.top;
    page[0].style.top = '';
    page[0].classList.toggle('page-scroll-lock');
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
    scrollLock = false
  }
}

export const PagePopup = ({children, width, height, popupId, zIndex}) => {
  return(
    <>
      <div id={`popup-cover-${popupId}`} className='popup-cover-hide' style={{zIndex: zIndex}}/>
      <div id={`popup-container-${popupId}`} className='popup-hide' style={{width: width, height: height, 
        top: `clamp(2.5vh, calc((100% - ${height})/2), 100%)`, 
        left: `clamp(2.5vw, calc((100% - ${width})/2), 100%)`,
        zIndex: zIndex}}>
        <button id='popup-close' className='white-button' onClick={() => openClosePopup(popupId)}>X</button>
        <div>{children}</div>
      </div>
    </>
  )
}