import styled from 'styled-components'
import { Avatar } from '@material-ui/core'
import { GetRecipientEmail } from '../../utils'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'
// eslint-disable-next-line react/prop-types
export function Chat ({ id, users }) {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const recipientEmail = GetRecipientEmail(users, user)
  const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', recipientEmail))
  const recipient = recipientSnapshot?.docs?.[0]?.data()

  const enterChat = (e) => {
    router.push(`/chat/${id}`)
  }

  return (
        <Container onClick={enterChat}>
            {
            recipient
              ? <UserAvatar src={recipient?.photoURL} />
              : <UserAvatar>{recipientEmail[0]}</UserAvatar>
            }
            <p>{recipientEmail}</p>
        </Container>
  )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-word;
    
    :hover {
        background-color: #e9eaeb;
    }
`

const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`
