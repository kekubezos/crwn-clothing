import React from "react";
import './sign-in.styles.scss'
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {auth,signInWithGoogle} from "../../firebase/firebase.utils";


class SignIn extends React.Component{
    constructor() {
        super();

        this.state={
            email:'',
            password:''
        }
    }

    handleChange = event =>{
        const {value, name} = event.target
        this.setState({[name]: value}) //[] dynamically sets the property value.
    }

    handleSubmit =async  event => {
        event.preventDefault();

        const {email,password}=this.state

        try{
            await auth.signInWithEmailAndPassword(email,password)
            this.setState({email:'',password:''})
        }
        catch (error){
            console.error(error)
        }
    }

    render() {
        const {email,password}=this.state
        return (
            <div className='sign-in'>
                <h2>I already have an account.</h2>
                <span>Sign in with your email and password.</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" name='email'  label='Email' value={email} handleChange={this.handleChange} required/>
                    <FormInput type="password" name='password' label='Password' value={password} handleChange={this.handleChange} required/>

                    <div className='buttons'>
                        <CustomButton type="submit" >Sign In</CustomButton>
                        <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                    </div>
                </form>

            </div>
        );
    }
}

export default SignIn