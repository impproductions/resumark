import style from './NavBar.module.scss';
import { useEditorState } from '../../context/Editor/hook';
import resumarkLogo from '../../assets/resumark-icon.png';
import { ToggleSwitch } from '../ui/ToggleSwitch';

// TODO: mobile

export function NavBar() {
    const { config, setTheme } = useEditorState();

    return (
        <div className={style.container}>
            <img src={resumarkLogo} alt="ResuMark" className={style.logo} />
            <div className={style.title}>
                <p>ResuMark</p>
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
    );
}
