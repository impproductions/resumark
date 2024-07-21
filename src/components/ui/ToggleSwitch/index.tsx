import style from './ToggleSwitch.module.scss';
import { useState } from 'react';

interface Props {
    checked: boolean;
    onChange: (checked: boolean) => void;
    onIcon?: React.ReactNode;
    offIcon?: React.ReactNode;
}

export function ToggleSwitch({ checked, onChange, onIcon, offIcon }: Props) {
    const [toggled, setToggled] = useState(checked);

    return (
        <div
            className={style.container}
            onClick={() => {
                setToggled(!toggled);
                onChange(!toggled);
            }}
            data-checked={toggled}
        >
            <div className={style.track}>
                <div className={style.ball}>
                    <div className={style.icon}>
                        {toggled ? onIcon : offIcon}
                    </div>
                </div>
            </div>
        </div>
    );
}
