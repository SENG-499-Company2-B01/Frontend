import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

// export const NavUnlisted = styled.ul`

//   display: flex;

//   a {
//     text-decoration: none;
//   }

//   li {
//     color: red;
//     margin: 0 0.8rem;
//     font-size: 1.3rem;
//     position: relative;
//     list-style: none;
//     &:hover {
//       color: 'blue',
//       text-decoration: 'underline',
//       border-bottom: 2px solid #339af0
//     }
//   }

//   .current {
//     li {
//       border-bottom: 2px solid black,
//     }
//   }
// `

export const SimpleLink = styled(Link)`
    text-decoration: none;
`

export const NavUnlisted = styled(NavLink)`
    color: black;
    line-height: 2;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    &:hover {
        border-bottom: 2px solid #6885ce;
        color: #6885ce;
    }
`
