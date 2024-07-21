import style from './MDTooltip.module.scss';

interface Props {
    open: boolean;
    onClose: () => void;
}

export function MDTooltip({ open, onClose }: Props) {
    if (!open) {
        return null;
    }
    return (
        <div className={style.container}>
            <div className={style.close} onClick={onClose}>
                <i className="bi bi-x"></i>
            </div>
            <div className={style.mdSyntax}>
                <div className={style.cell}>#</div>
                <div className={style.cell}>Heading (1)</div>
                <div className={style.cell}>##</div>
                <div className={style.cell}>Heading (2)</div>
                <div className={style.cell}>###</div>
                <div className={style.cell}>Heading (3)</div>
                <div className={style.cell}>####</div>
                <div className={style.cell}>Heading (4)</div>
                <div className={style.cell}>#####</div>
                <div className={style.cell}>Heading (5)</div>
                <div className={style.cell}>######</div>
                <div className={style.cell}>Heading (6)</div>
                <div className={style.cell}>*text*</div>
                <div className={style.cell}>Italic</div>
                <div className={style.cell}>**text**</div>
                <div className={style.cell}>Bold</div>
                <div className={style.cell}>***text***</div>
                <div className={style.cell}>Bold italic</div>
                <div className={style.cell}>`text`</div>
                <div className={style.cell}>Inline code</div>
                <div className={style.cell}>```text```</div>
                <div className={style.cell}>Code block</div>
                <div className={style.cell}>[text](url)</div>
                <div className={style.cell}>Link</div>
                <div className={style.cell}>![alt](url)</div>
                <div className={style.cell}>Image</div>
                <div className={style.cell}>- text</div>
                <div className={style.cell}>List item</div>
                <div className={style.cell}>1. text</div>
                <div className={style.cell}>Ordered list item</div>
                <div className={style.cell}>&gt; text</div>
                <div className={style.cell}>Blockquote</div>
                <div className={style.cell}>---</div>
                <div className={style.cell}>Horizontal rule</div>
                <div className={style.cell}>text&lt;-&gt;text</div>
                <div className={style.cell}>Space between</div>
                <div className={style.cell}>-&gt;text</div>
                <div className={style.cell}>Send right</div>
                <div className={style.cell}>|||||</div>
                <div className={style.cell}>Split sections</div>
            </div>
        </div>
    );
}
