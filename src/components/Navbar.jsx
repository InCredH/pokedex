import React from 'react';

import { Flex, Input, Text, Center, Spacer, Select, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';

export default function Navbar() {
    const types = [
        "normal",
        "fire",
        "water",
        "grass",
        "flying",
        "fighting",
        "poison",
        "electric",
        "ground",
        "psychic",
        "ice",
        "bug",
        "ghost",
        "steel",
        "dragon",
        "dark",
        "fairy"
    ]
    return (
        <>
            <Flex
                as="nav"
                align="center"
                justify="space-center"
                padding="1rem"
                bg="black" // Set background color to black
                color="white" // Set text color to white
            >
                <Center>
                    <Text fontSize="2xl">Next-Gen Pokedex</Text>
                </Center>
                <Spacer />
                <Center w="30%">
                    <InputGroup style={{ color: "black" }}>
                        <InputLeftAddon>
                            <SearchIcon />
                        </InputLeftAddon>
                        <Input
                            variant="filled"
                            placeholder="Type a pokemon name" htmlSize={60}
                            width="auto"
                            color="white"
                            marginX="5px"
                        />
                    </InputGroup>
                </Center>
                <Select
                    placeholder="Select Type"
                    variant="outline"
                    color="white"
                    width="20%"
                    marginX="5px"
                >
                    {types.map((type) => (
                        <option style={{ color: "black" }} > {type}</option>
                    ))}
                </Select>
            </Flex >

        </>
    );
}
