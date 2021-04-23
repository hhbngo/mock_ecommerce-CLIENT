import React, {useEffect, useState} from 'react';
import useForm from '../../hooks/useForm';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase';
import classes from '../Dashboard/Dashboard.module.css';

const initialValues = {
    oldPass: '',
    newPass: '', 
    confirmPass: ''
};

const PasswordChange = ({user}) => {
    const [values, handleChange, setValues] = useForm(initialValues);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { oldPass, newPass, confirmPass } = values;

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        if (newPass !== confirmPass) return setError('Passwords do not match!');
        else if (newPass.length < 6) return setError('Passwords must be greater than 5 characters!');
        setLoading(true);
        setError(null);
        setSuccess(null);
        (() => auth.signInWithEmailAndPassword(user.email, oldPass))()
        .then(() => {
            setLoading(false);
            auth.currentUser.updatePassword(newPass)
            .then(() => {
                setSuccess('Password successfully updated!');
                setValues(initialValues);
            })
            .catch(() => setError('Session expired. Please refresh the page or sign in again!'));
        })
        .catch((err) => {
            setLoading(false);
            if (err.code === 'auth/wrong-password') setError('Old password is incorrect!');
            else setError('Could not change password. Please try again later!')
        });
    };

    return <div className={classes.container}>
        <div className={classes.sidebar}>
            <div className={classes.categories}>
                <h1>Account</h1>
                <ul>
                    <li><NavLink to="/account/main">Main</NavLink></li>
                    <li><NavLink to="/account/orders">Orders</NavLink></li>
                    <li><NavLink to="/account/password">Password</NavLink></li>
                </ul>
            </div>
        </div>
        <div className={classes.main}>
        <h1>Change Password</h1>
            {error && <div className={classes.error}>{error}</div>}
            {success && <div className={classes.success}>{success}</div>}
            <form className={classes.password_form} onSubmit={handleSubmit}>
                <label>Old password</label>
                    <input 
                    type="password"
                    name="oldPass"
                    value={oldPass}
                    onChange={handleChange}
                    required
                    />
                <label>New password</label>
                    <input 
                    type="password"
                    name="newPass"
                    value={newPass}
                    onChange={handleChange}
                    required
                    />
                <label>Confirm password</label>
                    <input 
                    type="password"
                    name="confirmPass"
                    value={confirmPass}
                    onChange={handleChange}
                    required
                    />
                {!loading && <button 
                type="submit"
                >
                    Save
                </button>}
            </form>
        </div>
    </div>
};

export default PasswordChange;