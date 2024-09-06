import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleVisibility, deleteQuote, editQuoteAthenticity, setHighlightedQuote } from '../state/quotesSlice'

export default function Quotes() {
  const dispatch = useDispatch()
  // ✨ `quotes` must come from the Redux store
  const quotes = useSelector(st => st.quotesState.quotes)
  // ✨ `displayAllQuotes` must come from the Redux store
  const displayAllQuotes = useSelector(st => st.quotesState.displayAllQuotes)
  // ✨ `highlightedQuote` must come from the Redux store
  const highlightedQuote = useSelector(st => st.quotesState.highlightedQuote)
    

  return (
    <div id="quotes">
      <h3>Quotes</h3>
      <div>
        {
          quotes
            ?.filter(qt => {
              return displayAllQuotes || !qt.apocryphal
            })
            .map(qt => (
              <div
                key={qt.id}
                className={`quote${qt.apocryphal ? " fake" : ''}${highlightedQuote === qt.id ? " highlight" : ''}`}
              >
                <div>{qt.quoteText}</div>
                <div>{qt.authorName}</div>
                <div className="quote-buttons">
                  <button onClick={() => {
                    const actionToDispatch = deleteQuote(qt.id)
                    dispatch(actionToDispatch)
                  }}>DELETE</button>

                  <button onClick={() => {
                    const highlighted = setHighlightedQuote(qt.id)
                    dispatch(highlighted)
                  }}>HIGHLIGHT</button>

                  <button onClick={() => {
                    const targetedId = editQuoteAthenticity(qt.id)
                    dispatch(targetedId)
                  }}>FAKE</button>

                </div>
              </div>
            ))
        }
        {
          !quotes?.length && "No quotes here! Go write some."
        }
      </div>
      {!!quotes?.length && <button onClick={() => dispatch(toggleVisibility())}>
        {displayAllQuotes ? 'HIDE' : 'SHOW'} FAKE QUOTES
      </button>}
    </div>
  )
}
