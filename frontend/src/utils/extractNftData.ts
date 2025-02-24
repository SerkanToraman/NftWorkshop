import { SuiObjectResponse } from "@mysten/sui/client";

export function extractNFTData(response: SuiObjectResponse) {
  if (
    !response.data?.content ||
    response.data.content.dataType !== "moveObject"
  ) {
    throw new Error("Invalid NFT data");
  }

  const fields = (response.data.content as any).fields;
  const attributes: Record<string, string> = {};

  // Extract attributes from the map if it exists
  if (fields.attributes?.fields?.map?.fields?.contents) {
    fields.attributes.fields.map.fields.contents.forEach((entry: any) => {
      attributes[entry.fields.key] = entry.fields.value;
    });
  }

  return {
    id: fields.id.id,
    name: fields.name,
    url: fields.url,
    attributes,
  };
}
