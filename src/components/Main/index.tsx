import style from './Main.module.scss';
import { EditorContent } from './EditorContent';

export function Main() {
    return (
        <div className={style.container}>
            <div className={style.viewContainer}>
                <EditorContent />
            </div>
        </div>
    );
}
