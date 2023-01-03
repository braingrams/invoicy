import { Box, Image, Heading } from '@chakra-ui/react';
import Link from 'next/link';

interface logoProps {
  imgUrl?: string;
  text?: string;
}
const Logo = ({ imgUrl, text }: logoProps) => {
  return (
    <Link passHref href='/'>
      <Box h={['3rem', '4rem']} cursor='pointer'>
        {imgUrl ? (
          <Image src={`/${imgUrl}`} alt='Invoicy' w='auto' h='full' />
        ) : (
          <Heading>{text}</Heading>
        )}
      </Box>
    </Link>
  );
};

export default Logo;
