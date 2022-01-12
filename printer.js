const fs = require('fs')

async function print (path) {
    try {
        const files = fs.readdirSync(path);
        for (let i = 0; i < files.length; i++) {
            const metadata = {
                name: `Silhouette Punk #${i}`,
                description: `10,000 Silhouette Punks together create a single conceptual art piece on the Ethereum Blockchain.\n
                \n
                Silhouette Punks are conceptual art: They exist to promote thought and ask questions.\n
                \n
                About values, status, identity, creativity, communication, how we are different, how we are the same.\n
                \n
                They provide no answers. They reflect.\n
                \n
                This art project is not associated with the legendary Crypto Punks which they reference or Larva Labs.\n
                \n
                Silhouette Punks are not intended to be a vehicle for speculation. They may have no monetary value.\n
                \n
                They are an idea. Sold or unsold, as an artistic expression, their value is: They exist.\n
                \n
                We hope they add to the conversation.`,
                image: `${'ipfs://abc/'}${i}.png`,
                attributes: [
                    {
                        "trait_type": "Color", 
                        "value": "Black"
                    },
                    {
                        "trait_type": "Background", 
                        "value": "Blue"
                    },
                ]
            }
            fs.writeFileSync(`./json/${i}.json`, JSON.stringify(metadata));
        }
    } catch (error) {
        console.error(`Got an error trying to read dir: ${error.message}`);
    }
}

print('../../Downloads/0-9999')