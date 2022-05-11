import { useState, useRef, useEffect } from 'react';

export default function Items(props) {
    const inputRef = useRef();
    const [editInput, setEditInput] = useState(false);
    const idSelected = props.item.id;
    const dataSelected = props.toDoList.find((item) => item.id === idSelected)
    const [valueInput, setValueInput] = useState(dataSelected.title);


    function showEdit() {
        setEditInput(true);
    }

    function onChangeInput(e) {
        const { value } = e.target;
        setValueInput(value)
    }

    const handleClickOutSide = e => {
        if(inputRef.current && !inputRef.current.contains(e.target)) {
            onUpdate()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutSide)
    }, [])

    function onUpdate() {
        props.onEdit({
            title: valueInput,
            id: dataSelected.id,
            completed: dataSelected.completed
        }, idSelected)
        setEditInput(false);
    }

    return (
        <li className="todo--items" onDoubleClick={showEdit}>
            <div className="view">
                <input 
                    className="todo--toggle" 
                    type="checkbox" 
                    checked={props.item.completed}
                    onChange={() => props.onEditComp(props.item.id)} 
                />
                {editInput === false
                    ? <>
                        <label className={`todo--action ${props.item.completed === true ? "todo--completed" : ""}`}>{props.item.title}</label>
                        <button className="todo--btn__delete" onClick={() => props.onDelete(props.item.id)}>x</button>
                     </>
                    : <input 
                        className='edit' name='title' value={valueInput}
                        onChange={onChangeInput}
                        // onBlur={onUpdate}
                        onKeyDown={(e) => { if (e.key === 'Enter') { onUpdate() } }} 
                        ref={inputRef}
                    />
                }
                
            </div>
        </li>
    )
}