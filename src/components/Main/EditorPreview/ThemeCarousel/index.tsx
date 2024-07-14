import classNames from 'classnames';
import { useThemeStore } from '../../../../context/ThemesStore/hook';
import style from './ThemeCarousel.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { useResumeState } from '../../../../context/Resume/hook';
import { hash } from '../../../../lib/crypto';
import { ThemeData } from '../../../../context/Resume/types';

export function ThemeCarousel() {
    const [openThemeOutdated, setOpenThemeOutdated] = useState(false);
    const {
        store,
        getThemeById,
        addTheme,
        updateThemeName,
        updateThemeContent,
        removeTheme,
    } = useThemeStore();
    const { theme, setTheme } = useResumeState();

    const [displayedThemes, setDisplayedThemes] = useState(store.themes);

    const filterThemes = (search: string) => {
        const filteredThemes = store.themes.filter((theme) =>
            theme.name.toLowerCase().includes(search.toLowerCase())
        );
        setDisplayedThemes(filteredThemes);
    };

    useEffect(() => {
        setDisplayedThemes(store.themes);
    }, [store.themes]);

    const saveCurrentThemeAs = () => {
        const themeName = prompt('Enter theme name');

        if (themeName === null) {
            return;
        }
        if (themeName === '') {
            alert('Theme name cannot be empty');
            return;
        }

        addTheme({
            name: themeName,
            css: theme.css,
        });
    };

    const renameTheme = (themeId: string) => {
        const themeName = prompt('Enter new theme name');

        if (themeName === null) {
            return;
        }
        if (themeName === '') {
            alert('Theme name cannot be empty');
            return;
        }

        updateThemeName(themeId, themeName);
    };

    const deleteTheme = (themeId: string) => {
        const confirmDelete = confirm(
            'Are you sure you want to delete this theme?'
        );

        if (!confirmDelete) {
            return;
        }

        removeTheme(themeId);
    };

    const updateStoredTheme = (themeId: string) => {
        updateThemeContent(themeId, theme.css);
    };

    const updateOpenTheme = (t: ThemeData) => {
        setTheme({
            css: t.css,
            id: t.id,
            name: t.name,
        });
    };

    const isThemeOutdated = useMemo(
        () => (themeId: string) => {
            const storedTheme = getThemeById(themeId);

            if (!storedTheme || !theme) {
                return false;
            }

            const editedThemeHash = hash(theme.css);
            return editedThemeHash !== storedTheme.hash;
        },
        [getThemeById, theme]
    );

    useEffect(() => {
        // TODO: debounce
        const themeOutdated = isThemeOutdated(theme.id);
        setOpenThemeOutdated(themeOutdated);
    }, [theme, isThemeOutdated, theme.id]);

    const handleThemeButtonClick = (t: ThemeData) => {
        if (openThemeOutdated) {
            if (t.id === theme.id) {
                updateStoredTheme(t.id);
            } else {
                const confirmSwitch = confirm(
                    'You have unsaved changes in the current theme. Press ok to continue without saving'
                );

                if (confirmSwitch) {
                    updateOpenTheme(t);
                }
            }
        } else {
            updateOpenTheme(t);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.carouselContainer}>
                <div className={style.carouselControls}>
                    <input
                        type="text"
                        placeholder="Search theme"
                        onChange={(e) => filterThemes(e.target.value)}
                    />
                    <button
                        className={classNames('filled')}
                        style={{
                            backgroundColor: 'var(--color-success)',
                            borderColor: 'var(--color-success)',
                        }}
                        onClick={() => saveCurrentThemeAs()}
                    >
                        <i className="bi bi-plus"></i>
                    </button>
                </div>
                <div className={style.carousel}>
                    {displayedThemes.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => handleThemeButtonClick(t)}
                            onDoubleClick={() => renameTheme(t.id)}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                deleteTheme(t.id);
                            }}
                            aria-selected={t.id === theme.id}
                        >
                            {t.name}
                            {t.id === theme.id && openThemeOutdated && (
                                <i
                                    className={classNames(
                                        'bi',
                                        'bi-exclamation-circle',
                                        style.updateThemeIcon
                                    )}
                                ></i>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
