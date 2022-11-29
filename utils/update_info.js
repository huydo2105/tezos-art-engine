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
    tezosConfigArtist = tezosConfig[0];
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    item.artifactUri = `${tezosConfigArtist.baseArtifactUri}/${item.edition}.png`;
    item.displayUri = `${tezosConfigArtist.baseDisplayUri}/${item.edition}.png`;
    item.thumbnailUri = `${tezosConfigArtist.baseThumbnailUri}/${item.edition}.png`;
    item.formats = [
      {
        mimeType: "image/png",
        uri: `${tezosConfigArtist.baseArtifactUri}/${item.edition}.png`,
        dimensions: {
          value: `${tezosConfigArtist.size.artifactUri.w}x${tezosConfigArtist.size.artifactUri.h}`,
          unit: "px",
        },
      },
      {
        mimeType: "image/png",
        uri: `${tezosConfigArtist.baseDisplayUri}/${item.edition}.png`,
        dimensions: {
          value: `${tezosConfigArtist.size.displayUri.w}x${tezosConfigArtist.size.displayUri.h}`,
          unit: "px",
        },
      },
      {
        mimeType: "image/png",
        uri: `${tezosConfigArtist.baseThumbnailUri}/${item.edition}.png`,
        dimensions: {
          value: `${tezosConfigArtist.size.thumbnailUri.w}x${tezosConfigArtist.size.thumbnailUri.h}`,
          unit: "px",
        },
      },
    ];
    // item.royalties = tezosConfigArtist.royalties;
  } else {
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    item.image = `${baseUri}/${item.edition}.png`;
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
    `Updated artifactUri for images to ===> ${tezosConfigArtist.baseArtifactUri}`
  );
  console.log(
    `Updated displayUri for images to ===> ${tezosConfigArtist.baseDisplayUri}`
  );
  console.log(
    `Updated thumbnailUri for images to ===> ${tezosConfigArtist.baseThumbnailUri}`
  );
  // console.log(
  //   `Updated royalties for item to ===> ${JSON.stringify(
  //     tezosConfigArtist.royalties,
  //     0,
  //     2
  //   )}`
  // );
  console.log(`Updated description for images to ===> ${description}`);
  console.log(`Updated name prefix for images to ===> ${namePrefix}`);
} else {
  console.log(`Updated baseUri for images to ===> ${baseUri}`);
  console.log(`Updated description for images to ===> ${description}`);
  console.log(`Updated name prefix for images to ===> ${namePrefix}`);
}
