import Header from "../../components/Header/Header"
import SheduleHeader from "../../components/SheduleHeader/SheduleHeader"
import "./dashboard.css";
import DMailIcon from "../../assets/images/dMail.svg"
import DMeetIcon from "../../assets/images/dMeet.svg"
import DTaskIcon from "../../assets/images/dTask.svg"


function Dashboard() {
    return (
        <>
            <div>
                <Header heading="Your Dashboard" />
                <div className="dashboard-content">
                    <SheduleHeader />
                    <div className="dashboard-container">
                        <div className="dashboard-mail">
                            <img src={DMailIcon} alt="dashboard-mail" />
                            <div className="mail-content">
                                <p>New emails</p>
                                <h3>10</h3>
                            </div>
                        </div>
                        <div className="dashboard-meet">
                            <img src={DMeetIcon} alt="dashboard-meet" />
                            <div className="meet-content">
                                <p>New meetings</p>
                                <h3>5</h3>
                            </div>
                        </div>
                        <div className="dashboard-task">
                        <img src={DTaskIcon} alt="dashboard-task"/>
                            <div className="task-content">
                                <p>New tasks</p>
                                <h3>10</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard