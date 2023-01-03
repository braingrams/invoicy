import { Text, HStack } from '@chakra-ui/react';
import Link from 'next/link';

interface MenuProps {
  children?: any;
}
const Menu = ({ children }: MenuProps) => {
  return (
    <HStack gap='1rem' flexDir={['column', 'row']}>
      {children.map((text, index) => (
        <Link passHref href={text.url} key={index}>
          <Text
            mb='0'
            fontSize='.9rem'
            color='#ffffff'
            fontWeight='500'
            cursor='pointer'
          >
            {text.title}
          </Text>
        </Link>
      ))}
    </HStack>
  );
};

export default Menu;
