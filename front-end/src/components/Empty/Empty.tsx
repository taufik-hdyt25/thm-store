import { Box, Center, Image, Text } from "@chakra-ui/react"

interface IProps{
    image?: string
    description?: string

}
const Empty:React.FC<IProps> = ({image,description}):JSX.Element => {
    return (
        <Box>
        <Center h="full" px={8}>
            <Image alt="empty" src={image} />
        </Center>
            <Text fontWeight="semibold" textAlign="center">{description}</Text>
        </Box>
    )
}

export default Empty