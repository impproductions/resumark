import { FloatingTooltip } from '../../../../ui/FloatingTooltip';
import LeftButtonIcon from './mouse-left-button-svgrepo-com.svg?react';
import RightButtonIcon from './mouse-right-button-svgrepo-com.svg?react';

import style from './ThemeStoreInteractionTooltip.module.scss';

interface Props {
    open: boolean;
}

export function ThemeStoreInteractionTooltip({ open }: Props) {
    return (
        <FloatingTooltip open={open} direction={'bottom'}>
            <div className={style.container}>
                <div className={style.instruction}>
                    <div>
                        <LeftButtonIcon className={style.icon} />
                    </div>
                    <span>Select Theme</span>
                </div>
                <div className={style.instruction}>
                    <div className={style.dotted}>
                        <i className="bi bi-circle-fill"></i>
                        <LeftButtonIcon className={style.icon} />
                    </div>
                    <span>Save Theme</span>
                </div>
                <div className={style.instruction}>
                    <div>
                        <RightButtonIcon className={style.icon} />
                    </div>
                    <span>Delete Theme</span>
                </div>
                <div className={style.instruction}>
                    <div className={style.double}>
                        <LeftButtonIcon className={style.icon} />
                    </div>
                    <span>Rename Theme</span>
                </div>
            </div>
        </FloatingTooltip>
    );
}
