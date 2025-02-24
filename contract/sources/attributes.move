module nft::attributes;

use std::string::String;
use sui::vec_map::{Self, VecMap};

public struct Attributes has store, drop, copy {
    map: VecMap<String, String>,
}

public fun new(map: VecMap<String, String>): Attributes {
    Attributes { map }
}

public fun from_vec(
    keys: &mut vector<String>,
    values: &mut vector<String>,
): Attributes {
    let mut map = vec_map::empty<String, String>();

    while (keys.length() > 0) {
        let key = keys.pop_back();
        let value = values.pop_back();

        map.insert(key, value);
    };

    new(map)
}
