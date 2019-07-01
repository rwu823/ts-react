import React from 'react'
import styled, { css } from 'styled-components'
import { hot } from 'react-hot-loader/root'

const Div = styled.div`
  ${(_p: {}) => css``}
`

type Props = {}

const App: React.FC<Props> = _props => {
  return <Div>This is TS React App.</Div>
}

export default hot(App)
