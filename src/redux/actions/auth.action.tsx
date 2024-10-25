import { signInWithPopup } from "firebase/auth";
import { auth, provider } from '../../firebase';
import { Dispatch } from "redux"

export const login = () =>async (dispatch:Dispatch) => {
    try {
        const res = await signInWithPopup(auth,provider)
        console.log(res);
    } catch (error) {
        
    }
}
