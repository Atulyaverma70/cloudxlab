import React from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'

function NotFoundPage() {
  return (
    <div>
      <Heading>Sorry, that page doesn't exist!</Heading>
      <SubHeading>Why not try to search to find something else?</SubHeading>
    </div>
  )
}

export default NotFoundPage