import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Firebase Config object to link Firebase to your project.
 const config = {
     apiKey: "AIzaSyCrX_oTEyaAzlS7H1JGEVO-EVZxkBa0XQw",
     authDomain: "crwn-db-b484a.firebaseapp.com",
     projectId: "crwn-db-b484a",
     storageBucket: "crwn-db-b484a.appspot.com",
     messagingSenderId: "372174384606",
     appId: "1:372174384606:web:10f90a2730d65664c8c14f"
 };

 // Function to create user profile when Google authenticates sign-in.
export const createUserProfileDocument= async(userAuth, additionalData)=>{
    if (!userAuth) return

    const userRef =firestore.doc(`users/${userAuth.uid}`) //    Checks if a user exits under a specific UID.

    //'await' makes the code wait at that point until the promise is settled and treated as return value.
    const snapShot = await userRef.get() // Produces the document snapshot object. This enables reading of data of that user.

    if(!snapShot.exists){  //If snapshot of user does not exist, create  a new user off the userAuth property.
        const {displayName,email}=userAuth
        const createdAt=new Date()

        try {
            await userRef.set({displayName,email,createdAt,...additionalData})  //creates user in the Cloud Firestore database.
        }

        catch (error){
            console.log('Error creating user', error.message)
        }
    }
    return userRef
}

firebase.initializeApp(config)

 export const auth = firebase.auth()
 export const firestore = firebase.firestore()

// Authenticating with Google.
 const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'})
 export const signInWithGoogle = () => auth.signInWithPopup(provider)

 export default firebase
