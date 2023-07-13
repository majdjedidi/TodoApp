import React from 'react'

export default function Item(props) {
    const styles = {
        fontSize : '18px',
        fontWeight :500,
        textDecoration:props.isDone ? 'line-through':''
    }
  return (
    <div className='item'>
      <div className='task'>
      <div className={props.isDone?'checked':'btn-check'} onClick={()=>props.checkTask(props.id)}><ion-icon name="checkmark"></ion-icon></div>
      <p style={styles}>{props.task}</p>
      </div>
        <div className='controls'>
        <div className='btn' onClick={()=>props.editTask(props.id)}><ion-icon name="create-outline"></ion-icon></div>
        <div className='btn' onClick={()=>props.deleteTask(props.id)}><ion-icon name="trash-outline"></ion-icon></div>
        </div>
    </div>
  )
}
