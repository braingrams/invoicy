import {
  Box,
  Heading,
  Icon,
  VStack,
  Text,
  Highlight,
  HStack,
} from '@chakra-ui/react';
import React from 'react';

function Expectation({ icon, number, word, highlight }) {
  return (
    <Box bgColor='brand.100' p='3rem 1rem' borderRadius='30px'>
      <VStack justify='space-between' h='12rem'>
        <HStack color='white' fontWeight='700'>
          <Icon as={icon} color='brand.50' fontSize='4xl' />
          <Heading>{number}</Heading>
        </HStack>
        <Text color='white' fontSize='16px' textAlign='center'>
          {word}
        </Text>
        <Text
          fontSize='20px'
          color='rgba(148, 148, 148, 0.6)'
          fontStyle='italic'
        >
          {highlight}
        </Text>
      </VStack>
    </Box>
  );
}

export default Expectation;
