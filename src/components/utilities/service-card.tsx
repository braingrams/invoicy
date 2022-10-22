import { Box, Heading, Square, VStack, Text } from '@chakra-ui/react';

interface ServiceProps {
  color: string;
  icon: string;
  title: string;
}

export default function ServiceCard({ color, icon, title }: ServiceProps) {
  return (
    <VStack gap='3rem'>
      <Square
        bgColor={color}
        size='5rem'
        rounded='lg'
        color='white'
        fontSize='2.5rem'
      >
        <i className={`fa-solid ${icon}`}></i>
      </Square>
      <Box textAlign='center'>
        <Heading fontSize='1.5rem'>{title}</Heading>
        <Text fontSize='.9rem' mt='.5rem'>
          Appropriately grow competitive leadership rather than strategic
          technically sound processes without state.
        </Text>
      </Box>
    </VStack>
  );
}
