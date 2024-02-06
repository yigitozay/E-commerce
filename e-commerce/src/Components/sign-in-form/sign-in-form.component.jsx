import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword } from "../../utils/firebase.utils";
import FormInput  from '../forminput/form-input.component';
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
const defaultFormFields = {
    email: '',
    password: '',
}
const SignInForm = () =>{
    const [formFields, setFormFields] =useState(defaultFormFields);
    const {email,password} = formFields;

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }
       
    const signInWithGoogle = async () =>{
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }
    const handleSubmit = async (event)=>{
        event.preventDefault();

      

        try{
            const response = await signInAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user , {Name});
            resetFormFields();

        }catch(err){
            switch(err.code){
                case 'auth/wrong-password':
                    alert('password is incorrect for email');
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break
            }
        
        }
    }
    return (
        <div className="sign-up-container"> 
        <h2>Already have an account?</h2>
         <span> Sign in with email and password</span>
        <form onSubmit={handleSubmit}>
            

            <label>Email</label>
            <FormInput label = "email" type="email" required onChange={handleChange} name="email" value={email}/>

            <label>Password</label>
            <FormInput label= "password" type="password" required onChange={handleChange} name="password"  value={password}/>

            <div className="buttons-container">
            <Button type="submit">Sign In</Button>
            <Button type="button" buttonType="google" onClick = {signInWithGoogle}>Google Sign In</Button>
            </div>
            

        </form>
        </div>
      
    )
};

export default SignInForm;