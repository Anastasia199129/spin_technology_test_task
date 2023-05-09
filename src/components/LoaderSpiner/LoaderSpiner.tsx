import { Hearts } from 'react-loader-spinner'

import './LoaderSpiner.sass'

export default function LoaderSpiner() {
  return (
    <div className='loader'>

      <Hearts 
        color='#FF69B4' 
        height={200} 
        width={200} 
      />
      
    </div>
  )
}