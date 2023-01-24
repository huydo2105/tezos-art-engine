const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);
const fs = require("fs");
var mime = require('mime-types')
// `const network = NETWORK.eth;
const network = NETWORK.tez;

// General metadata for Ethereum
const namePrefix = "Joko test tokens";
const description = "Joko tokens enable owners watch their favourite artist BTS.";
const baseUri = "ipfs://QmXRYzEEkUzsu3As1PEHUD6Wh1z1YHSm6UGYgY5zJhR5bu";

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

const ARTIST = {
  name: "Kalibwoy",
  link: "https://rarible.com/ulfric"
}
const PIXEL_ARTIST = {
  name: "Charlie",
  link: "https://objkt.com/profile/lucrece/created"
}
// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 30,
    layersOrder: [
      { name: "Background" },
      { name: "Eyeball" },
      { name: "Eye color" },
      { name: "Iris" },
      { name: "Shine" },
      { name: "Bottom lid" },
      { name: "Top lid" },
    ],
    attributes: [
      { name: "Tier", value: "3" },
      { name: "Artist", value: ARTIST.name },
      { name: "Pixel artist", value: PIXEL_ARTIST.name },
    ]
    // layersOrder: [
    //   { name: "Background" },
    //   {
    //     name: "Back Accessory",
    //     // options: {
    //     //   bypassDNA: true,
    //     // },
    //   },
    //   { name: "Head" },
    //   { name: "Clothes" },
    //   { name: "Eyes" },
    //   { name: "Hair" },
    //   { name: "Head Accessory" },
    //   { name: "Shirt Accessories" },
    // ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const artifact_name = "Caliph - JOKO teaser long (Imran)-.mp4"
const display_name = "Caliph - JOKO teaser long (Imran)-.mp4"
const thumbnail_name = "Caliph - JOKO teaser long (Imran)-.mp4"
const artifactVideo = fs.statSync(`${basePath}/src_video/${artifact_name}`)
const displayVideo = fs.statSync(`${basePath}/src_video/${display_name}`)
const thumbnailVideo = fs.statSync(`${basePath}/src_video/${thumbnail_name}`)
const artifactType = mime.lookup(`${basePath}/src_video/${artifact_name}`)
const displayType = mime.lookup(`${basePath}/src_video/${display_name}`)
const thumbnailType = mime.lookup(`${basePath}/src_video/${thumbnail_name}`)

const video = {
  artifact: {
    name: artifact_name,
    size: artifactVideo.size,
    type: artifactType
  },
  display: {
    name: display_name,
    size: displayVideo.size,
    type: displayType
  },
  thumbnail: {
    name: thumbnail_name,
    size: thumbnailVideo.size,
    type: thumbnailType
  }
}

const format = {
  width: 1024,
  height: 1024,
  smoothing: false,
};


const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

/**
 * Tezos specific metadata config.
 * NOTE: Modify this config to generate different metadata.
 */

const tezosConfig = {
  creators: [`${ARTIST.name} ${ARTIST.link}`,`${PIXEL_ARTIST.name} ${PIXEL_ARTIST.link}`],
  isBooleanAmount: true,
  shouldPreferSymbol: false,
  decimals: 0,
  symbol: "JOKO",
  rights: "All right reserved.",
  baseArtifactUri: baseUri,
  baseDisplayUri: "ipfs://QmXRYzEEkUzsu3As1PEHUD6Wh1z1YHSm6UGYgY5zJhR5bu",
  baseThumbnailUri: "ipfs://QmXRYzEEkUzsu3As1PEHUD6Wh1z1YHSm6UGYgY5zJhR5bu",
  size: {
    artifactUri: { w: format.width, h: format.height, r: format.rate },
    displayUri: { w: 500, h: 500 },
    thumbnailUri: { w: 300, h: 300 },
  },
  royalties: {
    decimals: 3,
    shares: {
      tz1cVm8jzr5MN6oH21p54HuWCi69qYzjo7MN: 80,
      tz1hWvP1HXRAmBWQU4ewYUeNNrEdz2sUKDNJ: 50,
      tz1NcYGUWUrcriX5nWmHN6daCDKHQdMUSUDp: 30,
    },
  },
};

/**
 * End of tezos specific config.
 */

module.exports = {
  video,
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  tezosConfig,
};
