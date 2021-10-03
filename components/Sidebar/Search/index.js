import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search'
export function Search (props) {
  return (
        <SearchContainer>
            <SearchIcon />
            <SearchInput placeholder="Search..." />
        </SearchContainer>
  )
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 18px;
  border-radius: 2px;
`

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`
