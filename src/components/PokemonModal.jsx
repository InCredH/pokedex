//Modal Dialog box containing pokemon details
import React from "react";

import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

export default function PokemonModal({
  isModalOpen,
  closeModal,
  selectedPokemon,
}) {
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
              <p>
                Display more characteristics of Pokemon with ID:{" "}
                {selectedPokemon}
              </p>
              <Button onClick={closeModal}>Close</Button>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
