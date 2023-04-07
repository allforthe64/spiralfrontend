import { useState, useContext } from "react"
import { ResourceContext } from "../App"
import Goals from "./Goals"
import MGoals from "./MGoals"
import ResourceList from "./ResourceList"
import DashModal from "./DashModal"
import Avatar from "./Avatar"

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

    //console.log(modalResource)

    return (
        <div className="py-10 headings text-white px-6">
            {openModal && <DashModal state={modalState} note={modalNote} func={onClick} title={modalTitle} body={modalBody} resourceContent={modalContent}/>}
            <h2 className="font-bold text-5xl mb-4 md:mb-20">My Dashboard</h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between px-[1%] mb-8 md:mb-16">
                <div className="w-full sm:w-10/12 md:w-[32%]">
                    <Avatar />
                </div>
                <div className="w-full md:w-[65%]">
                    <MGoals />
                </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-around px-[1%]">
                <div className="w-full mb-8 lg:mb-0 lg:w-9/12">
                    <Goals func={onClick}/>
                </div>

                <div className="w-full lg:w-3/12">
                    <ResourceList func={findResource}/>
                </div>
                
            </div>
            
        </div>
    )
}

export default Dashboard