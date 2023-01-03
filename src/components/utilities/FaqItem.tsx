import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';

function FaqItem({ faq }: any) {
  return (
    <Box>
      <HStack fontSize='20px' fontWeight='bold' mb='.5rem'>
        <Text color='brand.600' mb='0'>
          {faq.id}.
        </Text>
        <Text mb='0'> {faq.question}</Text>
      </HStack>
      <Text>{faq.answer}</Text>
    </Box>
  );
}

export default FaqItem;
