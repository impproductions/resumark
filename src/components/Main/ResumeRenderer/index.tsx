import style from './ResumeRenderer.module.scss';
import { useResumeState } from '../../../context/Resume/hook';
import { PageRenderer } from '../../ui/PageRenderer';
import { MarkdownParser } from '../../ui/MarkdownParser';

interface Props {
    fitIntoPx: number;
}

export function ResumeRenderer({ fitIntoPx }: Props) {
    const { content, theme, getThemeMetadata } = useResumeState();

    const contentSections = content.split('|||||').length;
    const metadata = getThemeMetadata();

    const problems: string[] = [];

    if (!metadata.valid) {
        problems.push(...metadata.errors);
        return <ThereIsAProblem problems={problems} />;
    }

    const requiredSections = metadata.value.sections;
    const missingSections = requiredSections - contentSections;

    if (missingSections > 0) {
        problems.push(
            `You are missing ${missingSections} section${missingSections > 1 ? 's' : ''
            } in your resume. Add more by inserting "|||||" between sections or try a different theme.`
        );
    }

    if (missingSections < 0) {
        const sectionSplitLines = content.split("\n").map((line, index) => {
            return line.includes("|||||") ? index : -1;
        }).filter(index => index !== -1);

        if (sectionSplitLines.length > 0) {
            problems.push(
                `You have ${-missingSections} too many sections in your resume. You need to remove ${-missingSections} section splits ("|||||"). They are located at lines: ${sectionSplitLines.join(', ')}.`
            );
        }
    }

    if (problems.length > 0) {
        return <ThereIsAProblem problems={problems} />;
    }

    return (
        <div className={style.container}>
            <PageRenderer fitIntoPx={fitIntoPx}>
                <MarkdownParser markdown={content} css={theme.css} />
            </PageRenderer>
        </div>
    );
}

interface ThereIsAProblemProps {
    problems: string[];
}

function ThereIsAProblem({ problems }: ThereIsAProblemProps) {
    return (
        <div className={style.overlay}>
            <div className={style.overlayContent}>
                <h3>There are problems with your resume</h3>
                {problems.map((problem, i) => (
                    <div key={i}>
                        <code>
                            <pre className={style.errorContainer}>
                                {problem}
                            </pre>
                        </code>
                    </div>
                ))}
            </div>
        </div>
    );
}
