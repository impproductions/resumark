import { useState } from 'react';
import style from './NavBar.module.scss';
import { useEditorState } from '../../context/Editor/hook';
import { useResumeState } from '../../context/Resume/hook';
import resumarkLogo from '../../assets/resumark-icon.png';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { ResumePickerModal } from './ResumePickerModal';

// TODO: mobile

export function NavBar() {
    const { config, setTheme } = useEditorState();
    const { resumes, activeResumeId } = useResumeState();
    const [pickerOpen, setPickerOpen] = useState(false);

    const activeResume = resumes.find((r) => r.id === activeResumeId);

    return (
        <>
            <div className={style.container}>
                <img src={resumarkLogo} alt="ResuMark" className={style.logo} />
                <div className={style.title}>
                    <p>ResuMark</p>
                </div>
                <div className={style.resumePicker}>
                    <button
                        className="outlined"
                        onClick={() => setPickerOpen(true)}
                        title="Switch resume"
                    >
                        <i className="bi bi-files"></i>
                        <span className={style.resumeName}>{activeResume?.name}</span>
                        <i className="bi bi-chevron-down"></i>
                    </button>
                </div>
                <div className={style.themeSwitchContainer}>
                    <ToggleSwitch
                        checked={config.theme === 'dark'}
                        onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                        onIcon={<i className="bi bi-moon-fill"></i>}
                        offIcon={<i className="bi bi-sun-fill"></i>}
                    />
                </div>
            </div>
            {pickerOpen && <ResumePickerModal onClose={() => setPickerOpen(false)} />}
        </>
    );
}
