import { Box, Heading, Text, Avatar, Flex, Center, Image } from '@chakra-ui/react';
import React from 'react';

const UserProfile = () => {
  return (
    <Box p="4" bg="purple.100" ml={4} mr={4} >
        <Center>
      <Heading as="h1" size="xl" mb="4">
        Profile Page
      </Heading>
      </Center>
      <Center>
      <Image
          borderRadius='full'
          boxSize='150px'
          src='https://bit.ly/dan-abramov'
          alt='Dan Abramov'
        />
      </Center>
      <Box ml="4">
        <Center>
       <Flex flexDirection='column'>
        <Text fontSize="xl" ml="9">John Doe</Text>
        <Text color="gray.500">john.doe@example.com</Text></Flex>
        </Center>
      </Box>
      <Center flexDirection="column" textAlign="center">
        <Box mb="4" >
          <Heading as="h2" size="lg" mt="5"mb="4">
            About Me
          </Heading>
          <Box bg="gray.100" h="150px" w="350px">
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            venenatis commodo velit, id rutrum nulla consequat vel. Phasellus
            id enim et turpis ultrices cursus.
          </Text></Box>
        </Box>
      </Center>
    </Box>
  );
};

export default UserProfile;
