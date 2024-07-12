import { useHomeAction } from "@/containers/Home/Home.action";
import { useAuth } from "@/hooks/useAuth";
import { useUploadImage } from "@/hooks/useUploadImage";
import { IBrand } from "@/interface/brand.interfaces";
import { ICreateProduct } from "@/interface/product.interface";
import { API } from "@/libs/API";
import { validationSchemaCreateProduct } from "@/utils/validation";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  FormControl,
  Input,
  Grid,
  Select,
  Textarea,
  InputGroup,
  InputLeftAddon,
  Image,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRef } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const ModalAddProduct: React.FC<IProps> = ({
  isOpen,
  onClose,
}): JSX.Element => {
  const { dataBrands } = useHomeAction();
  const { refetchProducts } = useHomeAction();
  const {token} = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)
  const {mutate:addProduct,isPending:loadingProduct} = useMutation({
    mutationFn: async(body: ICreateProduct)=> {
      const response = await API.post("/product", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    },
    onSuccess: ()=> {
      refetchProducts()
      onClose()
      formik.resetForm()

    }
  })

  const {handleChangeImage,loadingUploadImage,uploadImage,selectedImageFile,setSelectedImageFile,setSelectedFile} = useUploadImage({
    onSuccess: (res)=> {
      console.log(res);
      
      addProduct({
        name: formik.values.name,
        brand_id: formik.values.brand,
        description: formik.values.description,
        price: formik.values.price,
        stock: formik.values.stock,
        image: res.url
      })
    },
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      stock: 0,
      description: '',
      brand: 0
    },
    onSubmit: ()=> {
      uploadImage()

    },
    validationSchema: validationSchemaCreateProduct,
  });


  const handleForm = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  const handleClose = ()=> {
    formik.resetForm()
    setSelectedImageFile("")
    setSelectedFile("")
    onClose()
  }


  

  return (
    <Modal isCentered size="xl" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid gap={3} gridTemplateColumns="1fr 1fr ">
            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <Input onChange={handleForm} name="name" placeholder="Product name" />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input onChange={handleForm} name="price" type="number" placeholder="Price" />
            </FormControl>
            <FormControl>
              <FormLabel>Stock</FormLabel>
              <Input onChange={handleForm} name="stock" type="number" placeholder="Stock" />
            </FormControl>
            <FormControl>
              <FormLabel>Brand</FormLabel>
              <Select name="brand" onChange={handleForm}>
                {dataBrands?.data.map((data: IBrand, idx: number) => (
                  <option key={idx} value={data.brand_id}>
                    {data.brand_name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
            onChange={handleForm}
              name="description"
              rows={5}
              resize="none"
              placeholder="Description"
            />
          </FormControl>

          {
            selectedImageFile && <Image src={selectedImageFile} alt="product" />
          }

          <InputGroup mt={3} onClick={()=> {
            if(inputRef.current){
              inputRef.current.click()
            }
          }}>
            <InputLeftAddon>Choose</InputLeftAddon>
            <Input type="text" readOnly placeholder={selectedImageFile} />
            <Input ref={inputRef} type="file" display="none" name="image" onChange={handleChangeImage} placeholder="" />
          </InputGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            borderColor="primary"
            variant="outline"
            mr={3}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button isLoading={loadingUploadImage || loadingProduct} onClick={()=>formik.handleSubmit()} bg="primary" color="white">
            Add Product
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddProduct;
