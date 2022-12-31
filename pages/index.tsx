import ExternalLink from '@/components/external-link';
import PageLayout from '@/components/page-layout';
import { Container } from '@/components/page-layout/container';
import TestimonialCards from '@/components/utilities/TestimonialCards';
import Actions from '@/components/utilities/actions';
import HowToCard from '@/components/utilities/how-to';
import ServiceCard from '@/components/utilities/service-card';
import {
  Box,
  Button,
  Center,
  Circle,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Link,
  Skeleton,
  Square,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import testimonials from '../src/components/data/testimonials.json';
import CarouselWrapper from '@/components/Carousel/CarouselWrapper';

const IndexPage = () => {
  return (
    <PageLayout
      title='Home'
      description='An online invoicing software for start up business. Create an invoice to get started.'
    >
      {/* hero */}
      <Box
        bgColor='brand.100'
        w='full'
        h='80vh'
        clipPath='polygon(0 0, 100% 0, 100% 100%, 0 78%)'
        pos='relative'
      >
        <Image
          src='/assets/images/particles.png'
          alt='oarticles'
          pos='absolute'
        />
        <Container>
          <Stack w='75%' mx='auto' mt='7rem' gap='.5rem'>
            <Heading
              color='white'
              fontFamily='Montserrat'
              fontSize='48px'
              fontWeight='800'
              textAlign='center'
            >
              Create Professional Invoices for Your Business in Minutes For Free
            </Heading>
            <Text
              color='white'
              fontFamily='Montserrat'
              fontSize='20px'
              textAlign='center'
              w='70%'
              mx='auto !important'
            >
              Dynamically render professional invoices for your business at no
              cost using our ready made templates in few minutes
            </Text>
            <Button
              w='30%'
              bgColor='brand.50'
              color='white'
              h='3.5rem'
              fontWeight='bold'
              fontFamily='Montserrat'
              fontSize='1rem'
              mx='auto !important'
              _hover={{ color: 'black' }}
            >
              Create a new invoice
            </Button>
          </Stack>
        </Container>
      </Box>
      {/* heroImage */}
      <Box mt='-15rem' zIndex='7' w='full'>
        <Container>
          <Box
            borderRadius='50px'
            // bgColor='white'
            width='90%'
            m='3rem auto'
          >
            <Image
              src='/assets/images/hero.png'
              alt='hero'
              w='full'
              objectFit='cover'
            />
          </Box>
        </Container>
      </Box>
      {/* service */}
      <Box my='4rem'>
        <VStack spacing='.3rem'>
          <Text fontSize='.9rem' fontWeight='bold' color='brand.600'>
            Services
          </Text>
          <Heading>Services That Grows Business Value</Heading>
          <Text w='80%' mx='auto !important' textAlign='center'>
            Globally actualize cost effective with resource maximizing
            leadership skills. without writing code.
          </Text>
        </VStack>
        <Container>
          <Grid templateColumns='repeat(3,1fr)' gap='2rem' mt='5rem'>
            <ServiceCard
              color='brand.300'
              icon='fa-shield-quartered'
              title='Quality First'
            />
            <ServiceCard
              color='brand.50'
              icon='fa-face-smiling-hands'
              title='User Friendly'
            />
            <ServiceCard
              color='brand.800'
              icon='fa-head-side-goggles'
              title='Reliability'
            />
          </Grid>
        </Container>
      </Box>
      {/* actions */}
      <Box py='5rem' bgImg='/assets/images/dot.png' bgSize='contain'>
        <Container>
          <Grid templateColumns='repeat(2, 1fr)' gap='4rem'>
            <Actions
              title={'Utilize your client data'}
              desc={
                ' Progressively reinvent models and niche revolutionary benefits forS your business'
              }
              imgUrl={'assets/images/cta-img-1.png'}
              color='brand.400'
            />
            <Actions
              title={'Utilize your client data'}
              desc={
                ' Progressively reinvent models and niche revolutionary benefits forS your business'
              }
              imgUrl={'assets/images/cta-img-2.png'}
              color='brand.500'
            />
          </Grid>
        </Container>
      </Box>
      {/* setup */}
      <Box my='4rem' w='full'>
        <VStack spacing='.3rem'>
          <Text fontSize='.9rem' fontWeight='bold' color='brand.600'>
            Instant Setup
          </Text>
          <Heading>Simple and Effortless Process</Heading>
          <Text w='80%' mx='auto !important' textAlign='center'>
            Globally actualize cost effective with resource maximizing
            leadership skills. without writing code.
          </Text>
        </VStack>
        <Container>
          <Grid templateColumns='repeat(5,1fr)' gap='2rem' mt='5rem'>
            <HowToCard
              color='brand.600'
              icon='fa-brands fa-chrome'
              title='Visit our website'
              step='1'
            />
            <HowToCard
              color='brand.300'
              icon='fa-solid fa-ballot-check'
              title='Select a template'
              step='2'
            />
            <HowToCard
              color='brand.50'
              icon='fa-solid fa-grid-2-plus'
              title='Add invoice details'
              step='3'
            />
            <HowToCard
              color='brand.800'
              icon='fa-regular fa-receipt'
              title='Preview invoice'
              step='4'
            />
            <HowToCard
              color='brand.100'
              icon='fa-solid fa-download'
              title='Download/Share'
              step='5'
            />
          </Grid>
        </Container>
      </Box>
      {/* Testimonials  */}
      <Box
        bgColor='brand.100'
        w='full'
        py='5rem'
        bgImg='/assets/images/dot.png'
        bgSize='contain'
      >
        <VStack spacing='.3rem' mb='2rem'>
          <Text fontSize='.9rem' fontWeight='bold' color='brand.600'>
            Testimonials
          </Text>
          <Heading color='white'>What Users Say AUs</Heading>
          <Text w='80%' mx='auto !important' textAlign='center' color='white'>
            Globally actualize cost effective with resource maximizing
            leadership skills. without writing code.
          </Text>
        </VStack>
        <Container>
          <CarouselWrapper slides={testimonials} width='47.5%' adjustment={9} />
        </Container>
      </Box>
    </PageLayout>
  );
};

export default IndexPage;
