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
  Circle,
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

function TemplateTwo({
  showInvoice,
  refB,
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
  handlePrint,
  downloadInvoice,
}) {
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
          ref={refB}
          paperSize='A4'
          scale={0.7}
          margin={20}
          fileName={`INVOICY - ${invoiceNo}.pdf`}
          author='KendoReact Team'
        >
          <Box w='full' h='29.65cm' pos='relative'>
            {/* <Box h='2rem' bgColor={colorScheme} /> Invoice Top  */}
            <Box w='full' p='1rem'>
              <Flex
                p='2rem'
                justify='space-between'
                bgColor={colorScheme}
                color={textScheme}
                flexDir={['row']}
                borderRadius='30px 30px 0 0'
              >
                <Box mt={['1rem', '0']}>
                  <Heading mb='3rem' display={['block']}>
                    Invoice
                  </Heading>
                  <Box mt='1rem' px='0rem' w='full'>
                    <Text
                      fontWeight='600'
                      w='100%'
                      borderBottom='2px solid'
                      borderColor={textScheme}
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
                  <Box h='fit-content'>
                    {companyLogo !== undefined ? (
                      <Flex h='4rem'>
                        <Image src={companyLogo?.cdnUrl} h='full' w='auto' />
                      </Flex>
                    ) : (
                      <VStack>
                        <Circle
                          fontSize='3rem'
                          fontWeight='800'
                          bgColor={textScheme}
                          color={colorScheme}
                          size='5rem'
                        >
                          {companyName.charAt(0) || 'L'}
                        </Circle>
                        <Heading>{companyName.split(' ')[0] || 'LOGO'}</Heading>
                      </VStack>
                    )}
                  </Box>
                  <Box mt='2rem' textAlign={['right']}>
                    <Text mb='.5rem'>Date: {date}</Text>
                    <Text textTransform='capitalize'>
                      Invoice No: {invoiceNo}
                    </Text>
                  </Box>
                </Box>
              </Flex>
              <TableContainer>
                <Table variant='striped'>
                  <Thead>
                    <Tr bgColor={textScheme} h='3rem'>
                      <TH label='Description' first textScheme={colorScheme} />
                      <TH label='Qty' textScheme={colorScheme} />
                      <TH label='Unit Price' textScheme={colorScheme} />
                      <TH label='Total' textScheme={colorScheme} />
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
                px='.1rem'
                flexDirection={['row']}
              >
                <Box
                  w={['40%']}
                  mt={['0']}
                  outline='2px solid'
                  outlineColor={colorScheme}
                >
                  <Text
                    fontSize='.9rem'
                    fontWeight='600'
                    textAlign={['center', 'center']}
                    bg={colorScheme}
                    color={textScheme}
                    py='1rem'
                    mb='.5rem'
                  >
                    Additional Information
                  </Text>
                  <Text fontSize='.8rem' textAlign={['left']} px='.5rem'>
                    {additionalInfo}
                  </Text>
                </Box>
                <Box w={['auto']}>
                  <VStack>
                    <InvoiceTotal title='Subtotal' value={total || 0} />
                    <InvoiceTotal
                      title='Discount'
                      value={`-${discount || 0} `}
                    />
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
                <Box w={['30%']}>
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
            </Box>
            <Box
              pos='absolute'
              bottom='0'
              w='100%'
              m='1rem 0 0'
              bgColor={colorScheme}
              //   clipPath='polygon(0 45%, 50% 0, 100% 45%, 100% 100%, 0% 100%)'
              color={textScheme}
              py='1rem'
            >
              <Text textAlign='center' fontSize='.8rem'>
                Thank you for your patronage from {companyName}!
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
                <Flex
                  justify='center'
                  color={textScheme}
                  align='center'
                  mb='0rem'
                >
                  <Text mb='0'>Made with</Text>
                  <Icon as={GiLoveMystery} mx='.5rem' />
                  <Text mb='0'>by Invoicy</Text>
                </Flex>
              )}
              {/* <Box h='2rem' bgColor={colorScheme} /> */}
            </Box>
          </Box>
        </PDFExport>
      </Box>
      <Box w='full'>
        {/* <Box h='2rem' bgColor={colorScheme} /> Invoice Top  */}
        <Flex
          p='2rem'
          justify='space-between'
          bgColor={colorScheme}
          color={textScheme}
          flexDir={['column-reverse', 'row']}
          borderRadius='30px 30px 0 0'
        >
          <Box mt={['1rem', '0']}>
            <Heading mb='3rem' display={['none', 'block']}>
              Invoice
            </Heading>
            <Box mt='1rem' px='0rem' w='full'>
              <Text
                fontWeight='600'
                w='100%'
                borderBottom='2px solid'
                borderColor={textScheme}
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
            <Box h='fit-content'>
              {companyLogo !== undefined ? (
                <Flex justify={['center', 'unset']} h='4rem'>
                  <Image src={companyLogo?.cdnUrl} h='full' w='auto' />
                </Flex>
              ) : (
                <VStack>
                  <Circle
                    fontSize='3rem'
                    fontWeight='800'
                    bgColor={textScheme}
                    color={colorScheme}
                    size='5rem'
                  >
                    {companyName.charAt(0) || 'L'}
                  </Circle>
                  <Heading>{companyName.split(' ')[0] || 'LOGO'}</Heading>
                </VStack>
              )}
            </Box>
            <Box mt='2rem' textAlign={['center', 'right']}>
              <Text mb='.5rem'>Date: {date}</Text>
              <Text textTransform='capitalize'>Invoice No: {invoiceNo}</Text>
            </Box>
          </Box>
        </Flex>
        <TableContainer>
          <Table variant='striped'>
            <Thead>
              <Tr bgColor={textScheme} h='3rem'>
                <TH label='Description' first textScheme={colorScheme} />
                <TH label='Qty' textScheme={colorScheme} />
                <TH label='Unit Price' textScheme={colorScheme} />
                <TH label='Total' textScheme={colorScheme} />
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
          px='.1rem'
          flexDirection={['column-reverse', 'row']}
        >
          <Box
            w={['95%', '40%']}
            mt={['2rem', '0']}
            mx={['auto', 'unset']}
            outline='2px solid'
            outlineColor={colorScheme}
          >
            <Text
              fontSize='.9rem'
              fontWeight='600'
              textAlign={['center', 'center']}
              bg={colorScheme}
              color={textScheme}
              py='1rem'
              mb='.5rem'
            >
              Additional Information
            </Text>
            <Text fontSize='.8rem' textAlign={['center', 'left']} px='.5rem'>
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
        <Box
          w='full'
          m='4rem 0 0'
          bgColor={colorScheme}
          //   clipPath='polygon(0 45%, 50% 0, 100% 45%, 100% 100%, 0% 100%)'
          color={textScheme}
          py='1rem'
        >
          <Text textAlign='center' fontSize='.8rem'>
            Thank you for your patronage from {companyName}!
          </Text>
          <Flex
            justify='center'
            gap='2rem'
            mb='1rem'
            fontSize='.9rem'
            flexWrap='wrap'
          >
            {companyPhone && (
              <HStack justify='center'>
                <Icon as={CgPhone} />
                <Text mb='0'>{companyPhone}</Text>
              </HStack>
            )}
            {companyWebsite && (
              <HStack justify='center'>
                <Icon as={AiFillChrome} />
                <Text mb='0'>{companyWebsite}</Text>
              </HStack>
            )}
            {companyAddress && (
              <HStack flexWrap='wrap' justify='center'>
                <Icon as={ImLocation2} />
                <Text mb='0'>{companyAddress}</Text>
              </HStack>
            )}
          </Flex>
          {watermark && (
            <Flex justify='center' color={textScheme} align='center' mb='0rem'>
              <Text mb='0'>Made with</Text>
              <Icon as={GiLoveMystery} mx='.5rem' />
              <Text mb='0'>by Invoicy</Text>
            </Flex>
          )}
          {/* <Box h='2rem' bgColor={colorScheme} /> */}
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

export default TemplateTwo;
