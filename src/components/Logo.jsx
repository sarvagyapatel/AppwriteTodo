import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className="w-10 h-10">
      <img className="bg-white" src="https://static-00.iconduck.com/assets.00/todo-icon-2048x2048-pij2pwiy.png" alt="Logo" />
    </div>
  )
}

export default Logo