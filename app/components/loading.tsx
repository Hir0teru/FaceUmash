import React from 'react'
import Image from 'next/image'

const Loading = (): JSX.Element => {
  return (
    <>
      <Image
        src={'/eclipse.svg'}
        alt='loading'
        height={50}
        width={50}
        loading='lazy'
        data-testid='loading'
      />
    </>
  )
}

export default Loading
