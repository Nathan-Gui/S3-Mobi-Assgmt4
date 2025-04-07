'use client'

import { doc, collection, addDoc, getDocs, deleteDoc, updateDoc, DocumentData, QuerySnapshot } from "firebase/firestore"; 
import {db} from "../config"

export const FirestoreAdd = async (_dataJson: { first: string, last: string, dept: string, sup: string, eeid: string, eml: string, tel: string, }) => {
  try {
    const collRef = collection(db, "employee")
    const docRef = await addDoc(collRef, _dataJson);
    console.log("---> Done inserting: ", docRef.id)
    return true;
  } catch (e) {
    return false;
  }
}

export const FirestoreDel = async (id: string) => {
  try {
    const docRef = await deleteDoc(doc(db, "employee", id));
    console.log("---> Done deleting: ", id)
    return true;
  } catch (e) {
    return false;
  }
}

export const FirestoreUpd = async (id: string, _dataJson: { first?: string, last?: string, dept?: string, sup?: string, eeid?: string, eml?: string, tel?: string, }) => {
  
  try {
    const res = await updateDoc(doc(db, "employee", id), _dataJson);
    console.log("---> Done updating: ", id)
    return true;
  } catch (e) {
    return false;
  }
}

export const FirestoreQry = async (): Promise<{ id?: string, first?: string, last?: string, dept?: string, sup?: string, eeid?: string, eml?: string, tel?: string, }[]> => {

  try {
    // await getDocs(collection(db, "employee")).then(querySnapshot => {
    //   return querySnapshot;
    // });
    const querySnapshotRef = await getDocs(collection(db, "employee"));
    const rtnJson: { id?: string, first?: string, last?: string, dept?: string, sup?: string, eeid?: string, eml?: string, tel?: string, }[] = [];
    querySnapshotRef.docs.map(doc => {
      rtnJson.push( { 
        id: doc.id, 
        first: doc.get('first'), 
        last: doc.get('last'),  
        dept: doc.get('dept'),  
        sup: doc.get('sup'),  
        eeid: doc.get('eeid'),  
        eml: doc.get('eml'),  
        tel: doc.get('tel'),});
    });
    return rtnJson;
  } catch (e) {
    return [];
  }
}



