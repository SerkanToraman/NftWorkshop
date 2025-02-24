import { Container, Divider, Stack, Typography } from "@mui/material";
import { useCurrentAccount } from "@mysten/dapp-kit";

//Components
import AvailableNfts from "../component/user/AvailableNfts";
import MintNft from "../component/user/MintNft";
import UserNfts from "../component/user/UserNfts";

export function UserPage() {
  const account = useCurrentAccount();

  return (
    <Container
      sx={{ mt: 2, p: 2, backgroundColor: "#616161", borderRadius: 4 }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Wallet Status
      </Typography>
      {account ? (
        <Stack spacing={2}>
          <Typography>Wallet Connected</Typography>
          <Typography>Address: {account.address}</Typography>
          <Divider sx={{ borderColor: "grey.500" }} />
          <AvailableNfts />
          <MintNft />
          <Divider sx={{ borderColor: "grey.500" }} />
          <UserNfts />
        </Stack>
      ) : (
        <Stack spacing={1}>
          <Typography>
            No Wallet Connected, please connect your wallet to mint NFTs
          </Typography>
          <AvailableNfts />
        </Stack>
      )}
    </Container>
  );
}
