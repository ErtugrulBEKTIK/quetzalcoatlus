import {StyleSheet} from "react-native";
import {res} from "~/helpers";

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
    backgroundColor: '#b5f3e5'
  },
  logoContainer: {
    marginTop: res(70),
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    height: res(120),
    resizeMode: "contain",
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: res(16),
    color: '#005656'
  },
  inner: {
    justifyContent: "flex-end",
    marginBottom: res(20)
  },
  loginArea: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: res(30),
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
    elevation: 4
  },
  loginAreaTitle: {
    fontSize: res(20),
    marginBottom: res(30),
    textAlign: 'center',
    color: '#005656',
    fontWeight: 'bold'
  }
});

export default s;
