import PageLayout from '@/components/page-layout';
import {
  Box,
  Button,
  Divider,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const NotFoundPage = () => {
  return (
    <PageLayout title='404' description='Not Found'>
      <VStack spacing={2} justify='center' h='100vh'>
        <Box w='70%' mx='auto'>
          <Image src='/assets/images/error.png' w='full' h='auto' />
        </Box>
        <Heading color='brand.600'>Error 404</Heading>
        <Heading>Something went wrong!</Heading>
        <Divider />
        <Text w='50%' textAlign='center' mb='1rem'>
          Sorry, but we are unable to open this page. It’s either missing or
          never existed
        </Text>
        <NextLink href='/' passHref>
          <Button colorScheme='brand' size='md' h='3rem'>
            Return to home
          </Button>
        </NextLink>
      </VStack>
    </PageLayout>
  );
};

export default NotFoundPage;
