import React from 'react';
import classes from './Footer.module.css';
import { FacebookFilled, YoutubeFilled, InstagramOutlined} from '@ant-design/icons'

const Footer = () => {

    const handleNewsletterSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className={classes.container}>
            <div className={classes.newsletter}>
                <h1>Sign up for our newsletter</h1>
                <form onSubmit={handleNewsletterSubmit}>
                    <input type="email" placeholder="Your Email"/>
                    <button>SEND</button>
                </form>
            </div>
            <div className={classes.socials}>
                <h1>Follow us on</h1>
                <ul>
                    <li><FacebookFilled/> Facebook</li>
                    <li><YoutubeFilled/> Youtube</li>
                    <li><InstagramOutlined/> Instagram</li>
                </ul>
            </div>
            <div className={classes.links}>
                <h1>Other Links</h1>
                <ul>
                    <li>Account</li>
                    <li>Privacy Policy</li>
                    <li>Refunds</li>
                    <li>FAQs</li>
                </ul>
            </div>
            <div className={classes.copyright}>
            <p>Copyright &copy; 2021 Hieu Ngo</p>
            </div>
        </div>
    )
};

export default Footer;