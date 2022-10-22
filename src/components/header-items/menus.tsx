import { Text, HStack } from '@chakra-ui/react';

interface MenuProps {
  children?: any;
}
const Menu = ({ children }: MenuProps) => {
  return (
    <HStack gap='1rem'>
      {children.map((text) => (
        <Text fontSize='.9rem' color='#ffffff' fontWeight='500'>
          {text}
        </Text>
      ))}
    </HStack>
  );
};

export default Menu;
