import { useSuiClientQuery } from "@mysten/dapp-kit";

import { COLLECTION_ID } from "../../constants";

interface CollectionData {
  data?: {
    content?: {
      fields?: {
        mint_price?: string;
        treasury?: string;
        nfts?: {
          fields?: {
            contents: {
              fields: {
                id: string;
              };
            }[];
          };
        };
      };
    };
  };
}

export function useCollectionData() {
  const { data: collectionData, refetch: refetchCollectionData } =
    useSuiClientQuery("getObject", {
      id: COLLECTION_ID,
      options: {
        showContent: true,
      },
    });

  const mintCurrentPrice = (collectionData as CollectionData)?.data?.content
    ?.fields?.mint_price;
  const nftsTableId = (collectionData as any)?.data?.content?.fields?.nfts
    ?.fields?.contents?.fields?.id;
  const nftsCount = (collectionData as any)?.data?.content?.fields?.nfts?.fields
    ?.contents?.fields?.size;
  const treasury =
    (collectionData as any)?.data?.content?.fields?.treasury / 1_000_000_000;

  return {
    mintCurrentPrice,
    refetchCollectionData,
    nftsTableId,
    nftsCount,
    treasury,
  };
}
