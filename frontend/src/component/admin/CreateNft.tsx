import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useState } from "react";
import { createNft } from "../../utils/contract";

function CreateNft({ mintCapId }: { mintCapId: string }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [attributesKeys, setAttributesKeys] = useState<string[]>([]);
  const [attributesValues, setAttributesValues] = useState<string[]>([]);

  const client = useSuiClient();
  const { mutate: createNftTransaction } = useSignAndExecuteTransaction({
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
  const handleCreateNft = async () => {
    const tx = createNft(
      mintCapId,
      name,
      url,
      attributesKeys,
      attributesValues,
    );
    createNftTransaction(
      {
        transaction: tx,
        chain: "sui:testnet",
      },
      {
        onSuccess: (result) => {
          console.log("NFT created successfully");
          console.log("Transaction result:", result);
          console.log("Object changes:", result.objectChanges);
          console.log("Effects:", result.effects);
          setName("");
          setUrl("");
          setAttributesKeys([]);
          setAttributesValues([]);
        },
        onError: (error) => {
          console.error("Error creating NFT:", error);
        }
      },
    );
  };
  return (
    <Box sx={{ pt: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Create NFT
      </Typography>
      <Stack spacing={2} alignItems="center">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            label: { color: "white" },
            input: { color: "white" },
            width: "100%",
          }}
        />
        <TextField
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{
            label: { color: "white" },
            input: { color: "white" },
            width: "100%",
          }}
        />
        {url && (
          <Box sx={{ width: "100%", height: 300, overflow: "hidden" }}>
            <img
              src={url}
              alt="NFT Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        )}
        <TextField
          label="Attributes Keys"
          value={attributesKeys.join(",")}
          onChange={(e) => setAttributesKeys(e.target.value.split(","))}
          sx={{
            label: { color: "white" },
            input: { color: "white" },
            width: "100%",
          }}
        />
        <TextField
          label="Attributes Values"
          value={attributesValues.join(",")}
          onChange={(e) => setAttributesValues(e.target.value.split(","))}
          sx={{
            label: { color: "white" },
            input: { color: "white" },
            width: "100%",
          }}
        />
        <Button
          variant="contained"
          onClick={handleCreateNft}
          sx={{ width: "20%" }}
        >
          Create NFT
        </Button>
      </Stack>
    </Box>
  );
}

export default CreateNft;
