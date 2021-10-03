import { Avatar as AvatarMaterial } from '@material-ui/core'
import styled from 'styled-components'

// eslint-disable-next-line react/prop-types
export function Avatar ({ src, onClick }) {
  return (
        <>
            <UserAvatar src={src} onClick={onClick} />
        </>
  )
}

const UserAvatar = styled(AvatarMaterial)`
    cursor: pointer;
    
    :hover{
        opacity: 0.8;
    }
`
