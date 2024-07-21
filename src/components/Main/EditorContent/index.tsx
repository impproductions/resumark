import style from './EditorContent.module.scss';
import { useResumeState } from '../../../context/Resume/hook';
import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { CodeEditor } from '../../ui/CodeEditor';
import { ResumeRenderer } from '../ResumeRenderer';
import { ThemeCarousel } from './ThemeCarousel';
import { useEditorState } from '../../../context/Editor/hook';
import { useThemeStore } from '../../../context/ThemesStore/hook';
import { MDTooltip } from './MDTooltip';

export function EditorContent() {
    const { content, setContent, theme, setTheme } = useResumeState();
    const { state, setCurrentView } = useEditorState();
    const { isDefaultTheme } = useThemeStore();
    const { windowSize } = useWindowSize();
    const previewColumnRef = useRef<HTMLDivElement>(null);
    const [fitIntoPx, setFitIntoPx] = useState(0);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const view = state.currentView;

    useEffect(() => {
        const previewColumn = previewColumnRef.current;
        if (!previewColumn) {
            return;
        }

        const previewColumnWidth = previewColumn.clientWidth;
        setFitIntoPx(previewColumnWidth - 20); // FIXME: magic number
    }, [windowSize]);

    return (
        <div className={style.container}>
            <div className={style.editor}>
                <div className={style.editorContent}>
                    <button
                        className={style.switchTab}
                        onClick={() =>
                            setCurrentView(
                                view === 'content' ? 'preview' : 'content'
                            )
                        }
                    >
                        {view === 'content' ? 'css' : 'md'}
                    </button>
                    {view === 'content' &&
                        (tooltipOpen ? (
                            <MDTooltip
                                open={tooltipOpen}
                                onClose={() => setTooltipOpen(false)}
                            />
                        ) : (
                            <button
                                className={style.tooltipButton}
                                onClick={() => setTooltipOpen(true)}
                            >
                                ref
                            </button>
                        ))}
                    <div className={style.editorHeader}>
                        <ThemeCarousel />
                    </div>
                    {view === 'content' && (
                        <CodeEditor
                            text={content}
                            onChange={setContent}
                            onCommit={setContent}
                            language="markdown"
                        />
                    )}
                    {view === 'preview' && (
                        <CodeEditor
                            text={theme.css}
                            onChange={(val) => {
                                !isDefaultTheme(theme.id) &&
                                    setTheme({
                                        ...theme,
                                        css: val,
                                    });
                            }}
                            language={'css'}
                            readonly={isDefaultTheme(theme.id)}
                            readonlyMessage="Default themes are read-only. Please copy it to a new theme by clicking the + button to edit."
                        />
                    )}
                </div>
            </div>
            <div className={style.preview} ref={previewColumnRef}>
                <div className={style.previewContent}>
                    <ResumeRenderer fitIntoPx={fitIntoPx} />
                </div>
            </div>
        </div>
    );
}
