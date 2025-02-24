//Hooks
import { useMintCap } from "../../hooks/useMintCap";
import { Box, Divider, Stack, Typography } from "@mui/material";

//Components
import NftPrice from "./NftPrice";
import CreateNft from "./CreateNft";
import Treasury from "./Treasury";
import { useCollectionData } from "../../hooks/useCollectionData";
function IsAdmin() {
  const { data, isPending, error } = useMintCap();
  const { nftsCount } = useCollectionData();

  if (error) {
    return <Box>Error: {error.message}</Box>;
  }

  if (isPending || !data) {
    return <Box>Loading...</Box>;
  }
  return (
    <Stack sx={{ mt: 2 }}>
      {data.isAdmin ? (
        <Stack spacing={2}>
          <NftPrice mintCapId={data.mintCapId ?? ""} key={nftsCount} />
          <Divider sx={{ borderColor: "grey.500" }} />
          <CreateNft mintCapId={data.mintCapId ?? ""} key={nftsCount} />
          <Divider sx={{ borderColor: "grey.500" }} />
          <Treasury mintCapId={data.mintCapId ?? ""} key={nftsCount} />
        </Stack>
      ) : (
        <Typography>You are not an admin</Typography>
      )}
    </Stack>
  );
}

export default IsAdmin;
