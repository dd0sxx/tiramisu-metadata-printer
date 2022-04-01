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
            // console.log(i)
            let _json = fs.readFileSync(`./scrambleJSON/${i}.json`);
            let json = JSON.parse(_json);
            let gifIndex = [259, 668, 837, 819, 482, 423, 835, 725, 936, 664]
            if (gifIndex.indexOf(i) !== -1) {
                console.log(i)
                json.image = `ipfs://Qmd3QsG1d5yaBpE85KCdDkhZNgm7NrF4Q6oJMRtbokMhH7/${i}.gif`
            } else {
                json.image = `ipfs://Qmd3QsG1d5yaBpE85KCdDkhZNgm7NrF4Q6oJMRtbokMhH7/${i}.png`
            }
            // delete json.compiler
            // json.attributes[0].value = "Tiramisu"
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