import Goals from "./Goals"
import MGoals from "./MGoals"
import ResourceList from "./ResourceList"

const Dashboard = () => {

    return (
        <div className="py-10 headings text-white">
            <h2 className="font-bold text-5xl mb-20">My Dashboard</h2>
            <div>
                <MGoals />
                <Goals />
                <ResourceList />
            </div>
            
        </div>
    )
}

export default Dashboard