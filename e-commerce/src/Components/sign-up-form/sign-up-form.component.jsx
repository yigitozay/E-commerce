import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";
import FormInput  from '../forminput/form-input.component';
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";
const defaultFormFields = {
    Name:'',
    email: '',
    password: '',
    confirmPassword:''
}
const SignUpForm = () =>{
    const [formFields, setFormFields] =useState(defaultFormFields);
    const {Name,email,password,confirmPassword} = formFields;

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }
    const handleSubmit = async (event)=>{
        event.preventDefault();

        if(password !== confirmPassword) {
            alert ("password doesnt match");
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user , {Name});
            resetFormFields();

        }catch(err){
            if(err.code === 'auth/email-already-in-use'){
                alert('Email exists');
            }
        }
    }
    return (
        <div className="sign-up-container"> 
        <h2>Don't have an account?</h2>
         <span> Sign up with email</span>
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <FormInput label = "Name" type="text" required onChange={handleChange} name="Name" value={Name}/>

            <label>Email</label>
            <FormInput label = "email" type="email" required onChange={handleChange} name="email" value={email}/>

            <label>Password</label>
            <FormInput label= "password" type="password" required onChange={handleChange} name="password"  value={password}/>

            <label>Confirm Password</label>
            <FormInput label=" confirm password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
            <Button type="submit">Sign Up</Button>
        </form>
        </div>
      
    )
};

export default SignUpForm;