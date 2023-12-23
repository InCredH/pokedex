import React, { useEffect, useState } from "react";
import { Box, Image, Heading, Text, Flex } from "@chakra-ui/react";

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
        >
            {pokemonData && (
                <>
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
                    {pokemonData.types.map((type, index) => (
                        <Text key={index} color="white">{type.type.name}</Text>
                    ))}
                </>
            )}
        </Box>
    );
};

export default PokemonCard;
