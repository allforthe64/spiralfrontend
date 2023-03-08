import { Link } from "react-router-dom";
import Users from './Users';

const Admin = () => {
    return (
        <section className="text-white">
            <h1>Admins Page</h1>
            <br />
            <Users />
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Admin