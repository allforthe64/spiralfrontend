import { useState } from "react"

import Goals from "./Goals"
import MGoals from "./MGoals"
import ResourceList from "./ResourceList"
import DashModal from "./DashModal"

const Dashboard = () => {

    const [openModal, setOpenModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalBody, setModalBody] = useState('')
    const [modalNote, setModalNote] = useState(false)


    const onClick = (title, body, note) => {
        if (openModal === false) {
            setModalTitle(title)
            setModalBody(body)
            setOpenModal(true) 
            setModalNote(note)
    
        }   else {
            setOpenModal(false)
        }
    }
    

    return (
        <div className="py-10 headings text-white pr-6">
            {openModal && <DashModal note={modalNote} func={onClick} title={modalTitle} body={modalBody}/>}
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
                    <ResourceList />
                </div>
                
            </div>
            
        </div>
    )
}

export default Dashboard