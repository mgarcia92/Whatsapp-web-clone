import '../styles/globals.css'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Login } from '../components/Login'
import { Loading } from '../components/Loading'
// eslint-disable-next-line react/prop-types
function MyApp ({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth)
  if (loading) <Loading />
  if (!user) return <Login />
  return <Component {...pageProps} />
}

export default MyApp
