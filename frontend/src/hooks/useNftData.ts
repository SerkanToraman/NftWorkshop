import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { SuiClient } from "@mysten/sui/client";
import { useQuery } from "@tanstack/react-query";

//Utils
import { extractNFTData } from "../utils/extractNftData";

//Constants
import { EXAMPLE_NFT_TYPE } from "../../constants";

export function useNftData() {
  const account = useCurrentAccount();
  const { data: nftData, refetch: refetchNftData } = useQuery({
    queryKey: ["nftsData"],
    queryFn: async () => {
      if (!account) throw new Error("No account found");
      const client = new SuiClient({ url: getFullnodeUrl("testnet") });

      const nftIdsData = await client.getOwnedObjects({
        owner: account.address ?? "",
        filter: {
          StructType: EXAMPLE_NFT_TYPE,
        },
      });

      const nftIds = nftIdsData.data.map((nft) => nft.data?.objectId);

      //Get the nft data according to the nft ids
      //Run the query for each nft id
      //Push into an array
      const nftData: any[] = [];
      await Promise.all(
        nftIds.map(async (id) => {
          if (!id) return;
          const nftResponse = await client.getObject({
            id,
            options: {
              showContent: true,
            },
          });
          nftData.push(extractNFTData(nftResponse));
        }),
      );
      console.log("nftData", nftData);
      return { nftData };
    },
  });
  console.log("nftData", nftData);

  return { nftData, refetchNftData };
}
