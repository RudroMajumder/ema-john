import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";


export const initializeLoginFramework = () =>{
    if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    }
    else {
    firebase.app(); // if already initialized, use that one
    }
}




export   const handleGoogleSignIn = () =>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then( res =>{
      const {displayName,email,photoURL} = res.user;
      const signedInUser = {
        isSignedIn : true,
        name : displayName,
        email : email,
        photo : photoURL,
        error : "",
        success : true
      }
      return signedInUser;
      console.log(displayName,email)
    })

    .catch(error => {
      console.log(error)
      console.log(error.message)
    });
  }
 


export  const handleFbSignIn = () =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      var credential = result.credential;
      var user = result.user;
      user.success= true;
      console.log(user)
      var accessToken = credential.accessToken;
      return user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorCode,errorMessage);
    });
  }
  
export const handleSignOut = () =>{
    return firebase.auth().signOut()
    .then ( res =>{
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
        photo: "",
        success : false
      };
      return signedOutUser
    })
    .catch( error =>{
      console.log(error)
      console.log(error.message)
    })
  }

export const createUserWithEmailAndPassword = ( name,email,password ) =>{
    return firebase.auth().createUserWithEmailAndPassword( email, password )
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;

    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      var errorCode = error.code;
      var errorMessage = error.message;
      newUserInfo.success = false;
      console.log(errorCode,errorMessage)
      return newUserInfo;
    });
}

export const signInWithEmailAndPassword = ( email,password ) =>{
    return firebase.auth().signInWithEmailAndPassword( email,password )
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      var errorCode = error.code;
      var errorMessage = error.message;
      newUserInfo.success = false;
      console.log(errorCode,errorMessage)
      return newUserInfo;
    });
}

 const updateUserName = name =>{
    const users = firebase.auth().currentUser;
    console.log(name)
    users.updateProfile({
      displayName: name
    })
    .then(function() {
      console.log('name updated successfully');
    })
    .catch(function(error) {
      console.log(error)
    })
  }