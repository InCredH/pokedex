//Modal Dialog box containing pokemon details
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Button,
    Flex,
    Image,
    Spacer,
    Text,
    Tag,
} from "@chakra-ui/react";
import { getTypeColor } from "../utils/pokemon_meta";
import ProgressBar from "@ramonak/react-progress-bar";
import { pokemonCacheActions, selectedPokemonActions } from "../store";

export default function PokemonModal({ isModalOpen, closeModal }) {
    const selectedPokemon = useSelector((state) => state.pokemon.pokemon);

    const dispatch = useDispatch();

    useEffect(()=> {
        if(!isModalOpen) {
            dispatch(selectedPokemonActions.resetPokemon())
        }

    }, [isModalOpen])

    function getColor(stat) {
        if (stat <= 24) {
            return "#eb4a31"; // light pink (lighter shade of red)
        } else if (stat <= 49) {
            return "#FFA07A"; // gold (lighter shade of orange)
        } else if (stat <= 74) {
            return "#FFD700"; // light yellow
        } else {
            return "#90EE90"; // light green
        }
    }


    return (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
                {selectedPokemon && (
                <ModalBody style={{backgroundColor: getTypeColor(selectedPokemon.types[0].type.name) + "40"}}>
                        <Box py={"15px"} >
                            <Flex direction={"row"} gap={"5px"} >
                                {selectedPokemon.types.map((type)=>(
                                    <Image
                                        src={`/icons/${type.type.name}.svg`}
                                        alt={selectedPokemon.name+type.type.name}
                                        boxSize="50px"
                                        mx={"auto"}
                                        background={getTypeColor(type.type.name)}
                                        rounded={"full"}
                                        my={"auto"}
                                        objectFit={"cover"}
                                        p={"4px"}
                                        style={{ boxShadow: `0 0 20px ${getTypeColor(type.type.name)}` }}
                                    />
                                ))}
                                <Spacer />
                                <Flex direction={"column"} gap={"2px"}>
                                    <Tag variant={"outline"} textColor={"black"} borderColor={selectedPokemon.types[0].type.name}>Height: {selectedPokemon.height}</Tag>
                                    <Tag variant={"outline"} textColor={"black"} borderColor={selectedPokemon.types[0].type.name}>Weight: {selectedPokemon.weight}</Tag>
                                </Flex>
                            </Flex>
                            <Image
                                src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${selectedPokemon.id}.svg`}
                                alt={selectedPokemon.name}
                                boxSize="150px"
                                mx={"auto"}
                            />
                            <Flex direction={"column"}>
                                <br/>
                                <Text mx={"auto"} fontSize={"xx-large"}> {selectedPokemon.name.toUpperCase()} </Text>
                                {selectedPokemon.stats.map((stat, index) => (
                                    <>
                                        <Flex>
                                            <Text fontSize={"larger"}>
                                                {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:{" "}
                                            </Text>
                                            <Spacer />
                                            <Text fontSize={"larger"}>
                                                {stat.base_stat}
                                            </Text>
                                        </Flex>
                                        <ProgressBar customLabel=" " height="15px" bgColor={getColor(stat.base_stat)} completed={stat.base_stat} animateOnRender/>
                                    </>
                                ))}
                                <br />
                                <Button onClick={closeModal} textColor={"white"} _hover={{
                                    backgroundColor: getTypeColor(selectedPokemon.types[0].type.name) + "96",
                                }} bgColor={getTypeColor(selectedPokemon.types[0].type.name)}>Close</Button>
                            </Flex>
                        </Box>

                </ModalBody>
                    )}
            </ModalContent>
        </Modal>
    );
}
