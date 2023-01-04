import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Text,
  Table,
  TableContainer,
  Tbody,
  Thead,
  Tr,
  VStack,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import InvoiceTotal, { FinalTotal } from '../InvoiceTotal';
import { TD, TH } from '../Tables';
import { CUR } from '../Currency';
import { PDFExport } from '@progress/kendo-react-pdf';
import { AiFillChrome } from 'react-icons/ai';
import { CgPhone } from 'react-icons/cg';
import { GiLoveMystery } from 'react-icons/gi';
import { ImLocation2 } from 'react-icons/im';
import { useReactToPrint } from 'react-to-print';

function TemplateOne({
  showInvoice,
  refA,
  invoiceNo,
  colorScheme,
  companyLogo,
  companyName,
  customerEmail,
  customerName,
  customerPhone,
  customerAddress,
  date,
  textScheme,
  populatedItem,
  additionalInfo,
  total,
  taxAmount,
  discount,
  companySignature,
  companyAddress,
  companyPhone,
  companyWebsite,
  currency,
  watermark,
  finalTotal,
  height,
}) {
  function downloadInvoice() {
    if (refA.current) {
      refA.current.save();
    }
  }
  const handlePrint = useReactToPrint({
    content: () => refA.current,
    documentTitle: `INVOICY ${invoiceNo}.pdf`,
  });
  return (
    <Box
      w={['90%', '49%']}
      pos={['relative', 'absolute']}
      ml={['auto', '51%']}
      mr={['auto', '0']}
      overflow='auto'
      display={[showInvoice ? 'block' : 'none', 'block']}
      h='full'
      // px={['1rem']}
      pr={['0', '1rem']}
    >
      <Box pos='absolute' left='-2000px'>
        <PDFExport
          ref={refA}
          paperSize='A4'
          scale={0.7}
          margin={20}
          fileName={`INVOICY - ${invoiceNo}.pdf`}
          author='KendoReact Team'
        >
          <Box w='full' h='29.65cm' pos='relative' ref={refA}>
            <Box h='2rem' bgColor={colorScheme} /> {/* Invoice Top  */}
            <Flex p='2rem' justify='space-between' bgColor='gray.200'>
              <Box>
                {companyLogo !== undefined ? (
                  <Box h={`${height}rem`}>
                    <Image src={companyLogo?.cdnUrl} h='full' w='auto' />
                  </Box>
                ) : (
                  <Heading mb='3rem' color={colorScheme} noOfLines={1}>
                    {companyName || 'LOGO'}
                  </Heading>
                )}
                <Box mt='1rem' px='0rem' w='full'>
                  <Text
                    fontWeight='600'
                    w='100%'
                    borderBottom='2px solid black'
                  >
                    Bill to:
                  </Text>
                  <Text>{customerName}</Text>
                  <Text>{customerEmail}</Text>
                  <Text>{customerAddress}</Text>
                  <Text>{customerPhone}</Text>
                </Box>
              </Box>
              <Box>
                <Heading mb='3rem'>Invoice</Heading>
                <Text>Date: {date}</Text>
                <Text textTransform='capitalize'>Invoice No: {invoiceNo}</Text>
              </Box>
            </Flex>
            <TableContainer>
              <Table variant='striped'>
                <Thead>
                  <Tr bgColor={colorScheme}>
                    <TH label='Description' first textScheme={textScheme} />
                    <TH label='Qty' textScheme={textScheme} />
                    <TH label='Unit Price' textScheme={textScheme} />
                    <TH label='Total' textScheme={textScheme} />
                  </Tr>
                </Thead>
                <Tbody borderX='1px solid' borderColor='gray.400'>
                  {populatedItem?.map((x) => (
                    <Tr key={x.id}>
                      <TD label={x.desc} first />
                      <TD label={x.unit} />
                      <TD label={x.price} />
                      <TD label={x.amount} />
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <Flex mt='1rem' justify='space-between' px='1rem'>
              <Box w='40%'>
                <Text fontSize='.9rem' fontWeight='600'>
                  Additional Information
                </Text>
                <Text fontSize='.8rem'>{additionalInfo}</Text>
              </Box>
              <Box>
                <VStack>
                  <InvoiceTotal title='Subtotal' value={total || 0} />
                  <InvoiceTotal title='Discount' value={`-${discount || 0} `} />
                  <InvoiceTotal title='Tax' value={taxAmount || 0} />
                </VStack>
                <FinalTotal
                  title='Total'
                  value={finalTotal}
                  colorScheme={colorScheme}
                  textScheme={textScheme}
                  currency={currency}
                />
              </Box>
            </Flex>
            <Flex justify='flex-start' mt='3rem' pl='1rem'>
              <Box w='30%'>
                <Box h='auto'>
                  {/* <Image src='' h='full' w='auto' /> */}
                  <Text
                    fontFamily='"Parisienne", cursive;'
                    mb='0'
                    fontSize='1.5rem'
                    textAlign='center'
                    borderBottom='2px solid black'
                  >
                    {companySignature}
                  </Text>
                </Box>
                <Text
                  fontSize='.9rem'
                  fontWeight='600'
                  mx='auto'
                  w='fit-content'
                  mt='.5rem'
                >
                  Signature
                </Text>
              </Box>
            </Flex>
            <Box pos='absolute' bottom='0' w='full'>
              <Text textAlign='center' m='1rem 0 1rem' fontSize='.8rem'>
                Thank You For Your Patronage
              </Text>
              <Flex justify='center' gap='2rem' mb='1rem' fontSize='.9rem'>
                {companyPhone && (
                  <HStack>
                    <Icon as={CgPhone} />
                    <Text mb='0'>{companyPhone}</Text>
                  </HStack>
                )}
                {companyWebsite && (
                  <HStack>
                    <Icon as={AiFillChrome} />
                    <Text mb='0'>{companyWebsite}</Text>
                  </HStack>
                )}
                {companyAddress && (
                  <HStack>
                    <Icon as={ImLocation2} />
                    <Text mb='0'>{companyAddress}</Text>
                  </HStack>
                )}
              </Flex>
              {watermark && (
                <Flex
                  justify='center'
                  color={colorScheme}
                  align='center'
                  mb='1rem'
                >
                  <Text mb='0'>Made with</Text>
                  <Icon as={GiLoveMystery} mx='.5rem' />
                  <Text mb='0'>by Invoicy</Text>
                </Flex>
              )}
              <Box h='2rem' bgColor={colorScheme} />
            </Box>
          </Box>
        </PDFExport>
      </Box>
      <Box w='full'>
        <Box h='2rem' bgColor={colorScheme} /> {/* Invoice Top  */}
        <Flex
          p='2rem'
          justify='space-between'
          bgColor='gray.200'
          flexDir={['column', 'row']}
        >
          <Box>
            {companyLogo !== undefined ? (
              <Box h={`${height}rem`}>
                <Image src={companyLogo?.cdnUrl} h='full' w='auto' />
              </Box>
            ) : (
              <Heading mb='3rem' color={colorScheme} noOfLines={1}>
                {companyName || 'LOGO'}
              </Heading>
            )}
            <Box mt='1rem' px='0rem' w='full'>
              <Text fontWeight='600' w='100%' borderBottom='2px solid black'>
                Bill to:
              </Text>
              <Text>{customerName}</Text>
              <Text>{customerEmail}</Text>
              <Text>{customerAddress}</Text>
              <Text>{customerPhone}</Text>
            </Box>
          </Box>
          <Box mt={['1rem', '0']}>
            <Heading mb='3rem' display={['none', 'block']}>
              Invoice
            </Heading>
            <Text>Date: {date}</Text>
            <Text textTransform='capitalize'>Invoice No: {invoiceNo}</Text>
          </Box>
        </Flex>
        <TableContainer>
          <Table variant='striped'>
            <Thead>
              <Tr bgColor={colorScheme}>
                <TH label='Description' first textScheme={textScheme} />
                <TH label='Qty' textScheme={textScheme} />
                <TH label='Unit Price' textScheme={textScheme} />
                <TH label='Total' textScheme={textScheme} />
              </Tr>
            </Thead>
            <Tbody borderX='1px solid' borderColor='gray.400'>
              {populatedItem?.map((x) => (
                <Tr key={x.id}>
                  <TD label={x.desc} first />
                  <TD label={x.unit} />
                  <TD label={CUR(x.price)} />
                  <TD label={CUR(x.amount)} />
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex
          mt='1rem'
          justify='space-between'
          px='1rem'
          flexDirection={['column-reverse', 'row']}
        >
          <Box w={['95%', '40%']} mt={['2rem', '0']} mx={['auto', 'unset']}>
            <Text
              fontSize='.9rem'
              fontWeight='600'
              textAlign={['center', 'left']}
            >
              Additional Information
            </Text>
            <Text fontSize='.8rem' textAlign={['center', 'left']}>
              {additionalInfo}
            </Text>
          </Box>
          <Box w={['full', 'auto']}>
            <VStack>
              <InvoiceTotal title='Subtotal' value={total || 0} />
              <InvoiceTotal title='Discount' value={`-${discount || 0} `} />
              <InvoiceTotal title='Tax' value={taxAmount || 0} />
            </VStack>
            <FinalTotal
              title='Total'
              value={finalTotal}
              colorScheme={colorScheme}
              textScheme={textScheme}
              currency={currency}
            />
          </Box>
        </Flex>
        <Flex justify='flex-start' mt='3rem' pl='1rem'>
          <Box w={['full', '30%']}>
            <Box h='auto'>
              {/* <Image src='' h='full' w='auto' /> */}
              <Text
                fontFamily='"Parisienne", cursive;'
                mb='0'
                fontSize='1.5rem'
                textAlign='center'
                borderBottom='2px solid black'
              >
                {companySignature}
              </Text>
            </Box>
            <Text
              fontSize='.9rem'
              fontWeight='600'
              mx='auto'
              w='fit-content'
              mt='.5rem'
            >
              Signature
            </Text>
          </Box>
        </Flex>
        <Box w='full'>
          <Text textAlign='center' m='4rem 0 1rem' fontSize='.8rem'>
            Thank You For Your Patronage
          </Text>
          <Flex
            justify='center'
            gap='2rem'
            mb='1rem'
            fontSize='.9rem'
            flexWrap='wrap'
          >
            {companyPhone && (
              <HStack>
                <Icon as={CgPhone} />
                <Text mb='0'>{companyPhone}</Text>
              </HStack>
            )}
            {companyWebsite && (
              <HStack>
                <Icon as={AiFillChrome} />
                <Text mb='0'>{companyWebsite}</Text>
              </HStack>
            )}
            {companyAddress && (
              <HStack>
                <Icon as={ImLocation2} />
                <Text mb='0'>{companyAddress}</Text>
              </HStack>
            )}
          </Flex>
          {watermark && (
            <Flex justify='center' color='gray.400' align='center' mb='1rem'>
              <Text mb='0'>Made with</Text>
              <Icon as={GiLoveMystery} mx='.5rem' />
              <Text mb='0'>by Invoicy</Text>
            </Flex>
          )}
          <Box h='2rem' bgColor={colorScheme} />
        </Box>
      </Box>
      <HStack
        justify='center'
        mt='2rem'
        gap='1rem'
        spacing={'0'}
        mb='4rem'
        w='full'
        flexDir={['column', 'row']}
      >
        <Button
          bgColor='gray.500'
          color='white'
          px='2rem'
          h='3rem'
          w={['full', 'fit-content']}
          onClick={handlePrint}
          display={['none', 'unset']}
        >
          Print Invoice
        </Button>
        <Button
          bgColor={colorScheme}
          color={textScheme}
          px='2rem'
          h='3rem'
          w={['full', 'fit-content']}
          onClick={downloadInvoice}
        >
          Download Invoice
        </Button>
      </HStack>
    </Box>
  );
}

export default TemplateOne;
