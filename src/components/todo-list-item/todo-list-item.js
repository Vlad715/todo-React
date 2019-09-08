import React from 'react';
import './todo-list-item.css';

const TodoListItem = ({ label, onDeleted, onToggleImportant, onToggleDone, done, important }) => {
   
    let classNames = 'todo-list-item';
    if (done) {
        classNames += ' done';
    }

    if (important) {
        classNames += ' important';
    }

    return (

    <span className="todo-list-item">
        <span 
            className={classNames}
            onClick={ onToggleDone } >
        { label } </span>
        
        <button type="button"
                className="btn btn-outline-success todo-list-item-label"
                onClick={ onToggleImportant }>
            <i className="fa fa-exclamation"></i>
        </button>

        <button type="button"
                className="btn btn-outline-danger todo-list-item-label"
                onClick={onDeleted}>
        <i className="fas fa-bomb"></i>
        </button>
    </span>

    );
}    

export default TodoListItem;