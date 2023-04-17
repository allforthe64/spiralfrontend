import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const DashModal = ({func, title, body, note, state, resourceContent}) => {

    let content

    if (state === false) {
        content = (
            <>
                <div className="flex justify-end pt-2 pr-4 mb-10">
                        <button className="text-white" onClick={() => func()}><FontAwesomeIcon icon={faXmark} className='text-4xl' /></button>
                    </div>
                    <h1 className="text-white mb-14 info-txt font-bold text-4xl">{note ? `Viewing Note: ${title}` : `Viewing Goal: ${title}`}</h1>
                    <div className="h-[65%] flex justify-center">
                        <div className="mb-4 w-[65%]">
                            <p className="text-white text-left info-txt text-lg">{body}</p>
                        </div>
                </div>
            </>
        )
    } else {

        const stringArr = resourceContent.longDesc.split('Cost')
        let tutArr = []

        for (let i in resourceContent.tutorials) {
            let element = <li className="text-white text-left"><Link to={resourceContent.tutorials[i].link} target='_blank' className="text-white info-txt mt-4 tutorial text-lg">{resourceContent.tutorials[i].title}</Link></li>
            tutArr.push(element)
        }

        content = (
            <>
                <div className="flex justify-end pt-2 pr-4 mb-10">
                        <button className="text-white" onClick={() => func()}><FontAwesomeIcon icon={faXmark} className='text-4xl' /></button>
                    </div>
                    <h1 className="text-white mb-8 info-txt font-bold text-6xl">{resourceContent.name}</h1>
                    <div className="overflow-auto h-[90%] w-[99%] py-8 modal-scroll">
                    <div className="h-[70%] modal-scroll overflow-auto">
                        <div className="ml-10 mb-4 pr-4">
                            <p className="text-white text-left info-txt">{stringArr[0]}</p>
                        </div>
                        <p className="text-white text-left info-txt font-bold text-xl ml-10 mb-10">{'Cost' + stringArr[1]}</p>
                        <div className="pl-10">
                            <h2 className="info-txt font-bold text-2xl text-white text-left">Tutorials:</h2>
                            <ul className="list-disc pl-8 pt-2 mb-8">
                                {tutArr}
                            </ul>
                        </div>
                        <div className='flex justify-center sm:max-md:mt-4'>
                        <div className='md:w-10/12 sm:max-md:w-8/12 flex justify-around'>
                        <button className="text-black bg-alien-green info-txt px-4 py-2 text-xl font-bold rounded-lg sm:max-md:text-sm max-sm:text-xs max-sm:w-8/12"><Link to={resourceContent.link} target='_blank'>Start using {resourceContent.name}</Link></button>
                    </div>
                    </div>
                    </div>
                </div>

            </>
        )
    }

    return (
        <div className="modal backdrop-blur-sm flex justify-center py-20">
            <div className="border w-10/12 bg-slate-900 rounded-2xl pb-26 h-[100%]">
                {content}
            </div>
        </div>
    )
}

export default DashModal