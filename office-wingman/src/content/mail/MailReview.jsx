// MailReview.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import CustomTable from '../../components/Table/MailTable';
import Footer from '../../components/Footer/Footer';
import "./mail.css";

function MailReview() {
    const [scheduleItems, setScheduleItems] = useState([]);
    useEffect(() => {
        async function fetchScheduleItems() {
            try {
                const response = await axios.get('https://65d8c280c96fbb24c1bc3fe3.mockapi.io/sample-api-demo/email');
                setScheduleItems(response.data.map(item => ({
                    sender: item.sender,
                    subject: item.subject,
                    eta: item.date,
                })));
            } catch (error) {
                console.error('Error fetching schedule items:', error);
            }
        }
        fetchScheduleItems();
    }, []);
    const handleOpenClick = async (index) => {
        try {
            // Open Outlook
            window.open('https://outlook.live.com/mail/inbox', '_blank');
            // Remove the clicked email from the list
            const updatedScheduleItems = [...scheduleItems];
            updatedScheduleItems.splice(index, 1);
            // Fetch new email data from the API
            const response = await axios.get('https://65d8c280c96fbb24c1bc3fe3.mockapi.io/sample-api-demo/email');
            const newEmail = response.data[0]; // Assuming you want to replace with the first email from the API response
            const newScheduleItem = {
                sender: newEmail.sender,
                subject: newEmail.subject,
                eta: newEmail.date,
            };
            // Add the new email to the list
            updatedScheduleItems.push(newScheduleItem);
            // Update the state with the modified list
            setScheduleItems(updatedScheduleItems);
        } catch (error) {
            console.error('Error handling click:', error);
        }
    };
    return (
        <>
            <div>
                <Header heading={"Your Mails"} />
            </div>
            <div className="meeting-content">
                <div className='meeting-table-container'>
                    <CustomTable rows={scheduleItems} handleOpenClick={handleOpenClick} />
                </div>
            </div>
            <div><Footer /></div>
        </>
    );
}
export default MailReview;