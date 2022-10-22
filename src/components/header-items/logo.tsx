import { Box, Image, Heading } from '@chakra-ui/react';

interface logoProps {
  imgUrl?: string;
  text?: string;
}
const Logo = ({ imgUrl, text }: logoProps) => {
  return (
    <Box h='4rem'>
      {imgUrl ? (
        <Image src={imgUrl} alt='Invoicy' w='auto' h='full' />
      ) : (
        <Heading>{text}</Heading>
      )}
    </Box>
  );
};

export default Logo;
