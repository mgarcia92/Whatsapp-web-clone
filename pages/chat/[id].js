/* eslint-disable react/prop-types */
import styled from 'styled-components'
import Head from 'next/head'
import { Sidebar } from '../../components/Sidebar'
import { ChatScreen } from '../../components/ChatScreen'
import { db, auth } from '../../firebase'
import { GetRecipientEmail } from '../../utils'
import { useAuthState } from 'react-firebase-hooks/auth'
// eslint-disable-next-line react/prop-types
function Chat ({ chat, messages }) {
  const [user] = useAuthState(auth)
  return (
        <Container>
            <Head><title>Chat With {GetRecipientEmail(chat.users, user)}</title></Head>
        <Sidebar />
        <ChatContainer>
            <ChatScreen chat={chat} messages={messages} />
        </ChatContainer>
        </Container>
  )
}
const Container = styled.div`
    display: flex;
`

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scrollbar {
        display: none;
    }

    --ms-overflow-style: none;
    scrollbar-width: none;
`

export async function getServerSideProps (context) {
  const ref = db.collection('chats').doc(context.query.id)

  const messagesRes = await ref.collection('messages')
    .orderBy('timestamp', 'asc')
    .get()

  const messages = messagesRes.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })).map(messages => ({
    ...messages,
    timestamp: messages.timestamp.toDate().getTime()
  }))

  // PREP THE CHATS
  const chatRes = await ref.get()
  const chat = {
    id: chatRes.id,
    ...chatRes.data()
  }

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat
    }
  }
}

export default Chat
