import { Box, Image, Heading, Flex } from '@chakra-ui/react';
import Link from 'next/link';

interface logoProps {
  imgUrl?: string;
  text?: string;
  justify?: any;
}
const Logo = ({ imgUrl, text, justify }: logoProps) => {
  return (
    <Link passHref href='/'>
      <Flex h={['3rem', '4rem']} cursor='pointer' justify={justify}>
        {imgUrl ? (
          <Image src={`/${imgUrl}`} alt='Invoicy' w='auto' h='full' />
        ) : (
          <Heading>{text}</Heading>
        )}
      </Flex>
    </Link>
  );
};

export default Logo;
