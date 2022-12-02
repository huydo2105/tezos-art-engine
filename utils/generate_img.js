const fs = require("fs");
const path = require("path");
const basePath = process.cwd();
const buildDir = `${basePath}/build`;
const imagesDir = `${basePath}/build/images`;
const { createCanvas, loadImage, Image } = require(`${basePath}/node_modules/canvas`);

const {
    format,
    layerConfigurations,
} = require(`${basePath}/src/config.js`);

const IMAGE_NAME = "artifact 3.png";

const saveImage = async () => {
    let editionCount = 0;
    const background = await loadImage(`${basePath}/src_img/${IMAGE_NAME}`);
    while (
        editionCount <= layerConfigurations[0].growEditionSizeTo
    )   {
            const canvas = createCanvas(format.width, format.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(background, 0, 0, format.width, format.height); 
            fs.writeFileSync(
                `${buildDir}/images/${editionCount}.png`,
                canvas.toBuffer("image/png")
            );
            editionCount += 1;
        }
}

saveImage();
console.log("Done!")