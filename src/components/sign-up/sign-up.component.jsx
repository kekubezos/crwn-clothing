import React from "react";
import './sign-up.styles.scss'
import {auth, createUserProfileDocument} from "../../firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";


class SignUp extends React.Component{
    constructor() {
        super();

        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    handleSubmit = async (event)=>{
        event.preventDefault()

        const {displayName, email, password, confirmPassword}=this.state //Destructuring the this.state object.

        if(password!==confirmPassword){
            alert('Passwords do not match.')
            return
        }

        try {
            const {user} =await auth.createUserWithEmailAndPassword(email,password)  //Assign email and password to the user after being destructured.
            await createUserProfileDocument(user, {displayName})
            this.setState({displayName:'',email: '', password: '', confirmPassword:''})  // This will clear out our form.
        }
        catch(error){
            console.error(error)
        }
    }

    handleChange= (event)=>{
        const {name, value} = event.target
        this.setState({[name]: value}) //[] dynamically sets the property value(name).
    }
    render() {
        const { displayName, email, password, confirmPassword}=this.state //Destructuring the this.state object.
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have an account </h2>
                <span>Sign up with your email and password</span>

                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput type="text" name='displayName'  label='Display Name' value={displayName} onChange={this.handleChange} required/>
                    <FormInput type="email" name='email'  label='Email' value={email} onChange={this.handleChange} required/>
                    <FormInput type="password" name='password' label='Password' value={password} onChange={this.handleChange} required/>
                    <FormInput type="password" name='confirmPassword' label='Confirm Password' value={confirmPassword} onChange={this.handleChange} required/>

                    <CustomButton type="submit" >Sign Up</CustomButton>
                </form>
            </div>
        )

    }

}

export default SignUp