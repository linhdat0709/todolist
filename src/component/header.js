import { useState, useRef, useEffect } from 'react';
import { DownOutlined } from "@ant-design/icons";
import Items from './item';
import Footer from './footer';

const footerData = [
  {
    type: "all",
    title: "All"
  },
  {
    type: "active",
    title: "Active"
  },
  {
    type: "completed",
    title: "Completed"
  }
]

export default function Header() {
  const toDoListLocal = localStorage.getItem("toDoLists")
  const toDoListArray = JSON.parse(toDoListLocal);
  const [toDoList, setToDolist] = useState(toDoListArray);
  const [typeToDoList, setTypeTodoList] = useState("all");
  const [valueInput, setValueInput] = useState({ title: "" });
  const idToDoListArr = toDoList.map(item => item.id);
  const idMax = idToDoListArr.length ? Math.max(...idToDoListArr) : 0;
  const notCompletedItem = toDoListArray.filter(item => item.completed === false);

  const ListToDo = () => {
    return (
      <section className="main">
        <ul className="todo--list">
          {toDoList.map(function (item, index) {
            return (
              <Items
                onEditComp={onEditComp}
                onDelete={onDelete}
                toDoList={toDoList}
                onEdit={onEdit}
                item={item}
                key={index}
              />
            )
          })}
        </ul>
      </section>
    )
  }

  function onChangeInput(event) {
    const { name, value } = event.target;
    setValueInput({ ...valueInput, [name]: value });
  }

  function onAdd(data) {
    setToDolist([...toDoList, data]);
    localStorage.setItem("toDoLists", JSON.stringify([...toDoList, data]));
    setValueInput({ title: "" });
  }

  function onEditComp(id) {
    let toDoListClone = [...toDoList]
    const index = toDoList.findIndex((item) => item.id === id);
    toDoListClone[index].completed = !toDoList[index].completed;
    setToDolist(toDoListClone);
    localStorage.setItem("toDoLists", JSON.stringify(toDoListClone))
  }

  function onDelete(id) {
    const delToDo = toDoList.filter(item => item.id !== id)
    setToDolist(delToDo);
    localStorage.setItem("toDoLists", JSON.stringify(delToDo))
  }

  function onEnter(e) {
    if (e.code === 'Enter') {
      onAdd({
        title: valueInput.title,
        id: idMax + 1,
        completed: false
      });
    }
  }

  function onToggle() {
    const flaseArr = toDoList.find((item) => item.completed === false)
    if (flaseArr) {
      const compToDo = toDoList.map((item) => {
        return { ...item, completed: true }
      })
      setToDolist(compToDo);
      localStorage.setItem("toDoLists", JSON.stringify(compToDo))
    } else {
      const notCompToDo = toDoList.map((item) => {
        return { ...item, completed: false }
      })
      setToDolist(notCompToDo);
      localStorage.setItem("toDoLists", JSON.stringify(notCompToDo))
    }
  }

  function onEdit(data, id) {
    let newToDo = [...toDoList]
    const index = toDoList.findIndex(item => item.id === id)
    newToDo.splice(index, 1, data);
    setToDolist(newToDo);
    localStorage.setItem("toDoLists", JSON.stringify(newToDo))
  }

  useEffect(() => {
    if (typeToDoList === "all") {
      setToDolist(toDoListArray)
    }
    if (typeToDoList === "active") {
      const unCompToDoList = toDoListArray.filter(item => item.completed === false)
      setToDolist(unCompToDoList);
    }
    if (typeToDoList === "completed") {
      const compToDoList = toDoListArray.filter(item => item.completed === true)
      setToDolist(compToDoList);
    }
  }, [typeToDoList])

  function onClear() {
    const clearArr = toDoListArray.filter(item => item.completed === false)
    setToDolist(clearArr);
    localStorage.setItem("toDoLists", JSON.stringify(clearArr))
  }

  function onChangeFooter(type) {
    setTypeTodoList(type);
  }

  const falseArr = toDoList.find((item) => item.completed === false)

  return (
    <div>
      <header>
        <h1 className="todo--header">todos</h1>
        <div className='todo--header__contain'>
          <DownOutlined className='todo--toggle__all'
            style={{ color: falseArr ? '#e6e6e6' : "#000", display: toDoListArray.length ? "block" : "none" }}
            onClick={onToggle} />
          <input placeholder="What needs to be done?" className="todo--header-input"
            onKeyDown={onEnter} onChange={onChangeInput} value={valueInput.title} name="title" />
        </div>
      </header>
      {/* {listToDo} */}
      <ListToDo />
      {
        toDoListArray.length ? <Footer
          notCompletedItem={notCompletedItem}
          onClear={onClear}
          footerData={footerData}
          onChangeFooter={onChangeFooter}
          typeToDoList={typeToDoList}
        /> : null
      }
    </div>
  )
}