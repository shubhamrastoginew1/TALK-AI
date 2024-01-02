// import React, { useState } from 'react'
// import '../css/chat.css'
// import axios from 'axios';
// import { useEffect } from 'react';

// export default function Chats({ ch, listening, transcript }) {
//     const [ chats, setChats ] = useState(ch);
//     const func = async () => {
//         if (listening === true) {
//             return;
//         }
//         await axios.get("http://localhost:4000/getChats", {
//             headers: {
//                 username: localStorage.getItem('username')
//             }
//         }).then(res => {
//             if (JSON.stringify(res.data) === JSON.stringify(chats)) {
//             }
//             else {
//                 setChats(res.data);
//             }
//         })
//     }
//     useEffect(() => {
//         func();
//     }, [ listening, transcript ])

//     return (
//         <div>
//             {
//                 chats.map((c) => {
//                     return <div className={c.role === 'user' ? 'userChatWrapper' : 'aiChatWrapper'}><div className={c.role === 'user' ? 'userChat' : 'aiChat'}>{c.chat}</div></div>
//                 })
//             }
//         </div>
//     )
// }