import froggy from "../../images/blue_frog.png";

export const ProfileGallery = () => {
    return (
        <section className="profile-section" id = "profile-gallery">
        <h2>Gallery</h2>
        <img id = "pfp" src={froggy} width="200" height="200"></img>
        <img id = "pfp" src={froggy} width="200" height="200"></img>
        <img id = "pfp" src={froggy} width="200" height="200"></img>
        <img id = "pfp" src={froggy} width="200" height="200"></img>
        <img id = "pfp" src={froggy} width="200" height="200"></img>
      </section>
    );
}