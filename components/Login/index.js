import styled from 'styled-components'
import Head from 'next/head'
import { Button } from '@material-ui/core'
import { auth, provider } from '../../firebase'
export function Login () {
  const handleSignIn = (e) => {
    auth.signInWithPopup(provider).catch(alert)
  }

  return (
        <Container>
          <Head>
            <title>Login</title>
          </Head>
          <LoginContainer>
            <Logo src="https://1000marcas.net/wp-content/uploads/2019/11/WhatsApp-logo.png" />
            <Button onClick={handleSignIn} variant="outlined" color="inherit"> Sign in With Google Account</Button>
          </LoginContainer>
        </Container>
  )
}

const Container = styled.div`
  display: grid;
  place-items: center;
  align-items: center;
  height: 100vh;
`

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background-color: white;
  box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.8)
`

const Logo = styled.img`
  width: 100%;
  height: 200px;
  margin-bottom: 52px;
`
