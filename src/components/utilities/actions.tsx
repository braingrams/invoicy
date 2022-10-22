import { Box, Button, HStack, Text, Image } from '@chakra-ui/react';

interface ActionsProps {
  title: string;
  desc: string;
  imgUrl: string;
  color: string;
}
function Actions({ title, desc, imgUrl, color }: ActionsProps) {
  return (
    <HStack borderRadius='25px' bgColor={color} justify='space-between'>
      <Box p='2rem 2rem'>
        <Text textTransform='capitalize' fontSize='1.3rem' fontWeight='600'>
          {title}
        </Text>
        <Text fontSize='.8rem' my='.5rem'>
          {desc}
        </Text>
        <Button
          mt='2rem'
          variant='outline'
          borderColor='brand.300'
          border='2px solid'
          _hover={{
            bgColor: 'brand.100',
            color: 'white',
          }}
        >
          Start for free
        </Button>
      </Box>
      <Box alignSelf='end'>
        <Image src={imgUrl} />
      </Box>
    </HStack>
  );
}

export default Actions;
