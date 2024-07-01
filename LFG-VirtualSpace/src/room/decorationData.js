const decorationsURL = './assets/data/decorations.json';
export const DEC_PREFABS = [];

// Loading Data
const createDecData = ({ name = 'DecName', src = 'spriteURL', scale = 1, size = { x: 1, y: 1 }, anchor = 0.5, offset = 0, isWall = false, useHalen = false }) => {
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
    let loadedDecs = json.decorations;
    for (let dec of loadedDecs) {
        DEC_PREFABS.push(createDecData(dec));
    }
    console.log('done loading prefabs');
    resolve();
}

export const loadDecorationMenu = async () => {
    for (let prefab of DEC_PREFABS) {
        console.log(prefab);
    }
}