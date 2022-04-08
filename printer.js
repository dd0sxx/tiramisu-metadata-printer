const fs = require('fs')

async function print (path) {
    try {
        let num = 0;
        const files = fs.readdirSync(path);
        for (let i = 0; i < files.length; i++) {
            console.log(files[i])
            let files2 = fs.readdirSync(`${path}/${files[i]}`);
            for(let j = 1; j <= files2.length / 2; j++) {
                let _json = fs.readFileSync(`${path}/${files[i]}/${j}.json`); 
                let _png = fs.readFileSync(`${path}/${files[i]}/${j}.png`); 
                fs.writeFileSync(`./json/${num}.json`, _json);
                fs.writeFileSync(`./png/${num}.png`, _png);
                num++
            }
        }
    } catch (error) {
        console.error(`Got an error trying to read dir: ${error.message}`);
    }
}

async function clean () {
    try {
        const files = fs.readdirSync('./scrambleJSON');
        for (let i = 0; i < files.length; i++) {
            let _json = fs.readFileSync(`./scrambleJSON/${i}.json`);
            let json = JSON.parse(_json);

            let gifIndex = [259, 668, 837, 819, 482, 423, 835, 725, 936, 664]
            if (gifIndex.indexOf(i) !== -1) {
                json.image = `ipfs://QmWQkioZzP291SjwmKqvtFFQhKVE9UJQSBqVkgDygbQTL4/${i}.gif`
            } else {
                json.image = `ipfs://QmWQkioZzP291SjwmKqvtFFQhKVE9UJQSBqVkgDygbQTL4/${i}.png`
            }

            // delete json.compiler
            // json.attributes[0].value = "Tiramisu"
            

            // json.attributes.forEach((item, j) => {
         
            // //                 // if (json.attributes[j]?.value === "crumb_1.png") {json.attributes[j].value = "crumb 1"}
            // //                 // if (json.attributes[j]?.value === "crumb_2.png") {json.attributes[j].value = "crumb 2"}
            // //                 // if (json.attributes[j]?.value === "crumb_3.png") {json.attributes[j].value = "crumb 3"}
            // //                 // if (json.attributes[j]?.value === "crumb_4.png") {json.attributes[j].value = "crumb 4"}
            // //                 // if (json.attributes[j]?.value === "crumb_5.png") {json.attributes[j].value = "crumb 5"}
            // //                 // if (json.attributes[j]?.value === "crumb_6.png") {json.attributes[j].value = "crumb 6"}
                
            // //                 // if (json.attributes[j].value === "gold fork") {json.attributes[j].trait_type = "Utensils"}
            // //                 // if (json.attributes[j].value === "plastic fork") {json.attributes[j].trait_type = "Utensils"}
            // //                 // if (json.attributes[j].value === "silver fork") {json.attributes[j].trait_type = "Utensils"}
            // //                 // if (json.attributes[j].value === "gold spoon") {json.attributes[j].trait_type = "Utensils"}
            // //                 // if (json.attributes[j].value === "plastic spoon") {json.attributes[j].trait_type = "Utensils"}
            // //                 // if (json.attributes[j].value === "silver spoon") {json.attributes[j].trait_type = "Utensils"}
            // //                 // if (json.attributes[j].value === "gold spork") {json.attributes[j].trait_type = "Utensils"}
            // //                 // if (json.attributes[j].value === "plastic spork") {json.attributes[j].trait_type = "Utensils"}
            // //                 // if (json.attributes[j].value === "silver spork") {json.attributes[j].trait_type = "Utensils"}
            //                       if (json.attributes[j].trait_type === undefined) {console.log(i)}

            // }) 
            
            // json.name = `Tiramisu #${i}`
            let out = JSON.stringify(json)
            fs.writeFileSync(`./scrambleJSON/${i}.json`, out)
        }
    } catch (error) {
        console.error(`Got an error trying to read dir: ${error.message}`);
    }
}
async function deDupe () {
    try {
        let out = []
        const files = fs.readdirSync('./json');
        for (let i = 0; i < files.length; i++) {
            let _json = fs.readFileSync(`./json/${i}.json`);
            let json = JSON.parse(_json);
            for (let j = 0; j < files.length; j++) {
                if (j !== i) {
                    let _json2 = fs.readFileSync(`./json/${j}.json`);
                    let json2 = JSON.parse(_json2);
                    if (json2 === json) out.push(i, j)
                }
            }
        }
        console.log(out)
    } catch (error) {
        console.error(`Got an error trying to read dir: ${error.message}`);
    }
}

function tenRandomValues () {
    for (let i = 0; i < 10; i++) {
        let r = Math.floor(Math.random() * 1000)
        console.log(r)
    }
}

// tenRandomValues()

clean()

// deDupe()

// print('../../Downloads/Tiramisu-Final-Art 2')