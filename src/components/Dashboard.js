import Goals from "./Goals"
import MGoals from "./MGoals"
import ResourceList from "./ResourceList"

const Dashboard = () => {

    return (
        <div className="py-10 headings text-white pr-6">
            <h2 className="font-bold text-5xl mb-20">My Dashboard</h2>
            <div className="flex justify-around pl-[1%] mb-16">
                <div className="h-[350px] w-[31%]  border border-white">Profile Pic goes here</div>
                <div className="w-[63%] ml-[2%]">
                    <MGoals />
                </div>
            </div>
            <div className="flex justify-around">
                <div className="w-9/12">
                    <Goals />
                </div>

                <div className="w-3/12">
                    <ResourceList />
                </div>
                
            </div>
            
        </div>
    )
}

export default Dashboard