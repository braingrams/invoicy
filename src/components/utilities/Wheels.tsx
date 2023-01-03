import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { useDetectClickOutside } from 'react-detect-click-outside';

function Wheels({ colorScheme, setColorScheme, text, refs }) {
  return (
    <Box ref={refs} bgColor='white' p='1rem'>
      <Text fontSize='.7rem' mb='1' textAlign='center'>
        {text}
      </Text>
      <HexColorPicker color={colorScheme} onChange={setColorScheme} />
    </Box>
  );
}

export default Wheels;
