function Home() {
  return (
    <section className="content-wrap">
    <a 
      id="home" 
      className="anchor" 
      href="#home" 
      aria-label="Home section"
      aria-hidden="true"
    ></a>
    <div className="content"> 
      <article className="text-black text-base font-normal leading-normal pb-3 pt-1">
        <h3 className='bebas-neue'>Boundless curiosity</h3>
        <p className='mb-12'>
          First and foremost, we are creatives. We are also unburdened by technical limitations, allowing us to approach every project with a sense of wide-eyed wonder and limitless creativity. 
          With <span className='company'>La Reverie Studio</span>, your visions shine in their most meaningful form.
        </p>
        <h3 className='bebas-neue'>Authentic. Playful. Resonant.</h3>
        <p className='mb-12'>
          We craft digital experiences that flow effortlessly from watches and phones to eyewear, VR, tablets, screens, projectors, and beyond, keeping you ready for your next big leap.
        </p>
        <h3 className='bebas-neue'>Fresh discoveries</h3>
        <p className='mb-12'>
          Whether you’re a household name or the first of your kind, we are ready to help you break new ground. From concept to launch and beyond, our team will keep you a step ahead with cutting-edge tech to reach and engage customers, make conversions and scale with ease.
        </p>
      </article>
    </div>
  </section>
  );
}

export default Home; 