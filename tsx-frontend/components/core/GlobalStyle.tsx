
import { Platform, StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export const GlobalStyle = StyleSheet.create({
  RootContainer: {
    width: width, 
    height: height, 
    paddingTop: Platform.OS == 'ios' ? 70 : 20, 
    // paddingHorizontal: 10,
    // backgroundColor:'red',
  },
  PageRootScrollViewContainer: {
    width: width, 
    height: height, 
    // backgroundColor:'green',
  },
  GroundContainer: {
    width: '100%', 
    height: 'auto', 
    // backgroundColor:'blue',
  },
  SurfaceContainer: {
    marginTop: Platform.OS == 'ios' ? 70 : 20, 
    marginHorizontal: 10,
    // backgroundColor:'yellow',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    justifyContent: 'center',
  },
  ParagraphContainer: {
    gap: 8,
    marginBottom: 18,
    paddingHorizontal: 16,
    // width: width,
    // alignItems: 'center',
    // backgroundColor:'orange',
  },
  ItemContainer: {
    gap: 8,
    marginBottom: 18,
    paddingHorizontal: 16,
    // width: width,
    alignItems: 'center',
    // backgroundColor:'navy',
  },
  form_line: {
    width: width*2/3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'lime',
    // padding: 10,
    gap: 5,
  },
  label: {
    width: width*2/5,
    textAlign: 'right',
  },
  FootPlaceHolder: {
    marginTop: 60,
    // width: width,
  },
  LogOutButton: {
    color: '#ffffff',
    maxWidth: 200,
    backgroundColor: '#b23b3b',
    margin: 12,
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',

    boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.2)',

    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1000,

  },
  errMsg: {
    width: 105,
    paddingVertical: 12,
    fontSize: 11,
    lineHeight: 16,
    paddingTop: 18,
    color: 'red',
  },
  StdButton: {
    color: '#ffffff',
    maxWidth: 200,
    backgroundColor: '#1d4ed8',
    margin: 12,
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',

    boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.2)',
  },
  textLink: {
    textDecorationLine: 'underline',
  },
});

const GlobalStyleComponent = () => {
  return (<></>);
};

export default GlobalStyleComponent;
