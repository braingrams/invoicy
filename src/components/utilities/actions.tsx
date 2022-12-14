import { Box, Button, HStack, Text, Image } from '@chakra-ui/react';
import Link from 'next/link';

interface ActionsProps {
  title: string;
  desc: string;
  imgUrl: string;
  color: string;
}
function Actions({ title, desc, imgUrl, color }: ActionsProps) {
  return (
    <HStack
      borderRadius='25px'
      bgColor={color}
      justify='space-between'
      flexDirection={['column', 'row']}
    >
      <Box p={['2rem 2rem', '2rem 2rem']}>
        <Text textTransform='capitalize' fontSize='1.3rem' fontWeight='600'>
          {title}
        </Text>
        <Text fontSize='.8rem' my='.5rem'>
          {desc}
        </Text>
        <Link passHref href='/templates'>
          <Button
            mt='2rem'
            variant='outline'
            borderColor='brand.300'
            border='2px solid'
            w={['full', 'fit-content']}
            _hover={{
              bgColor: 'brand.100',
              color: 'white',
            }}
          >
            Start for free
          </Button>
        </Link>
      </Box>
      <Box alignSelf='end'>
        <Image src={imgUrl} />
      </Box>
    </HStack>
  );
}

export default Actions;
