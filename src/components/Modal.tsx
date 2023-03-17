import { FC } from "react"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fas, faXmark } from "@fortawesome/free-solid-svg-icons"
import { far, faHeart } from "@fortawesome/free-regular-svg-icons"
import { Link } from "react-router-dom"


library.add(far, fas, faHeart)



interface ModalProps {
    id: string,
    name: string,
    longDesc: string,
    tutorials: Array<{title:string, link:string, _id:string}>,
    link: string,
    onClickFunc: () => void
}

const Modal:FC<ModalProps> = (props) => {

    const stringArr = props.longDesc.split('Cost')
    let tutArr = []

    for (let i in props.tutorials) {
        let element = <li className="text-white info-txt text-left mt-4 hover:underline text-lg"><Link to={props.tutorials[i].link} target='_blank'>{props.tutorials[i].title}</Link></li>
        tutArr.push(element)
    }

    return (
        <div className="modal backdrop-blur-sm flex justify-center py-20">
            <div className="border w-10/12 bg-dark rounded-2xl pb-20 h-[100%]">
                <div className="flex justify-end pt-2 pr-4">
                    <button className="text-white" onClick={() => props.onClickFunc()}><FontAwesomeIcon icon={faXmark} className='text-4xl' /></button>
                </div>
                <h1 className="text-white mb-8 info-txt font-bold text-4xl">{props.name}</h1>
                <div className="overflow-auto h-[85%] w-[99%] mt-10 py-10 modal-scroll">
                    <div className="w-6/12 ml-10 mb-4">
                        <p className="text-white text-left info-txt">{stringArr[0]}</p>
                    </div>
                    <p className="text-white text-left info-txt font-bold text-xl ml-10 mb-10">{'Cost' + stringArr[1]}</p>
                    <div className="pl-10">
                        <h2 className="info-txt font-bold text-2xl text-white text-left">Tutorials:</h2>
                        <ul className="list-disc pl-8 pt-2 mb-8">
                            {tutArr}
                        </ul>
                    </div>
                    <button className="bg-alien-green info-txt px-4 py-2 text-xl font-bold rounded-lg"><Link to={props.link} target='_blank'>Start using {props.name}</Link></button>
                </div>
                <FontAwesomeIcon icon={["fas", "heart"]} className='text-white text-4xl'/>
                <FontAwesomeIcon icon={["far", "heart"]} className='text-white text-4xl'/>
            </div>
        </div>
    )
}

export default Modal