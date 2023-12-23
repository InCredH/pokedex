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
} from "@chakra-ui/react";

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
                <ModalHeader>Pokemon Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {selectedPokemon && (
                        <div>
                            {/* Render more details of the selected Pokemon */}
                            {/* Example: */}
                            Pokemon Name: {selectedPokemon.name}
                            <br />
                            {selectedPokemon.stats.map((stat, index) => (
                                <>
                                    {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:{" "}
                                    <Progress value={stat.base_stat} colorScheme={getColor(stat.base_stat)} />
                                </>
                            ))}
                            <br />
                            <Button onClick={closeModal}>Close</Button>
                        </div>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
