import React from 'react';
import './Team.css';
import caveman from '../images/team/caveman.jpg';
import javier from '../images/team/javier-cabrera.jpg';
import jonglass from '../images/team/jon-glass.jpg';
import quote from '../images/quote.svg';

function Team() {
  return (
    <>
    <section className="content-wrap">
      <a id="team" className="anchor" aria-hidden="true"></a>
      <div className="content"> 
        <h2 className="wrapper">
          <div className="top">team</div>
          <div className="bottom" aria-hidden="true">team</div>
        </h2>
        <article className="text-black text-base font-normal leading-normal pb-10 pt-1">
          <h3 className='standout-05'>Jon Caveman – Founder</h3>
          <div className='flex'>
            <img className='team-member' src={caveman} alt='Jon Caveman' />
            <div className='bio'>
              <span className="company">La Reverie Studio</span> is the materialization of founder Jon Caveman's creative unconscious. 35 years of coding, 6 years in advertising, 11 years at LinkedIn, and a stint as a rock radio station DJ—all have culminated in this moment.
              
              <div className='blockquote'>
                <img className='icon-quote' width={15} src={quote} />
                My goal is to understand.<br />
                Let me know how I can help.
                <img className='icon-quote rotate' width={15} src={quote} />
              </div>
            </div>
          </div>
        </article>

        <article className="text-black text-base font-normal leading-normal pb-10 pt-1">
          <h3 className='standout-05'>Javier Cabrera | Co-founder, Design & Development</h3>
          <div className='flex'>
            <img className='team-member' src={javier} alt='Javier Cabrera' />
            <div className='bio'>
            Javier Cabrera lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              <div className='blockquote'>
                <img className='icon-quote' width={15} src={quote} />
                Stories are bridges to worlds.
                <img className='icon-quote rotate' width={15} src={quote} />
              </div>
            </div>
          </div>
        </article>

        <article className="text-black text-base font-normal leading-normal pb-10 pt-1">
          <h3 className='standout-05'>Jon Glass | Co-founder, Innovation</h3>
          <div className='flex'>
            <img className='team-member' src={jonglass} alt='Jon Glass' />
            <div className='bio'>
              Jon Glass lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              <div className='blockquote'>
                <img className='icon-quote' width={15} src={quote} />
                🔥
                <img className='icon-quote rotate' width={15} src={quote} />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
    </>
  );
}

export default Team;