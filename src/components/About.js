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
          <p className='mb-5'>
            <span className='company'>La Reverie Studio</span> draws its spirit from <i>The Little Prince</i>, inviting us to see the world through the lens of childhood wonder—a time when everything was magical, creativity flowed effortlessly, and we were fully present without the need for explanations. At <span className='company'>La Reverie Studio</span>, we believe in tapping into that boundless curiosity, where each project feels like a fresh discovery and every design emerges from an open heart and imaginative mind. This approach isn’t just nostalgic; it’s a journey back to our truest selves, unburdened by convention or expectation.
          </p>
          <p>
            Our studio embraces this ethos by creating digital experiences that are authentic, playful, and deeply resonant. Whether it’s crafting a platform or designing a brand identity, we aim to bring a touch of innocence and wonder to our work, celebrating creativity that feels pure, unfiltered, and genuinely engaging. Like <i>The Little Prince</i>, who sees the beauty and mystery in even the simplest things, we approach each project with a sense of hope and wide-eyed curiosity, allowing our clients’ visions to shine in their most meaningful form.
          </p>
        </article>
      </div>
    </section>
  );
}

export default About;
