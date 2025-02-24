import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function NftCard({ nft }: { nft: any }) {
  return (
    <Card sx={{ width: "340px" }}>
      <CardMedia
        component="img"
        height="240"
        image={nft.url}
        sx={{ width: "100%", objectFit: "fill" }}
      />
      <CardContent>
        {/* <Typography variant="h6" gutterBottom>
          {nft.id}
        </Typography> */}
        <Typography variant="h5" component="div">
          {nft.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {Object.entries(nft.attributes)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NftCard;
