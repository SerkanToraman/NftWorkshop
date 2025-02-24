//Hooks
import { useNftData } from "../../hooks/useNftData";
//Components
import NftCard from "./NftCard";
//Css
import { Box, Container, Stack, Typography } from "@mui/material";

function UserNfts() {
  const { nftData } = useNftData();
  return (
    <Box sx={{ pt: 1, backgroundColor: "#616161", borderRadius: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Your NFTs
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={2}>
        {nftData?.nftData.map((nft) => <NftCard key={nft.id} nft={nft} />)}
      </Stack>
    </Box>
  );
}

export default UserNfts;
