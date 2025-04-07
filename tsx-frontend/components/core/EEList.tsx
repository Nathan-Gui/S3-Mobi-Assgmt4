import { StyleSheet, Image, Platform, ScrollView, TouchableOpacity } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { backendSignOut_v2 } from '@/components/core/User';
import { GlobalStyle } from '@/components/core/GlobalStyle';
import { useFocusEffect } from "@react-navigation/native";

export default function EEList() {

  const router = useRouter()

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

  const [EEColl, setEEColl] = useState<{ id?: string, first?: string, last?: string, dept?: string, sup?: string, eeid?: string, eml?: string, tel?: string, }[] | null>(null) // QueryDocumentSnapshot<DocumentData, DocumentData>
  
  interface resProp { 
    status: (arg0: number) => { 
      json: { (arg0: { status:number ,msg?: string, entries?: { id?: string, first?: string, last?: string, dept?: string, sup?: string, eeid?: string, eml?: string, tel?: string, }[] }): any, },
    },
  }

  const helloWorldGet = async () => {
    // await getDocs(collection(db, "employee")).then(querySnapshot => {
    //   setEEColl(querySnapshot)
    // });

    // const res = await fetch("http://localhost:5000/api/fs/ee/q", {
    //   method: "POST",
    //   body: JSON.stringify({ username: "example" }),
    //   // ...
    // });

    await window.fetch("http://10.0.0.141:5000/api/fs/ee/q", { 
      method: "GET" ,
      headers: { Accept: '*/*',},
    }).then(async (res) => {
      if (!res.ok) {
        console.log('res failed, status:', res.status);
      }
      const resjson = await res.json();
      // console.log('res:', resjson);
      setEEColl(resjson.entries);
    }).catch((e) => {
      console.log('req error:', e);
    });
  }

  // useEffect(()=>{
  //   helloWorldGet()
  // }, [])

  const helloWorldDel = async (id: string) => {
    // await deleteDoc(doc(db, "employee", id));
    console.log('expo del:', id)
    await window.fetch("http://10.0.0.141:5000/api/fs/ee/d", { 
      method: "POST" ,
      headers: { Accept: '*/*', 'content-type': 'application/json;charset=UTF-8', },
      body: JSON.stringify({ id: id }),
    }).then(async (res) => {
      if (!res.ok) {
        console.log('res failed, status:', res.status);
      } else {
        await helloWorldGet();
      }
    }).catch((e) => {
      console.log('req error:', e);
    });
  }

  useFocusEffect(
    useCallback(() => {
      console.log("Stack Tab Index screen is focused!");
      helloWorldGet()
      return () => {
        console.log("Stack Tab Index screen lost focus.");
      };
    }, [])
  );

  return (
    <>
    <ScrollView style={GlobalStyle.PageRootScrollViewContainer}>
    <ThemedView style={GlobalStyle.GroundContainer}>
    <ThemedView style={GlobalStyle.SurfaceContainer}>
      <ThemedView style={GlobalStyle.titleContainer}>
        <ThemedText type="subtitle">Employee ({EEColl?.length})</ThemedText>
        <TouchableOpacity onPress={helloWorldGet}><ThemedText style={styles.titleLink}>{' ↺ '}</ThemedText></TouchableOpacity>
      </ThemedView>
      <ThemedView style={GlobalStyle.ParagraphContainer}>
        <ThemedText>Data saved in Cloud Firestore.</ThemedText>
      </ThemedView>

      {EEColl?.map(doc => (
        <Collapsible key={doc.id} title={`${doc.first} ${doc.last}`}>
          <ThemedView style={{flex:1, flexDirection: 'row'}}>
            <ThemedText style={styles.collapsibleChild}>Data Key: {doc.id}</ThemedText>
            <TouchableOpacity onPress={() => helloWorldDel(`${doc.id}`)}><ThemedText style={ styles.xButton }>&times;</ThemedText></TouchableOpacity>
          </ThemedView>
          <ThemedText style={styles.collapsibleChild}>Dept ID: {doc.dept}</ThemedText>
          <ThemedText style={styles.collapsibleChild}>Employee ID: {doc.eeid}</ThemedText>
          <ThemedText style={styles.collapsibleChild}>Sup. ID: {doc.sup}</ThemedText>
          <ThemedText style={styles.collapsibleChild}>Email: {doc.eml}</ThemedText>
          <ThemedText style={styles.collapsibleChild}>Mobile: {doc.tel}</ThemedText>
        </Collapsible>))
      }
      <ThemedView style={GlobalStyle.FootPlaceHolder}><ThemedText>{' '}</ThemedText></ThemedView>
      <ThemedView style={GlobalStyle.FootPlaceHolder}><ThemedText>{' '}</ThemedText></ThemedView>
      <ThemedView style={GlobalStyle.FootPlaceHolder}><ThemedText>{' '}</ThemedText></ThemedView>
      <ThemedView style={GlobalStyle.FootPlaceHolder}><ThemedText>{' '}</ThemedText></ThemedView>
      <ThemedView style={GlobalStyle.FootPlaceHolder}><ThemedText>{' '}</ThemedText></ThemedView>
      <ThemedView style={GlobalStyle.FootPlaceHolder}><ThemedText>{' '}</ThemedText></ThemedView>
      <ThemedView style={GlobalStyle.FootPlaceHolder}><ThemedText>{' '}</ThemedText></ThemedView>
      </ThemedView>
      </ThemedView>
    </ScrollView>
    <TouchableOpacity style={GlobalStyle.LogOutButton} onPress={handelSignout}><ThemedText type="defaultSemiBoldWhite">Sign Out</ThemedText></TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  titleLink: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 26,
    color: '#0a7ea4',
    textDecorationLine: 'underline',
    // justifyContent: 'flex-end',
    // flex: 1,
  },
  xButton: {
    backgroundColor:'#AAA',
    width: 25, 
    height: 25, 
    borderRadius:999,
    marginLeft: 20,
    flex:1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems:'center',
    color: 'black',
    fontSize: 22,
    fontWeight:'bold',
    marginTop: 0,
  },
  collapsibleChild: {
    paddingLeft: 22
  }
});
