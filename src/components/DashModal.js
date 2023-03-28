import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

const DashModal = ({func, title, body, note}) => {

    return (
        <div className="modal backdrop-blur-sm flex justify-center py-20">
            <div className="border w-10/12 bg-dark rounded-2xl pb-26 h-[100%]">
                <div className="flex justify-end pt-2 pr-4 mb-10">
                    <button className="text-white" onClick={() => func()}><FontAwesomeIcon icon={faXmark} className='text-4xl' /></button>
                </div>
                <h1 className="text-white mb-14 info-txt font-bold text-4xl">{note ? `Viewing Note: ${title}` : `Viewing Goal: ${title}`}</h1>
                <div className="h-[65%] flex justify-center">
                        <div className="ml-10 mb-4 w-[60%]">
                            <p className="text-white text-left info-txt text-lg">{body}</p>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default DashModal