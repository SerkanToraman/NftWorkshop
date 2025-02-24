module nft::examplenft;

use nft::attributes::{Self, Attributes};
use std::string::String;
use sui::{display, event, package};

// === Structs ===

/// An example NFT.
public struct ExampleNFT has key, store {
    /// The unique identifier of the NFT.
    id: UID,
    /// The name of the NFT.
    name: String,
    /// The URL of the NFT.
    url: String,
    /// The attributes of the NFT.
    attributes: Attributes,
}

/// The data of an example NFT.
public struct ExampleNFTData has store {
    /// The name of the NFT.
    name: String,
    /// The URL of the NFT.
    url: String,
    /// The attributes of the NFT.
    attributes: Attributes,
}

/// OTW of the module
public struct EXAMPLENFT() has drop;

// === Events ===

public struct MintEvent has drop, copy {
    /// The unique identifier of the NFT.
    id: ID,
    /// The name of the NFT.
    name: String,
    /// The URL of the NFT.
    url: String,
    /// The attributes of the NFT.
    attributes: Attributes,
}

// === Initializer ===

fun init(otw: EXAMPLENFT, ctx: &mut TxContext) {
    // Claim a publisher for the module.
    let publisher = package::claim(otw, ctx);

    // Create a display for the NFT.
    let mut display = display::new<ExampleNFT>(&publisher, ctx);

    // Add the name of the NFT to the display.
    display.add(
        b"name".to_string(),
        b"Example NFT #{name}".to_string(),
    );

    // Add the description of the NFT to the display.
    display.add(
        b"description".to_string(),
        b"This is an example NFT".to_string(),
    );

    // Add the image URL of the NFT to the display.
    display.add(
        b"image_url".to_string(),
        b"{url}".to_string(),
    );

    // Add the attributes of the NFT to the display.
    display.add(
        b"attributes".to_string(),
        b"{attributes}".to_string(),
    );

    // Update the version of the display.
    display.update_version();

    // Transfer the publisher and the display to the sender.
    transfer::public_transfer(publisher, ctx.sender());
    transfer::public_transfer(display, ctx.sender());
}

// === Public Package Functions ===

/// Create the data of an example NFT.
/// * `name`: The name of the NFT.
/// * `url`: The URL of the NFT.
/// * `attributes_keys`: The keys of the attributes of the NFT.
/// * `attributes_values`: The values of the attributes of the NFT.
public(package) fun create_data(
    name: String,
    url: String,
    mut attributes_keys: vector<String>,
    mut attributes_values: vector<String>,
): ExampleNFTData {
    let attributes = attributes::from_vec(
        &mut attributes_keys,
        &mut attributes_values,
    );

    ExampleNFTData { name, url, attributes }
}

/// Mint an example NFT.
/// * `data`: The data of the NFT.
/// * `ctx`: The context of the transaction.
public(package) fun mint(
    data: ExampleNFTData,
    ctx: &mut TxContext,
): ExampleNFT {
    let ExampleNFTData { name, url, attributes } = data;

    let nft = ExampleNFT {
        id: object::new(ctx),
        name,
        url,
        attributes,
    };

    event::emit(MintEvent {
        id: object::id(&nft),
        name,
        url,
        attributes,
    });

    nft
}

// === Public View Functions ===

public fun name(nft: &ExampleNFT): String {
    nft.name
}

public fun url(nft: &ExampleNFT): String {
    nft.url
}

public fun attributes(nft: &ExampleNFT): Attributes {
    nft.attributes
}
