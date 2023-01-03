import {
  Box,
  Flex,
  FormLabel,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import * as CurrencyFormat from 'react-currency-format';

interface formInput {
  label: string;
  name?: string;
  onChange?: any;
  h?: string;
  checked?: any;
  value?: any;
  disabled?: boolean;
  options?: any[];
  readonly?: boolean;
}

export function PrimaryInput({
  label,
  name,
  onChange,
  value,
  disabled,
  readonly,
}: formInput) {
  return (
    <Box>
      <FormLabel mb='1rem' fontWeight='600' textTransform='uppercase'>
        {label}
      </FormLabel>
      <Input
        placeholder={label}
        h='4rem'
        borderRadius='5px'
        borderColor='brand.900'
        border='2px solid '
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
        w='full'
        readOnly={readonly}
      />
    </Box>
  );
}
export function PrimaryCurrencyInput({
  label,
  name,
  onChange,
  value,
  disabled,
}: formInput) {
  return (
    <Box>
      <FormLabel mb='1rem' fontWeight='600' textTransform='uppercase'>
        {label}
      </FormLabel>
      <CurrencyFormat
        customInput={Input}
        className='currency'
        placeholder={label}
        value={value}
        thousandSeparator={true}
        onValueChange={(value) => onChange(value)}
      />
    </Box>
  );
}

export function PrimaryTextArea({ label, name, onChange, h }: formInput) {
  return (
    <Box>
      <FormLabel mb='1rem' fontWeight='600'>
        {label}
      </FormLabel>
      <Textarea
        placeholder={label}
        minH='6rem'
        borderRadius='5px'
        borderColor='brand.900'
        border='2px solid '
        name={name}
        h={h}
        onChange={onChange}
        w='full'
      ></Textarea>
    </Box>
  );
}
export function PrimaryCheckBox({ label, onChange, checked }: formInput) {
  return (
    <Flex fontSize='.9rem' gap='.9rem' fontWeight='500'>
      <label style={{ display: 'flex', cursor: 'pointer' }}>
        <input
          type='checkbox'
          className='formcheck'
          checked={checked}
          onChange={onChange}
          value={checked}
        />
        {label}
      </label>
    </Flex>
  );
}

export function PrimarySelect({ label, onChange, options }: formInput) {
  return (
    <Box>
      <FormLabel mb='1rem' fontWeight='600'>
        {label}
      </FormLabel>
      <Select
        onChange={onChange}
        h='4rem'
        borderRadius='5px'
        borderColor='brand.900'
        border='2px solid '
        placeholder={label}
      >
        {options.map((x, i) => (
          <option value={x} key={i}>
            {x}
          </option>
        ))}
      </Select>
    </Box>
  );
}
