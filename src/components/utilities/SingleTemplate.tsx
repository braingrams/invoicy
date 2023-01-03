import {
  Box,
  Flex,
  Grid,
  Text,
  Image,
  Heading,
  Table,
  Tr,
  TableContainer,
  Tbody,
  Thead,
  VStack,
  Icon,
  HStack,
  Circle,
  Button,
  useToast,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  PrimaryCheckBox,
  PrimaryCurrencyInput,
  PrimaryInput,
  PrimarySelect,
  PrimaryTextArea,
} from './FormField';
import TemplateSection from './TemplateSection';
import { TD, TH } from './Tables';
import InvoiceTotal, { FinalTotal } from './InvoiceTotal';
import { CgPhone } from 'react-icons/cg';
import { ImLocation2, ImTextColor } from 'react-icons/im';
import { MdOutlineColorLens } from 'react-icons/md';
import {
  AiFillChrome,
  AiFillDelete,
  AiFillEdit,
  AiOutlineBgColors,
  AiOutlinePlus,
} from 'react-icons/ai';
import { GiLoveMystery, GiRoyalLove } from 'react-icons/gi';
import uuid from 'react-uuid';
import moment from 'moment';
import UploadCareWidget from './UploadCareWidget';
import { PDFExport } from '@progress/kendo-react-pdf';
import { useReactToPrint } from 'react-to-print';
import Wheels from './Wheels';
import useComponentVisible from './useComponentVisible';
import useClickOutside from './useClickOutside';
import { CUR } from './Currency';

