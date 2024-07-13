import style from './EditorContent.module.scss';
import { useResumeState } from '../../../context/Resume/hook';

export function EditorContent() {
    const { content, setContent } = useResumeState();

    return (
        <div className={style.container}>
            <div className={style.editor}>
                <textarea
                    className={style.textarea}
                    placeholder="Start typing your markdown here..."
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                ></textarea>
            </div>
            <div className={style.preview}>
                <div className={style.previewTitle}>Preview</div>
                <div className={style.previewContent}>[]</div>
            </div>
        </div>
    );
}
