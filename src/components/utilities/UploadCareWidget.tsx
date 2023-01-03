import { Box, Flex, FormLabel, Icon, Spinner, Text } from '@chakra-ui/react';
import { Widget } from '@uploadcare/react-widget';
import React from 'react';
import { FiUploadCloud } from 'react-icons/fi';

function UploadCareWidget({ refs, filename, loading, uploadFunction, label }) {
  return (
    <Box w='full'>
      <FormLabel mb='1rem' fontWeight='600' textTransform='uppercase'>
        {label}
      </FormLabel>

      <Flex
        outline='2px solid'
        // outlineColor='gray.300'
        h='4rem'
        align='center'
        pr='1rem'
        w='full'
        borderRadius='5px'
        // justifyContent="space-between"
      >
        <Flex
          bgColor='#f5f5f5'
          fontSize='1.5rem'
          px='1rem'
          h='full'
          align='center'
          cursor='pointer'
          my='auto'
          fontWeight='600'
          onClick={() => refs.current.openDialog()}
        >
          <Icon as={FiUploadCloud} />
          {/* <Text noOfLines={1} mb='0'>
            Choose File
          </Text> */}
        </Flex>

        {loading ? (
          <Flex align='center'>
            <Text mb='0' fontStyle='italic' mr='1rem'>
              ...loading data info
            </Text>
            <Spinner />
          </Flex>
        ) : (
          <Text noOfLines={1} my='auto' px='.5rem'>
            {filename || 'No File Chosen'}
          </Text>
        )}
      </Flex>
      <Box display='none'>
        <Widget
          publicKey='fda3a71102659f95625f'
          clearable
          onFileSelect={uploadFunction}
          ref={refs}
          systemDialog={true}
          // inputAcceptTypes={'.jpeg,jpg, png'}
        />
      </Box>
    </Box>
  );
}

export default UploadCareWidget;
