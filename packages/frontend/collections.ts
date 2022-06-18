export type Collection = {
  image: string;
  name: string;
  slug: string;
  address: string;
};

export const collections: { [key: number]: Collection[] } = {
  31337: [
    {
      image: "/images/nft-collection.png",
      name: "Snoop Dogg collection",
      slug: "snoopdog-collection",
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    },
  ],
  80001: [
    {
      image: "/images/nft-collection.png",
      name: "Snoop Dogg collection",
      slug: "snoopdog-collection",
      address: "0xcc9E07cd58ad3f75eEB7b3502E0e9C6b7c3eEf0c",
    },
  ],
};

export const getCollectionsByChain = (chainId: number) => collections[chainId];
export const getCollectionBySlug = (chainId: number, slug: string) => {
  return collections[chainId].find((collection) => collection.slug === slug);
};
