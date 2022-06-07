type Collection = {
  image: string;
  name: string;
  address: string;
};

export const collections: { [key: number]: Collection[] } = {
  31337: [
    {
      image: "/images/nft-collection.png",
      name: "Snoop Dogg test collection",
      address: "",
    },
  ],
};

export const getCollectionByChain = (chainId: number) => collections[chainId];
