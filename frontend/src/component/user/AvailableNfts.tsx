import { Box, Typography } from "@mui/material";
import { useCollectionData } from "../../hooks/useCollectionData";

function AvailableNfts() {
  const { nftsCount } = useCollectionData();

  return (
    <Box>
      <Typography variant="h4">Available NFTs</Typography>
      <Typography>Available Nft Count : {nftsCount}</Typography>
    </Box>
  );
}

export default AvailableNfts;
