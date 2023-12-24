//Modal Dialog box containing pokemon details
import React from "react";
import { useSelector } from "react-redux";

import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Progress,
    Flex,
    Image,
    Spacer,
    Text,
    Tag
} from "@chakra-ui/react";
import { getTypeColor } from "../utils/pokemon_meta";

export default function PokemonModal({ isModalOpen, closeModal }) {
    const selectedPokemon = useSelector((state) => state.pokemon.pokemon);

    function getColor(stat) {
        if (stat <= 24) {
            return "red";
        } else if (stat <= 49) {
            return "orange";
        } else if (stat <= 74) {
            return "yellow";
        } else {
            return "green";
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
                                        <Progress backgroundColor={getTypeColor(selectedPokemon.types[0].type.name) + "50"} isAnimated={true} hasStripe rounded={"lg"} value={stat.base_stat} colorScheme={getColor(stat.base_stat)} />
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
