import { Container as Wrapper, ContainerProps } from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';

const variants: Variants = {
  hidden: {
    opacity: 0,
    x: 0,
    y: -40,
    transition: { duration: 0.4, type: 'easeOut' },
  },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.4, type: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: -0,
    y: 40,
    transition: { duration: 0.4, type: 'easeOut' },
  },
};

type PageProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

const MotionContainer = motion<ContainerProps>(Wrapper);

const PageLayout = ({ title, description, children }: PageProps) => {
  return (
    <>
      <NextSeo
        title={title + ' | Smart Invoicing App'}
        description={description}
        twitter={{
          cardType: 'summary_large_image',
          handle: '@brain_tweets',
        }}
        openGraph={{
          url: 'https://www.bamfolio.netlify.app',
          title: title + ' | Smart Invoicing App',
          description: description,
          locale: 'en_US',
          images: [
            {
              url: '/assets/images/invoicy.png',
              width: 1200,
              height: 630,
              alt: 'Invoicy',
              type: 'image/png',
            },
          ],
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/assets/images/invoicyfav.png',
          },
        ]}
      />
      <MotionContainer
        display='flex'
        maxW='100%'
        minH={{ base: 'auto', md: '100vh' }}
        initial='hidden'
        animate='enter'
        exit='exit'
        variants={variants}
        centerContent
        px='0 !important'
      >
        {children}
      </MotionContainer>
    </>
  );
};

export default PageLayout;
