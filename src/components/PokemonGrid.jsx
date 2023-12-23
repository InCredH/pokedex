import React, { useState } from "react";
import PokemonCard from "./PokemonCard";
import Pokemon_Modal from "./PokemonModal";
import {
  Grid,
  GridItem,
  Box
} from "@chakra-ui/react";

const PokemonGrid = () => {
  const pokemonIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // An array of Pokemon IDs
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePokemonClick = (pokemonId) => {
    setSelectedPokemon(pokemonId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <Box
      maxHeight="470px"
      overflowY="scroll"
      sx={{ "&::-webkit-scrollbar": { display: "none" } }}
    >
      <Grid
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={6}
        p={4}
      >
        {pokemonIds.map((pokemonId) => (
          <GridItem
            key={pokemonId}
            onClick={() => handlePokemonClick(pokemonId)}
          >
            <PokemonCard pokemonId={pokemonId} />
          </GridItem>
        ))}
      </Grid>

      <Pokemon_Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedPokemon={selectedPokemon}
      />
    </Box>
  );
};

export default PokemonGrid;