function SingleTemplate() {
  const [colorScheme, setColorScheme] = useState('brand.100');
  const [textScheme, setTextScheme] = useState('white');
  const [showColorWheel, setShowColorWheel] = useState(false);
  const [showTextWheel, setShowTextWheel] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState<string>('');
  const date = moment(new Date()).format('DD-MM-YYYY');
  const [watermark, setWatermark] = useState<boolean>(true);
  const [showInvoice, setShowInvoice] = useState(false);

  // const { wheelRef, isComponentVisible, setIsComponentVisible } =
  //   useComponentVisible(false);

  const close = useCallback(() => setShowColorWheel(false), []);
  const closed = useCallback(() => setShowTextWheel(false), []);
  const popover = useRef();
  const popovers = useRef();

  useClickOutside(popover, close);
  useClickOutside(popovers, closed);

  //   states
  const [companyName, setCompanyName] = useState<string>('');
  const [companyAddress, setCompanyAddress] = useState<string>('');
  const [companyPhone, setCompanyPhone] = useState<string>('');
  const [companyWebsite, setCompanyWebsite] = useState<string>('');
  const [companyLogo, setCompanyLogo] = useState<any>();
  const [companySignature, setCompanySignature] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [discount, setDiscount] = useState<string>('');
  const [tax, setTax] = useState<string>('');
  const [taxAmount, setTaxAmount] = useState<any>();
  const [currency, setCurrency] = useState<string>('');
  const [finalTotal, setFinalTotal] = useState<number>(0);
  const [items, setItems] = useState<any>({
    id: '',
    desc: '',
    price: '',
    unit: '',
    amount: '',
  });
  const [populatedItem, setPopulatedItem] = useState<any[]>([]);
  const [total, setTotal] = useState();
  const amount = Math.round(items.price * items.unit);

  //   console.log({ companyLogo });

  const toast = useToast();

  

  const submitItem = () => {
    if (items.desc == '' || items.price == '' || items.unit == '') {
      toast({
        status: 'error',
        title: 'One or more field is empty',
        position: 'top-right',
      });
      return;
    }
    const newSubmittedItem = {
      id: uuid(),
      desc: items.desc,
      amount: items.amount,
      price: items.price,
      unit: items.unit,
    };
    setItems({
      id: '',
      desc: '',
      price: '',
      unit: '',
      amount: '',
    });
    setPopulatedItem([...populatedItem, newSubmittedItem]);
  };

  const editItem = (id) => {
    setPopulatedItem(populatedItem.filter((x) => x.id !== id));
    const editingItem = populatedItem.find((x) => x.id === id);
    setItems({
      id: editingItem.id,
      desc: editingItem.desc,
      price: editingItem.price,
      unit: editingItem.unit,
      amount: editingItem.amount,
    });
  };

  const deleteItems = (id) => {
    const newItem = populatedItem.filter((x) => x.id !== id);
    setPopulatedItem(newItem);
  };

  useEffect(() => {
    const calculateAmount = () => {
      setItems({ ...items, amount: amount });
    };

    const getTotalAmount = () => {
      const getTotal: any[] = [0];
      populatedItem.forEach((x) => {
        getTotal.push(x.amount);
      });
      setTotal(getTotal.reduce((a, b) => a + b));
    };
    const getTaxAmount = () => {
      const percentage = (num, per) => {
        return (num / 100) * per;
      };
      const percent = percentage(total, tax as unknown as number);
      setTaxAmount(percent);
    };
    const getFinalTotal = () => {
      const getTotal = total + taxAmount - (discount as unknown as number);
      setFinalTotal(getTotal || 0);
    };
    getTaxAmount();
    calculateAmount();
    getTotalAmount();
    getFinalTotal();
  }, [items.price, items.unit, tax, populatedItem, discount, taxAmount, total]);

  useEffect(() => {
    const invoice = uuid().slice(0, 6);
    setInvoiceNo(invoice);
    window.onbeforeunload = function () {
      return 'Data will be lost if you leave the page, are you sure?';
    };
  }, []);

  const ref = useRef<any>(null);
  function downloadInvoice() {
    if (ref.current) {
      ref.current.save();
    }
  }
  // const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  const widgetApi = useRef<any>();
  const [loading, setLoading] = useState(false);
  const uploadLogo = (file) => {
    try {
      if (file) {
        file.progress((info) => {
          console.log('File progress: ', info.progress), setLoading(true);
        });
        file.done((info) => {
          setLoading(false),
            console.log('File uploaded: ', info),
            setCompanyLogo(info);
        });
      }
    } catch (error) {
      console.log({ error });
      setLoading(false);
      toast({
        position: 'top-left',
        status: 'error',
        title: 'An error occured',
      });
    }
  };

  return (
    <Box gap='2rem' mt='1rem' w='full'>
      <Box>
        <Box
          pos='fixed'
          bgColor='white'
          boxShadow='lg'
          p='.5rem 1rem'
          zIndex={800}
          fontSize='1.5rem'
          borderRadius='0 10px 10px 0'
        >
          <VStack cursor='pointer' gap='.5rem'>
            <Icon
              as={AiOutlineBgColors}
              onClick={() => setShowColorWheel(true)}
            />
            <Icon as={ImTextColor} onClick={() => setShowTextWheel(true)} />
          </VStack>
        </Box>
        <VStack
          cursor='pointer'
          gap='1rem'
          pos='absolute'
          left='4%'
          zIndex={800}
        >
          {showColorWheel && (
            <Wheels
              colorScheme={colorScheme}
              setColorScheme={setColorScheme}
              text='Choose Color Scheme'
              refs={popover}
            />
          )}
          {showTextWheel && (
            <Wheels
              colorScheme={textScheme}
              setColorScheme={setTextScheme}
              text='Choose Text Color'
              refs={popovers}
            />
          )}
        </VStack>
      </Box>

      <Box
        w='full'
        bgColor='white'
        pos='sticky'
        top='7rem'
        py='1rem'
        zIndex={790}
      >
        <Box
          display={['flex', 'none']}
          mx='auto'
          justifyContent='center'
          alignItems='center'
          w='80%'
          mb='1rem'
          h='3rem'
          bgColor='brand.600'
          color='white'
          onClick={() => setShowInvoice(!showInvoice)}
        >
          {showInvoice ? 'Edit Invoice' : 'View Invoice'}
        </Box>
      </Box>
      <Box
        w={['100%', '49%']}
        pos={['relative', 'absolute']}
        overflow='auto'
        h='full'
        pr='1rem'
        display={[!showInvoice ? 'block' : 'none', 'block']}
      >
        <Text
          color={colorScheme}
          textAlign='center'
          fontWeight='600'
          textDecor='underline'
          mt='2rem'
        >
          Invoice Information
        </Text>

        <Box mb='3rem'>
          <TemplateSection
            text=' Company/Brand Information.'
            color={colorScheme}
            textScheme={textScheme}
          />
          <Box w='90%' mx='auto'>
            <Grid
              templateColumns={['repeat(1,1fr)', 'repeat(2, 1fr)']}
              gap='2rem'
            >
              <PrimaryInput
                label='Company Name'
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <PrimaryInput
                label='Company Address'
                onChange={(e) => setCompanyAddress(e.target.value)}
              />
            </Grid>
            <Grid
              templateColumns={['repeat(1,1fr)', 'repeat(2, 1fr)']}
              gap='2rem'
              my='2rem'
            >
              {/* <PrimaryInput label='Company Email' /> */}
              <PrimaryInput
                label='Company Phone No.'
                onChange={(e) => setCompanyPhone(e.target.value)}
              />
              <PrimaryInput
                label='Website'
                onChange={(e) => setCompanyWebsite(e.target.value)}
              />
            </Grid>
            <Grid
              templateColumns={['repeat(1,1fr)', 'repeat(2, 1fr)']}
              gap='2rem'
            >
              <UploadCareWidget
                refs={widgetApi}
                loading={loading}
                uploadFunction={uploadLogo}
                filename={companyLogo?.name}
                label='Company Logo'
              />
              <PrimaryInput
                label='Company Signature'
                onChange={(e) => setCompanySignature(e.target.value)}
              />
            </Grid>
          </Box>
        </Box>
        <Box mb='3rem'>
          <TemplateSection
            text='Client/Customer Information.'
            color={colorScheme}
            textScheme={textScheme}
          />

          <Box w='90%' mx='auto'>
            <Grid
              templateColumns={['repeat(1,1fr)', 'repeat(2, 1fr)']}
              gap='2rem'
            >
              <PrimaryInput
                label='Name'
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <PrimaryInput
                label='Address'
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
            </Grid>
            <Grid
              templateColumns={['repeat(1,1fr)', 'repeat(2, 1fr)']}
              gap='2rem'
              my='2rem'
            >
              <PrimaryInput
                label='Email'
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
              <PrimaryInput
                label='Phone No.'
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
              {/* <PrimaryInput label='Invoice no' /> */}
            </Grid>
          </Box>
        </Box>
        <Box mb='3rem'>
          <TemplateSection
            text='Product Details'
            color={colorScheme}
            textScheme={textScheme}
          />
          <Box w='90%' mx='auto'>
            <Grid
              templateColumns={['repeat(1,1fr)', 'repeat(1, 1fr)']}
              gap='2rem'
            >
              <PrimaryInput
                label='Item Description'
                onChange={(e) => setItems({ ...items, desc: e.target.value })}
                value={items.desc}
              />
            </Grid>
            <Grid
              templateColumns={['repeat(1,1fr)', 'repeat(3, 1fr)']}
              gap='2rem'
              my='2rem'
            >
              <PrimaryInput
                label='Quantity'
                onChange={(e) => setItems({ ...items, unit: e.target.value })}
                value={items.unit}
              />
              <PrimaryInput
                label='Price'
                onChange={(e) => setItems({ ...items, price: e.target.value })}
                value={items.price}
              />
              {/* <PrimaryCurrencyInput
                label='Price'
                onChange={(e) => setItems({ ...items, price: e.target.value })}
              /> */}

              <PrimaryInput label='Amount' value={items.amount} readonly />
            </Grid>
            <HStack align='center' as='button' onClick={() => submitItem()}>
              <Circle bgColor={colorScheme} color='white' size='2rem'>
                <Icon as={AiOutlinePlus} />
              </Circle>
              <Text mb='0' fontWeight='600'>
                Add Item
              </Text>
            </HStack>
          </Box>
          {populatedItem.length > 0 && (
            <Box w='full' px='1rem' mt='1rem'>
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr bgColor={'gray.500'}>
                      <TH label='Description' />
                      <TH label='Qty' />
                      <TH label='Unit Price' />
                      <TH label='Total' />'
                      <TH label='' />
                    </Tr>
                  </Thead>
                  <Tbody borderX='1px solid' borderColor='gray.400'>
                    {populatedItem?.map((x) => (
                      <Tr>
                        <TD label={x.desc} />
                        <TD label={x.unit} />
                        <TD label={x.price} />
                        <TD label={x.amount} />
                        <TD
                          label={
                            <Icon
                              as={AiFillEdit}
                              onClick={() => editItem(x.id)}
                            />
                          }
                        />
                        <TD
                          label={
                            <Icon
                              as={AiFillDelete}
                              onClick={() => deleteItems(x.id)}
                            />
                          }
                        />
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
        <Box mb='3rem'>
          <TemplateSection
            text='Additional Information'
            color={colorScheme}
            textScheme={textScheme}
          />
          <Box w='90%' mx='auto'>
            <Grid
              templateColumns={['repeat(1,1fr)', 'repeat(1, 1fr)']}
              gap='2rem'
            >
              <PrimaryTextArea
                label='Additional Notes/Information'
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </Grid>
            <Box mt='2rem'>
              <PrimaryCheckBox
                label='Remove watermark from invoice'
                onChange={() => setWatermark(!watermark)}
              />
            </Box>
          </Box>
        </Box>
        <Box mb='3rem'>
          <TemplateSection
            text='Discount & Tax'
            color={colorScheme}
            textScheme={textScheme}
          />
          <Box w='90%' mx='auto'>
            <Grid
              templateColumns={['repeat(1,1fr)', 'repeat(3, 1fr)']}
              gap='2rem'
            >
              <PrimaryInput
                label='Discount'
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
              />
              <PrimaryInput
                label='Tax (%)'
                onChange={(e) => setTax(e.target.value)}
                value={tax}
              />
              <PrimarySelect
                label='Currency'
                options={['USD', 'EUR', 'NGN']}
                onChange={(e) => setCurrency(e.target.value)}
              />
            </Grid>
          </Box>
        </Box>
      </Box>

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
            ref={ref}
            paperSize='A4'
            scale={0.7}
            margin={20}
            fileName={`INVOICY - ${invoiceNo}.pdf`}
            author='KendoReact Team'
          >
            <Box w='full' h='29.7cm' pos='relative'>
              <Box h='2rem' bgColor={colorScheme} /> {/* Invoice Top  */}
              <Flex p='2rem' justify='space-between' bgColor='gray.200'>
                <Box>
                  <Box h='4rem'>
                    {companyLogo !== undefined ? (
                      <Image src={companyLogo?.cdnUrl} h='full' w='auto' />
                    ) : (
                      <Heading mb='3rem' color={colorScheme} noOfLines={1}>
                        {companyName || 'LOGO'}
                      </Heading>
                    )}
                  </Box>
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
                  {/* <Box>
              <Text>Company Name</Text>
              <Text>Company Address</Text>
              <Text>Company Email</Text>
              <Text>Company Phone No.</Text>
            </Box> */}
                </Box>
                <Box>
                  <Heading mb='3rem'>Invoice</Heading>
                  <Text>Date: {date}</Text>
                  <Text textTransform='capitalize'>
                    Invoice No: {invoiceNo}
                  </Text>
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
                      <Tr>
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
                <Text textAlign='center' m='4rem 0 1rem' fontSize='.8rem'>
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
                    color='gray.400'
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
              <Box h='4rem'>
                {companyLogo !== undefined ? (
                  <Image src={companyLogo?.cdnUrl} h='full' w='auto' />
                ) : (
                  <Heading mb='3rem' color={colorScheme} noOfLines={1}>
                    {companyName || 'LOGO'}
                  </Heading>
                )}
              </Box>
              <Box mt='1rem' px='0rem' w='full'>
                <Text fontWeight='600' w='100%' borderBottom='2px solid black'>
                  Bill to:
                </Text>
                <Text>{customerName}</Text>
                <Text>{customerEmail}</Text>
                <Text>{customerAddress}</Text>
                <Text>{customerPhone}</Text>
              </Box>
              {/* <Box>
              <Text>Company Name</Text>
              <Text>Company Address</Text>
              <Text>Company Email</Text>
              <Text>Company Phone No.</Text>
            </Box> */}
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
                  <Tr>
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
    </Box>
  );
}

export default SingleTemplate;
