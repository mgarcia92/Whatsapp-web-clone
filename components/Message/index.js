/* eslint-disable react/prop-types */
import styled from 'styled-components'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import moment from 'moment'
// eslint-disable-next-line react/prop-types
export function Message ({ user, message }) {
  const [userLoggedIn] = useAuthState(auth)

  const TypeMessage = user === userLoggedIn.email ? Sender : Reciever
  return (
        <Container>
            <TypeMessage>
              {message.message}
              <Timestamp>
              {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
              </Timestamp>
            </TypeMessage>
        </Container>
  )
}

const Container = styled.div``

const MessageElement = styled.p`
  width: fit-content;
  padding: 12px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`

const Sender = styled(MessageElement)`
 margin-left: auto;
 background-color: #dcf8c6;
`

const Reciever = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`

const Timestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 10px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`
