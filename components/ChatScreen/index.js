/* eslint-disable react/prop-types */
import styled from 'styled-components'
import { auth, db } from '../../firebase'
import { useRouter } from 'next/router'
import { Avatar } from '../Avatar'
import { useAuthState } from 'react-firebase-hooks/auth'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachIcon from '@material-ui/icons/AttachFile'
import { IconButton } from '@material-ui/core'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Message } from '../Message'
import InsertEmticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import { useState, useRef } from 'react'
import firebase from 'firebase/compat/app'
import { GetRecipientEmail } from '../../utils'
import TimeAgo from 'timeago-react'

// eslint-disable-next-line react/prop-types
export function ChatScreen ({ chat, messages }) {
  const [user] = useAuthState(auth)
  const [inputValue, setInputValue] = useState('')
  const router = useRouter()
  const endOfMessageRef = useRef(null)
  const [messagesSnapshot] = useCollection(
    db.collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc'))
  const recipientEmail = GetRecipientEmail(chat.users, user)
  const [recipientSnapShot] = useCollection(
    db.collection('users').where('email', '==', recipientEmail))

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
            <Message
                key={message.id}
                user={message.data().user}
                message={{
                  ...message.data(),
                  timestamp: message.data().timestamp?.toDate().getTime()
                }}
            />
      ))
    } else {
      return JSON.parse(messages).map(message => (
            <Message
            key={message.id}
            user={message.user}
            message={message}
        />
      ))
    }
  }
  //   alert(user.uid)
  const sendMessage = (e) => {
    e.preventDefault()

    db.collection('users').doc(user.uid).set({
      lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      email: user?.email
    }, {
      merge: true
    })

    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: inputValue,
      user: user.email,
      photoURL: user.photoURL
    })

    setInputValue('')
    scrollToBottom()
  }

  const handleOnChange = (e) => setInputValue(e.target.value)

  const recipient = recipientSnapShot?.docs?.[0]?.data()

  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
  return (
        <Container>
            <Header>
                {
                    recipient
                      ? <Avatar src={recipient?.photoURL} />
                      : <Avatar>{recipientEmail[0]}</Avatar>
                }

                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {
                        recipientSnapShot
                          ? (
                            <p>Last Active: {' '}
                            {recipient?.lastSeen?.toDate()
                              ? (
                                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                                )
                              : 'Unavailable'

                            }

                            </p>
                            )
                          : <p>Loading Last active...</p>
                    }

                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                         <MoreVertIcon />
                    </IconButton>
                    <IconButton>
                         <AttachIcon />
                    </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndOfMessage id="prueba" ref={endOfMessageRef} />
            </MessageContainer>

            <InputContainer>
                <IconButton>
                    <InsertEmticonIcon />
                </IconButton>
            <Input value={inputValue} onChange={handleOnChange} />
            <button hidden disabled={!inputValue} type="submit" onClick={sendMessage}>Send</button>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </InputContainer>
        </Container>
  )
}

const Container = styled.div``

const Header = styled.div`
    display: flex;
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;

`

const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1; 
    > h3 {
        margin-bottom: 3px;
    }

    > p {
        font-size: 14px;
        color: gray;
    }
`

const HeaderIcons = styled.div``

const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height: 90vh;
`

const EndOfMessage = styled.div`
    margin-bottom: 50px;
`

const Input = styled.input`
    flex: 1;
    outline: 0;
    border: none;
    padding: 15px;
    background-color: whitesmoke;
    border-radius: 10px;
    margin-left: 15px;
    margin-right: 15px;
`
const InputContainer = styled.form`
    display: flex;
    padding: 10px;
    position: sticky;
    background-color: white;
    bottom: 0;
    z-index: 100;
    align-items: center;
`
