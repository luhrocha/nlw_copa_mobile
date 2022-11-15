import { Heading, Text, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import Logo from '../assets/logo.svg';
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import {Alert} from 'react-native';
import { api } from "../services/api";

export function New(){

    const [titlePool, setTitlePool] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    async function handlePoolCreate(){
        if(!titlePool.trim()){
            //Alert.alert('Opa', 'Informe um título!!');
            return toast.show({
                title: 'Informe um nome para o seu bolão',
                placement:"top",
                bgColor: 'red.500'
            })
        }
       

        try {
            setIsLoading(true);
            await api.post('/spools', {title: titlePool})

            toast.show({
                title: 'Bolão criado com sucesso',
                placement:"top",
                bgColor: 'green.500'
            })

        } catch (error) {
            console.log(error)
            toast.show({
                title: 'Não foi possível criar o bolão',
                placement:"top",
                bgColor: 'red.500'
            })
        }finally{
            setIsLoading(false);
        }

    }

    

    return(
        <VStack flex={1} bgColor={'gray.900'}>
            <Header title="Criar novo bolão"/>
            <VStack mt={8} mx={5} alignItems={'center'}>
                <Logo/>
                <Heading
                    fontFamily={'heading'}
                    color={'white'}
                    fontSize={'xl'}
                    my={8}
                    textAlign={'center'}
                >
                    Crie seu próprio bolão da copa e compartilhe entre amigos!
                </Heading>
                <Input 
                    mb={2} 
                    placeholder={'Qual o nome do seu bolão?'}
                    onChangeText={setTitlePool}
                    value={titlePool} 
                />
                <Button 
                    title="Criar meu bolão" 
                    onPress={handlePoolCreate}
                    isLoading={isLoading}
                />

                <Text color={'gray.200'} textAlign={'center'} size={'sm'} px={10} mt={4}>
                    Após criar seu bolão, você receberá um {'\n'} código único que 
                    poderá usar para convidar {'\n'} outras pessoas.
                </Text>
            </VStack>
        </VStack>
    );
}