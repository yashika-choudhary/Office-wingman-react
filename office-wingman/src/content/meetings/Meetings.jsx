import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import "./meetings.css";
import CustomTable from '../../components/Table/Table';
import Footer from '../../components/Footer/Footer';


function ScheduleHeader() {
   return (
      <div className="table-header">
         Friday, February 23, 2024
      </div>
   );
}
function ScheduleItem({ starttime, sender, subject, imageUrl, imageAlt }) {
   return (
      <div className="flex gap-5 justify-between py-5 pr-20 pl-4 mt-4 mr-5 max-w-full bg-neutral-200 w-[834px] max-md:flex-wrap max-md:pr-5 max-md:mr-2.5">
         <div className="flex-auto my-auto">{starttime}</div>
         <div className="my-auto text-center">{sender}</div>
         <div className="text-center">{subject}</div>
         <img loading="lazy" src={imageUrl} alt={imageAlt} className="self-start w-6 aspect-[0.8]" />
      </div>
   );
}

function Meetings() {
   const [scheduleItems, setScheduleItems] = useState([]);

   useEffect(() => {
      async function fetchScheduleItems() {
         try {
            const response = await axios.get('https://65d8c280c96fbb24c1bc3fe3.mockapi.io/sample-api-demo/meeting');
            setScheduleItems(response.data.map(item => ({
               starttime: item.starttime,
               sender: item.sender,
               subject: item.subject,
               imageUrl: item.imageUrl,
               imageAlt: item.imageAlt
            })));
         } catch (error) {
            console.error('Error fetching schedule items:', error);
         }
      }
      fetchScheduleItems();
   }, []);

   return (
      <>
         <div>
            <Header heading={"Your Meetings"} />
         </div>
         <div className="meeting-content">
            <ScheduleHeader />
            <div className='meeting-table-container'>
               <CustomTable rows={scheduleItems} />
               {/* <div className="">
                  <div>Time</div>
                  <div>Sender</div>
                  <div>Subject</div>
                  <div>View</div>
               </div> */}
               {/* <div className="mt-4 mr-5 max-w-full h-px bg-zinc-500 w-[835px] max-md:mr-2.5" /> */}
               {/* {scheduleItems.map((item, index) => (
                  <ScheduleItem key={index} {...item} />
               ))} */}

            </div>
            {/* <nav className="flex gap-5 justify-between self-center mt-20 w-full text-xl whitespace-nowrap max-w-[721px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div>Time</div>
            <div>Sender</div>
            <div>Subject</div>
            <div>View</div>
         </nav>
         <div className="mt-4 mr-5 max-w-full h-px bg-zinc-500 w-[835px] max-md:mr-2.5" />
         {scheduleItems.map((item, index) => (
            <ScheduleItem key={index} {...item} />
         ))} */}
         </div>
         <div><Footer /></div>
      </>

   );
}
export default Meetings;