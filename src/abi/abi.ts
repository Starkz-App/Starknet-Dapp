export const abi = [
    {
        "type": "struct",
        "name": "core::integer::u256",
        "members": [
            {
                "name": "low",
                "type": "core::integer::u128"
            },
            {
                "name": "high",
                "type": "core::integer::u128"
            }
        ]
    },
    {
        "type": "struct",
        "name": "core::array::Span::<core::felt252>",
        "members": [
            {
                "name": "snapshot",
                "type": "@core::array::Array::<core::felt252>"
            }
        ]
    },
    {
        "type": "function",
        "name": "on_erc721_received",
        "inputs": [
            {
                "name": "operator",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "from",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "token_id",
                "type": "core::integer::u256"
            },
            {
                "name": "data",
                "type": "core::array::Span::<core::felt252>"
            }
        ],
        "outputs": [
            {
                "type": "core::felt252"
            }
        ],
        "state_mutability": "view"
    },
    {
        "type": "impl",
        "name": "SRC5Impl",
        "interface_name": "openzeppelin_introspection::interface::ISRC5"
    },
    {
        "type": "enum",
        "name": "core::bool",
        "variants": [
            {
                "name": "False",
                "type": "()"
            },
            {
                "name": "True",
                "type": "()"
            }
        ]
    },
    {
        "type": "interface",
        "name": "openzeppelin_introspection::interface::ISRC5",
        "items": [
            {
                "type": "function",
                "name": "supports_interface",
                "inputs": [
                    {
                        "name": "interface_id",
                        "type": "core::felt252"
                    }
                ],
                "outputs": [
                    {
                        "type": "core::bool"
                    }
                ],
                "state_mutability": "view"
            }
        ]
    },
    {
        "type": "constructor",
        "name": "constructor",
        "inputs": []
    },
    {
        "type": "event",
        "name": "openzeppelin_token::erc721::erc721_receiver::ERC721ReceiverComponent::Event",
        "kind": "enum",
        "variants": []
    },
    {
        "type": "event",
        "name": "openzeppelin_introspection::src5::SRC5Component::Event",
        "kind": "enum",
        "variants": []
    },
    {
        "type": "event",
        "name": "starkz::mock::Receiver::Receiver::Event",
        "kind": "enum",
        "variants": [
            {
                "name": "ERC721ReceiverEvent",
                "type": "openzeppelin_token::erc721::erc721_receiver::ERC721ReceiverComponent::Event",
                "kind": "flat"
            },
            {
                "name": "SRC5Event",
                "type": "openzeppelin_introspection::src5::SRC5Component::Event",
                "kind": "flat"
            }
        ]
    }
];