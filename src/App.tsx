import './App.css';

import style from './App.module.scss';
import { Main } from './components/Main';
import { NavBar } from './components/NavBar';

function App() {
    return (
        <div className={style.pageContainer}>
            <div className={style.mainContainer}>
                <div className={style.navBar}>
                    <NavBar />
                </div>
                <div className={style.mainContent}>
                    <Main />
                </div>
            </div>
        </div>
    );
}

export default App;
