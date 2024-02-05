import {signInWithGooglepopup, createUserDocumentFromAuth} from '../../utils/firebase.utils'



const  SignIn = () => {
    const logGoogleuser = async () =>{
        const response = await signInWithGooglepopup();
        createUserDocumentFromAuth(response);
    }
    return (
        <div>
            <h1>sign in page</h1>
            <button onClick={logGoogleuser}>
                Sign in with Google Popup
            </button>
        </div>
    )
};

export default SignIn