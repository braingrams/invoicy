import { Testimonial } from '@/types/testimonial';
import { Box, HStack, Square, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import Rating from 'react-rating';

interface TestimonialsProps {
  startSliderTimer: any;
  stopSliderTimer: any;
  currentSlide: any;
  x: Testimonial;
  width?: string;
  adjustment?: number;
}

function TestimonialCards({
  x,
  currentSlide,
  startSliderTimer,
  stopSliderTimer,
  width,
  adjustment,
}: TestimonialsProps) {
  return (
    <Box
      bgColor='brand.300'
      borderRadius='10px'
      p='2rem'
      w={width}
      // w='100%'
      h='14rem'
      display='inline-block'
      transition='ease 1s'
      style={{
        transform: `translateX(${
          -currentSlide * 100 - currentSlide * adjustment
        }%)`,
      }}
      className={'carouselItem'}
      onMouseEnter={() => stopSliderTimer()}
      onMouseOut={() => startSliderTimer()}
      cursor='pointer'
    >
      <VStack align='flex-start' color='white' spacing='1rem'>
        <HStack>
          <Square size='3rem' bgColor='gray.200' />
          <Box>
            <Text fontWeight='600'>{x.user}</Text>
            <Text fontSize='.8rem'>{x.role}</Text>
          </Box>
        </HStack>
        <Box>
          <Text fontWeight='600' fontSize='.9rem'>
            {x.title}
          </Text>
          <Text fontSize='.7rem' whiteSpace='pre-wrap'>
            {x.word}
          </Text>
        </Box>
        <Rating
          initialRating={x.rate}
          readonly
          emptySymbol={<IoMdStarOutline />}
          fullSymbol={<IoMdStar color='#C0980A' />}
        />
      </VStack>
    </Box>
  );
}

export default TestimonialCards;
