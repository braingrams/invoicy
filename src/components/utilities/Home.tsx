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
  Skeleton,
  Square,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import testimonials from '../data/testimonials.json';
import faqs from '../data/faqs.json';
import CarouselWrapper from '@/components/Carousel/CarouselWrapper';
import FaqItem from '@/components/utilities/FaqItem';
import Expectation from '@/components/utilities/Expectation';
import { RiBlazeFill } from 'react-icons/ri';
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import { AiFillTags } from 'react-icons/ai';
import { MdMobileFriendly } from 'react-icons/md';
import { HiFaceSmile } from 'react-icons/hi2';
import { ImUserCheck } from 'react-icons/im';
import {
  PrimaryInput,
  PrimaryTextArea,
} from '@/components/utilities/FormField';
import NextLink from 'next/link';
import ContactUs from './ContactUs';

const HomePage = () => {
  return (
    <PageLayout
      title='Home'
      description='An online invoicing software for start up business. Create an invoice to get started.'
    >
      {/* hero */}
      <Box
        bgColor='brand.100'
        w='full'
        h={['50vh', '80vh']}
        clipPath='polygon(0 0, 100% 0, 100% 100%, 0 78%)'
        pos='relative'
      >
        <Image
          src='/assets/images/particles.png'
          alt='particles'
          pos='absolute'
        />
        <Container>
          <Stack w={['90%', '75%']} mx='auto' mt={['4rem', '7rem']} gap='.5rem'>
            <Heading
              color='white'
              fontFamily='Montserrat'
              fontSize={['22px', '48px']}
              fontWeight='800'
              textAlign='center'
            >
              Create Professional Invoices for Your Business in Minutes For Free
            </Heading>
            <Text
              color='white'
              fontFamily='Montserrat'
              fontSize={['14px', '20px']}
              textAlign='center'
              w={['full', '70%']}
              mx='auto !important'
            >
              Dynamically render professional invoices for your business at no
              cost using our ready made templates in few minutes
            </Text>
            <NextLink passHref href='/templates'>
              <Button
                w={['full', '30%']}
                bgColor='brand.50'
                color='white'
                h='3.5rem'
                fontWeight='bold'
                fontFamily='Montserrat'
                fontSize='1rem'
                mx='auto !important'
                _hover={{ color: 'black', bgColor: 'white' }}
              >
                Create a new invoice
              </Button>
            </NextLink>
          </Stack>
        </Container>
      </Box>
      {/* heroImage */}
      <Box mt={['-8rem', '-15rem']} zIndex='7' w='full'>
        <Container>
          <Box
            borderRadius={['20px', '50px']}
            bgColor='white'
            width='90%'
            m={['2rem auto 1rem', '3rem auto']}
            overflow='hidden'
            boxShadow='lg'
            padding={['1rem', '2rem']}
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
      <Box my={['2rem', '4rem']}>
        <VStack spacing='.3rem'>
          <Text fontSize='.9rem' fontWeight='bold' color='brand.600'>
            Services
          </Text>
          <Heading textAlign='center'>
            Services That Grows Business Value
          </Heading>
          <Text w={['full', '40%']} mx='auto !important' textAlign='center'>
            Our core solution is to provide a user friendly, mobile compatible
            solution for small - mini business to ease invoicing process
          </Text>
        </VStack>
        <Container>
          <Grid
            templateColumns={['repeat(1,1fr)', 'repeat(3,1fr)']}
            gap='2rem'
            mt='5rem'
          >
            <ServiceCard
              color='brand.300'
              icon={MdMobileFriendly}
              title='Mobile Compatible'
              text='Many invoicing solution that existed have been difficult for small business to operate without a laptop or larger computer, but with invoicy, we aim at making a mobile-first application'
            />
            <ServiceCard
              color='brand.50'
              icon={HiFaceSmile}
              title='User Friendly'
              text='The real definition of user friendly applications are apps with easy navigations, smooth performances and flexibility without glitches that can be avoided. Speak of user friendly, speak Invoicy'
            />
            <ServiceCard
              color='brand.800'
              icon={ImUserCheck}
              title='Zero Experience'
              text='With invoicy, you do not need to be a developer, computer guru or anything of such, just input your invoice details and download on the go with absolutely zero experience'
            />
          </Grid>
        </Container>
      </Box>
      {/* actions */}
      <Box
        py={['2rem', '5rem']}
        bgImg='/assets/images/dot.png'
        bgSize='contain'
      >
        <Container>
          <Grid
            templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
            gap='4rem'
          >
            <Actions
              title={'Available on all devices'}
              desc={
                'We made the invoice solution accessible on all devices and across all browsers to make invoice generation smooth and easy'
              }
              imgUrl={'assets/images/cta-img-1.png'}
              color='brand.400'
            />
            <Actions
              title={'Generate Invoice on the go'}
              desc={
                "Don't worry about gadgets, generate invoice anywhere, anytime on the GO and send a copy to your clients without hassle"
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
          <Heading textAlign='center'>Simple and Effortless Process</Heading>
          <Text w={['95%', '30%']} mx='auto !important' textAlign='center'>
            Progressively take your business standardization from zero to hero
            with few simple steps
          </Text>
        </VStack>
        <Container>
          <Grid
            templateColumns={['repeat(2,1fr)', 'repeat(5,1fr)']}
            gap={['1rem', '2rem']}
            mt='5rem'
          >
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
          <Heading color='white'>What Users Are Saying</Heading>
          <Text
            w={['90%', '40%']}
            mx='auto !important'
            textAlign='center'
            color='white'
          >
            Reviews of what people think about invoicy after using it to improve
            their business professionalism speaks more why you should try it too
          </Text>
        </VStack>
        <Container>
          <Box display={['none', 'block']}>
            <CarouselWrapper
              slides={testimonials}
              width='47.5%'
              adjustment={9}
            />
          </Box>
          <Box display={['block', 'none']}>
            <CarouselWrapper
              slides={testimonials}
              width='100%'
              adjustment={15}
            />
          </Box>
        </Container>
      </Box>
      {/* FAQ  */}
      <Box w='full' my='4rem'>
        <VStack spacing='.3rem' mb='3rem'>
          <Text fontSize='.9rem' fontWeight='bold' color='brand.600'>
            FAQ
          </Text>
          <Heading textAlign='center'>Frequently Asked Questions</Heading>
          <Text w={['90%', '30%']} mx='auto !important' textAlign='center'>
            Some of the questions frequently asked by users to get started using
            Invoicy
          </Text>
        </VStack>
        <Container>
          <Stack direction={['column', 'row']} gap='3rem' align='center'>
            <Box w='full'>
              <VStack spacing='2rem'>
                {faqs.map((faq) => (
                  <FaqItem faq={faq} key={faq.id} />
                ))}
              </VStack>
            </Box>
            <Box w='full'>
              <Image src='/assets/images/faq.png' />
            </Box>
          </Stack>
        </Container>
      </Box>
      {/* Highlights  */}
      <Box w='full' my={['2rem', '4rem']}>
        <VStack spacing='.3rem' mb='3rem'>
          <Text fontSize='.9rem' fontWeight='bold' color='brand.600'>
            Expectations
          </Text>
          <Heading>Our Clients Get Results</Heading>
          <Text w={['90%', '30%']} mx='auto !important' textAlign='center'>
            With no design skills or experience, we have the best client
            feedback on satisfaction and success using our app
          </Text>
        </VStack>
        <Container>
          <Grid
            templateColumns={['repeat(1,1fr)', 'repeat(3, 1fr)']}
            gap='3rem'
          >
            <Expectation
              icon={RiBlazeFill}
              number={'10X'}
              word={
                'Ten times superfast and lightweight application for your professional invoice'
              }
              highlight={'Faster and Better'}
            />
            <Expectation
              icon={BsFillEmojiSmileFill}
              number={'15k'}
              word={
                'Generated invoices on our system spiked over 15k upon launch, over 15k problems solved yikes!'
              }
              highlight={'Happily Satisfied'}
            />
            <Expectation
              icon={AiFillTags}
              number={'95%'}
              word={
                'Synergistically pursue accurate initiatives without economically imperatives up to 95% financial budget saves.'
              }
              highlight={'No to Bankruptcy'}
            />
          </Grid>
        </Container>
      </Box>
      {/* Contact  */}
      <ContactUs />
    </PageLayout>
  );
};

export default HomePage;
