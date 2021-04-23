import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import classes from '../login/Login.module.css';
import { auth } from '../../../firebase';
import {createUser} from '../../../functions/auth';

const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
}

const Register = () => {
    let dispatch = useDispatch();
    let history = useHistory();
    const [values, handleChange] = useForm(initialValues);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { email, password, confirmPassword } = values;

    const submitHandler = e => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) return setError('Passwords do not match!');
        setLoading(true);
        auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
            res.user.getIdTokenResult()
            .then( async ({token}) => {
                const { data } = await createUser(token);
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
            <h1>Sign Up</h1>
            <label>Email</label>
            <input
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
            <label>Confirm password</label>
            <input 
            type="password" 
            placeholder="Confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            />
            <button className={classes.signin_btn} type="submit" disabled={loading}>{loading ? 'Loading...' : 'Register'}</button>
            <p className={classes.register_block} style={{marginTop: '40px'}}>Switch to <Link to="/login">Sign in</Link></p>
        </form>
    </div>
}

export default Register;