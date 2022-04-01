const fs = require('fs').promises;

let counter = 1;
let tiramisuLength;

let pickedNums = {};

async function Rename(path, oldId, newId) {
    try {
        await fs.copyFile(`./png/${oldId}.png`, `./scrambleTemp/${oldId}.png`);
        await fs.copyFile(`./json/${oldId}.json`, `./scrambleTempJSON/${oldId}.json`);
        await fs.rename(`./scrambleTemp/${oldId}.png`, `./scrambleTemp/${newId}.png`)
        await fs.rename(`./scrambleTempJSON/${oldId}.json`, `./scrambleTempJSON/${newId}.json`)
        await fs.copyFile(`./scrambleTemp/${newId}.png`, `./scramble/${newId}.png`);
        await fs.copyFile(`./scrambleTempJSON/${newId}.json`, `./scrambleJSON/${newId}.json`);
        console.log(`${oldId}.png was copied, moved and renamed to ` + `${newId}.png`);
        console.log(`${oldId}.json was copied, moved and renamed to ` + `${newId}.json`);
      } catch (error) {
        console.error('The file could not be copied ', error);
      }
}

async function readDir(path) {
    try {
        const files = await fs.readdir(path);
        return files.length
    } catch (error) {
        console.error(`Got an error trying to read dir: ${error.message}`);
    }
}

async function l () {
    tiramisuLength = await readDir('./png');
}

const tryRename = async (r, i) => {
    await Rename('./scramble', r, i)
}

l().then(async (res) => {

    for (let i = 0; i < tiramisuLength; i++) {
        let r = Math.floor(Math.random() * tiramisuLength)
        while (pickedNums[r]) {
            r = Math.floor(Math.random() * tiramisuLength)
        }
        try {
            console.log('trying rename ', r, i)
            await tryRename(r, i)
            pickedNums[r] = true;
        } catch (err) {
            console.error(err, r, i)
        }
    }
})