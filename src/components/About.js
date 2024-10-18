import React from 'react';

function About() {
  return (
    <section className="content-wrap">
      <a id="about" className="anchor" aria-hidden="true"></a>
      <div className="content"> 
        <h2 className="wrapper">
          {/* <div className="top">about</div>
          <div className="bottom" aria-hidden="true">about</div> */}
          <div className="bebas-neue">about</div>
        </h2>

        <article className="text-black text-base font-normal leading-normal pb-3 pt-1">
          <span className='standout-01'>Make ideas come true</span>. We are a creative technology company. But even more, a passionate group of doers, awakening our inner child's and manifesting the kind of world in which we want to live.
          <br /><br />
          <span className='standout-01'>Our clients are folks that we believe in.</span> That believe in us. Your success is our success. You're cordially invited.
        </article>
      </div>
    </section>
  );
}

export default About;
