import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBimRr67hSVEwVyo4QhDnPNyGNfG_KDwIo",
    authDomain: "lfg-test-7da4d.firebaseapp.com",
    projectId: "lfg-test-7da4d",
    storageBucket: "lfg-test-7da4d.appspot.com",
    messagingSenderId: "362431495411",
    appId: "1:362431495411:web:964887f9b6f667c6f0cb86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const generateRandomID = async (db) => {
    // Generate a random ID
    let tryID = Math.floor(Math.random() * 30000);

    // If the ID already exists, generate it again until unique
    await get(child(ref(db), "lfg-test/users")).then(async snapshot => {
        if (snapshot.exists())
            for (let id in snapshot.val()) {
                if (id == tryID) tryID = await generateRandomID(db);
            }
    });

    return tryID;
}

const writeProfileData = async (uName, fName, lName, bio, userRole, pronouns, pInt, rInt, avail, myLinks, mySkills) => {
    const db = getDatabase(app);
    const uID = await generateRandomID(db);

    // Encode/create strings
    const realName = `${fName} ${lName}`;
    const userName = encodeURI(uName);
    const eBio = encodeURI(bio);
    const ePronouns = encodeURI(pronouns);
    const epint = encodeURI(pInt);
    const erint = encodeURI(rInt);

    // Set reference and write
    const r = ref(db, `lfg-test/users/${uID}`);
    set(r, {
        username: userName,
        profile: {
            name: realName,
            pronouns: ePronouns,
            bio: eBio,
            role: userRole,
            projectInterests: epint,
            roleInterests: erint,
            availability: avail,
            links: myLinks,
            skills: mySkills
        }
    });
}

const init = () => {
    let linkHolder = [];
    let skillHolder = [];

    // Get HTML elements
    const fname = document.querySelector("#fname");
    const lname = document.querySelector("#lname");
    const uname = document.querySelector("#uname");
    const bio = document.querySelector("#bio");
    const role = document.querySelector("#role");
    const submit = document.querySelector("#create-profile");
    const pronounBox = document.querySelector("#pronouns");
    const pIntInput = document.querySelector("#proj-interests");
    const rIntInput = document.querySelector("#role-interests");
    const availInput = document.querySelector("#availability");
    const skillDiv = document.querySelector("#skills");
    const skillTextInput = document.querySelector("#skill-name");
    const skillType = document.querySelector("#skill-type");
    const featured = document.querySelector("#featured")
    const endorseProj = document.querySelector("#endorse-project");
    const endorser = document.querySelector("#endorser")
    const endorseText = document.querySelector("#endorse-text");
    const skillAdd = document.querySelector("#add-skills");
    const skillClear = document.querySelector("#clear-skills");
    const linkDiv = document.querySelector("#links");
    const linkTextInput = document.querySelector("#link-name");
    const linkURLInput = document.querySelector("#link-url");
    const linkAdd = document.querySelector("#add-link");
    const linkClear = document.querySelector("#clear-links");

    // Submission event
    submit.onclick = () => {
        let pieces = pronounBox.querySelectorAll("input");
        const pronouns = pieces[0].value + "/" + pieces[1].value;
        writeProfileData(
            uname.value,
            fname.value,
            lname.value,
            bio.value,
            role.value,
            pronouns,
            pIntInput.value,
            rIntInput.value,
            availInput.value,
            linkHolder,
            skillHolder
        );
    }

    skillAdd.onclick = () => {
        let newSkill = document.createElement("p");
        newSkill.innerText = skillTextInput.value + ", " + skillType.value + ", " + featured.checked + ", " + endorseProj.value + ", " + endorser.value + ", " + endorseText.value;
        skillDiv.appendChild(newSkill);
        skillHolder.push({
            skill: skillTextInput.value,
            type: skillType.value,
            featured: featured.checked,
            endorsed: (endorseText.value.length > 0 || endorseProj.value.length > 0 || endorser.value.length > 0),
            endorsement: endorseText.value,
            endorseProject: endorseProj.value,
            endorser: endorser.value
        });
    }
    skillClear.onclick = () => {
        skillDiv.innerHTML = "";
        skillHolder = [];
    }

    linkAdd.onclick = () => {
        let newLink = document.createElement("a");
        newLink.href = linkURLInput.value;
        newLink.innerHTML = linkTextInput.value;
        linkDiv.appendChild(newLink);
        linkHolder.push({
            text: linkTextInput.value,
            url: linkURLInput.value
        });
    }
    linkClear.onclick = () => {
        linkDiv.innerHTML = "";
        linkHolder = [];
    }
}

init();