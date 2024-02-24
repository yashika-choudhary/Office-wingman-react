import React, { useState, useEffect } from "react";
import axios from "axios";
// Card component
const Card = ({ isNew, title }) => {
 const handleOpenClick = () => {
   window.open('https://outlook.live.com/mail/inbox', '_blank');
 };
 return (
<section className="flex gap-5 justify-between items-start px-10 py-9 mx-5 my-5 text-center rounded-3xl shadow-sm bg-zinc-300 bg-opacity-30 max-md:flex-wrap max-md:px-5 max-md:mr-2.5 max-md:max-w-full">
     {isNew && (
<div className="justify-center self-stretch px-5 py-3 text-white whitespace-nowrap bg-teal-900 rounded-xl border border-black border-solid max-md:px-5">
         NEW
</div>
     )}
<div className="flex-auto text-black max-md:max-w-full">{title}</div>
<div className="mt-5 text-teal-900">
<button onClick={handleOpenClick}>OPEN</button>
</div>
</section>
 );
};
const MailReview = () => {
 const [emails, setEmails] = useState([]);
 useEffect(() => {
   async function fetchEmails() {
     try {
       const response = await axios.get('https://65d8c280c96fbb24c1bc3fe3.mockapi.io/sample-api-demo/email');
       const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
       const emailData = response.data.map(email => ({
        isNew: email.date.startsWith(today), // Compare date part only
         title: email.subject,
       }));
       setEmails(emailData);
     } catch (error) {
       console.error('Error fetching emails:', error);
     }
   }
   fetchEmails();
 }, []);
 return (
<main className="flex flex-col text-xl font-bold">
<header className="justify-center items-start px-8 py-9 w-full text-4xl text-white whitespace-nowrap bg-teal-900 max-md:px-5 max-md:max-w-full">
       Mail Review
</header>
     {emails.map((email, index) => (
<Card key={index} {...email} />
     ))}
</main>
 );
};
export default MailReview;