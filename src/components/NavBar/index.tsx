import style from './NavBar.module.scss';
import { useEditorState } from '../../context/Editor/hook';

export function NavBar() {
    const { state, setCurrentView } = useEditorState();

    const onViewSelectClick = (view: 'content' | 'preview') => {
        setCurrentView(view);
    };

    return (
        <div className={style.container}>
            <div className={style.buttonGroup}>
                <button
                    className={
                        state.currentView === 'content' ? style.selected : ''
                    }
                    onClick={() => onViewSelectClick('content')}
                >
                    Content
                </button>
                <button
                    className={
                        state.currentView === 'preview' ? style.selected : ''
                    }
                    onClick={() => onViewSelectClick('preview')}
                >
                    Preview
                </button>
            </div>
        </div>
    );
}
