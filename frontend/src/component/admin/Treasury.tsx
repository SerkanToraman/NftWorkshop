//Hooks
import { useSuiClient } from "@mysten/dapp-kit";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { useCollectionData } from "../../hooks/useCollectionData";
//Components
import { Box, Button, Typography } from "@mui/material";
import { claimTreasury } from "../../utils/contract";

function Treasury({ mintCapId }: { mintCapId: string }) {
  const { treasury, refetchCollectionData } = useCollectionData();

  const client = useSuiClient();
  const { mutate: claimTreasuryTransaction } = useSignAndExecuteTransaction({
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

  const claimTreasuryHandler = async () => {
    const tx = claimTreasury(mintCapId);
    claimTreasuryTransaction(
      {
        transaction: tx,
        chain: "sui:testnet",
      },
      {
        onSuccess: async (result) => {
          console.log("result", result.objectChanges);
          await refetchCollectionData();
        },
      },
    );
  };
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Treasury
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="subtitle1">Treasury Balance: </Typography>
        <Typography variant="subtitle1">{treasury} SUI</Typography>
        <Button
          variant="contained"
          sx={{ ml: 2 }}
          onClick={claimTreasuryHandler}
        >
          Claim Treasury
        </Button>
      </Box>
    </Box>
  );
}

export default Treasury;
