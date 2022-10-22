import { Box, Heading, Square, VStack, Text } from '@chakra-ui/react';

interface HowToProps {
  color: string;
  icon: string;
  title: string;
  step: string;
}

export default function HowToCard({ color, icon, title, step }: HowToProps) {
  return (
    <VStack gap='2rem'>
      <Square
        bgColor='transparent'
        size='5rem'
        rounded='lg'
        color={color}
        fontSize='3rem'
      >
        <i className={`fa-solid ${icon}`}></i>
      </Square>
      <Box textAlign='center'>
        <Text
          px='2.5rem'
          w='fit-content'
          mx='auto'
          py='.3rem'
          borderRadius='35px'
          fontSize='.7rem'
          fontWeight='500'
          bgColor='rgba(203, 217, 251, .5)'
        >
          Step {step}
        </Text>
        <Text
          fontSize='1rem'
          mt='1.5rem'
          fontWeight='700'
          textTransform='capitalize'
        >
          {title}
        </Text>
      </Box>
    </VStack>
  );
}
