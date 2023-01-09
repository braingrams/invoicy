import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Text,
  Box,
  HStack,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaTimesCircle, FaTrash } from 'react-icons/fa';
import Logo from '../header-items/logo';

type Props = {
  isOpen?: any;
  onClose?: any;
};

const SafariModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset='slideInBottom'
      isCentered
    >
      <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) ' />

      <ModalContent
        py={5}
        borderRadius='0px'
        w={['88%', '30%']}
        overflow='hidden'
        maxH='100vh'
        pos='fixed'
        mt='1rem'
        mb='1rem'
        borderTopLeftRadius='50px'
        borderBottomRightRadius='50px'
        bgColor='brand.100'
        color='white'
      >
        <ModalHeader textAlign='center'>
          <>
            <Flex justify='center' color='red' fontSize='3rem' mb='1rem'>
              <Logo imgUrl='assets/images/invoicyfav.png' justify='center' />
            </Flex>
            <Text
              fontSize='.9rem'
              mb='1rem'
              px={['1.5rem', '1.5rem']}
              fontWeight='500'
            >
              Sorry, Invoice Download on Safari Browser is currently not
              supported, please use other browsers to download invoice
              <br />
              <b>Recomended: Chrome</b>
            </Text>
          </>
        </ModalHeader>

        <ModalBody>
          <Box maxH='77vh' overflowY='auto' px={5}>
            <HStack px='.8rem' spacing={4} w='full'>
              <Button
                height='3rem'
                width='full'
                // bgColor='brand.100'
                onClick={onClose}
                color='brand.100'
              >
                Close
              </Button>
            </HStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SafariModal;
