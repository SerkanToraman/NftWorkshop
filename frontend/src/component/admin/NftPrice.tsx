import {
  useSignAndExecuteTransaction,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { useCollectionData } from "../../hooks/useCollectionData";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { useState } from "react";
import { setNftMintCost } from "../../utils/contract";

function NftPrice({ mintCapId }: { mintCapId: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [mintPrice, setMintPrice] = useState("");
  const { mintCurrentPrice, refetchCollectionData } = useCollectionData();
  const client = useSuiClient();
  const { mutate: updateNftPriceTransaction } = useSignAndExecuteTransaction({
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
  const updateNftPrice = async () => {
    console.log("mintPrice", mintPrice);
    const costInMist = Number(mintPrice) * 1_000_000_000;
    const tx = setNftMintCost(mintCapId, costInMist);
    updateNftPriceTransaction(
      {
        transaction: tx,
        chain: "sui:testnet",
      },
      {
        onSuccess: async (result) => {
          console.log("result", result.objectChanges);
          await refetchCollectionData();
          setIsEditing(false);
          setMintPrice("");
        },
      },
    );
  };
  return (
    <Stack spacing={2}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        NFT COST
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="subtitle2" fontWeight="bold">
          Current NFT Mint Cost:
        </Typography>
        <Box sx={{ maxWidth: 200 }}>
          <TextField
            variant="outlined"
            size="small"
            value={`${Number(mintCurrentPrice) / 1000000000} SUI`}
            InputProps={{
              readOnly: true,
              sx: { color: "white" },
            }}
          />
        </Box>
        <Button variant="contained" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Update Cost"}
        </Button>
      </Stack>
      {isEditing && (
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            variant="outlined"
            size="small"
            value={mintPrice}
            type="number"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setMintPrice(event.target.value)
            }
            InputProps={{
              sx: { backgroundColor: "white" },
            }}
          />
          <Button variant="contained" onClick={updateNftPrice}>
            Save
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

export default NftPrice;
