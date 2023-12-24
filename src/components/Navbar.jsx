import React, { useEffect, useState } from 'react';

import { Image, Flex, Input, Text, Center, Spacer, Select, InputGroup, InputLeftAddon, Circle } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { pokemonCacheActions } from '../store';

const Navbar = () => {
    const types = [
        "normal", "fire", "water", "grass", "flying", "fighting", "poison", "electric",
        "ground", "psychic", "ice", "bug", "ghost", "steel", "dragon", "dark", "fairy"]
    const [searchStr, setSearchStr] = useState("")
    const [type, setType] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {
        dispatchEvent({ searchStr, type })
    }, [searchStr, type, dispatch])

    const handleInputChange = (e) => {
        const inputValue = e.target.value
        setSearchStr(inputValue)
    }

    const handleTypeChange = (e) => {
        const typeValue = e.target.value
        setType(typeValue)
    }


    const dispatchEvent = (input) => {
        dispatch(pokemonCacheActions.updateSearchResult(input))
    }


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
                <Image
                    borderRadius={"full"}
                    boxSize={"3%"}
                    src={"/pokemon_logo.png"}
                    alt="logo"
                    marginX={"8px"}
                />
                <Center>
                    <Text fontSize="2xl">Next-Gen Pokedex</Text>
                </Center>
                <Spacer />
                <Center w="30%">
                    <InputGroup style={{ color: "black" }}>
                        <InputLeftAddon backgroundColor={"black"}>
                            <SearchIcon textColor={"white"} />
                        </InputLeftAddon>
                        <Input
                            variant="outline"
                            placeholder="Type a pokemon name" htmlSize={60}
                            width="auto"
                            color="white"
                            mr="5px"
                            onChange={handleInputChange}
                            value={searchStr}
                        />
                    </InputGroup>
                </Center>
                <Select
                    placeholder="Select Type"
                    variant="outline"
                    color="white"
                    width="20%"
                    marginX="5px"
                    value={type}
                    onChange={handleTypeChange}
                >
                    {types.map((type) => (
                        <option style={{ color: "black" }} > {type}</option>
                    ))}
                </Select>
            </Flex >

        </>
    );
}
export default Navbar;
