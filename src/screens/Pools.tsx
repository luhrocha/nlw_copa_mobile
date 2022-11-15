import { Icon, Text, VStack } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import {Octicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'

export function Pools(){

    const navigation = useNavigation();

    return(
        <VStack flex={1} bgColor={'gray.900'}>
            <Header title="Meus bolões"/>
            <VStack mt={6} mx={5} borderBottomColor={'gray.600'} borderBottomWidth={1}
                    pb={4} mb={4}
            >                
                <Button 
                    title="Buscar Bolão por código" 
                    leftIcon={<Icon as={Octicons} name={'search'} color={'black'} size={'md'}/>}
                    onPress={() => navigation.navigate('find')}
                />                
            </VStack>
            <Text mt={3} color={'gray.200'} size={'sm'} textAlign={'center'}>
                Você ainda não está participando de nenhum bolão, que tal buscar um por código ou criar um novo?
            </Text>
        </VStack>
    )
}