import { Box, HStack } from '@chakra-ui/react';

export const ContainerStack = ({ children }) => {
  return (
    <HStack
      w={['90%', '80%']}
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
    <Box w={['90%', '80%']} mx='auto' minH='1rem'>
      {children}
    </Box>
  );
};
