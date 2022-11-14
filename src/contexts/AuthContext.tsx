import { createContext, ReactNode, useEffect, useState } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface UserProps{
    name: String,
    avatarUrl: String,
}

export interface AuthContextDataProps{
    user: UserProps,
    signIn: () => Promise<void>,    
    isUserLoading: boolean,
}

interface AuthContextProvider{
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthContextProvider){
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [isUserLoading, setIsUserLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '736736099552-gi0qp5d31h327hsiji3k1oet3d1k2e55.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
        scopes: ['profile', 'email']
    });


    async function signIn() {
        try {
            setIsUserLoading(true);
            await promptAsync();
        } catch (error) {
            console.log(error);
            throw error;
        }finally{
            setIsUserLoading(false);
        }
    }

    async function signInWithGoogle(access_token: string) {
        console.log('token de autenticação', access_token);
    }

    useEffect(()=>{
        if(response?.type === 'success' && response.authentication?.accessToken){
            signInWithGoogle(response.authentication.accessToken)
        }
    }, [response]);

    return(
        <AuthContext.Provider value={{
            signIn,
            user,
            isUserLoading,
        }}>
            {children}
        </AuthContext.Provider>
    );
}