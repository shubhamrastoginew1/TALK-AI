import React, { useState } from 'react'
import '../css/chat.css'
import axios from 'axios';
import { useEffect } from 'react';

export default function Chats({ listening }) {
    const [ chats, setChats ] = useState([]);
    const func = async () => {
        axios.get("http://localhost:4000/getChats", {
            headers: {
                username: localStorage.getItem('username')
            }
        }).then(res => {
            setChats(res.data);
        })
    }
    useEffect(() => {
        func();
    }, [ listening ])

    return (
        <div>
            {
                chats.map((c) => {
                    return <div className={c.role === 'user' ?'userChatWrapper':'aiChatWrapper' }><div className={c.role === 'user' ? 'userChat' : 'aiChat'}>{c.chat}</div></div>
                })
            }
        </div>
    )
}