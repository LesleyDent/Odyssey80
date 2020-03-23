import React from 'react';
import './styles.scss';

function InputBox(props) {
  return (
    <form onSubmit={(event) => { props.submitInput(event) }}>
      <input
        type="text"
        className="inputbox"
        rows="3"
        name="input"
        value={props.input || ''}
        onChange={(event) => { props.handleChange(event) }}
        autoComplete="off"
        autoFocus
        disabled={props.options || !props.active}
      />
      <button className="inputbox__button"
        type="submit"
        disabled={!props.input}
      >
        Submit
      </button>
    </form>
  )
}

export default InputBox