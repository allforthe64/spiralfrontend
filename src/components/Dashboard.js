import Goals from "./Goals"
import MGoals from "./MGoals"
import Notes from "./Notes"

const Dashboard = () => {

    return (
        <div className="text-white headings">
            <h2>My Dashboard</h2>
            <div className="dash-container">
                <MGoals />
                <Goals />
                <Notes />
            </div>
            
        </div>
    )
}

export default Dashboard