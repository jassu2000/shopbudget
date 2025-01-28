import React ,{useRef} from 'react'
import styles from './Contact.module.scss'
import Card from '../../components/card/Card'
import { FaEnvelope, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import {GoLocation} from "react-icons/go"
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify'
const Contact = () => {
  const form = useRef();
  const sendEmail = (e) =>{
    e.preventDefault();
    emailjs
      .sendForm('service_0z7rkbn', 'template_uvtrbgw', form.current, {
        publicKey: 'o1BtHtd5hAnAcLlim',
      })
      .then(
        (result) => {
          toast.success("Message sent successfully..");
          console.log(result.text);
        },
        (error) => {
          toast.error(error.text);
          console.log('FAILED...', error.text);
        },
      );
      e.target.reset();
  }
  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name:</label>
              <input type='text' name="user_name" placeholder='Full Name' required/>
              <label>Email:</label>
              <input type='text' name="user_email" placeholder='Your Active Email' required/>
              <label>Subject:</label>
              <input type='text' name="subject" placeholder='Subject' required/>
              <label>Your Message:</label>
              <textarea name='message' cols="30" rows="10" />
              <button type='submit' className='--btn --btn-primary'>Send Message</button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or Conatct Us via the channels</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+91 7478835627</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>support@shopbudget.components</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Delhi, India</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@Shopbudget</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
