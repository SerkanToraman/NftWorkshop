module nft::mint;

use nft::{cap::MintCap, examplenft::{Self, ExampleNFTData}};
use std::string::String;
use sui::{
    balance::{Self, Balance},
    coin::Coin,
    package,
    sui::SUI,
    table_vec::{Self, TableVec}
};

// === Structs ===

/// The data of a collection of NFTs.
public struct CollectionData has store, key {
    /// The unique identifier of the collection.
    id: UID,
    /// The NFT Datas in the collection.
    nfts: TableVec<ExampleNFTData>,
    /// Treasury
    treasury: Balance<SUI>,
    /// Minting price
    mint_price: u64,
}

public struct MINT() has drop;

/// === Constants ===

const MINT_PRICE: u64 = 1;

/// === Initializer ===

fun init(otw: MINT, ctx: &mut TxContext) {
    package::claim_and_keep(otw, ctx);

    let collection = CollectionData {
        id: object::new(ctx),
        nfts: table_vec::empty<ExampleNFTData>(ctx),
        treasury: balance::zero<SUI>(),
        mint_price: MINT_PRICE,
    };

    transfer::share_object(collection);
}

/// === Public Functions ===

/// Mint an NFT from the collection.
/// * `collection`: The collection to mint the NFT from.
/// * `coin`: The coin to pay for the minting.
/// * `ctx`: The context of the transaction.
public entry fun mint(
    collection: &mut CollectionData,
    mut coin: Coin<SUI>,
    ctx: &mut TxContext,
) {
    // Assert that the coin value is greater than or equal to the mint price.
    assert!(coin.value() >= collection.mint_price);

    // Join the coin to the treasury.
    collection
        .treasury
        .join(coin.split(collection.mint_price, ctx).into_balance());

    // Pop the last NFT data from the collection.
    let nft_data = collection.nfts.pop_back();

    // Mint the NFT.
    let nft = examplenft::mint(nft_data, ctx);

    // If the coin value is 0, destroy the coin.
    if (coin.value() == 0) {
        coin.destroy_zero();
    } else {
        // Otherwise, transfer the coin to the sender.
        transfer::public_transfer(coin, ctx.sender());
    };

    // Transfer the NFT to the sender.
    transfer::public_transfer(nft, ctx.sender());
}

/// === Admin Functions ===

/// Create a new NFT data and add it to the collection.
/// * `cap`: The cap to prove ownership of the collection.
/// * `collection`: The collection to add the NFT data to.
/// * `name`: The name of the NFT.
/// * `url`: The URL of the NFT.
/// * `attribute_keys`: The keys of the attributes of the NFT.
/// * `attribute_values`: The values of the attributes of the NFT.
public fun create_data(
    _: &MintCap,
    collection: &mut CollectionData,
    name: String,
    url: String,
    attribute_keys: vector<String>,
    attribute_values: vector<String>,
) {
    // Assert that the attribute keys and values are of the same length.
    assert!(attribute_keys.length() == attribute_values.length());

    // Add the NFT data to the collection.
    collection
        .nfts
        .push_back(
            examplenft::create_data(
                name,
                url,
                attribute_keys,
                attribute_values,
            ),
        )
}

/// Set the mint price of the collection.
/// * `cap`: The cap to prove ownership of the collection.
/// * `collection`: The collection to set the mint price of.
/// * `mint_price`: The new mint price of the collection.
public fun set_mint_price(
    _: &MintCap,
    collection: &mut CollectionData,
    mint_price: u64,
) {
    collection.mint_price = mint_price;
}

/// Claim the treasury of the collection.
/// * `cap`: The cap to prove ownership of the collection.
/// * `collection`: The collection to claim the treasury of.
/// * `ctx`: The context of the transaction.
/// * `return`: The treasury of the collection.
public fun claim_treasury(
    _: &MintCap,
    collection: &mut CollectionData,
    ctx: &mut TxContext,
): Coin<SUI> {
    let value = collection.treasury.value();

    collection.treasury.split(value).into_coin(ctx)
}
