import { Th, Td } from '@chakra-ui/react';
import React from 'react';

export function TH({
  label,
  first,
  textScheme,
}: {
  label?: string;
  first?: boolean;
  textScheme?: string;
}) {
  return (
    <Th color={textScheme} minW={first ? '340px' : 'unset'}>
      {label}
    </Th>
  );
}
export function TD({ label, first }: { label: any; first?: boolean }) {
  return (
    <Td
      minW={first ? '340px' : 'unset'}
      outline='1px solid'
      outlineColor='gray.400'
    >
      {label}
    </Td>
  );
}
