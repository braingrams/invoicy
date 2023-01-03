import { Button, HStack, Icon, useDisclosure } from '@chakra-ui/react';
import Logo from '../header-items/logo';
import Menu from '../header-items/menus';
import { ContainerStack } from '../page-layout/container';
import { FiMenu } from 'react-icons/fi';

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <HStack bgColor='brand.100' w='full' pos='sticky' top='0' zIndex='999'>
      <ContainerStack>
        <Logo imgUrl='assets/images/invoicy.png' />
        <Icon
          as={FiMenu}
          display={['block', 'none']}
          color='white'
          fontSize='1.5rem'
          onClick={onToggle}
        />
        <HStack
          pos={['fixed', 'unset']}
          flexDir={['column', 'row']}
          h={['100vh', 'unset']}
          top='12%'
          right={isOpen ? '0' : '-100%'}
          px={['1rem', 'unset']}
          bgColor={['brand.100', 'unset']}
          gap={['2rem', 'unset']}
          transition='ease .5s'
          pt={['2rem', 'unset']}
        >
          <Menu>{[{ url: '/templates', title: 'View Templates' }]}</Menu>
          <Button
            bgColor='brand.50'
            color='white'
            px='2rem'
            ml='2rem !important'
          >
            Support
          </Button>
        </HStack>
      </ContainerStack>
    </HStack>
  );
};

export default Header;
