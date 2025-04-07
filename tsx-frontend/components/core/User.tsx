'use client'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth"

import {auth} from "@/firebase/config"
import { FirebaseError } from 'firebase/app';

export const setNotSession = async (key: string, value: string): Promise<Boolean> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true
  } catch (e) {
    console.error('Error storing data:', e);
    return false
  }
};

export const getNotSession = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.error('Error geting data:', e);
    return null
  }
};

// const rmvNotSession = async (key: string) => {
//   try {
//     await AsyncStorage.removeItem(key)
//   } catch (e) {
//     console.error('Error remove data:', e);
//   }
// };

// const [createUserWithEmailAndPassword, user, loading, createError] = useCreateUserWithEmailAndPassword(auth)

export const backendSignUp = async (email: string, password: string): Promise<UserCredential| undefined> => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.log(e.code);
      console.log(e.message);
      // console.log(e);
    } else {
      console.log('unkowen Sign Up error.');
      console.log(e);
    }
    return undefined;
  }
}

export const backendSignUp_v2 = async ( email: string, password: string ): Promise<User | string> => {
  try {
    // Create user with Firebase Auth
    const rstFB: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('backendSignUp_v2: signup FireBase OK, not Fin');
    console.log('backendSignUp_v2: following is the User object');
    console.log(rstFB.user);

    // Set session data
    const rstSS: Boolean = await setNotSession('user', 'true');
    if (!rstSS) {
      console.log('backendSignUp_v2: signup setNotSession failed, Fin');
      return 'Signup setNotSession failed';
    }
    console.log('backendSignUp_v2: signup setNotSession OK, Fin');
    return rstFB.user;
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.log('Firebase error:', e.code, e.message);
      return e.code;
    } else {
      console.log('Unknown Sign Up error:', e);
      return 'Unknown Sign Up error:' + e;
    }
  }
};

// const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)

export const backendSignIn = async (email: string, password: string) : Promise<UserCredential| undefined> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.log(e.code);
      console.log(e.message);
      // console.log(e);
    } else {
      console.log('unkowen Sign In error.');
      console.log(e);
    }
    return undefined;
  }
}

export const backendSignIn_v2 = async ( email: string, password: string ): Promise<User | string> => {
  try {
    // Create user with Firebase Auth
    const rstFB: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('backendSignIn_v2: signin FireBase OK, not Fin');
    console.log('backendSignIn_v2: following is the User object');
    // console.log(rstFB.user);

    // Set session data
    const rstSS: Boolean = await setNotSession('user', 'true');
    if (!rstSS) {
      console.log('backendSignIn_v2: signin setNotSession failed, Fin');
      return 'Signin setNotSession failed';
    }
    console.log('backendSignIn_v2: signin setNotSession OK, Fin');
    return rstFB.user;
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.log('Firebase error:', e.code, e.message);
      return e.code;
    } else {
      console.log('Unknown Sign In error:', e);
      return 'Unknown Sign In error:' + e;
    }
  }
};

export const backendSignOut = async () : Promise<boolean> => {
  try {
    await signOut(auth)
    return true
  } catch (error) {
    console.log('unkowen Sign In error.');
  }
  return false;
}

export const backendSignOut_v1 = async () : Promise<boolean| undefined> => {
  try {
    signOut(auth)
    .then(() => {
      console.log('backendSignOut_v2: signout FireBase OK, not Fin')
    })
    .catch((e) => {
      if (e instanceof FirebaseError) {
        console.log(e.code);
        console.log(e.message);
        // console.log(e);
      } else {
        console.log('unkowen signOut error.');
        console.log(e);
      }
      return false;
    })
    .then(() => {
      setNotSession('user','false').then(rstSS => {
        console.log('backendSignOut_v2: signout setNotSession ' + (rstSS ? 'OK' : 'failed') + ', Fin')
        return rstSS
      })
    })
    .catch(e => {
      console.log('unkowen setNotSession error.');
      console.log(e);
      return false;
    });
  } catch (error) {
    console.log('unkowen Sign Out error.');
    return false
  }
}

export const backendSignOut_v2 = async (): Promise<Boolean | undefined> => {
  try {
    // Sign out from Firebase
    await signOut(auth);
    console.log('backendSignOut_v2: signout FireBase OK, not Fin');

    // Update session state
    const rstSS: Boolean = await setNotSession('user', 'false');
    console.log(`backendSignOut_v2: signout setNotSession ${rstSS ? 'OK' : 'failed'}, Fin`);

    return rstSS; // Return true if setNotSession succeeds, false if it fails
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.log('Firebase error:', e.code, e.message);
    } else {
      console.log('Unknown Sign Out error:', e);
    }
    return false; // Return false on any error
  }
};

export const backendChkAuth = async (): Promise<number> => {
  try {
    const rst = await getNotSession('user');
    console.log(`getNotSession get "user": ${rst}`);
    const isLogin = getAuth().currentUser?.isAnonymous;
    console.log(`corss check firebase auth curr usr is loggedin: ${!(isLogin == null)}`);
    
    return (rst === true || rst === 'true') && !(isLogin == null) ? 1 : 0;
  } catch (e) {
    console.log('Unknown Chk Auth error:', e);
    return -1;
  }
};


const UserComponent = () => {
  return (<></>);
};

export default UserComponent;



