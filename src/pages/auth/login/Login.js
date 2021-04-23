import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import classes from './Login.module.css';
import { auth } from '../../../firebase';
import { currentUser } from '../../../functions/auth';

const initialValues = {
    email: '',
    password: ''
}

const Login = () => {
    let history = useHistory();
    let dispatch = useDispatch();
    const [values, handleChange] = useForm(initialValues);
    const { email, password } = values;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    const submitHandler = e => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        auth.signInWithEmailAndPassword(email, password)
        .then(async ({user}) => {
            const {token} = await user.getIdTokenResult();
            currentUser(token)
            .then(({data}) => {
               dispatch({type: 'AUTH_SUCCESS', payload: {email: data.email, role: data.role, token}});
               history.push('/');
            })
        })
        .catch(err => {
            setLoading(false);
            setError(err.message);
        })
    }

    return <div className={classes.container}>
        <form className={classes.form_area} onSubmit={submitHandler}>
            {error && <div className={classes.error}>{error}</div>}
            <h1>Log In</h1>
            <label>Email</label>
            <input
            autoFocus
            type="text" 
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleChange}
            />
            <label>Password</label>
            <input 
            type="password" 
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={handleChange}
            />
            <button className={classes.signin_btn} type="submit" disabled={loading}>{loading ? 'Loading...' : 'Sign In'}</button>
            <Link style={{float: 'right'}} to="/forgot_password">Forgot password?</Link>
            <p className={classes.register_block}>Not a member? <Link to="/register">Sign up now</Link></p>
        </form>
    </div>
}

export default Login;