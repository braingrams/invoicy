import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Footer from './footer';
import Header from './header';
import { useRouter } from 'next/router';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  return (
    <>
      <Header />
      <Box as='main'>{children}</Box>
      {!router.asPath.startsWith('/templates/') && <Footer />}
    </>
  );
};

export default Layout;
