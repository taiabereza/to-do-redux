import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, editTodo } from "./../../actions/index";

export default function TaskForm({ isFormEdit,
	setIsFormEdit, editValue, setEditValue }) {

	const dispatch = useDispatch();

	const [taskState, setTaskState] = useState({
		tasktitle: '',
		taskdescr: '',
	});

	const { tasktitle, taskdescr } = taskState;
	const { editTitle, editDescr, editId } = editValue;

	const handleOnAddingTask = (e) => {
		e.preventDefault();
		let todo = {
			tasktitle: tasktitle.trim(),
			taskdescr: taskdescr.trim(),
			status: { done: false, open: true },
			id: Math.random() * 1000,
			creationDate: new Date().toISOString(),
			updateDate: new Date().toISOString(),
		};
		dispatch(addTodo(todo));
		setTaskState({
			...taskState,
			tasktitle: '',
			taskdescr: '',
		})
		document.querySelectorAll('input')[0].focus();
	}

	return (
		<>
			{
				!isFormEdit ?
					<form
						className="taskform"
						onSubmit={(e) => handleOnAddingTask(e)}
					>
						<h3>ADD NEW TASK NOW</h3>
						<input type="text"
							className="tasktitle"
							name="tasktitle"
							id="tasktitle"
							placeholder="Task Title"

							value={tasktitle}
							onChange={(e) => setTaskState({
								...taskState,
								tasktitle: e.target.value
							})}

							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									document.querySelectorAll('textarea')[0].focus();
								}
							}}
						/>

						<textarea name="taskdescr"
							className="taskdescr"
							id="taskdescr"
							rows="4"
							placeholder="Task Description"

							value={taskdescr}
							onChange={(e) => setTaskState({
								...taskState,
								taskdescr: e.target.value
							})}

							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleOnAddingTask(e);
								}
							}}
						>
						</textarea>

						<button
							className="tasksubmit"
						>
							ADD TASK
						</button>
					</form>

					// FORM WHEN EDITING
					: <form
						className="taskform"
						onSubmit={(e) => {
							e.preventDefault();
							let todo = {
								tasktitle: editTitle.trim(),
								taskdescr: editDescr.trim(),
								id: editId,
								updateDate: new Date().toISOString(),
							};
							dispatch(editTodo(todo));
							setIsFormEdit(false);
						}}
					>
						<h3>UPDATING TASK...</h3>
						<input type="text"
							className="tasktitle"
							name="tasktitle"
							id="tasktitle"
							placeholder="Task Title"

							value={editTitle}
							onChange={(e) => setEditValue({
								...editValue,
								editTitle: e.target.value
							})}
						/>

						<textarea name="taskdescr"
							className="taskdescr"
							id="taskdescr"
							rows="4"
							placeholder="Task Description"

							value={editDescr}
							onChange={(e) => setEditValue({
								...editValue,
								editDescr: e.target.value
							})}
						>
						</textarea>

						<button
							className="tasksubmit"
						>
							UPDATE TASK
						</button>
					</form>
			}
		</>
	)
}