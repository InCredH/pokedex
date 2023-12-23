//It will have a basic Logo and name of application
import React from 'react';

import { Flex } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      bg="black" // Set background color to black
      color="white" // Set text color to white
    >Next-Gen Pokedex
    </Flex>
  );
}