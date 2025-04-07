'use client'
import { useState } from "react"
// import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
// import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
// import {auth} from "@/firebase/config"
import { useRouter } from "expo-router"
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GlobalStyle } from '@/components/core/GlobalStyle';
import { ThemedTextInput } from "@/components/ThemedTextInput"
import { backendSignIn_v2, backendSignUp_v2 } from "@/components/core/User"
import { User } from "firebase/auth"
import Loading from "@/components/core/Loading";
import * as Yup from 'yup';
import { Formik } from "formik";

const SignUpIn = () => {
  const colorScheme = useColorScheme();
  const router = useRouter()
  const [error, setError] = useState<string | (User & String)>('')
  const [isSignIn, setIsSignIn] = useState(true)
  const [isFullyLoaded, setIsFullyLoaded] = useState(true)

  // const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)
  // const [createUserWithEmailAndPassword, user, loading, createError] = useCreateUserWithEmailAndPassword(auth)

  const handleSignIn = async (_email: string, _password: string) => {
    setIsFullyLoaded(false)
    backendSignIn_v2(_email, _password).then(rstFB => {
      if (typeof rstFB === 'string' || rstFB instanceof String){
        console.log('to-do: use rstFB to update error message')
        setError(rstFB)
        setIsFullyLoaded(true)
      } else {
        console.log('to-do: use rstFB to update User Object')
        console.log('to-do: use true to update setSuccSignUp()')
        router.replace('/')
        setIsFullyLoaded(true)
      }
    })
  }

  const handleSignUp = async (_email: string, _password: string) => {
    setIsFullyLoaded(false)
    backendSignUp_v2(_email, _password).then(rstFB => {
      if (typeof rstFB === 'string' || rstFB instanceof String){
        console.log('to-do: use rstFB to update error message')
        setError(rstFB)
        setIsFullyLoaded(true)
      } else {
        console.log('to-do: use rstFB to update User Object')
        console.log('to-do: use true to update setSuccSignUp()')
        router.replace('/')
        setIsFullyLoaded(true)
      }
    })
  }

  const initialValues = { uid: "", pwd: "" };

  const StepOneSchema = Yup.object({
    uid: Yup.string().required('Required').email('Invalid Email'),
    pwd: Yup.string().required('Required'),
  });

  if (isFullyLoaded){
    return (
      <>
      <ThemedView style={GlobalStyle.RootContainer}>
        <ThemedView style={GlobalStyle.titleContainer}>
          <ThemedText type="subtitle">{isSignIn ? 'Sign In' : 'Sign Up' }</ThemedText>
        </ThemedView>

        <ThemedView style={GlobalStyle.ItemContainer}>
        <ThemedText type="defaultError">{error}</ThemedText>
          <Formik
            initialValues={ initialValues }
            validationSchema={ StepOneSchema }
            onSubmit={(values, actions) => {
              console.log(values);
              console.log(values.uid, values.pwd);
              if (isSignIn){
                handleSignIn(values.uid, values.pwd).then(()=>{
                  actions.resetForm({values: initialValues});
                  actions.setSubmitting(false);
                });
              } else {
                handleSignUp(values.uid, values.pwd).then(()=>{
                  actions.resetForm({values: initialValues});
                  actions.setSubmitting(false);
                });
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, handleReset, values, errors, touched, isSubmitting }) => (
              <>
                <ThemedView style={GlobalStyle.form_line}>
                  <ThemedText style={GlobalStyle.label}   >Email:</ThemedText>
                  <ThemedTextInput style={styles.input} onChangeText={handleChange('uid')} onBlur={handleBlur('uid')} value={values.uid}/>
                  <ThemedText style={GlobalStyle.errMsg}>{' '}{touched.uid && errors.uid && (`${errors.uid}`)}</ThemedText>
                </ThemedView>

                <ThemedView style={GlobalStyle.form_line}>
                  <ThemedText style={GlobalStyle.label}>Password:</ThemedText>
                  <ThemedTextInput style={styles.input} onChangeText={handleChange('pwd')} onBlur={handleBlur('pwd')} value={values.pwd} secureTextEntry={true} />
                  <ThemedText style={GlobalStyle.errMsg}>{' '}{touched.pwd && errors.pwd && (`${errors.pwd}`)}</ThemedText>
                </ThemedView>
                
                <ThemedView style={GlobalStyle.form_line}>
                  <TouchableOpacity style={[GlobalStyle.StdButton, { opacity: isSubmitting ? 0.6 : 1 }]} onPress={() => {handleReset()}}>
                    <ThemedText type="defaultSemiBoldWhite" style={{width:70}}>Clear All</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity style={[GlobalStyle.StdButton, { opacity: isSubmitting ? 0.6 : 1 }]} onPress={() => {handleSubmit()}} disabled={isSubmitting} >
                    <ThemedText type="defaultSemiBoldWhite" style={{width:70}}>{' '}{isSignIn ? 'Sign In' : 'Sign Up' }{' '}</ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              </>
            )}
          </Formik>
        </ThemedView>

        <ThemedView style={GlobalStyle.ItemContainer}>
          <ThemedText >{isSignIn ? 'Don\'t have an account yet? Try' : 'Already have an account? Try' }</ThemedText>
          <TouchableOpacity onPress={() => setIsSignIn(!isSignIn)}>
            <ThemedText  style={GlobalStyle.textLink} type="defaultSemiBold">{isSignIn ? 'Sign Up' : 'Sign In' }</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      </>
    )
  } else {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Loading />
      </ThemeProvider>
    )
  }
}

export default SignUpIn

const styles = StyleSheet.create({
  lvl_1_container: {
    minHeight: '100%', 
    // backgroundColor: '#18181b',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,

    boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.2)',
    // backgroundColor: '#333',
  },
});