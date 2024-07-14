import style from './Main.module.scss';
import { useEditorState } from '../../context/Editor/hook';
import { EditorContent } from './EditorContent';
import { EditorPreview } from './EditorPreview';

export function Main() {
    const { state } = useEditorState();

    return (
        <div className={style.container}>
            {state.currentView === 'content' && (
                <div className={style.viewContainer}>
                    <EditorContent />
                </div>
            )}
            {state.currentView === 'preview' && (
                <div className={style.viewContainer}>
                    <EditorPreview />
                </div>
            )}
        </div>
    );
}
