import {
  Box,
  Button,
  Grid,
  VStack,
  Text,
  Heading,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { PrimaryInput, PrimaryTextArea } from './FormField';
import { Container } from '../page-layout/container';

function ContactUs() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const FORM_ENDPOINT =
    'https://public.herotofu.com/v1/3ec776c0-8ad5-11ed-a003-6f0b76086b1c';
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Message Sent, Await our response within 24 hours',
        position: 'top-right',
        status: 'success',
      });
    }, 100);
  };
  return (
    <Box w='full' my={['2rem', '4rem']}>
      <VStack spacing='.3rem' mb='3rem' w='full'>
        <Text fontSize='.9rem' fontWeight='bold' color='brand.600'>
          Quick Support
        </Text>
        <Heading>Get in Touch Today</Heading>
        <Text w={['90%', '40%']} mx='auto !important' textAlign='center'>
          Do you have any questions that have not been answered in our FAQ, do
          not hesitate to ask, we are always glad to help you
        </Text>
      </VStack>
      <Container>
        <form
          action={FORM_ENDPOINT}
          onSubmit={handleSubmit}
          method='POST'
          target='_blank'
        >
          <Grid
            templateColumns={['repeat(1,1fr)', 'repeat(2, 1fr)']}
            gap='2rem 3rem'
          >
            <PrimaryInput label='First Name' name='firstName' />
            <PrimaryInput label='last Name' name='lastName' />
            <PrimaryInput label='phone Number' name='phoneNumber' />
            <PrimaryInput label='Email' name='email' />
          </Grid>
          <Grid
            templateColumns={['repeat(1,1fr)', 'repeat(1, 1fr)']}
            gap='2rem 3rem'
            mt='2rem'
          >
            <PrimaryTextArea label='Message' name='message' />
            <Button
              h='5rem'
              bgColor='brand.100'
              color='white'
              isLoading={loading}
              type='submit'
            >
              Send Message
            </Button>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}

export default ContactUs;
