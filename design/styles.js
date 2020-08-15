
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E8EAEB',
        flex: 1,
        flexDirection: 'column',
      },
    
      login_TopBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7E64CC',
        flexDirection: 'row'
      },
    
      login_TopBarText: {
        fontSize: 36, 
        color: 'white',
        fontWeight:'bold'
      },

      login_buttons: {
         height: 100,
         width: 100,
         marginLeft:'5%',
         marginTop:'15%'
      },
    
      input: {
        width: '80%',
        height: 50,
        padding: '2%',
        borderWidth: 2,
        borderColor: '#5F82D9',
        marginVertical: '5%',
        marginHorizontal: '10%',
      },

      input_signup: {
        width: '70%',
        height: 50,
        padding: '2%',
        borderWidth: 2,
        borderColor: '#5F82D9',
        marginVertical: '5%',
        marginLeft: '10%',
        marginRight: '30%'
      },

      input_ID: {
        width: '70%',
        height: 50,
        padding: '2%',
        borderWidth: 2,
        borderColor: '#5F82D9',
        marginVertical: '5%',
        marginLeft: '10%',
      },
    
      MainSpace: {
        flex: 4,
        backgroundColor: '#E8EAEB',
        paddingTop : 50
      },

      submit: {
        width: "80%",
        backgroundColor: "#fc5185",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        marginTop: 20,
        marginLeft: 25
      },
    
      header: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#364f6b",
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 40,
      },
    
      TopBar: {
        height: '14%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7E64CC',
        flexDirection: 'row'
      },
    
      TopBarText: {
        fontSize: 25,
        color: 'white',
        fontWeight:'bold'
      },
    
      TopButton: {
        alignItems: 'center',
        backgroundColor: '#7E64CC',
        marginHorizontal: '32%',
      },

      item: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        flexDirection: "row",
        marginLeft: 25,
      },
    
      checkBoxTxt: {
        marginLeft: 20
      },
    
      MainSpace: {
        flex: 4,
        backgroundColor: '#E8EAEB',
        paddingTop: 30
      },
    
      StatusButton: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 20,
        width: 30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10
      },
    
      item_view: {
        backgroundColor: '#DDDDDD',
        padding: 20,
        marginVertical: 8,
        marginLeft: 12,
        height: 120,
        flex: 9
      },
    
      item_title: {
        marginTop: 8,
        fontSize: 24,
      },
    
      item_subtitle: {
        fontSize: 14,
      },
    
      item_icon: {
        height: 20,
        width: 20,
        padding: 20,
        marginRight: 20
      },
    
      menu_dialogContentView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
    
      menu_dialog_button: {
        width: '40%',
        height: 30,
      },
    
      dialog_Button: {
        alignItems: 'center',
        padding: 10,
        marginVertical: 20,
        marginHorizontal: 20,
        flex: 1
      },

      title: {
        marginTop: 22,
        textAlign: 'center',
        fontSize: 24,
      },
    
      text: {
        marginTop: '15%',
        width: 35,
        marginLeft: 65,
      },
    
      image: {
        flex: 1,
      },
    
      view: {
        height: '77%',
        textAlign: 'center',
        marginTop: '5%',
        marginHorizontal: '5%',
    
      },
    
      SearchSpace: {
        height: 115,
        justifyContent: 'center',
      },

      SlideSpace: {
        backgroundColor: '#E8EAEB',
        height: 160,
        justifyContent: 'center',
      },

      myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        height: 300,
      },

      slideContainer: {
        flex: 1,
        alignItems: "center",
        padding: '5%'
      },

      slide1: {
        backgroundColor: "#F8EEDA"
      },

      slide2: {
        backgroundColor: "#F5F6F6",
      },

      myEmptyStarStyle: {
        color: 'white',
      },

      item_heart: {
        backgroundColor: '#E8EAEB',
        marginVertical: '12%',
        marginHorizontal: 20,
        height: 50,
        flex: 1
      },

      explain_text: {
        fontSize: 20,
        marginBottom: '5%'
      },

      title_text: {
        fontSize: 30,
        marginVertical: '8%',
        fontWeight: "bold",
      }
});

export default styles;