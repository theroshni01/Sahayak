import axios from 'axios';
import React, { useState } from 'react';


export const Messages = (props) => {
  const [message, setMessage] = useState(''); // State to hold the message
  const [status, setStatus] = useState(''); // State to display status/messages

  const handleSendMessage = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
            const phoneNumbers = props.phoneNumber;// Fetch from your database

            // Iterate through phoneNumbers and send location to each number
            for (const phoneNumber of phoneNumbers) {
              await axios.post('http://localhost:3000/Messages', {
                location,
                phoneNumber,
              });
            }

            console.log('Location sent successfully.');
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported.');
      }
    } catch (error) {
      console.error('Error sending location:', error);
    }
  };

  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
        rows={4}
        cols={50}
      />
      <br />
      
      <button onClick={handleSendMessage}>Send Messages</button>
      
      {status && <p>{status}</p>}
    </div>
  );
};

