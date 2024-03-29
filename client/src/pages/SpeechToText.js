import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import InnerNavbar from '../components/InnerNavbar';
import '../css/speech.css';
import { useEffect, useRef } from 'react';
import { Navigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import '../css/chat.css';
import Webcam from 'react-webcam';

const SpeechToText = ({ authorized }) => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const [ chats, setChats ] = useState('');
    const [ ch, setCh ] = useState([]);
    const [ inputText, setText ] = useState('');
    const [ spinner, setSpinner ] = useState(null);

    const onChangeHandler = (e) => {
        setText(e.target.value);
    }

    const m = new SpeechSynthesisUtterance()
    const speechHandler = (m, ai) => {
        m.text = ai;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(m);
    }

    const onClickHandler = async () => {
        if (inputText !== '') {
            let temp = inputText;
            setText('');
            setSpinner(1);
            await axios.post("https://goodspace-task-sd34.onrender.com/setChats", {
                data: {
                    username: localStorage.getItem('username'),
                    Chats: temp
                }
            }).then(async (ai) => {
                setSpinner(null);
                speechHandler(m, ai.data);
                await axios.get("https://goodspace-task-sd34.onrender.com/getChats", {
                    headers: {
                        username: localStorage.getItem('username')
                    }
                }).then((res) => {
                    setCh(res.data);
                    setText('');
                })
            })
        }
    }



    const func = async () => {
        if (ch.length === 0) {
            await axios.get("https://goodspace-task-sd34.onrender.com/getChats", {
                headers: {
                    username: localStorage.getItem('username')
                }
            }).then((res) => {
                setCh(res.data);
            })
        }
        if (listening === false && transcript !== '') {
            setSpinner(1);
            setChats(transcript);
            await axios.post("https://goodspace-task-sd34.onrender.com/setChats", {
                data: {
                    username: localStorage.getItem('username'),
                    Chats: transcript
                }
            }).then(async (ai) => {
                setSpinner(null);
                speechHandler(m, ai.data);
                await axios.get("https://goodspace-task-sd34.onrender.com/getChats", {
                    headers: {
                        username: localStorage.getItem('username')
                    }
                }).then((res) => {
                    setCh(res.data);
                })
            })
        }
    }
    useEffect(() => {
        func();
    }, [ listening, transcript ])

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    if (!authorized) {
        return <Navigate to='/' />
    }


    return (
        <div className='app' >
            <InnerNavbar></InnerNavbar>
            <div className='main-wrapper'>
                <Webcam />
                <div className="wrapper" >
                    {
                        spinner ? <div className='spin-wrapper'><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div> : ""
                    }
                    <div className="text-container">
                        <div className='messages'>
                            {
                                ch.map((c) => {
                                    return <div className={c.role === 'user' ? 'userChatWrapper' : 'aiChatWrapper'}><div className={c.role === 'user' ? 'userChat' : 'aiChat'}>{c.chat}</div></div>
                                })
                            }
                        </div>
                        <div className="textBox-container">
                            <div className="textInput-container">
                                <input value={inputText} onChange={onChangeHandler} type="text" name="textBox" id="textBox" placeholder='Type a message' />
                            </div>
                            <div className="sendBtn-container">
                                <button onClick={onClickHandler}>Send</button>
                            </div>
                        </div>
                    </div>
                    {
                        listening === true ? <div className='micOn' onClick={SpeechRecognition.stopListening}><svg width="50" height="50" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 12V13C20 17.4183 16.4183 21 12 21C7.58172 21 4 17.4183 4 13V12M12 17C9.79086 17 8 15.2091 8 13V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V13C16 15.2091 14.2091 17 12 17Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> </div>
                            :
                            <div className='micOff' onClick={SpeechRecognition.startListening}><svg width="50" height="50" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 10.4V7.00003C16 4.79089 14.2091 3.00003 12 3.00003C11.0406 3.00003 10.1601 3.3378 9.47086 3.90092M4 12V13C4 17.4183 7.58172 21 12 21C14.4653 21 16.6701 19.8849 18.1376 18.1316M3 3L21 21M12 17C9.79086 17 8 15.2092 8 13V8.00003L15.2815 15.288C14.5585 16.323 13.3583 17 12 17Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div>
                    }
                    <div className="listening">
                        {listening === true ? <h6 className='listen-status'>Listening</h6> : <h6 className='listen-status'>Muted</h6>}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SpeechToText;