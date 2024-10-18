import React from 'react';
import './Team.css';
import caveman from '../images/team/caveman.jpg';
import javier from '../images/team/javier-cabrera.jpg';
import jonglass from '../images/team/jg_guitar.jpeg';
import bhaskar from '../images/team/bhaskar.jpg';
import quote from '../images/quote.svg';

function Team() {
  return (
    <>
    <section className="content-wrap">
      <a id="team" className="anchor" aria-hidden="true"></a>
      <div className="content"> 
        <h2 className="wrapper">
          <div className="bebas-neue">team</div>
        </h2>
        <article className="text-black text-base font-normal leading-normal pb-10 pt-1">
          <h3 className='standout-01'>Jon Caveman – Founder</h3>
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
          <h3 className='standout-01'>Javier Cabrera | Co-founder, Design & Development</h3>
          <div className='flex'>
            <img className='team-member' src={javier} alt='Javier Cabrera' />
            <div className='bio'>
            With a multifaceted background in writing, illustration, and web development, Javier combines his artistic vision with technical proficiency to lead innovative design projects. He is also a published author and illustrator, creating visually compelling stories that reflect his passion for creative expression. You can explore his personal work at <a href="https://javiercabrerabooks.com" target='_blank'>javiercabrerabooks.com</a>. At La Reverie Studio, Javier spearheads development and design initiatives, delivering exceptional digital experiences.
              <div className='blockquote'>
                <img className='icon-quote' width={15} src={quote} />
                Stories are bridges to worlds.
                <img className='icon-quote rotate' width={15} src={quote} />
              </div>
            </div>
          </div>
        </article>

        <article className="text-black text-base font-normal leading-normal pb-10 pt-1">
          <h3 className='standout-01'>Jon Glass | Co-founder, Innovation</h3>
          <div className='flex'>
            <img className='team-member' src={jonglass} alt='Jon Glass' />
            <div className='bio'>
              Jon Glass is a founding engineer at La Reverie Studio LLC. His eclectic  career spans professional skateboard photography, painting, and software engineering, giving him a truly unique perspective on creativity and technology. Jon's diverse skill set allows him to approach development with an artistic sensibility and a keen eye for detail. You can explore his creative projects on <a href="https://instagram.com/jonglasss" target='_blank'>Instagram</a> and his technical work on <a href="https://github.com/jonglass82" target='_blank'>GitHub</a>.
              <div className='blockquote'>
                <img className='icon-quote' width={15} src={quote} />
                🔥
                <img className='icon-quote rotate' width={15} src={quote} />
              </div>
            </div>
          </div>
        </article>

        <article className="text-black text-base font-normal leading-normal pb-10 pt-1">
          <h3 className='standout-01'>Bhaskar Ch | Product Management</h3>
          <div className='flex'>
            <img className='team-member' src={bhaskar} alt='Bhaskar Ch' />
            <div className='bio'>
              Bhaskar is a Business Analyst turned Product Manager with an MBA from Wayne State University. He is adept at aligning business objectives with technical execution, levering his analytical skills to drive impactful product strategies. Bhaskar's expertise lies in transforming complex business requirements into actionable roadmaps for product development. You can connect with him on <a href="https://www.linkedin.com/in/bchitraju/" target='_blank'>LinkedIn</a>.
            </div>
          </div>
        </article>
      </div>
    </section>
    </>
  );
}

export default Team;