import { Box, Heading, Square, VStack, Text, Icon } from '@chakra-ui/react';

interface ServiceProps {
  color: string;
  icon: any;
  title: string;
  text: string;
}

export default function ServiceCard({
  color,
  icon,
  title,
  text,
}: ServiceProps) {
  return (
    <VStack
      gap='3rem'
      w='full'
      bgColor='white'
      boxShadow={['md', 'unset']}
      px='.5rem'
    >
      <Square
        bgColor={color}
        size='5rem'
        rounded='lg'
        color='white'
        fontSize='2.5rem'
      >
        <Icon as={icon} />
      </Square>
      <Box textAlign='center'>
        <Heading fontSize='1.5rem'>{title}</Heading>
        <Text fontSize='.9rem' mt='.5rem'>
          {text}
        </Text>
      </Box>
    </VStack>
  );
}
