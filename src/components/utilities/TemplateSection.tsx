import { Text } from '@chakra-ui/react';

function TemplateSection({ text, color, textScheme }) {
  return (
    <Text
      fontSize='1rem'
      fontWeight='700'
      my='2rem'
      bgColor={color}
      color={textScheme}
      borderRadius='0 40px 40px 0'
      p='1rem 3rem 1rem 2rem'
      w='full'
    >
      {text}
    </Text>
  );
}

export default TemplateSection;
