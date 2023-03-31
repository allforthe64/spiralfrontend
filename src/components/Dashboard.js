import { useState, useContext } from "react"
import { ResourceContext } from "../App"

import Goals from "./Goals"
import MGoals from "./MGoals"
import ResourceList from "./ResourceList"
import DashModal from "./DashModal"

const Dashboard = () => {

    const contextObject = useContext(ResourceContext)
    const resources = contextObject.arr

    const [openModal, setOpenModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalBody, setModalBody] = useState('')
    const [modalNote, setModalNote] = useState(false)
    const [modalState, setModalState] = useState(false)
    const [modalResource, setModalResource] = useState([])
    const [modalContent, setModalContent] = useState()


    const onClick = (title, body, note, state) => {
        if (openModal === false) {
            setModalTitle(title)
            setModalBody(body)
            setOpenModal(true) 
            setModalNote(note)
            setModalState(state)
    
        }   else {
            setOpenModal(false)
        }
    }

    const findResource = (id) => {
        setModalState(true)
        const resource = resources.filter(el => el._id === id)[0]
        setModalResource(resource)

        setModalContent(resource)

        setOpenModal(true)
    }

    console.log(modalResource)
    

    return (
        <div className="py-10 headings text-white pr-6">
            {openModal && <DashModal state={modalState} note={modalNote} func={onClick} title={modalTitle} body={modalBody} resourceContent={modalContent}/>}
            <h2 className="font-bold text-5xl mb-20">My Dashboard</h2>
            <div className="flex justify-around pl-[1%] mb-16">
                <div className="h-[350px] w-[31%]  border border-white">Profile Pic goes here</div>
                <div className="w-[63%] ml-[2%]">
                    <MGoals />
                </div>
            </div>
            <div className="flex justify-around">
                <div className="w-9/12">
                    <Goals func={onClick}/>
                </div>

                <div className="w-3/12">
                    <ResourceList func={findResource}/>
                </div>
                
            </div>
            
        </div>
    )
}

export default Dashboard