import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import { Avatar } from '../Avatar'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVerIcon from '@material-ui/icons/MoreVert'
import { Search } from './Search'
import { AddButtonChat } from './AddButtonChat'
import { auth, db } from '../../firebase'
import * as EmailValidator from 'email-validator'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Chat } from '../Chat'
export function Sidebar () {
  const [user] = useAuthState(auth)
  const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
  const [chatsSnapshot] = useCollection(userChatRef)
  const createChat = (e) => {
    const email = prompt('Please enter an email for the user you wish to chat')
    if (!email) return null

    if (EmailValidator.validate(email) && !chatAlReadyExists(email) && email !== user.email) {
      db.collection('chats').add({
        users: [user.email, email]
      })
    }
  }

  const chatAlReadyExists = (recipientEmail) => {
    return !!chatsSnapshot?.docs.find((chat) => chat.data().users.find((user) => user === recipientEmail)?.length > 0)
  }

  return (
        <Container>
            <Header>
                <Avatar src={user?.photoURL} onClick={() => auth.signOut()} />
                <p>{user?.displayName}</p>
                <IconContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVerIcon />
                    </IconButton>
                </IconContainer>
            </Header>
            <Search />
            <AddButtonChat onClick={createChat} />
            {
                chatsSnapshot?.docs.map(chat => (
                    <Chat key={chat.id} id={chat.id} users={chat.data().users} />
                ))
            }
        </Container>
  )
}

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;

    ::-webkit-scrollbar{
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    z-index: 1;
    border-bottom: 1px solid whitesmoke;
    position: sticky;
    top: 0;
    height: 80px;
    background-color: white;
`

const IconContainer = styled.div`

`
