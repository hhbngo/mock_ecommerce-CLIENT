import {useState, useEffect} from 'react';
import {auth} from '../firebase';

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = () => {
            auth.onAuthStateChanged(user => {
                if (user) setUser(user);
                else setUser(false);
            })
        }
        return () => unsubscribe(); 
    }, []);

    const getUserToken = async () => await user.getIdTokenResult();

    const signUpUser = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
        .then(creds => {
            setUser(creds.user);
            return creds;
        })
        .catch(err => ({
            errorCode: err.code,
            errorMessage: err.message
        }))
    };     

    const logInUser = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
        .then(creds => {
            setUser(creds);
            return creds;
        })
        .catch(err => ({
            errorCode: err.code,
            errorMessage: err.message
        }))
    };

    return  {
        user,
        getUserToken,
        signUpUser,
        logInUser
    }
}

export default useAuth;