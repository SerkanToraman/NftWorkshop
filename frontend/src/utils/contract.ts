import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE_ID, COLLECTION_ID } from "../../constants";

export const setNftMintCost = (
  mintCapId: string,
  cost: number,
): Transaction => {
  const setCostTx = new Transaction();
  setCostTx.moveCall({
    target: `${PACKAGE_ID}::mint::set_mint_price`,
    arguments: [
      setCostTx.object(mintCapId),
      setCostTx.object(COLLECTION_ID),
      setCostTx.pure.u64(cost),
    ],
  });

  return setCostTx;
};

export const createNft = (
  mintCapId: string,
  name: string,
  url: string,
  attributesKeys: string[],
  attributesValues: string[],
): Transaction => {
  const createNftTx = new Transaction();
  console.log("attributesKeys", attributesKeys);
  console.log("attributesValues", attributesValues);
  console.log("mintCapId", mintCapId);
  console.log("name", name);
  console.log("url", url);
  createNftTx.moveCall({
    target: `${PACKAGE_ID}::mint::create_data`,
    arguments: [
      createNftTx.object(mintCapId),
      createNftTx.object(COLLECTION_ID),
      createNftTx.pure.string(name),
      createNftTx.pure.string(url),
      createNftTx.makeMoveVec({
        type: "0x1::string::String",
        elements: attributesKeys.map((option) =>
          createNftTx.pure.string(option),
        ),
      }),
      createNftTx.makeMoveVec({
        type: "0x1::string::String",
        elements: attributesValues.map((option) =>
          createNftTx.pure.string(option),
        ),
      }),
    ],
  });

  return createNftTx;
};

export const mintAnNft = (mintPrice: string): Transaction => {
  const mintAnNftTx = new Transaction();
  const splitCoin = mintAnNftTx.splitCoins(mintAnNftTx.gas, [
    mintAnNftTx.pure.u64(mintPrice),
  ]);
  mintAnNftTx.moveCall({
    target: `${PACKAGE_ID}::mint::mint`,
    arguments: [mintAnNftTx.object(COLLECTION_ID), splitCoin],
  });

  return mintAnNftTx;
};
//this should return 0x2::coin::Coin<0x2::sui::SUI>
export const claimTreasury = (mintCapId: string): Transaction => {
  const claimTreasuryTx = new Transaction();

  console.log("mintCapId", mintCapId);
  console.log("COLLECTION_ID", COLLECTION_ID);
  console.log("PACKAGE_ID", PACKAGE_ID);
  claimTreasuryTx.moveCall({
    target: `${PACKAGE_ID}::mint::claim_treasury`,
    arguments: [
      claimTreasuryTx.object(mintCapId),
      claimTreasuryTx.object(COLLECTION_ID),
    ],
  });
  claimTreasuryTx.setGasBudget(1_000_000);

  return claimTreasuryTx;
};
