import {StyleSheet} from "react-native";
import {res} from "~/helpers";

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f79b2e',
  },
  headBackground: {
    position: 'absolute',
    top: -170,
    left: 0,
    height: res(300),
    width: '100%',
    backgroundColor: '#f79b2e',
  //  borderRadius:150
  },
  logoContainer: {
    marginTop: res(70),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f79b2e',
    borderRadius:90,
    width: res(150),
    marginLeft: res( 100)
  },

  logo: {
    height: res(200),
    resizeMode: "contain",
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: res(16),
    color: '#003d58'
  },
  inner: {
    justifyContent: "flex-end",
    marginBottom: res(20)
  },
  loginArea: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: res(40),
    backgroundColor: '#fff',
    padding: res(20),
    borderRadius: res(10),
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
    color: '#ff4d01',
    fontWeight: 'bold'
  }
});

export default s;
