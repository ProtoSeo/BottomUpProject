
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
      },
    
      login_TopBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#799FA7',
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
        borderColor: '#799FA7',
        marginVertical: '5%',
        marginHorizontal: '10%',
      },

      input_signup: {
        width: '70%',
        height: 50,
        padding: '2%',
        borderWidth: 2,
        borderColor: '#799FA7',
        marginVertical: '5%',
        marginLeft: '10%',
        marginRight: '30%'
      },

      input_ID: {
        width: '70%',
        height: 50,
        padding: '2%',
        borderWidth: 2,
        borderColor: '#799FA7',
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
        backgroundColor: "#DB9A96",
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
        backgroundColor: '#799FA7',
        flexDirection: 'row'
      },
    
      TopBarText: {
        fontSize: 25,
        color: 'white',
        fontWeight:'bold'
      },
    
      TopButton: {
        alignItems: 'center',
        marginHorizontal: '32%',
        flexDirection: 'row'
      },

      item: {
        width: "80%",
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
        paddingTop: 30,
      },
    
      StatusButton: {
        alignItems: 'center',
        padding: 20,
        width: 30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10
      },
    
      item_view: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: '10%',
        borderRadius: 10,
        height: 120,
        flex: 9, 
        borderWidth: 3,
        borderColor: '#DB9A96'
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
        flex: 4,
        textAlign: 'center',
        marginTop: '5%',
        marginHorizontal: '5%',
    
      },
    
      SearchSpace: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
      },

      SlideSpace: {
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
      },

      small_text: {
        fontSize: 14,
        marginTop: '4%',
        color: '#799FA7'
      },

      list_like_view: {
        height: '100%',
        alignItems: 'center',
        marginVertical: '30%',
      },

      touchableopacity_1: {
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#DB9A96',
        marginHorizontal: '15%',
        marginVertical: '5%'
      },

      touchableopacity_2: {
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#799FA7',
        marginHorizontal: '15%',
        marginVertical: '5%'
      },

      touchableopacity_3: {
        borderRadius: 10,
        marginHorizontal: '15%',
        marginVertical: '5%'
      },

});

export default styles;