const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

// `const network = NETWORK.eth;
const network = NETWORK.tez;

// General metadata for Ethereum
const namePrefix = "Joko test tokens";
const description = "Joko tokens enable owners watch their favourite artist BTS.";
const baseUri = "ipfs://QmQc8NbrT2KDZrQRTv62q9bPYL4W9m8FfZTVWyoq6ZMnUf";

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

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 20,
    layersOrder: [
      { name: "Background" },
      { name: "Eyeball" },
      { name: "Eye color" },
      { name: "Iris" },
      { name: "Shine" },
      { name: "Bottom lid" },
      { name: "Top lid" },
    ],
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

const debugLogs = true;

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
  creators: ["Lojay https://rarible.com/ulfric","Sutuburg https://rarible.com/reza-mind-artist"],
  isBooleanAmount: true,
  shouldPreferSymbol: false,
  decimals: 0,
  symbol: "JOKO",
  rights: "All right reserved.",
  baseArtifactUri: baseUri,
  baseDisplayUri: "ipfs://QmUgxbjVWWZFQhy9Pnz6f3nPqrRph2pJJ9TGiaheksUWs5",
  baseThumbnailUri: "ipfs://QmbLW8RbfgnxK9VK6Jzz9EYhXSxo4L5q4G3hxvszBZ3TDo",
  size: {
    artifactUri: { w: format.width, h: format.height },
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
