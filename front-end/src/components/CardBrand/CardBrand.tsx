import { IBrand } from "@/interface/brand.interfaces";
import { Box, Center, Image } from "@chakra-ui/react";

interface IProps {
  brand?: IBrand;
}
const CardBrand: React.FC<IProps> = ({ brand }): JSX.Element => {
  return (
    <Box p={4}  w="120px" h="120px" border="1px solid #ebebeb" rounded="lg">
      <Center h="full">
        <Image
          bgSize="cover"
          rounded="lg"
          src={brand?.logo_brand}
          alt={brand?.brand_name}
    
        />
      </Center>
    </Box>
  );
};

export default CardBrand;
