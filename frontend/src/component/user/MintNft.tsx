//Hooks
import { useCollectionData } from "../../hooks/useCollectionData";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useQueryClient } from "@tanstack/react-query";

//Contract
import { mintAnNft } from "../../utils/contract";
import { Box, Button } from "@mui/material";
import { useNftData } from "../../hooks/useNftData";

function MintNft() {
  const queryClient = useQueryClient();
  const { mintCurrentPrice, refetchCollectionData } = useCollectionData();
  const { refetchNftData } = useNftData();

  const client = useSuiClient();
  const { mutate: mintAnNftTransaction } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showRawEffects: true,
          showObjectChanges: true,
        },
      }),
  });

  const mintAnNftHandler = async () => {
    if (!mintCurrentPrice) return;
    const tx = mintAnNft(mintCurrentPrice);
    mintAnNftTransaction(
      {
        transaction: tx,
        chain: "sui:testnet",
      },
      {
        onSuccess: async (result) => {
          console.log("result", result.objectChanges);
          await queryClient.invalidateQueries({ queryKey: ["collectionData"] });
          await queryClient.invalidateQueries({ queryKey: ["nftData"] });
          await refetchCollectionData();
          await refetchNftData();
        },
      },
    );
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        variant="contained"
        sx={{ width: "20%" }}
        onClick={mintAnNftHandler}
      >
        Mint NFT
      </Button>
    </Box>
  );
}

export default MintNft;
