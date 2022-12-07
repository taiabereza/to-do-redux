import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterDone, showAll } from "../../actions";

export default function TaskFilter() {
	const dispatch = useDispatch();
    const [active, setActive] = useState('filter-all');

    const handleOnClick = (e) => {
        setActive(e.target.id);
        switch (e.target.id) {
            case 'filter-done':
                dispatch(filterDone());
                break;
            default:
                dispatch(showAll());
                break;
        }
    }

    const btns = [
        {
            id: 'filter-all',
            text: 'ALL TASKS'
        },
        {
            id: 'filter-open',
            text: 'OPEN TASKS'
        },
        {
            id: 'filter-inprogress',
            text: 'IN-PROGRESS TASKS'
        },
        {
            id: 'filter-done',
            text: 'DONE TASKS'
        }
    ];

    return (
        <div className="filterbtns">

            {btns.map((btn) => (
                <button id={btn.id}
                key={btn.id}
                className={((active === btn.id) ? 'active' : null)}
                onClick={(e) => handleOnClick(e)}
            >
                {btn.text}
            </button>
            ))}

            {/* <button id="filter-all"
                className="filter-all"
                onClick={(e) => handleOnClick(e)}
            >
                ALL TASKS
            </button>

            <button id="filter-open"
                className="filter-open"
                onClick={(e) => handleOnClick(e)}
            >
                OPEN TASKS
            </button>

            <button id="filter-inprogress"
                className="filter-inprogress"
                onClick={(e) => handleOnClick(e)}
            >
                IN-PROGRESS TASKS
            </button>

            <button id="filter-done"
                className="filter-done"
                onClick={(e) => handleOnClick(e)}
            >
                DONE TASKS
            </button> */}
        </div>
    )
}