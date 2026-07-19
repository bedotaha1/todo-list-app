import { useState } from 'react'

export function Button() {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsLiked(!isLiked)}
        style={{ backgroundColor: `${isLiked ? 'gray' : 'red'}` }}
      ></button>
    </div>
  )
}
