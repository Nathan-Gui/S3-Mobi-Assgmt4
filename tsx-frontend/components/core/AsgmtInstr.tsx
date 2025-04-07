import { Platform, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { backendSignOut_v2 } from '@/components/core/User';
import { GlobalStyle } from '@/components/core/GlobalStyle';

export default function AsgmtInstr() {

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

  return (
    <>
    <ScrollView style={GlobalStyle.PageRootScrollViewContainer}>
      <ThemedView style={GlobalStyle.GroundContainer}>
        <ThemedView style={GlobalStyle.SurfaceContainer}>
          <ThemedView style={GlobalStyle.titleContainer}>
            <ThemedText type="subtitle">Assignment Instructions</ThemedText>
          </ThemedView>

          <ThemedView style={GlobalStyle.ParagraphContainer}>
            <ThemedText type="subtitle">Objective</ThemedText>
            <ThemedText>
              In this assignment, you will create multiple forms 
              using <ThemedText type="defaultSemiBold">Formik</ThemedText> for handling form state 
              and <ThemedText type="defaultSemiBold">Yup</ThemedText> for validation within 
              an <ThemedText type="defaultSemiBold">Expo</ThemedText> project.
            </ThemedText>
          </ThemedView>

          <ThemedView style={GlobalStyle.ParagraphContainer}>
            <ThemedText type="subtitle">Requirements</ThemedText>
            <ThemedText type="defaultSemiBold">     1.	Employee Information Form</ThemedText>
            <ThemedText>          o	Develop a form that collects employee information with a minimum of five fields.</ThemedText>
            <ThemedText>          o	Implement form validation using Yup.</ThemedText>
            <ThemedText type="defaultSemiBold">     2.	Authentication Forms</ThemedText>
            <ThemedText>          o	Create two additional forms: </ThemedText>
            <ThemedText>                •	Sign-in form</ThemedText>
            <ThemedText>                •	Sign-up form</ThemedText>
            <ThemedText>          o	Validate both forms using Yup.</ThemedText>
            <ThemedText type="defaultSemiBold">     3.	Project Setup</ThemedText>
            <ThemedText>          o	Initialize a new Expo project by running: </ThemedText>
            <ThemedText>          o	npx create-expo-app@latest &lt;project-name&gt;</ThemedText>
            <ThemedText>          o	Replace &lt;project-name&gt; with a suitable name for your project.</ThemedText>
            <ThemedText type="defaultSemiBold">     4.	Screen Development & Styling</ThemedText>
            <ThemedText>          o	Add the required screens to your project.</ThemedText>
            <ThemedText>          o	Apply appropriate styling to enhance the user interface.</ThemedText>
            <ThemedText>          o	Include icons where necessary.</ThemedText>
            <ThemedText type="defaultSemiBold">     5.	Version Control & Collaboration</ThemedText>
            <ThemedText>          o	Push your code to a GitHub repository.</ThemedText>
            <ThemedText>          o	Ensure that all group members are added as collaborators.</ThemedText>
            <ThemedText type="defaultSemiBold">     6.	Submission</ThemedText>
            <ThemedText>          o	Submit the GitHub repository link on D2L.</ThemedText>
            <ThemedText>          o	As an alternative, you may remove the node_modules folder and upload the project files directly to D2L.</ThemedText>
          </ThemedView>
          
          <ThemedView style={GlobalStyle.ParagraphContainer}>
            <ThemedText>Ensure that your code is well-structured, properly commented, and follows best practices for React Native development.</ThemedText>
          </ThemedView>
          <ThemedView style={GlobalStyle.FootPlaceHolder}>
            <ThemedText>{' '}</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollView>
    <TouchableOpacity style={GlobalStyle.LogOutButton} onPress={handelSignout}><ThemedText type="defaultSemiBoldWhite">Sign Out</ThemedText></TouchableOpacity>
    
    </>
  );
}

const styles = StyleSheet.create({
  
});
