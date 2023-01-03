import { Box, Button, Circle, Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import TestimonialCards from '../utilities/TestimonialCards';
import { Testimonial } from '@/types/testimonial';
import { TfiAngleRight, TfiAngleLeft } from 'react-icons/tfi';
import { useEffect, useRef, useState } from 'react';

interface CarouselProps {
  slides: any[];
  controls?: boolean;
  indicators?: boolean;
  autoplay?: boolean;
  speed?: number;
  width?: string;
  adjustment?: number;
}
function CarouselWrapper({
  slides,
  controls = true,
  indicators = true,
  autoplay = true,
  width = '100%',
  speed = 3000,
  adjustment = 0,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef<any>();

  const len = slides.length - 1;

  const prev = () => {
    startSliderTimer();
    const index = currentSlide < 1 ? len : currentSlide - 1;
    setCurrentSlide(index);
  };
  const next = () => {
    startSliderTimer();
    const index = currentSlide === len ? 0 : currentSlide + 1;
    setCurrentSlide(index);
  };

  const switchIndex = (index: number) => {
    startSliderTimer();
    setCurrentSlide(index);
  };

  const startSliderTimer = () => {
    if (autoplay) {
      stopSliderTimer();
      slideInterval.current = setInterval(() => {
        setCurrentSlide((currentSlide) =>
          currentSlide === len ? 0 : currentSlide + 1
        );
      }, speed);
    }
  };

  const stopSliderTimer = () => {
    if (autoplay && slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };
  useEffect(() => {
    startSliderTimer();

    return () => stopSliderTimer();
  }, []);
  return (
    <HStack pos='relative' pb='3rem' overflow='hidden'>
      <Box
        maxW='90%'
        mx='auto'
        whiteSpace='nowrap'
        overflow='hidden'
        transition='ease 1s'
      >
        {slides.map((slide, i) => (
          <>
            <TestimonialCards
              key={i}
              x={slide}
              width={width}
              currentSlide={currentSlide}
              startSliderTimer={startSliderTimer}
              stopSliderTimer={stopSliderTimer}
              adjustment={adjustment}
            />
          </>
        ))}
      </Box>
      {controls && (
        <Flex
          w='full'
          justify='space-between'
          pos='absolute'
          left='0'
          m='0 !important'
        >
          <Button onClick={prev}>
            <TfiAngleLeft />
          </Button>
          <Button onClick={next}>
            <TfiAngleRight />
          </Button>
        </Flex>
      )}
      {indicators && (
        <Flex
          pos='absolute'
          bottom='0'
          mx='auto'
          w='full'
          justify='center'
          gap='.7rem'
        >
          {slides.map((slide, i) => (
            <Circle
              key={i}
              bgColor='white'
              size='.8rem'
              //   outline='2px solid black'
              opacity={currentSlide === slide.id ? 1 : 0.5}
              onClick={() => switchIndex(slide.id)}
            ></Circle>
          ))}
        </Flex>
      )}
    </HStack>
  );
}

export default CarouselWrapper;
