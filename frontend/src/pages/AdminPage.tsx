import { useCurrentAccount } from "@mysten/dapp-kit";
import { Container, Divider, Stack, Typography } from "@mui/material";

//Components
import IsAdmin from "../component/admin/IsAdmin";

export function AdminPage() {
  const account = useCurrentAccount();
  return (
    <Container
      sx={{ mt: 2, p: 2, backgroundColor: "#616161", borderRadius: 4 }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Wallet Status
      </Typography>
      {account ? (
        <Stack spacing={1}>
          <Typography>Wallet Connected</Typography>
          <Typography>Address: {account.address}</Typography>
          <Divider sx={{ borderColor: "grey.500" }} />
        </Stack>
      ) : (
        <Typography>Not Connected</Typography>
      )}
      <IsAdmin key={account?.address} />
    </Container>
  );
}
