interface Props {
  lastIndex: boolean
  messages: any[] | []
  onPrevPageClick: () => void
  onNextPageClick: () => void
}

export default function NextPrevButtons({lastIndex, onPrevPageClick, messages, onNextPageClick}: Props) {
  return (
    <div className='buttonsWrapper'>
      <button
        className={`${lastIndex ? 'disablet' : ''}`}
        disabled={lastIndex}
        onClick={onPrevPageClick}
      >
        Prev
      </button>
      <button
        className={`${
          messages.length === 0 || messages.length < 50 ? 'disablet' : ''
        }`}
        disabled={messages.length === 0 || messages.length < 50}
        onClick={onNextPageClick}
      >
        Next
      </button>
    </div>
  )
}