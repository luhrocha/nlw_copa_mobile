import { Button as ButtonNativeBase, Text, IButtonProps } from "native-base";

interface ButtonProps extends IButtonProps{
    title: string,
    type?: 'PRIMARY' | 'SECONDARY'
}

export function Button({title,type, ...props}: ButtonProps){
    return(
        <ButtonNativeBase
            w={'full'}
            h={14}
            rounded="sm"
            fontFamily="md"
            textTransform="uppercase"
            bg={type === "SECONDARY" ? 'red.500' : 'yellow.500'}
            _pressed={{
                bg: type === "SECONDARY" ? 'red.400' : 'yellow.600'
            }}
            _loading={{
                _spinner: {color: 'white'}
            }}
            {...props}
         >
            <Text 
                fontSize={'sm'}
                fontFamily={'heading'}
                textTransform="uppercase"
                color={type === "SECONDARY" ? 'white' : 'black'}
            >{title}</Text>
        </ButtonNativeBase>
    );
}