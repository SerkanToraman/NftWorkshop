module nft::cap;

public struct MintCap has key {
    id: UID,
}

fun init(ctx: &mut TxContext) {
    let cap = MintCap { id: object::new(ctx) };
    transfer::transfer(cap, ctx.sender());
}

public fun burn(cap: MintCap) {
    let MintCap { id } = cap;
    id.delete();
}
