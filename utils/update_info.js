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
  video,
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
        mimeType: video.artifact.type,
        fileName: video.artifact.name,
        fileSize: video.artifact.size,
        uri: `${tezosConfig.baseArtifactUri}`,
      },
      {
        mimeType: video.display.type,
        fileName: video.display.name,
        fileSize: video.display.size,
        uri: `${tezosConfig.baseDisplayUri}`,
      },
      {
        mimeType: video.thumbnail.type,
        fileName: video.thumbnail.name,
        fileSize: video.thumbnail.size,
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
