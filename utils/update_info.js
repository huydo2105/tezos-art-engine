const basePath = process.cwd();
const { NETWORK } = require(`${basePath}/constants/network.js`);
const fs = require("fs");

const {
  baseUri,
  description,
  namePrefix,
  network,
  solanaMetadata,
  tezosConfig,
  gif,
} = require(`${basePath}/src/config.js`);

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

data.forEach((item) => {
  if (network == NETWORK.sol) {
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    item.creators = solanaMetadata.creators;
  } else if (network == NETWORK.tez) {
    // Modify tezos specif metadata
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    item.artifactUri = `${tezosConfig.baseArtifactUri}`;
    item.displayUri = `${tezosConfig.baseDisplayUri}`;
    item.thumbnailUri = `${tezosConfig.baseThumbnailUri}`;
    item.formats = [
      { 
        dimensions: {
          unit: "px",
          value: `${tezosConfig.size.artifactUri.w}x${tezosConfig.size.artifactUri.h}`,
        },
        fileName: gif.artifact.name,
        fileSize: gif.artifact.size,
        mimeType: gif.artifact.type,
        uri: `${tezosConfig.baseArtifactUri}`,
      },
      { 
        dimensions: {
          unit: "px",
          value: `${tezosConfig.size.displayUri.w}x${tezosConfig.size.displayUri.h}`,
        },
        fileName: gif.display.name,
        fileSize: gif.display.size,
        mimeType: gif.display.type,
        uri: `${tezosConfig.baseDisplayUri}`,
      },
      { 
        dimensions: {
          unit: "px",
          value: `${tezosConfig.size.thumbnailUri.w}x${tezosConfig.size.thumbnailUri.h}`,
        },
        fileName: gif.thumbnail.name,
        fileSize: gif.thumbnail.size,
        mimeType: gif.thumbnail.type,
        uri: `${tezosConfig.baseThumbnailUri}`,
      },
    ];
    item.royalties = tezosConfig.royalties;
  } else {
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    item.image = `${baseUri}`;
  }
  fs.writeFileSync(
    `${basePath}/build/json/${item.edition}`,
    JSON.stringify(item, null, 2)
  );
});

fs.writeFileSync(
  `${basePath}/build/json/_metadata.json`,
  JSON.stringify(data, null, 2)
);

if (network == NETWORK.sol) {
  console.log(`Updated description for images to ===> ${description}`);
  console.log(`Updated name prefix for images to ===> ${namePrefix}`);
  console.log(
    `Updated creators for images to ===> ${JSON.stringify(
      solanaMetadata.creators
    )}`
  );
} else if (network == NETWORK.tez) {
  console.log(
    `Updated artifactUri for images to ===> ${tezosConfig.baseArtifactUri}`
  );
  console.log(
    `Updated displayUri for images to ===> ${tezosConfig.baseDisplayUri}`
  );
  console.log(
    `Updated thumbnailUri for images to ===> ${tezosConfig.baseThumbnailUri}`
  );
  console.log(
    `Updated royalties for item to ===> ${JSON.stringify(
      tezosConfig.royalties,
      0,
      2
    )}`
  );
  console.log(`Updated description for images to ===> ${description}`);
  console.log(`Updated name prefix for images to ===> ${namePrefix}`);
} else {
  console.log(`Updated baseUri for images to ===> ${baseUri}`);
  console.log(`Updated description for images to ===> ${description}`);
  console.log(`Updated name prefix for images to ===> ${namePrefix}`);
}
