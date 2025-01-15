
function FeaturedWork() {
    return (
      <section className="content-wrap">
      <a 
        id="featured-work" 
        className="anchor" 
        href="#featured-work" 
        aria-label="Featured Work section"
        aria-hidden="true"
      ></a>
      <div className="content"> 
        <article className="text-black text-base font-normal leading-normal pb-3 pt-1">
        <h2 className="wrapper">
          <div className="bebas-neue">Featured Work</div>
        </h2>
        <p className='mb-12'>
          Experience our work in Apple Vision Pro (no device needed)
          <br />
          (demo coming soon)
        </p>
        <p className='mb-12'>
          Thought-chain-prompt engineering
          <br />
          (demo coming soon)
        </p>
        <p className='mb-12'>
          Generative content (try our tools)
          <br />
          (demo coming soon)
        </p>
        <p className='mb-12'>
          Moving web presences
          <br />
          (demo coming soon)
        </p>
        <p className='mb-12'>
          Intelligent user experiences
          <br />
          (demo coming soon)
        </p>
        </article>
      </div>
    </section>
    );
  }
  
  export default FeaturedWork; 