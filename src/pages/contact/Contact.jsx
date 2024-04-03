import React from "react";
import "./Contact.css";

import github from '../../assets/github.svg';
import web from '../../assets/web.svg';
import linkedin from '../../assets/linkedin.svg';
import twitter from '../../assets/twitter.svg';
import facebook from  '../../assets/facebook.svg';
import instagram from '../../assets/instagram.svg';
import discord from '../../assets/discord.svg';
import email from '../../assets/email.svg';
import address from  '../../assets/address.svg'

const Contact = () => {
    return (
        <div>
        <div className="my-recipes-title">
            <h2>Contact Information</h2>
        </div>
        <div className= "contact-container">
            <div className="creator">
                <div>
                    <img
                        src="https://avatars.githubusercontent.com/u/115992953?v=4"
                        alt="Portfolio"
                        className="creator-image"
                    />
                </div>
                <div className="name">ALEXANDER PARPULANSKY</div>
                <div className="creator-contact">
                    <div className="stack-icons">
                        <a href={"https://github.com/lexterlab"} target="_blank" rel="noreferrer">
                            <img src={github} alt="github" style={{ width: '35px', height: '35px' }}  title="github"/>
                        </a>
                        <a href={"https://lexterlab.github.io/"} target="_blank" rel="noreferrer">
                            <img src={web} alt="Portfolio" style={{ width: '35px', height: '35px' }}  title="Portfolio"/>
                        </a>
                        <a href={"https://www.linkedin.com/in/alexander-parpulansky/"} target="_blank" rel="noreferrer">
                            <img src={linkedin} alt="linkedin" style={{ width: '35px', height: '35px' }}  title="linkedin"/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="contact-info">
                <div className={"email-contact"}>  <img src={email} alt="Email" title="Email" style={{ width: '20px', height: '20px' }}/> <a href={"mailto:cranker-support@cranker.com"}> cranker-support@cranker.com</a></div>
                <div><img src={address} alt="Address" title="Address" style={{ width: '20px', height: '20px' }}/> Varna, Bulgaria</div>
                <div className="social-icons">
                    <a href={"https://www.facebook.com/"} target="_blank" rel="noreferrer">
                        <img src={facebook} alt="Facebook" title={"Facebook"}  style={{ width: '30px', height: '30px' }}/>
                    </a>
                    <a href={"https://twitter.com/moldovexc"} target="_blank" rel="noreferrer">
                        <img src={twitter} alt="Twitter/X" title="Twitter/X" style={{ width: '32px', height: '32px' }}/>
                    </a>
                    <a href={"https://instagram.com"} target="_blank" rel="noreferrer">
                        <img src={instagram} alt="Instagram" title={"Instagram"} />
                    </a>
                    <a href={"https://discord.com"} target="_blank" rel="noreferrer">
                        <img src={discord} alt="Discord" title={"Discord"}  style={{ width: '37px', height: '37px' }}/>
                    </a>
                </div>
            </div>

        </div>
        </div>
    );
};


export default Contact;