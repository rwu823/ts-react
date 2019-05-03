import React from 'react'
import styled, { css } from 'styled-components'

const Div = styled.div`
  ${(_p: {}) => css`
    color: red;
  `}
`

type Props = {}

const App: React.FunctionComponent<Props> = _props => {
  return <Div>This is TS React App.</Div>
}

export default App
