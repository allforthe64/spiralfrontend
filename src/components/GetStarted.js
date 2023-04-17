import { AnimationOnScroll } from 'react-animation-on-scroll'
import { PopupButton } from "react-calendly";

// declare global {
//     namespace JSX {
//       interface IntrinsicElements {
//         'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//       }
//     }
// } 

const GetStarted = () => {
    return (
        <>
            <section className="pt-20 pb-20 px-10 flex lg:flex-row lg:justify-around flex-col-reverse items-center">
                <div className='flex flex-col items-start w-10/12 lg:w-5/12 text-left text-white'>
                    <h1 className="headings text-2xl sm:text-3xl md:text-5xl font-bold mb-7">Why a self directed, project based approach to learning?</h1>
                    <p className="info-txt text-md md:text-lg">Children learn best by doing - not the 
                    ‘kid’ version - the real thing. Children utilize their endless curiosity and foster an intrinsic 
                    motivation to learn. Parents can stop being the enforcer when it comes to their children’s learning. 
                    </p>
                    <p className='text-2xl md:text-3xl font-semibold my-4'>Ready to implement this approach with your children?</p>
                    <PopupButton
                        url="https://calendly.com/discover_spiral_learning/discover-spiral-intro-meeting?month=2023-04"
                        /*
                        * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
                        * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
                        */
                        rootElement={document.getElementById("root")}
                        text="Schedule an Info Call"
                        className="rounded-xl headings px-4 py-2 text-lg md:text-3xl bg-alien-green font-bold max-w-md mb-10 p-3 mt-4"
                    />
                </div>
                <div className='w-8/12 md:w-6/12 lg:w-4/12 mb-5 lg:mb-0'>
                    <img src='./started1.png' alt="achild with a pencil in front of posters depicting the project completion process"/>
                </div>
                
            </section>
            <section className="bg-white pt-10 pb-10">
                <p className="text-black info-txt text-xl md:text-3xl font-bold w-9/12 ml-[4%] text-left pb-4">In <span className='text-[#00FF5D] text-2xl md:text-4xl font-semibold'>One</span> month, your child will . . .</p>
                <hr className='lg-spacer ml-[4%] mb-6 bg-black'/> 
                <AnimationOnScroll animateIn='animate__fadeInUp'>
                    <div className="flex flex-col items-center lg:flex-row lg:justify-around lg:w-10/12 lg:ml-[8%] pt-10">
                            <div className="w-10/12 mb-8 md:mb-0 md:w-8/12 lg:w-3/12">
                                <img className='mb-4 h-[48%] w-[100%]' src="./interest.png" alt="peers"/>
                                <p className="headings text-center text-lg font-semibold text-black mb-2">Interest Led Learning</p>
                                <p className="text-left text-black text-sm info-txt">Use intrinsic motivation to follow their interests and dig deep on a topic they are passionate about.</p>
                            </div>
                            <div className="w-10/12 mb-8 md:mb-0 md:w-8/12 lg:w-3/12">
                                <img className="mb-4 h-[48%] w-[100%]" src="./mentor.png" alt='Resources'/>
                                <p className="headings text-center text-lg font-semibold text-black mb-2">Find a Mentor</p>
                                <p className="text-left text-black text-sm info-txt">Connect with a professional to hear how that passion can lead to a career.</p>
                            </div>
                            <div className="w-10/12 mb-8 md:mb-0 md:w-8/12 lg:w-3/12">
                                <img className='mb-4  h-[48%] w-[100%]' src="portfolio.png" alt="Discord"/>
                                <p className="headings text-center text-lg font-semibold text-black mb-2">Portfolio Website</p>
                                <p className="text-left text-black text-sm info-txt">Document their exploration and learning by building a portfolio website to share.</p>
                            </div>
                        </div>
                </AnimationOnScroll>
            </section>
            <section className="bg-white pt-10 pb-10">
                <AnimationOnScroll animateIn='animate__fadeInLeft' >
                    <p className="text-black info-txt text-xl md:text-3xl font-bold w-9/12 ml-[4%] text-left pb-4">What does <span className='text-[#00FF5D] text-2xl md:text-4xl font-semibold'>Spiral</span> offer?</p>
                    <hr className='lg-spacer ml-[4%] mb-6 bg-black'/> 
                </AnimationOnScroll>
                <AnimationOnScroll animateIn='animate__fadeInUp'>
                    <div className="flex flex-col items-center lg:flex-row lg:justify-around lg:items-stretch lg:w-10/12 lg:ml-[8%] pt-10">
                            <div className="py-4 h-full w-10/12 mb-8 md:mb-0 md:w-8/12 lg:w-3/12">
                                <img className='mb-4 w-4/12 m-auto' src="./support.png" alt="peers"/>
                                <p className="headings text-center text-lg font-semibold text-black mb-2">Support</p>
                                <p className="text-left text-black text-sm info-txt">Log on and share with fellow builders. Meet each Tuesday and Friday to share your progress, 
                                    ask questions, and see what everyone else is building. Sometimes parents have questions too! Weekly meetup held via zoom will answer any questions 
                                    caregivers may have.</p>
                            </div>
                            <div className="py-4 h-full w-10/12 mb-8 md:mb-0 md:w-8/12 lg:w-3/12">
                                <img className="mb-4 w-4/12 m-auto" src="./book.png" alt='Resources'/>
                                <p className="headings text-center text-lg font-semibold text-black mb-2">Resource Database</p>
                                <p className="text-left text-black text-sm info-txt">The internet makes world class learning resources just a click away. Gain access to the Spiral resource database which includes 
                                    software, tutorial, and class recommendations</p>
                            </div>
                            <div className="py-4 h-full w-10/12 mb-8 md:mb-0 md:w-8/12 lg:w-3/12">
                                <img className='mb-4  w-4/12 m-auto' src="./community.png" alt="Discord"/>
                                <p className="headings text-center text-lg font-semibold text-black mb-2">Community</p>
                                <p className="text-left text-black text-sm info-txt">As students build their skills, they may need a little help. Our Discord community 
                                    is there to answer questions and point them in the direction of great resources to keep them on track between meet-ups.</p>
                            </div>
                        </div>
                </AnimationOnScroll>
            </section>
            <section className='pt-10 pb-10 flex flex-col justify-center items-center '>
                <div className="text-white md:py-20 w-10/12 md:w-8/12">
                    <h3 className='text-4xl md:text-6xl mb-5 font-extrabold'>Want more info?</h3>
                    <p className='text-xl md:text-2xl mb-5'>Click to schedule a short intro call. We'll answer any questions you have about how <span className='text-[#00FF5D] text-3xl font-semibold'>Spiral</span> can help your child's passions lead their learning!</p>
                    <PopupButton
                        url="https://calendly.com/discover_spiral_learning/discover-spiral-intro-meeting?month=2023-04"
                        /*
                        * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
                        * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
                        */
                        rootElement={document.getElementById("root")}
                        text="Click here to schedule!"
                        className="rounded-xl headings px-4 py-2 text-lg md:text-3xl bg-alien-green font-bold max-w-md mb-10 p-3 mt-4"
                    />
                </div>
                
                
                </section>
            {/* <section className='bg-white pt-24 pb-24'>
                <p className='headings text-4xl font-bold mb-10'>Choose Your Plan</p>
                <div>
                    <stripe-pricing-table pricing-table-id="prctbl_1MfqsCDLN6a5YwY51ik8LkOl"
                    publishable-key="pk_test_51M9tXyDLN6a5YwY54Iisq0d8BUE2E1qiJ2DpZVTHyoIChxlwbcBV8h706xyIznKnDpX7Kizcd76lp5JvJMzXTJiW00O1ohS1QJ">
                    </stripe-pricing-table>
                </div>
            </section> */}
        </>
    )
}

export default GetStarted