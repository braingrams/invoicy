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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
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
import { FiImage } from 'react-icons/fi';
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
import TemplateOne from './Templates/TemplateOne';
import TemplateTwo from './Templates/TemplateTwo';

function SingleTemplate({ template }) {
  const [colorScheme, setColorScheme] = useState(
    template == 1 ? 'brand.100' : '#e5127a'
  );
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
  const [height, setHeight] = useState(4);

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

  const refA = useRef<any>(null);
  //Template two
  const refB = useRef<any>(null);
  function downloadInvoiceB() {
    if (refB.current) {
      refB.current.save();
    }
  }
  const handlePrintB = useReactToPrint({
    content: () => refB.current,
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
          w='55%'
          mb='1rem'
          h='3rem'
          bgColor={colorScheme}
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
                type='tel'
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
              <Box>
                <UploadCareWidget
                  refs={widgetApi}
                  loading={loading}
                  uploadFunction={uploadLogo}
                  filename={companyLogo?.name}
                  label='Company Logo'
                />
                <Text fontSize='.7rem' my='.5rem'>
                  Adjust Logo Size
                </Text>
                <Slider
                  flex='1'
                  focusThumbOnChange={false}
                  value={height}
                  onChange={(value) => setHeight(value)}
                >
                  <SliderTrack>
                    <SliderFilledTrack bg={colorScheme} />
                  </SliderTrack>
                  <SliderThumb fontSize='sm' boxSize='32px'>
                    <Box color={colorScheme} as={FiImage} />
                  </SliderThumb>
                </Slider>
              </Box>
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
                type='email'
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
              <PrimaryInput
                label='Phone No.'
                type='tel'
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
                type='number'
                onChange={(e) => setItems({ ...items, unit: e.target.value })}
                value={items.unit}
              />
              <PrimaryInput
                label='Price'
                type='number'
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
                    <Tr bgColor={'gray.400'}>
                      <TH label='Description' />
                      <TH label='Qty' />
                      <TH label='Unit Price' />
                      <TH label='Total' />
                      <TH label={''} />
                      <TH label={''} />
                    </Tr>
                  </Thead>
                  <Tbody borderX='1px solid' borderColor='gray.400'>
                    {populatedItem?.map((x) => (
                      <Tr key={x.id}>
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

      {template == '1' ? (
        <TemplateOne
          showInvoice={showInvoice}
          refA={refA}
          invoiceNo={invoiceNo}
          colorScheme={colorScheme}
          companyLogo={companyLogo}
          companyName={companyName}
          customerEmail={customerEmail}
          customerName={customerName}
          customerPhone={customerPhone}
          customerAddress={customerAddress}
          date={date}
          textScheme={textScheme}
          populatedItem={populatedItem}
          additionalInfo={additionalInfo}
          total={total}
          taxAmount={taxAmount}
          discount={discount}
          companySignature={companySignature}
          companyAddress={companyAddress}
          companyPhone={companyPhone}
          companyWebsite={companyWebsite}
          currency={currency}
          watermark={watermark}
          finalTotal={finalTotal}
          height={height}
        />
      ) : template == '2' ? (
        <>
          <TemplateTwo
            showInvoice={showInvoice}
            refB={refB}
            invoiceNo={invoiceNo}
            colorScheme={colorScheme}
            companyLogo={companyLogo}
            companyName={companyName}
            customerEmail={customerEmail}
            customerName={customerName}
            customerPhone={customerPhone}
            customerAddress={customerAddress}
            date={date}
            textScheme={textScheme}
            populatedItem={populatedItem}
            additionalInfo={additionalInfo}
            total={total}
            taxAmount={taxAmount}
            discount={discount}
            companySignature={companySignature}
            companyAddress={companyAddress}
            companyPhone={companyPhone}
            companyWebsite={companyWebsite}
            currency={currency}
            watermark={watermark}
            finalTotal={finalTotal}
            handlePrint={handlePrintB}
            downloadInvoice={downloadInvoiceB}
            height={height}
          />
        </>
      ) : null}
    </Box>
  );
}

export default SingleTemplate;
