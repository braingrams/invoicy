import { Box, Circle, Flex, Grid, HStack, Text } from '@chakra-ui/react';
import { Container } from '../page-layout/container';
import Logo from '../header-items/logo';
import { RiInstagramFill, RiLinkedinFill, RiTwitterFill } from 'react-icons/ri';
import moment from 'moment';

const Footer = () => {
  const date = moment(new Date()).format('YYYY');
  return (
    <>
      <Box bgColor='brand.100' p='3rem 0'>
        <Container>
          <Grid
            templateColumns={['repeat(1,1fr)', 'repeat(2, 1fr)']}
            gap='2rem'
          >
            <Logo
              imgUrl='assets/images/invoicy.png'
              justify={['center', 'unset']}
            />
            <Grid templateColumns={['repeat(2,1fr)', 'repeat(2, 1fr)']}>
              <Box textAlign={['left', 'right']} color='white'>
                <Text fontWeight='bold'>Call Us:</Text>
                <Text>09066489371</Text>
                <Text>08088749339</Text>
              </Box>
              <Box textAlign='right' color='white'>
                <Text fontWeight='bold'>Send us an Email:</Text>
                <Text>admin@quickinvoice.com.ng</Text>
                <Text>help@quickinvoice.com.ng</Text>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box p='2rem 0'>
        <Container>
          <Flex
            justify='space-between'
            align='center'
            flexDirection={['column', 'row']}
          >
            <Text color='gray.500'>
              &copy; {date} Invoicy Rights Reserved.{' '}
            </Text>
            <HStack spacing={[2, 3]}>
              <Circle
                as='a'
                href='https://instagram.com/el__seso/'
                size='32px'
                bg='gray.200'
                color='gray.500'
              >
                <RiInstagramFill />
              </Circle>
              <Circle
                as='a'
                href='https://twitter.com/brain_tweets'
                size='32px'
                bg='gray.200'
                color='gray.500'
              >
                <RiTwitterFill />
              </Circle>
              <Circle
                as='a'
                href='https://www.linkedin.com/in/akinyemi-oluwabukunmi-4806281b2'
                size='32px'
                bg='gray.200'
                color='gray.500'
              >
                <RiLinkedinFill />
              </Circle>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
