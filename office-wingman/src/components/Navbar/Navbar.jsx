import { NavLink } from 'react-router-dom';
import "./navbar.css";
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import DashboardIcon from '../../assets/images/dashboard.svg'
import MailIcon from "../../assets/images/mail.svg"
import MeetIcon from "../../assets/images/meeting.svg";
import LogoutIcon from "../../assets/images/logout.svg";

function Navbar() {
    const drawerWidth = 240;
    return (
        <>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
                className='nav-drawer'
            >
                <div className='logo'><h2>Logo</h2></div>
                <Divider />

                <div className='nav-items'>
                    <ul className='nav-items_upper'>
                        <NavLink className="navlink" to={`/`}>
                            <img src={DashboardIcon} alt='dashboard' />
                            <li>Dashboard</li>
                        </NavLink>
                        <NavLink className="navlink" to={`/mail-review`}>
                            <img src={MailIcon} alt='mail-review' />
                            <li>Mail Review</li></NavLink>
                        <NavLink className="navlink" to={`/meetings`}>
                            <img src={MeetIcon} alt="meeting" />
                            <li>Meetings</li>
                        </NavLink>
                    </ul>
                    <ul>
                        <NavLink className="navlink" to={`/logout`}>
                            <img src={LogoutIcon} alt='logout' />
                            <li>Logout</li>
                        </NavLink>
                    </ul>
                </div>

            </Drawer>

        </>
    )
}

export default Navbar