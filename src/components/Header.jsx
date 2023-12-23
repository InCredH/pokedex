//It will have a search bar and type dropdown
import React from "react";
import { Input,Select,Flex,Box } from "@chakra-ui/react";

export default function Header() {
  return (
    <Flex align="center" justifyContent="center">
      <Input
        variant="filled"
        placeholder="Type a pokemon name"
        htmlSize={60}
        width="auto"
        color="white"
        mr={4}
        ml={10}
        mt={10}
      />
      <Box width="150px" mt={10}>
        <Select
            placeholder="Select Type"
            variant="outline"
            color="white"
        >
            <option value="option1" style={{color:"black"}}>Option 1</option>
            <option value="option2" style={{color:"black"}}>Option 2</option>
            <option value="option3" style={{color:"black"}}>Option 3</option>
        </Select>
      </Box>
    </Flex>
  );
}
