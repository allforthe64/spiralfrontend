import { FC } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"


interface ModalProps {
    name: string,
    onClickFunc: () => void
}

const Modal:FC<ModalProps> = (props) => {
    return (
        <div className="modal backdrop-blur-sm flex justify-center py-20">
            <div className="border w-10/12 bg-dark rounded-2xl">
                <div className="flex justify-end pt-2 pr-4">
                    <button className="text-white" onClick={() => props.onClickFunc()}><FontAwesomeIcon icon={faXmark} className='text-4xl' /></button>
                </div>
                <p className="text-white">{props.name}</p>
            </div>
        </div>
    )
}

export default Modal