import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Shared/Navbar";
import fbIcon from '../../assets/fb.png';
import googleIcon from '../../assets/google.png'
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { sendEmailVerification, updateProfile } from "firebase/auth";

const CreateAccount = () => {

    const { createUser, signInWithFb, signInWithGoogle } = useContext(AuthContext);

    const [passCheck, setPassCheck] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const firstName = form.get('firstName');
        const lastName = form.get('lastName');
        const combineName = firstName.concat(" ", lastName);
        const email = form.get('email')
        const password = form.get('password')
        const confirmPassword = form.get('confirmPassword');
        const accepted = e.target.terms.checked
        // console.log(combineName, email, password, confirmPassword);
        // reset
        setPassCheck('');
        setSuccess('');

        // pass validation
        if (password.length < 6) {
            setPassCheck('Password should be at least 6 characters or longer')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setPassCheck('Your password should have  at least one uppercase character')
            return;
        }
        else if (password !== confirmPassword) {
            return setPassCheck('Confirm password not matched!!');
        }
        else if (!accepted) {
            setPassCheck('Please accept our terms and conditions!')
            return;
        }

        // create user
        createUser(email, password)
            .then(result => {
                // console.log(result.user);
                setSuccess('User Created Successfully Please Login');
                navigate('/')

                // Profile Update
                updateProfile(result.user, {
                    displayName: combineName,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })

                // verification email send
                sendEmailVerification(result.user)
                    .then(() => {
                        alert('Please check your email and verify your account')
                    })
                    .catch()
            })
            .catch(error => {
                // console.error(error);
                setPassCheck(error.message)
            })
    }

    const handleFbLogin = () => {
        signInWithFb()
            .then(result => {
                console.log(result.user);
                navigate('/')
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                navigate('/')

            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="w-1/3 mx-auto">
                <form onSubmit={handleSubmit} className="card-body  mx-auto border rounded-2xl">
                    <h2 className="text-2xl font-semibold">Login</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">First Name</span>
                        </label>
                        <input name="firstName" type="text" placeholder="First Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Last Name</span>
                        </label>
                        <input name="lastName" type="text" placeholder="Last Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="Email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name="password" type="password" placeholder="Password" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input name="confirmPassword" type="password" placeholder="Password" className="input input-bordered" required />
                        {
                            passCheck && <p className="text-red-600">{passCheck}</p>
                        }
                        {
                            success && <p className="text-green-600">{success}</p>
                        }
                    </div>
                    <div>
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2" htmlFor="terms">Check our Terms and conditions</label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Create an account</button>
                    </div>
                    <p>Already have an account? <Link className="text-yellow-600 underline" to="/login">Login</Link></p>
                </form>
                <div className="divider">OR</div>
                <div className="lg:px-14">
                    <button onClick={handleFbLogin} className="btn btn-outline w-full">
                        <img className="w-8" src={fbIcon} alt="" />
                        Continue with Facebook
                    </button>
                    <button onClick={handleGoogleLogin} className="btn btn-outline w-full mt-3">
                        <img className="w-8" src={googleIcon} alt="" />
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;