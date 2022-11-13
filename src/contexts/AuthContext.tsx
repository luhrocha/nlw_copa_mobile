import { createContext, ReactNode } from "react";

interface UserProps{
    name: String,
    avatarUrl: String
}

export interface AuthContextDataProps{
    user: UserProps,
    signIn: () => Promise<void>
}

interface AuthContextProvider{
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthContextProvider){
    async function signIn() {
        console.log('vamos logar')
    }

    return(
        <AuthContext.Provider value={{
            signIn,
            user:{
                name:'Luana rocha',
                avatarUrl: 'https://github.com/luhrocha.png'
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
}