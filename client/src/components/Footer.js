import React from 'react';
import '../App.css';
import GitHubIcon from '../assets/github-sign.png';

export default function Footer() {
  return (
    <footer className="pagefooter">
      <div id="gitHubIcon">
        <a href="https://github.com/Reptartheman/DoggyDojo" target={'_blank'}>
          <img src={GitHubIcon} alt="GitHubLink" width="50" height="50"></img>
        </a>
      </div>
      <p className="footerInfo">
        Check out the repo, DAWG! It's ironic because it's a cat icon.
        <br />
      </p>
    </footer>
  );
}
