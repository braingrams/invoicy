import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  VStack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import templates from '../data/templates.json';
import Link from 'next/link';
import { Container } from '../page-layout/container';
import Rating from 'react-rating';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';

function Template() {
  return (
    <Box my='3rem' w='full'>
      <Container>
        <Heading textDecor='underline' textAlign='center' mb='3rem'>
          Choose a Template
        </Heading>
        <Grid
          templateColumns={['repeat(1,1fr)', 'repeat(3, 1fr)']}
          gap='3rem 3rem'
        >
          {templates.map((template, index) => (
            <VStack key={index}>
              <Box boxShadow='md' w='full' mb='2rem' role='group'>
                <Box w='full' h='20rem' overflow='hidden' pos='relative'>
                  <Image
                    src={template.img}
                    w='full'
                    // h='full'
                    // objectFit='cover'
                    // objectPosition='top'
                    transition='bottom 8s'
                    pos='absolute'
                    bottom='-13.5rem'
                    _groupHover={{
                      bottom: 0,
                      transition: 'all 8s',
                    }}
                  />
                </Box>
                <Box bgColor='white' p='1.5rem'>
                  <Text color='brand.600' fontSize='.7rem' mb='0'>
                    {template.cat}
                  </Text>
                  <Text fontSize='1.5rem' fontWeight='bold' mb='.5rem'>
                    {template.name}
                  </Text>
                  <Rating
                    initialRating={template.rate}
                    readonly
                    emptySymbol={<IoMdStarOutline />}
                    fullSymbol={<IoMdStar color='#C0980A' />}
                  />
                </Box>
              </Box>
              <Link passHref href={`/templates/${template.type}`}>
                <Button
                  variant='outline'
                  border='2px solid'
                  borderColor='black'
                  borderRadius='35px'
                  h='3rem'
                  mx='auto'
                  px='3rem'
                >
                  Use This Template
                </Button>
              </Link>
            </VStack>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Template;
