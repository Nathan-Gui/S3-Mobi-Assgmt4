import { StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { doc, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore"; 
import {db} from "@/firebase/config"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { backendSignOut_v2 } from '@/components/core/User';
import { GlobalStyle } from '@/components/core/GlobalStyle';
import React, { useRef, useState } from 'react';
import { ThemedTextInput } from '@/components/ThemedTextInput';

export default function EEAdd() {

  const router = useRouter()
  const [saveMsg, setSaveMsg] = useState("");

  const handelSignout = () => {
    backendSignOut_v2().then(rstFB => {
      if (!rstFB){
        console.log('instruction: signout button: fatal failure, Fin')
      } else {
        console.log('instruction: signout button: OK, Fin')
        console.log('Use this as useEffect, and update useState here.')
        router.replace('/')
      }
    })
  }

  const HelloWorldAdd = async (_dataJson: { first: string; last: string; dept: string; sup: string; eeid: string; eml: string; tel: string; }) => {
    // await deleteDoc(doc(db, "employee", id));
    console.log('expo add:', _dataJson)
    await window.fetch("http://10.0.0.141:5000/api/fs/ee/a", { 
      method: "POST" ,
      headers: { Accept: '*/*', 'content-type': 'application/json;charset=UTF-8', },
      body: JSON.stringify(_dataJson),
    }).then(async (res) => {
      if (!res.ok) {
        setSaveMsg("Error accourred!");
      } else {
        setSaveMsg("Info Saved!");
        console.log("Document written with ID: ", res.json());
      }
    }).catch((e) => {
      console.log('req error:', e);
      setSaveMsg("Error accourred!");
    });
  }

  const HelloWorldAdd_old = async (_dataJson: { first: string; last: string; dept: string; sup: string; eeid: string; eml: string; tel: string; }) => {
    try {
      const docRef = await addDoc(collection(db, "employee"), _dataJson);
      if (docRef.id){
        setSaveMsg("Info Saved!");
        console.log("Document written with ID: ", docRef.id);
      } else {
        setSaveMsg("Error accourred!");
      }
    } catch (e) {
      setSaveMsg("Error accourred!");
      console.error("Error adding document: ", e);
    }
  }
  
  const initialValues = { first: "", last: "", eeid: "", sup: "", dept: "", eml: "", tel: "" };

  const phoneRegExp = /^([\+]?)([1-9]([0-9]{0,2}?))([ \-]?)([0-9]{3})([ \-]?)([0-9]{3,4})([ \-]?)([0-9]{4})$/
  //                  /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/

  const StepOneSchema = Yup.object({
    first: Yup.string().required('Required').matches(/^[A-Za-z\- ]*$/, 'Invalid Input').max(40),
    last:  Yup.string().required('Required').matches(/^[A-Za-z\- ]*$/, 'Invalid Input').max(40),
    eeid:  Yup.string().required('Required').matches(/^[0-9]{1,6}$/, '[0-9]{1,6}'),
    sup:   Yup.string().required('Required').matches(/^[0-9]{1,6}$/, '[0-9]{1,6}'),
    dept:  Yup.string().required('Required').matches(/^[A-Z]{3,8}$/, '[A-Z]{3,8}'),
    eml:   Yup.string().required('Required').email('Invalid Email'),
    tel:   Yup.string().required('Required').matches(phoneRegExp, 'Invalid Tel'),
  });

  // helloWorldAdd();
  // helloWorldGet();
  // helloWorldDel("DckBnQs6gdpuZD1EK2pr")
  // helloWorldDel("XVTAmurTE8SMp4QecRQ2")
  return (
    <>
    <ScrollView style={GlobalStyle.PageRootScrollViewContainer}>
    <ThemedView style={GlobalStyle.GroundContainer}>
    <ThemedView style={GlobalStyle.SurfaceContainer}>
      <ThemedView style={GlobalStyle.titleContainer}>
        <ThemedText type="subtitle">ADD EE INFO</ThemedText>
      </ThemedView>
      <ThemedView style={GlobalStyle.ItemContainer}>
        <ThemedText type="default">&nbsp;{saveMsg}</ThemedText>
        <Formik
          initialValues={ initialValues }
          validationSchema={StepOneSchema}
          onSubmit={(values, actions) => {
            HelloWorldAdd(values).then(()=>{
              console.log(values);
              actions.resetForm({
                values: initialValues
              });
              actions.setSubmitting(false);
            });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, handleReset, values, errors, touched, isSubmitting }) => (
              <>
                <ThemedView style={GlobalStyle.form_line}><ThemedText style={GlobalStyle.label} >First Name: </ThemedText><ThemedTextInput style={styles.input} onChangeText={handleChange('first')} onBlur={handleBlur('first')} value={values.first} /><ThemedText style={GlobalStyle.errMsg}>{' '}{touched.first && errors.first && (`${errors.first}`)}</ThemedText></ThemedView>
                <ThemedView style={GlobalStyle.form_line}><ThemedText style={GlobalStyle.label}  >Last Name: </ThemedText><ThemedTextInput style={styles.input} onChangeText={handleChange('last')}  onBlur={handleBlur('last')}  value={values.last}  /><ThemedText style={GlobalStyle.errMsg}>{' '}{touched.last  && errors.last  && (`${errors.last }`)}</ThemedText></ThemedView>
                <ThemedView style={GlobalStyle.form_line}><ThemedText style={GlobalStyle.label}>Employee ID: </ThemedText><ThemedTextInput style={styles.input} onChangeText={handleChange('eeid')}  onBlur={handleBlur('eeid')}  value={values.eeid}  /><ThemedText style={GlobalStyle.errMsg}>{' '}{touched.eeid  && errors.eeid  && (`${errors.eeid }`)}</ThemedText></ThemedView>
                <ThemedView style={GlobalStyle.form_line}><ThemedText style={GlobalStyle.label}    >Sup. ID: </ThemedText><ThemedTextInput style={styles.input} onChangeText={handleChange('sup')}   onBlur={handleBlur('sup')}   value={values.sup}   /><ThemedText style={GlobalStyle.errMsg}>{' '}{touched.sup   && errors.sup   && (`${errors.sup  }`)}</ThemedText></ThemedView>   
                <ThemedView style={GlobalStyle.form_line}><ThemedText style={GlobalStyle.label} >Department: </ThemedText><ThemedTextInput style={styles.input} onChangeText={handleChange('dept')}  onBlur={handleBlur('dept')}  value={values.dept}  /><ThemedText style={GlobalStyle.errMsg}>{' '}{touched.dept  && errors.dept  && (`${errors.dept }`)}</ThemedText></ThemedView>
                <ThemedView style={GlobalStyle.form_line}><ThemedText style={GlobalStyle.label}      >Email: </ThemedText><ThemedTextInput style={styles.input} onChangeText={handleChange('eml')}   onBlur={handleBlur('eml')}   value={values.eml}   /><ThemedText style={GlobalStyle.errMsg}>{' '}{touched.eml   && errors.eml   && (`${errors.eml  }`)}</ThemedText></ThemedView>
                <ThemedView style={GlobalStyle.form_line}><ThemedText style={GlobalStyle.label} >Mobile No.: </ThemedText><ThemedTextInput style={styles.input} onChangeText={handleChange('tel')}   onBlur={handleBlur('tel')}   value={values.tel}   /><ThemedText style={GlobalStyle.errMsg}>{' '}{touched.tel   && errors.tel   && (`${errors.tel  }`)}</ThemedText></ThemedView>
                
                <ThemedView style={GlobalStyle.form_line}>
                  <TouchableOpacity style={[GlobalStyle.StdButton, { opacity: isSubmitting ? 0.6 : 1 }]} onPress={() => {handleReset()}}><ThemedText type="defaultSemiBoldWhite">Clear All</ThemedText></TouchableOpacity>
                  <TouchableOpacity style={[GlobalStyle.StdButton, { opacity: isSubmitting ? 0.6 : 1 }]} onPress={() => {handleSubmit()}} disabled={isSubmitting} ><ThemedText type="defaultSemiBoldWhite">Save Info</ThemedText></TouchableOpacity>
                </ThemedView>
              </>
            )}
          </Formik>
        </ThemedView>
        <ThemedView style={GlobalStyle.ItemContainer}>
          <ThemedView style={GlobalStyle.FootPlaceHolder}><ThemedText>{' '}</ThemedText></ThemedView>
          <ThemedView style={GlobalStyle.FootPlaceHolder}><ThemedText>{' '}</ThemedText></ThemedView>
          <ThemedView style={GlobalStyle.FootPlaceHolder}><ThemedText>{' '}</ThemedText></ThemedView>
          <ThemedView style={GlobalStyle.FootPlaceHolder}><ThemedText>{' '}</ThemedText></ThemedView>
        </ThemedView>
        </ThemedView>
        </ThemedView>
        <ThemedView style={GlobalStyle.GroundContainer}></ThemedView>
      </ScrollView>
      <TouchableOpacity style={GlobalStyle.LogOutButton} onPress={handelSignout}><ThemedText type="defaultSemiBoldWhite">Sign Out</ThemedText></TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 8,
    width: 150,
    borderWidth: 1,
    borderRadius: 3,
    // backgroundColor: '#333',
    boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.2)',
    // color: '#fff',

  },
});
