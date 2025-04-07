'use client'

// import Link from "next/link"
import { signOut } from "firebase/auth"
import { useRouter } from "expo-router"
import { useAuthState } from "react-firebase-hooks/auth"
import {auth} from '@/firebase/config'

import { StyleSheet, TouchableOpacity } from 'react-native';
// import { Collapsible } from '@/components/Collapsible';
// import { ExternalLink } from '@/components/ExternalLink';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { IconSymbol } from '@/components/ui/IconSymbol';

const LogOutButton = () => {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const handelSignout = () => {
    signOut(auth).then(
      () => {
        sessionStorage.removeItem('user')
        router.push('/')
      }
    ).catch((err)=>{console.error('Error Signing Out', err)})
  };

  return (
    <>
      {user && ( 
        <TouchableOpacity style={styles.button} onPress={handelSignout}><ThemedText type="defaultSemiBoldWhite">Sign Out</ThemedText></TouchableOpacity>
      )}
    </>
  );
}

export default LogOutButton


const styles = StyleSheet.create({
  stepContainer: {
    // minWidth: 290,
    gap: 8,
    marginBottom: 8,
  },
  button: {
    color: '#ffffff',
    backgroundColor: '#b23b3b',
    margin: 12,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',

    boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.2)',

    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1000,

  },
});
