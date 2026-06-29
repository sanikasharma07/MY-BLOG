import React from 'react'
// Import a cute icon (Cat, Dog, Sparkles, Feather, etc.)
import { Cat } from 'lucide-react' 

function Logo({ width = '100px' }) {
  return (
    <div className="flex items-center gap-2 text-pink-500 font-extrabold text-2xl">
      <Cat size={40} strokeWidth={2.5} />
      <span className="text-gray-800">MeowBlog</span>
    </div>
  )
}

export default Logo