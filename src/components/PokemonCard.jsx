import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Image, Heading, Text, Flex } from "@chakra-ui/react";

const PokemonCard = ({ pokemonId }) => {
  const [pokemonData, setPokemonData] = useState(null);

  const fetchData = async () => {
    // console.log(pokemonId)
    try {
      const pokemonResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
      );
      setPokemonData(pokemonResponse);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pokemonId]);

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
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
              alt={pokemonData.data.name}
              boxSize="150px"
            />
          </Flex>
          <Heading as="h2" size="md" mb={2} color="white">
            {pokemonData.data.name}
          </Heading>
          {pokemonData.data.types.map((type, index) => (
            <Text key={index} color="white">{type.type.name}</Text>
          ))}
        </>
      )}
    </Box>
  );
};

export default PokemonCard;
