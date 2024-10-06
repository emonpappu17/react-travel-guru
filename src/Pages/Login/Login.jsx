import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Shared/Navbar";
import fbIcon from '../../assets/fb.png';
import googleIcon from '../../assets/google.png'
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const Login = () => {
    const { signInUser, signInWithFb, signInWithGoogle } = useContext(AuthContext)

    const [passCheck, setPassCheck] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const emailRef = useRef(null);

    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email')
        const password = form.get('password')
        // console.log(email, password);
        // reset
        setPassCheck('');

        // sign in user
        signInUser(email, password)
            .then(result => {
                if (!result.user.emailVerified
                ) {
                    alert('Verify your account first')
                }
                e.target.reset();

                // navigate after login
                navigate(location.state ? location.state : '/')
                
            })
            .catch(error => setPassCheck(error.message))
    }

    const handleForgetPass = () => {
        const email = emailRef.current.value;
        if (!email) {
            setPassCheck('Please provide an valid email')
            return;
        }

        // reset email
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please check your email')
            })
            .catch()
    }

    const handleFbLogin = () => {
        signInWithFb()
            .then(result => {
                console.log(result.user);
                navigate(location.state ? location.state : '/')
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                navigate(location.state ? location.state : '/')

            })
            .catch(err => {
                console.log(err);

            })
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="w-1/3 mx-auto">
                <form onSubmit={handleLogin} className="card-body  mx-auto border rounded-2xl">
                    <h2 className="text-2xl font-semibold">Login</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input ref={emailRef} name="email" type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a onClick={handleForgetPass} href="#" className="text-yellow-600 label-text-alt link link-hover underline">Forgot password?</a>
                        </label>
                    </div>
                    <div>
                        {
                            passCheck && <p className="text-red-600">{passCheck}</p>
                        }
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                    <p>Don not have an account? <Link className="text-yellow-600 underline" to="/createAccount">Create an account</Link></p>
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

export default Login;