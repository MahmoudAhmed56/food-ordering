import { Routes } from '@/constants/enums';
import MainHeading from '../main-heading';

async function About() {
  return (
    <section className='section-gap' id={Routes.ABOUT}>
      <div className='container text-center'>
        <MainHeading subTitle="about ourStory" title="about Us" />
        <div className='text-accent max-w-md mx-auto mt-4 flex flex-col gap-4'>
          <p>"descriptions one"</p>
          <p>"descriptions two"</p>
          <p>"descriptions three"</p>
        </div>
      </div>
    </section>
  );
}

export default About;