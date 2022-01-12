const fs = require('fs').promises;
const {URI} =  require('./config.js');

// let skulls; // temp

let counter = 1;
let myths = 1;
let potions = 1;
let keys = 1;
let customs = 1;
let mythsLength;
let potionsLength;
let keysLength;
let customsLength;



async function pickRand() {
    const x = Math.random()
    if (x <= 0.063 && potions <= potionsLength) { //potions 6.3333%
        await writePotion(counter)
        console.log(`wrote potion #${potions}`);
        await copyAndRename(`../potions/${potions}.png`, counter, counter)
        potions++
    }
    else if (x > 0.063 && x < 0.967 && myths <= mythsLength){ // myths
        await writeMyth(counter)
        console.log(`wrote myths #${myths}`);
        await copyAndRename(`./scramble/${myths}.png`, counter, counter)
        myths++
    }
    else if (keys <= keysLength) { //keys 3.4364%
        await writeKey(counter)
        console.log(`wrote key #${keys}`);
        await copyAndRename(`../keys/${keys}.png`, counter, counter)
        keys++
    } else {
      if (potions <= potionsLength) { 
        await writePotion(counter)
        console.log(`wrote potion #${potions}`);
        await copyAndRename(`../potions/${potions}.png`, counter, counter)
        potions++
      } else {
        await writeMyth(counter)
        console.log(`wrote myths #${myths}`);
        await copyAndRename(`./scramble/${myths}.png`, counter, counter)
        myths++
      }
    }
        // // temp
        // await writeSkull(counter)
        // console.log(`wrote skull #${counter}`);
        // await copyAndRename(`../Skulls/${counter}.png`, counter, counter)
        // skulls++
        // // console.log('out of supply trying again');

    counter++
}

async function readDir(path) {
    try {
        const files = await fs.readdir(path);
        return files.length
    } catch (error) {
        console.error(`Got an error trying to read dir: ${error.message}`);
    }
}

async function getFolderLengths () {
    try {
        // skulls = await readDir('../Skulls') // temp

        mythsLength = await readDir('./scramble')
        potionsLength = await readDir('../potions')
        keysLength = await readDir('../keys')
        customsLength = await readDir('../customs')
    } catch (error) {
        console.error(error)
    }
}

async function copyAndRename(path, oldId, newId) {
    try {
        await fs.copyFile(path, `./temp/${oldId}.png`);
        await fs.rename(`./temp/${oldId}.png`, `./temp/${newId}.png`)
        await fs.copyFile(`./temp/${newId}.png`, `./results/${newId}.png`);
        console.log(`${path} was copied, moved and renamed to ` + `${newId}.png`);
      } catch (error) {
        console.error('The file could not be copied ', error);
      }
}


// async function writeSkull(id) {
//     try {
//       const metadata = {
//         name: `skull #${id}`,
//         description: `${id}/100 \n There will only be 100 Oilys Skulls.`,
//         image: `${URI}${id}.png`,
//         attributes: [{ 
//           "trait_type": "Type", 
//           "value": "Skull"
//         }]
//       }
//       await fs.writeFile(`../oilys-json/${id}.json`, JSON.stringify(metadata));
//     } catch (error) {
//       console.error(`Got an error trying to write to a file: ${error.message}`);
//     }
//   }

async function writeMyth(id) { //TODO
    try {
      const metadata = {
        name: `Myth #${myths}`,
        description: `Oilys is 1/1 hand drawn collection by Logan Larkin.`,
        image: `${URI}${id}.png`,
        attributes: [{ 
          "trait_type": "Type", 
          "value": "Myth"
        }] 
      }
      await fs.writeFile(`../oilys-json/${id}.json`, JSON.stringify(metadata));
    } catch (error) {
      console.error(`Got an error trying to write to a file: ${error.message}`);
    }
  }

  async function writePotion(id) { //TODO
    try {
      const metadata = {
        name: `Potion #${potions}`,
        description: `Oilys is 1/1 hand drawn collection by Logan Larkin.`,
        image: `${URI}${id}.png`,
        attributes: [{ 
          "trait_type": "Type", 
          "value": "Potion"
        }] 
      }
      await fs.writeFile(`../oilys-json/${id}.json`, JSON.stringify(metadata));
    } catch (error) {
      console.error(`Got an error trying to write to a file: ${error.message}`);
    }
  }

  async function writeKey(id) { //TODO
    try {
      const metadata = {
        name: `Key #${keys}`,
        description: `Oilys is 1/1 hand drawn collection by Logan Larkin.`,
        image: `${URI}${id}.png`,
        attributes: [{ 
          "trait_type": "Type", 
          "value": "Key"
        }] 
      }
      await fs.writeFile(`../oilys-json/${id}.json`, JSON.stringify(metadata));
    } catch (error) {
      console.error(`Got an error trying to write to a file: ${error.message}`);
    }
  }
  
  async function writeCustom(id) { //TODO
    try {
      const metadata = {
        name: `Custom #${customs}`,
        description: `Oilys is 1/1 hand drawn collection by Logan Larkin.`,
        image: `${URI}${id}.png`,
        attributes: [{ 
          "trait_type": "Type", 
          "value": "Custom"
        }] 
      }
      await fs.writeFile(`../oilys-json/${id}.json`, JSON.stringify(metadata));
    } catch (error) {
      console.error(`Got an error trying to write to a file: ${error.message}`);
    }
  }

//   async function moveFile(source, destination) {
//     try {
//       await fs.rename(source, destination);
//       console.log(`Moved file from ${source} to ${destination}`);
//     } catch (error) {
//       console.error(`Got an error trying to move the file: ${error.message}`);
//     }
//   }
  
//   writeSkull(1);
//   readDir('../Skulls');

getFolderLengths().then(async () => {
  //#1
    await writeMyth(counter)
    console.log(`wrote myth #${myths}`);
    await copyAndRename(`./scramble/${myths}.png`, counter, counter)
    myths++
    counter++
    //#2
    await writePotion(counter)
    console.log(`wrote potion #${potions}`);
    await copyAndRename(`../potions/${potions}.png`, counter, counter)
    potions++
    counter++
    for (let i = 3; i <= 18; i++) {
      //customs
      await writeCustom(counter)
      console.log(`wrote custom #${customs}`);
      await copyAndRename(`../customs/${customs}.png`, counter, counter)
      customs++
      counter++
    }
    for (let j = 19; j <= 300; j++) {
        console.log(j)
        await pickRand()
    }
})
