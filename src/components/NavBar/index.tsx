import style from './NavBar.module.scss';
import { useEditorState } from '../../context/Editor/hook';
import resumarkLogo from '../../assets/resumark-icon.png';

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
                <button
                    className={style.themeSwitch}
                    onClick={() =>
                        setTheme(config.theme === 'light' ? 'dark' : 'light')
                    }
                >
                    {config.theme === 'light' ? 'Dark' : 'Light'}
                </button>
            </div>
        </div>
    );
}
