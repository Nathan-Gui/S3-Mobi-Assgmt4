'use client'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config"
import { useState, useEffect, ReactNode } from "react";
import { StyleSheet } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import SignUpIn from '@/components/core/SignUpIn'
import { ThemedView } from "@/components/ThemedView";
import { backendChkAuth } from "@/components/core/User";
import { GlobalStyle } from '@/components/core/GlobalStyle';
import Loading from "@/components/core/Loading";

interface Props {
  children?: ReactNode
}

const Shell = ({children}:Props ) => {
  const colorScheme = useColorScheme();
  
  const [user] = useAuthState(auth)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isFullyLoaded, setIsFullyLoaded] = useState(false)

  useEffect(() => {
    setIsFullyLoaded(false)
    backendChkAuth().then(rstFB => {
      console.log('{ -1:exp, 0:offBoard, 1:onBoard }:' + rstFB)
      if (rstFB === -1){
        console.log('Shell: chk-auth failed, Fin')
      }else{
        console.log('Shell: chk-auth OK:  Fin')
        if (rstFB === 0){
          console.log('Shell: chk-auth OK: Off Board, Fin')
          setIsLoggedIn(false)
        }else if (rstFB === 1){
          console.log('Shell: chk-auth OK: On Board, Fin')
          setIsLoggedIn(true)
        }
      }
    }).then(()=>{
      setIsFullyLoaded(true)
    })
  }, [user])

  if (!isFullyLoaded){
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ThemedView style={GlobalStyle.RootContainer}>
          <Loading />
        </ThemedView>
      </ThemeProvider>
    )
  } else {
    if (!isLoggedIn){
      return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <ThemedView style={GlobalStyle.RootContainer}>
            <SignUpIn />
          </ThemedView>
        </ThemeProvider>
      )
    } else {
      return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <ThemedView style={GlobalStyle.RootContainer}>
            {children}
          </ThemedView>
        </ThemeProvider>
      );
    }
  }
}

export default Shell
