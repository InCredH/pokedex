import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import Pokemon_Modal from "./PokemonModal";
import {
    Grid,
    GridItem,
    Box
} from "@chakra-ui/react";
import { fetchPokemon } from "../store";

const PokemonGrid = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.pokemonCache.fetched);
    const searchResult = useSelector((state) => state.pokemonCache.searchResult) || []
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePokemonClick = (pokemonId) => {
        dispatch(fetchPokemon(pokemonId));
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
                {searchResult.map((pokemon, index) => (
                    <GridItem
                        key={index}
                        onClick={() => { handlePokemonClick(pokemon.id) }}
                    >
                        <PokemonCard pokemonData={pokemon} />
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
