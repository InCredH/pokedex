import React from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  Tag,
  Avatar,
  TagLabel,
  Spacer,
} from "@chakra-ui/react";
import { getTypeColor } from "../utils/pokemon_meta";

const PokemonCard = ({ pokemonData }) => {
  console.log(pokemonData);
  const typeColor =
    pokemonData && pokemonData.types
      ? getTypeColor(pokemonData.types[0].type.name)
      : "black";
  return (
    <Box
      className="change-cursor"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      p={"4px"}
      mb={4}
      textAlign="center"
      background={typeColor + "70"}
      // borderColor={getTypeColor(pokemonData.types[0].type.name) + "90"}
      backdropFilter={"blur(3px)"}
      backgroundImage={"/pokeball_white.png"}
      backgroundSize={"70%"}
      backgroundRepeat={"no-repeat"}
      backgroundPosition={"center"}
      display={"flex"}
      flexDirection={"column"}
      style={{
        backgroundSize: "100%",
      }}
      cursor={"url(/campfire.gif), auto"}
    >
      {pokemonData && (
        <div>
          <Flex p={"4px"}>
            <Tag size="lg" colorScheme="red" borderRadius="full">
              <Avatar
                src="/pokemon_logo.png"
                size="xs"
                name="Segun Adebayo"
                mr="2px"
                ml="-7px"
              />
              <TagLabel p={"2px"}>#{pokemonData.id}</TagLabel>
            </Tag>
            <Spacer />
            <Flex>
              {pokemonData.types &&
                pokemonData.types.length > 0 &&
                pokemonData.types.map((type) => (
                  <Image
                    key={type.type.name} // Add a unique key
                    src={`/icons/${type.type.name}.svg`}
                    alt={pokemonData.name + type.type.name}
                    boxSize="25px"
                    mx={"auto"}
                    background={getTypeColor(type.type.name)}
                    rounded={"full"}
                    my={"auto"}
                    objectFit={"cover"}
                    p={"1px"}
                    style={{
                      boxShadow: `0 0 20px ${getTypeColor(type.type.name)}`,
                    }}
                  />
                ))}
            </Flex>
          </Flex>
          <Flex justify="center" mb={4}>
            <Image
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`}
              alt={pokemonData.name}
              boxSize="150px"
              transition="transform 0.1s ease-in-out"
              _hover={{
                transform: "scale(1.2)",
              }}
            />
          </Flex>
          <Text fontSize={"x-large"} mb={2} color="white">
            {pokemonData.name}
          </Text>
          <Flex justify={"center"} gap={"5px"}>
            {pokemonData.types && pokemonData.types.length>0 && pokemonData.types.map((type, index) => (
              <Tag
                textColor={"white"}
                background={getTypeColor(pokemonData.types[0].type.name)}
                key={index}
              >
                {type.type.name}
              </Tag>
            ))}
          </Flex>
        </div>
      )}
    </Box>
  );
};

export default PokemonCard;
