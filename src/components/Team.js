import React from 'react';
import './Team.css';
import jon from '../images/team/jon.jpg';
import javier from '../images/team/javier.jpg';
import jonglass from '../images/team/jon-glass.jpg';
import bhaskar from '../images/team/bhaskar.jpg';
import lorenzo from '../images/team/lorenzo.jpg';
import bharti from '../images/team/bharti.jpg';
import kennedy from '../images/team/kennedy.jpg';
import quote from '../images/quote.svg';

function Team() {
  return (
    <>
    <section className="content-wrap">
      <a id="team" className="anchor" aria-hidden="true"></a>
      <div className="content"> 
        <h2 className="wrapper">
          <div className="bebas-neue">our team</div>
        </h2>
        <article className="text-black text-base font-normal leading-normal pb-10 pt-1">
          <h3 className='standout-01'>Jon Caveman – Founder</h3>
          <div className='flex'>
            <img className='team-member' src={jon} alt='Jon Caveman' />
            <div className='bio'>
              All roads lead to here. Jon’s goal is to preserve what gets lost between big ideas and technological limitations. Jon infuses more than three decades of coding experience into his creative process. With a career spanning advertising, big tech, and a stint as a rock radio DJ, Jon’s imagination knows no limit.
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
          <h3 className='standout-01'>Lorenzo Castillo – Co-founder, Engineering</h3>
          <div className='flex'>
            <img className='team-member' src={lorenzo} alt='Lorenzo Castillo' />
            <div className='bio'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed nisl mollis, elementum ligula nec, dictum sem. Nunc tempus est id risus pretium elementum. Vivamus mattis sem in convallis iaculis. Vestibulum nulla sem, ornare et dolor id, ultrices dapibus elit. Vestibulum molestie, eros at semper maximus, est tortor cursus dolor, et suscipit augue risus non urna. Ut faucibus odio eget nibh elementum iaculis.
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
              Javier transforms whimsical ideas into digital experiences. His multifaceted background in writing, illustration, and web development allow him to combine artistic vision with technical proficiency and lead our most innovative design projects.
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
              Jon Glass is a software engineer with an artistic heart. He built a diverse skill set as a professional skateboard photographer, game coder and painter. Jon approaches development with artistic sensibility and an eye for detail.
              <div className='blockquote'>
                <img className='icon-quote' width={15} src={quote} />
                🔥
                <img className='icon-quote rotate' width={15} src={quote} />
              </div>
            </div>
          </div>
        </article>

        <article className="text-black text-base font-normal leading-normal pb-10 pt-1">
          <h3 className='standout-01'>Kennedy Vasquez | Digital Marketing</h3>
          <div className='flex'>
            <img className='team-member' src={kennedy} alt='Kennedy Vasquez' />
            <div className='bio'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed nisl mollis, elementum ligula nec, dictum sem. Nunc tempus est id risus pretium elementum. Vivamus mattis sem in convallis iaculis. Vestibulum nulla sem, ornare et dolor id, ultrices dapibus elit. Vestibulum molestie, eros at semper maximus, est tortor cursus dolor, et suscipit augue risus non urna. Ut faucibus odio eget nibh elementum iaculis.
              <div className='blockquote'>
                <img className='icon-quote' width={15} src={quote} />
                Stories are bridges to worlds.
                <img className='icon-quote rotate' width={15} src={quote} />
              </div>
            </div>
          </div>
        </article>

        <article className="text-black text-base font-normal leading-normal pb-10 pt-1">
          <h3 className='standout-01'>Bharti Batra | Quality Assurance</h3>
          <div className='flex'>
            <img className='team-member' src={bharti} alt='Bharti Batra' />
            <div className='bio'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed nisl mollis, elementum ligula nec, dictum sem. Nunc tempus est id risus pretium elementum. Vivamus mattis sem in convallis iaculis. Vestibulum nulla sem, ornare et dolor id, ultrices dapibus elit. Vestibulum molestie, eros at semper maximus, est tortor cursus dolor, et suscipit augue risus non urna. Ut faucibus odio eget nibh elementum iaculis.
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