import { Link } from 'react-router-dom'
import { AnimationOnScroll } from 'react-animation-on-scroll'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';


const Home = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_KEY, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, form.current, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };


    return(
        <>
            <section className='flex flex-col lg:flex-row py-48 bg-dark'>
                <div className='flex flex-col pl-12 pr-12'>
                    <p className='text-white info-txt text-left text-2xl mb-2'>Join a</p>
                    <p className='text-white info-txt text-left text-3xl mb-2'>Creative Learning</p>
                    <h1 className='text-white headings text-left font-bold text-7xl mb-10'>Spiral</h1>
                    <button className='rounded-xl headings px-4 py-2 text-lg md:text-3xl bg-alien-green font-bold max-w-md mb-10'><Link to='/get-started'>Get Started</Link></button>
                    <p className='text-white info-txt text-left text-2xl w-10/12'>Because <span className='headings text-white'>learning</span> is different when you <span className='headings alien-green'>CHOOSE</span> it.</p>
                </div> 
                <div className='text-white'>
                    <h1>Video</h1>
                </div>
            </section>
            <section className="flex flex-col items-center pt-16 pb-16">
                <h3 className="headings text-5xl font-bold text-white mb-4">Why Spiral?</h3>
                <p className="w-8/12 mt-2 font-medium text-white text-sm md:text-xl leading-9 info-txt mb-16">When you have a choice about what you do and can 
                    choose when you stop, your relationship to what you’re doing 
                    is different. Learning flows better. There isn't a magical set facts that, once 
                    memorized/understood, constitutes a complete education. There’s always something more to be learned. The internet 
                    is an endless source of information and it’s more important to know how to create, build, and share information and ideas, than it is to memorize it.</p>
                    <div className="grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 justify-items-center">
                        <div className="p-4 max-w-xs rounded-3xl tinted">
                            <img className='rounded-lg mb-4' src="./projects_white.png" alt="passions"/>
                            <p className="headings text-2xl font-semibold text-white mb-4">Passions</p>
                            <p className="text-left text-white text-sm info-txt">Students will work longer, with more focus, and persist when 
                                faced with challenges if they really care about what they are doing.</p>
                        </div>
                        <div className="p-4 max-w-xs rounded-3xl tinted">
                            <img className='rounded-lg mb-4' src="./learning_white.png" alt="projects"/>
                            <p className="headings text-2xl font-semibold text-white mb-4">Projects</p>
                            <p className="text-left text-white text-sm info-txt">Start with an idea and carry it through to a finished project</p>
                        </div>
                        <div className="p-4 max-w-xs rounded-3xl tinted">
                            <img className="rounded-lg mb-4" src="./peers_white.png" alt='Peers'/>
                            <p className="headings text-2xl font-semibold text-white mb-4">Peers</p>
                            <p className="text-left text-white text-sm info-txt">Learning is a social process. Students need feedback from both adults and 
                                other students to help move them towards their goals.</p>
                        </div>
                        <div className="p-4 max-w-xs rounded-3xl tinted">
                            <img className="rounded-lg mb-4" src="./play_white.png" alt="play"/>
                            <p className="headings text-2xl font-semibold text-white mb-4">Play</p>
                            <p className="text-left text-white text-sm info-txt">Students should be given opportunities to take risks, try new things, and 
                                recognize there is no shame if their attempts do not work out.</p>
                        </div>
                    </div>
            </section>
            <section className='bg-white flex justify-center flex-col items-center py-28'>
                <h1 className='headings font-bold text-3xl md:text-5xl mb-14'>The Creative Learning Spiral:</h1>
                <AnimationOnScroll animateIn='animate__fadeIn' offset={100}>
                    <img src='./graphic.png' alt='Learning spiral graphic' className='w-[80%] ml-[10%]'/>
                </AnimationOnScroll>
            </section>
            <section className="space-bg flex flex-col py-32">
                <AnimationOnScroll animateIn="animate__fadeInDown" offset={300}>
                    <div className='flex justify-center'>
                        <h1 className="headings text-white font-bold text-4xl md:text-6xl w-7/12 mb-5">Want to access cutting 
                        edge learning solutions?</h1>
                    </div>
                </AnimationOnScroll>
                <AnimationOnScroll animateIn='animate__fadeIn'>
                    <p className="text-white headings text-xl md:text-2xl mb-10">Click the button below to get started:</p>
                
                    <div>
                        <button className='rounded-xl headings px-4 py-2 text-2xl md:text-3xl bg-alien-green font-bold'><Link to='/get-started'>Get Started</Link></button>
                    </div> 
                </AnimationOnScroll>
            </section>
            <section className='bg-dark border-t-2 py-20'>
                <AnimationOnScroll animateIn='animate__fadeInUp' offset={0}>
                    <p className='text-white headings font-bold text-5xl pt-10'>Meet The Team</p>
                    <hr className='smol-spacer ml-[42%] mt-4 bg-white'/>
                    <div className='flex mt-10 flex-col items-center md:flex-row md:justify-around'>
                        <div className='w-10/12 md:w-5/12'>
                            <img className='w-[100%]'src='/profile.jpg' alt='profile 1'/>
                            <div className='bg-white pt-4 px-2 pb-4'>
                                <p className='text-left headings font-bold text-3xl mb-2'>Lindsay</p>
                                <p className='info-txt font-semibold text-lg text-left mb-2'>Co-founder + Founding Engineer + Head of Content (?)</p>
                                <p className='info-txt text-left text-sm'> A certified teacher turned home educator and a mom of two. She has 
                                    over 8 years of experience as a home educator and several more in the 
                                    classroom. Believing that interests lead to deeper learning, she 
                                    endorses a self-directed, project based approach to education. She’s 
                                    experienced how providing choice in the learning process removes the 
                                    friction between parents and kids and leads to better outcomes. She 
                                    is an expert in finding resources and crafting open ended projects 
                                    that free kids to learn in ways that work for them.</p>
                            </div>
                        </div>
                        <div className='w-10/12 md:w-5/12'>
                            <img className='w-[100%]' src='https://avatars.githubusercontent.com/u/80420796?v=4' alt='profile 1'/>
                            <div className='bg-white pt-4 px-2 pb-9'>
                                <p className='text-left headings font-bold text-3xl mb-2'>Will</p>
                                <p className='info-txt font-semibold text-lg text-left mb-2'>Co-founder + Founding Engineer + Head of Community</p>
                                <p className='info-txt text-left text-sm'> A self taught web developer and advocate for everything involving code. 
                                Side interests include everything from playing the guitar to competing as the premiere Junior 19 Men's Canadian 
                                Outrigger Paddler. Believes in the individual compabilities of all people, and loves helping others unlock their 
                                own maximum potential. He's experienced how freedom and access to tools can lead to great things, and is always amped 
                                for the next project. Slings caffeine at Starbucks on the side :0</p>
                            </div>
                        </div>
                    </div>
                </AnimationOnScroll>
            </section>
            <section className='flex flex-col items-center md:flex=row md:justify-around py-10 bg-white'>
                <img src='/question.png' className='w-4/12 h-[auto]' alt='question-mark'/>
                <div className='w-10/12 md:w-7/12 mt-12'>
                    <form ref={form} onSubmit={sendEmail}>
                        <div className='flex flex-col'>
                            <p className='headings text-4xl md:text-6xl text-left mb-2'>Questions?</p>
                            <p className='info-txt text-xl md:text-2xl text-left mb-2'>Send us a message</p>
                            <input className='border-black border-2 mb-4 pl-2 py-px rounded focus:outline-black' type={'text'} placeholder='Name' name="from_name"/>
                            <input className='border-black border-2 mb-4 pl-2 py-px rounded focus:outline-black' type={'text'} placeholder='Email' name='from_email'/>
                            <textarea className='border-black border-2 rounded-lg pl-2 py-2 mb-4 focus:outline-black' rows={5} cols={50} placeholder='Enter a question' name='message'></textarea>
                            <button className='headings rounded-lg text-lg md:text-2xl border-2 border-black md:w-4/12 md:ml-[35%] hover:bg-black hover:text-white ease-in duration-100'>Consult Now</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Home