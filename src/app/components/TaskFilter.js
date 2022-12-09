import { useSelector, useDispatch } from "react-redux";
import { activeDateFilterChanged, activeFilterChanged } from "../../actions";

export default function TaskFilter() {
    const dispatch = useDispatch();
    const activeFilter = useSelector((state) => state.handleToDo.activeFilter);
    const activeDateFilter = useSelector((state) => state.handleToDo.activeDateFilter);

    const handleActiveFilterChange = (e) => {
        dispatch(activeFilterChanged(e.target.id));
    }

    const handleDateFilterChange = (e) => {
        dispatch(activeDateFilterChanged(e.target.id));
    }

    const btns = [
        {
            id: 'ALL',
            text: 'ALL TASKS'
        },
        {
            id: 'OPEN',
            text: 'OPEN TASKS'
        },
        {
            id: 'IN_PROGRESS',
            text: 'IN-PROGRESS TASKS'
        },
        {
            id: 'DONE',
            text: 'DONE TASKS'
        }
    ];

    const dateBtns = [
        {
            id: 'OLD_TO_NEW_CREATION',
            text: 'OLDER FIRST (BY CREATION DATE)'
        },
        {
            id: 'NEW_TO_OLD_CREATION',
            text: 'NEWER FIRST (BY CREATION DATE)'
        },
        {
            id: 'OLD_TO_NEW_UPDATE',
            text: 'OLDER FIRST (BY UPDATE DATE)'
        },
        {
            id: 'NEW_TO_OLD_UPDATE',
            text: 'NEWER FIRST (BY UPDATE DATE)'
        }
    ];


    return (
        <>
            <div className="filterbtns">
                {btns.map((btn) => (
                    <button id={btn.id}
                        key={btn.id}
                        className={((activeFilter === btn.id) ? 'active' : null)}
                        onClick={(e) => handleActiveFilterChange(e)}
                    >
                        {btn.text}
                    </button>
                ))}
            </div>

            <div className="filterbtns">
                {dateBtns.map((btn) => (
                    <button id={btn.id}
                        key={btn.id}
                        className={((activeDateFilter === btn.id) ? 'active' : null)}
                        onClick={(e) => handleDateFilterChange(e)}
                    >
                        {btn.text}
                    </button>
                ))}
            </div>
        </>
    )
}