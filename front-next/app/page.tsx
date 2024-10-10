"use client"

import { useEffect, useState } from "react"
import { io } from "socket.io-client"

let socket = io("http://192.168.0.20:4000")

export default function Home() {

  const[message, setMessage] = useState('');
  const[messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('message', { message })
    setMessage('');
  }

  useEffect(() => {
    socket.on('message', (data) => {
      receiveMessage(data)
    })

    return () => {
      socket.off('message')
    }
  }, [])

  const receiveMessage = (data) => 
    setMessages((state) => [...state, data]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Chat app</h1>
        <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button>Send</button>
      </form>

      <ul>
        {
          messages.map((message, index) => (
            <li key={index}>{message.from}: {message.body}</li>
          ))
        }
      </ul>
    </div>
  )
}
