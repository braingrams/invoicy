import { Button, HStack } from '@chakra-ui/react';
import Logo from '../header-items/logo';
import Menu from '../header-items/menus';
import { ContainerStack } from '../page-layout/container';

const Header = () => {
  return (
    <HStack bgColor='brand.100' w='full' pos='sticky' top='0' zIndex='999'>
      <ContainerStack>
        <Logo imgUrl='assets/images/invoicy.png' />
        <HStack>
          <Menu>{['View Templates']}</Menu>
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
