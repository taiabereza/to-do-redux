import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeTodo, markTodoDone, markTodoInProgress } from "./../../actions/index";

export default function TaskList({
	setIsFormEdit, editValue, setEditValue }) {

	const dispatch = useDispatch();

	const todos = useSelector((state) => state.handleToDo.filteredTodos);

	return (
		<ul className="tasklist">
			{todos.map((todo) => (
				<li
					key={todo.id}
					className={`taskitem
						${todo.status.done ? 'done' : null}
						${!todo.status.open ? 'in-progress' : null} `}
				>
					<h4 className="taskitemtitle">{todo.tasktitle}</h4>
					<p className="taskitemdescr">{todo.taskdescr}</p>

					<div className="buttonsset">
						<button onClick={() => {
							setIsFormEdit(true);
							setEditValue({
								...editValue,
								editTitle: todo.tasktitle,
								editDescr: todo.taskdescr,
								editId: todo.id
							})
							document.querySelectorAll('input')[0].focus();
						}}
						>
							EDIT
						</button>
						<button onClick={() => { dispatch(markTodoInProgress(todo.id)) }}>IN PROGRESS</button>
						<button onClick={() => { dispatch(markTodoDone(todo.id)) }}>DONE</button>
						<button onClick={() => { dispatch(removeTodo(todo.id)) }}>REMOVE</button>

					</div>
				</li>

			))}
		</ul>
	)
}