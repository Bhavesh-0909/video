// SignIn.js
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user.getIdToken();

  } catch (error) { 
    console.log(error)
    return null;
  }    
};
