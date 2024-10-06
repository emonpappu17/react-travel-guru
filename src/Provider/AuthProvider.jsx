import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import PropTypes from 'prop-types';


export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const fbProvider = new FacebookAuthProvider()
    const googleProvider = new GoogleAuthProvider()

    //step-->1
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //step-->2
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    //step-->3
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            console.log(currentUser);
        })
        return () => {
            unSubscribe();
        }
    }, [])

    //step-->4
    const logOut = () => {
        return signOut(auth)
    }

    //step-->5
    const signInWithFb = () => {
        return signInWithPopup(auth, fbProvider)
    }

    //step-->6
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const authInfo = { user, loading, createUser, signInUser, logOut, signInWithFb, signInWithGoogle }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes={
    children: PropTypes.node
}

export default AuthProvider;