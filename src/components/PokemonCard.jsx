import React from "react";
import { Box, Image, Heading, Text, Flex, Tag } from "@chakra-ui/react";
import { getTypeColor } from "../utils/pokemon_meta";

const PokemonCard = ({ pokemonData }) => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            p={4}
            mb={4}
            textAlign="center"
            background={getTypeColor(pokemonData.types[0].type.name)+"90"}
            backdropFilter={"blur(3px)"}
            backgroundImage={"/pokeball_white.png"}
            backgroundSize={"70%"}
            backgroundRepeat={"no-repeat"}
            backgroundPosition={"center"}
            display={"flex"}
            flexDirection={"column"}
        >
            {pokemonData && (
                <div>
                    <Flex justify="center" mb={4}>
                        <Image
                            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`}
                            alt={pokemonData.name}
                            boxSize="150px"
                        />
                    </Flex>
                    <Heading as="h2" size="md" mb={2} color="white">
                        {pokemonData.name}
                    </Heading>
                    <Flex
                        justify={"center"}
                        gap={"5px"}
                    >
                        {pokemonData.types.map((type, index) => (
                            <Tag textColor={"white"} background={getTypeColor(pokemonData.types[0].type.name)} key={index}>{type.type.name}</Tag>
                        ))}
                    </Flex>
                </div>
            )}
        </Box>
    );
};

export default PokemonCard;
