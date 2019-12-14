import {StyleSheet} from "react-native";
import {res} from "../../../helpers";

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  headBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: res(350),
    width: '100%',
    backgroundColor: '#4663a5'
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: res(120),
    resizeMode: "contain",
  },
  loginArea: {
    marginHorizontal: 'auto',
    width: res(300),
    marginTop: res(200),
    backgroundColor: '#fff',
    padding: res(20),
    borderRadius: res(5),
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowRadius: res(3),
    shadowOffset: {
      width:0,
      height: res(2)
    },
    flex: 1,
    elevation: 4
  },
  loginAreaTitle: {
    fontSize: res(20),
    marginBottom: res(30),
    textAlign: 'center'
  }
});

export default s;