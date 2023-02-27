import { AnimationOnScroll } from 'react-animation-on-scroll'

declare global {
    namespace JSX {
      interface IntrinsicElements {
        'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      }
    }
  }

const GetStarted = () => {
    return (
        <>
            <section className="pt-60 pb-60">
                <h1 className="headings text-white text-5xl w-8/12 ml-[16%] font-bold mb-10">Why a self directed, project based approach to learning?</h1>
                <p className="text-white info-txt w-8/12 ml-[16%] text-lg">A self-directed, project based approach to learning allows children to learn by doing - not the 
                    ‘kid’ version - the real thing. This approach allows children to utilize their endless curiosity and fosters an intrinsic 
                    motivation to learn and allows home educating parents to stop being the enforcer when it comes to their children’s learning. Spiral 
                    will help you to implement this approach with your own children.</p>
            </section>
            <section className="bg-white pt-10 pb-10">
                <AnimationOnScroll animateIn='animate__fadeInLeft' >
                    <p className="text-black info-txt text-3xl font-bold w-9/12 ml-[4%] text-left pb-4">Learn with friends</p>
                    <hr className='lg-spacer ml-[4%] mb-6 bg-black'/> 
                </AnimationOnScroll>
                <AnimationOnScroll animateIn='animate__fadeInUp'>
                    <div className="flex justify-around w-10/12 ml-[8%]">
                            <div className="w-3/12">
                                <img className='mb-4 h-[48%] w-[100%]' src="https://i0.hippopx.com/photos/279/654/449/art-craft-creative-cute-preview.jpg" alt="peers"/>
                                <p className="headings text-left text-lg font-semibold text-black mb-2">Weekly Live Meetings</p>
                                <p className="text-left text-black text-sm info-txt">Log on and share with fellow builders. Meet each Tuesday and Friday to share your progress, 
                                    ask questions, and see what everyone else is building. Sometimes parents have questions too! Weekly meetup held via zoom will answer any questions 
                                    caregivers may have.</p>
                            </div>
                            <div className="w-3/12">
                                <img className='mb-4  h-[48%] w-[100%]' src="https://miro.medium.com/max/1000/0*kBHpKva09AsGj7RQ" alt="Discord"/>
                                <p className="headings text-left text-lg font-semibold text-black mb-2">Discord Server</p>
                                <p className="text-left text-black text-sm info-txt">As students build their skills, they may need a little help. Our Discord community 
                                    is there to answer questions and point them in the direction of great resources to keep them on track between meet-ups.</p>
                            </div>
                            <div className="w-3/12">
                                <img className="mb-4 h-[48%] w-[100%]" src="https://img.freepik.com/premium-photo/connection-lines-with-nodes-connection-structure-black-background-3d-rendering_493806-14591.jpg" alt='Resources'/>
                                <p className="headings text-left text-lg font-semibold text-black mb-2">Extensive Learning Resource Database</p>
                                <p className="text-left text-black text-sm info-txt">The internet makes world class learning resources just a click away. Gain access to the Spiral resource database which includes 
                                    software, tutorial, and class recommendations</p>
                            </div>
                        </div>
                </AnimationOnScroll>
            </section>
            <section className='bg-white pt-24 pb-24'>
                <p className='headings text-4xl font-bold mb-10'>Choose Your Plan</p>
                <div>
                    <stripe-pricing-table pricing-table-id="prctbl_1MfqsCDLN6a5YwY51ik8LkOl"
                    publishable-key="pk_test_51M9tXyDLN6a5YwY54Iisq0d8BUE2E1qiJ2DpZVTHyoIChxlwbcBV8h706xyIznKnDpX7Kizcd76lp5JvJMzXTJiW00O1ohS1QJ">
                    </stripe-pricing-table>
                </div>
            </section>
        </>
    )
}

export default GetStarted