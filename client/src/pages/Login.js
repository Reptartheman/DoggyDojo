import React, { useState } from 'react';
import '../App.css';
export default function Login() {
  return (<section>
  <div className="loginContainer">  
    <form id="contact" action="" method="post">
      <h3>Login</h3>
      <fieldset>
        <input placeholder="Username" type="text" tabindex="1" required autofocus></input>
      </fieldset>
      <fieldset>
        <input placeholder="Password" type="password" tabindex="1" required autofocus></input>
      </fieldset>

      <fieldset>
        <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
      </fieldset>
    </form>
   
    
  </div>
  </section>
  )
}
