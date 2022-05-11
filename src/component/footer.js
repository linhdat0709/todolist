export default function Footer(props){
    return(
        <footer className="todo--footer">
            <span className="todo--count">
                <strong>{props.notCompletedItem.length}</strong>
                <span> item left</span>
            </span>
            <ul className="todo--filter">
                {
                    props.footerData.map(item => {
                     return (
                        <li className={`todo--filter__item ${item.type === props.typeToDoList ? "todo--filter__item__active" : ""}`} key={item.type} onClick={() => props.onChangeFooter(item.type)}>
                            <a className="todo--selected">{item.title}</a>
                        </li>
                     )
                    })
                }
            </ul>
            <button onClick={props.onClear} className="todo--clear">Clear completed</button>
        </footer>
    )
}