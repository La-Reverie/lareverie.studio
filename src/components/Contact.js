import React from 'react';

function Contact() {
  return (
    <section className="content-wrap">
      <a id="contact" className="anchor" aria-hidden="true"></a>
      <div className="content"> 
        <h2 className="wrapper">
          <div className="bebas-neue">contact</div>
        </h2>
        <article className="text-black text-base font-normal leading-normal pb-3 pt-1">
          <a href='mailto:hello@lareverie.studio'>hello@lareverie.studio</a>
          <br /><br />
          <span className='standout-03'>152 Orchard St, New York, NY 10002</span>
          <br /><br />
          <span className='standout-03'>806 S Van Ness Ave, San Francisco, CA 94110</span>
          <br /><br />
          <span className='standout-03'>8447 Santa Monica Blvd, West Hollywood, CA 90069</span>
          <br /><br />
          <span className='standout-03'>Arévalo 2030, C1414CQP Cdad. Autónoma de Buenos Aires, Argentina</span>
        </article>
      </div>
    </section>
  );
}

export default Contact;