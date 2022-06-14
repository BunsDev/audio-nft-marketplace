import Navbar from "./Navbar";
import { Container } from "@chakra-ui/react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />

      <Container maxW="container.lg" py={12}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
