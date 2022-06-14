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
      name: "Snoop Dogg test collection",
      slug: "snoopdog-test-collection",
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    },
  ],
  80001: [
    {
      image: "/images/nft-collection.png",
      name: "Snoop Dogg test collection",
      slug: "snoopdog-test-collection-2",
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    },
    {
      image: "/images/nft-collection.png",
      name: "Snoop Dogg test collection 2",
      slug: "snoopdog-test-collection",
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    },
  ],
};

export const getCollectionsByChain = (chainId: number) => collections[chainId];
export const getCollectionBySlug = (chainId: number, slug: string) => {
  return collections[chainId].find((collection) => collection.slug === slug);
};
