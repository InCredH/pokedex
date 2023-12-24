import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import Pokemon_Modal from "./PokemonModal";
import {
    Grid,
    GridItem,
    Box
} from "@chakra-ui/react";
import { fetchNextPokemons, fetchPokemon, fetchPokemonByName } from "../store";

const PokemonGrid = () => {
    const dispatch = useDispatch();
    const searchResult = useSelector((state) => state.pokemonCache.searchResult) || []
    const searchStr = useSelector((state) => state.pokemonCache.searchStr)
    const searchType = useSelector((state) => state.pokemonCache.searchType)
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const endRef = useRef();
    const [isEnd, setIsEnd] = useState(false);

    
    useEffect(() => {
        if(isEnd && searchStr === "" && searchType === "") {
            dispatch(fetchNextPokemons())
        }
    }, [isEnd])
    
    useEffect(() => {
        if (searchResult.length === 0) {
          dispatch(fetchPokemonByName(searchStr));
        }
        if(searchStr !== "" && searchResult[0]?.name !== searchStr) {
            console.log("searching for pokemon by name")
            dispatch(fetchPokemonByName(searchStr));
        }
      }, [searchStr, dispatch]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            setIsEnd(entry.isIntersecting)
        })
        observer.observe(endRef.current)
    }, [])

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
            height="85vh"
            overflowY="scroll"
            sx={{ "&::-webkit-scrollbar": { display: "none" } }}
        >
            <Grid
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                gap={6}
                p={4}
            >
                {searchResult.length>0 && searchResult[0].id && searchResult.map((pokemon, index) => (
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
            <h2 ref={endRef} style={{minHeight: "100px", minWidth: "100px"}}></h2>
        </Box>
    );
};

export default PokemonGrid;
