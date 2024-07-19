const decorationsURL = './assets/data/decorations.json';
export const DEC_PREFABS = [];
export const DEC_TEXTURES = [];

// Loading Data
const createDecData = ({ name = 'DecName', src = 'spriteURL', scale = 1, size = { x: 1, y: 1 }, anchor = 0.5, offset = 0, isWall = false, useHalen = false }) => {
    // Takes in the loaded object data and sets the defaults
    if (useHalen)
        scale = 2.5;

    return {
        name,
        src,
        size,
        scale,
        anchor,
        offset,
        isWall,
    }
}

export const loadData = async () => {
    // Forces the site to resolve the promise before accessing the loaded data
    let filePromise = new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = (e) => onLoad(e.target.responseText, resolve);
        xhr.onerror = (e) => console.log(e);
        xhr.open('GET', decorationsURL);
        xhr.send();
    })
    await filePromise;
}

const onLoad = (e, resolve) => {
    let json;
    try {
        json = JSON.parse(e);
    }
    catch {
        console.log("Parse failed...");
        return;
    }
    // Receive the stored data
    let loadedDecs = json.decorations;
    for (let theme of loadedDecs) {
        // Save a reference to each theme data (loading textures)
        DEC_TEXTURES.push(theme);
        for(let dec of theme.data) {
            // Save a prefab of each decoration
            DEC_PREFABS.push(createDecData(dec));
        }
    }
    console.log('done loading prefabs');
    resolve();
}

export const loadDecorationMenu = async () => {
    for (let prefab of DEC_PREFABS) {
        console.log(prefab);
    }
}