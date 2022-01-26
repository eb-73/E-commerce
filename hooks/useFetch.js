import { auth, db } from "../firebaseConfig";
import { setDoc, updateDoc, doc, Timestamp } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
function useFetch(form) {
  const sendUser = async (name, email, password) => {
    if (form === "signup") {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uID: userCredential.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } else if (form === "login") {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } else if (form === "google") {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      await setDoc(doc(db, "users", user.uid), {
        uID: user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: Timestamp.fromDate(new Date()),
      });
      // .catch((error) => {
      //   // Handle Errors here.
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   // The email of the user's account used.
      //   const email = error.email;
      //   // The AuthCredential type that was used.
      //   const credential = GoogleAuthProvider.credentialFromError(error);
      //   // ...
      // });
    }
  };
  return sendUser;
}

export const errorMessage = (error) => {
  switch (error) {
    case "auth/invalid-email":
      return " email address is not valid";
    case "auth/email-already-in-use":
      return "Username already exists";
    case "auth/user-not-found":
      return "Username not exists";
    case "auth/weak-password":
      return "Password is not strong enough";
    case "auth/wrong-password":
      return "Password is incorrect try again";
    default:
      return "Something is wrong";
  }
};
export default useFetch;
