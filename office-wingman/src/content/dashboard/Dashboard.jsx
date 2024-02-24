import Header from "../../components/Header/Header"
import SheduleHeader from "../../components/SheduleHeader/SheduleHeader"
import "./dashboard.css";
import DMailIcon from "../../assets/images/dMail.svg"
import DMeetIcon from "../../assets/images/dMeet.svg"
import DTaskIcon from "../../assets/images/dTask.svg"
import { PieChart } from '@mui/x-charts/PieChart';
import Footer from "../../components/Footer/Footer";


function Dashboard() {
    return (
        <>
            <div>
                <Header heading="Your Dashboard" />
                <div className="dashboard-content">
                    <SheduleHeader content="Friday, February 23, 2024" />
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
                            <img src={DTaskIcon} alt="dashboard-task" />
                            <div className="task-content">
                                <p>New tasks</p>
                                <h3>10</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-content">
                    <SheduleHeader content="Time mostly spent" />
                    <div className="dashboard-container">
                        <PieChart
                            series={[
                                {
                                    data: [
                                    { id: 0, value: 10, label: 'Outlook' },
                                    { id: 1, value: 20, label: 'MS Teams' },
                                    { id: 2, value: 40, label: 'VS Code' },
                                    { id: 3, value: 10, label: 'Pi' },
                                    { id: 4, value: 10, label: 'Chrome' },
                                    { id: 5, value: 10, label: 'Youtube' },],
                                    innerRadius: 30,
                                    outerRadius: 120,
                                    paddingAngle: 5,
                                    cornerRadius: 5,
                                    startAngle: -90,
                                    endAngle: 360,
                                    cx: 150,
                                    cy: 150,
                                    highlightScope: { faded: 'global', highlighted: 'item' },
                                }
                            ]}
                            width={500}
                            height={300}
                        />
                    </div>
                </div>
            </div>
            <div><Footer /></div>
        </>
    )
}

export default Dashboard