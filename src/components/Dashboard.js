import Goals from "./Goals"
import CompletedGoals from "./CompletedGoals"
import MGoals from "./MGoals"
import Notes from "./Notes"
import ResourceList from "./ResourceList"

const Dashboard = () => {

    return (
        <div className="text-white headings">
            <h2>My Dashboard</h2>
            <div className="dash-container">
                <MGoals />
                <Goals />
                <CompletedGoals />
                <Notes />
                <ResourceList />
            </div>
            
        </div>
    )
}

export default Dashboard