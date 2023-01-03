import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { CUR, EUR, NGN, USD } from './Currency';

interface InvoiceProps {
  title: string;
  value?: string | number;
  colorScheme?: string;
  currency?: string;
  textScheme?: string;
}
function InvoiceTotal({ title, value = '0' }: InvoiceProps) {
  return (
    <Flex
      fontSize='.9rem'
      fontWeight='600'
      w={['full', 'auto']}
      justify={['space-between', 'unset']}
    >
      <Text minW='80px'>{title}</Text>
      <Text
        borderBottom='2px solid'
        borderColor='gray.300'
        minW='200px'
        mb='0'
        pr='.7rem'
        textAlign='right'
      >
        {CUR(value)}
      </Text>
    </Flex>
  );
}

export default InvoiceTotal;

export function FinalTotal({
  title,
  value = '0',
  colorScheme,
  textScheme,
  currency,
}: InvoiceProps) {
  return (
    <Flex
      fontSize='1.2rem'
      fontWeight='700'
      align='center'
      w={['full', 'auto']}
      justify={['space-between', 'unset']}
    >
      <Text mb='0' color={colorScheme} minW='80px'>
        {title}
      </Text>
      <Text
        // borderBottom='2px solid'
        borderColor='gray.300'
        minW='200px'
        py='.5rem'
        bgColor={colorScheme}
        m='0 0 0 .5rem'
        color={textScheme}
        px='1rem'
        textAlign='right'
      >
        {currency == 'USD'
          ? USD(value)
          : currency == 'EUR'
          ? EUR(value)
          : currency == 'NGN'
          ? NGN(value)
          : CUR(value)}
      </Text>
    </Flex>
  );
}
