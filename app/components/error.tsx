import React from 'react'
import { Box } from '@mui/material'

const Error = (message: { message: string }): JSX.Element => {
  return (
    <>
      <Box data-testid='error'>{`Error: ${message}`}</Box>
    </>
  )
}

export default Error
