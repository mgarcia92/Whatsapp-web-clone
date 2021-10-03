import { Button } from '@material-ui/core'
import styled from 'styled-components'

// eslint-disable-next-line react/prop-types
export function AddButtonChat ({ onClick }) {
  return (
        <AddButton onClick={onClick}>
            Start a new Chat
        </AddButton>
  )
}

const AddButton = styled(Button)`
    width: 100%;
    &&&{
        border-top: 2px solid whitesmoke;
        border-bottom: 2px solid whitesmoke;
    }
`
