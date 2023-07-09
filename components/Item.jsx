import React from 'react'

export default function Item(props) {
    const styles = {
        textDecoration:props.isDone ? 'line-through':''
    }
  return (
    <div>
        <p style={styles}>{props.task}</p>
        <div className='check-btn' onClick={()=>props.checkTask(props.id)}><ion-icon name="checkmark"></ion-icon></div>
        <div className='edit-btn'><ion-icon name="create-outline"></ion-icon></div>
        <div className='delete-btn' onClick={()=>props.deleteTask(props.id)}><ion-icon name="trash-outline"></ion-icon></div>
    </div>
  )
}
