import { Box, HStack } from '@chakra-ui/react';

export const ContainerStack = ({ children }) => {
  return (
    <HStack
      w='80%'
      mx='auto'
      justify='space-between'
      align='center'
      minH='7rem'
    >
      {children}
    </HStack>
  );
};
export const Container = ({ children }) => {
  return (
    <Box w='80%' mx='auto' minH='7rem'>
      {children}
    </Box>
  );
};
