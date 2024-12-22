import React from 'react';
import styles from "./Nav.module.scss";
import classNames from "classnames";


type NavProps = {
    activeIndex: number;
    periods: number;
    onPrev: () => void;
    onNext: () => void;
}


const Nav = ({activeIndex, periods, onPrev, onNext}: NavProps) => {
    return (
        <div className={styles.circleNavContainer}>
            <p className={styles.circleNavFraction}>{activeIndex < 10 ? 0 : ''}{activeIndex + 1}/{activeIndex < 10 ? 0 : ''}{periods}</p>
            <div className={styles.circleNav}>
                <button
                    className={classNames(styles.circleNavBtn, styles.circleNavBtnPrev)}
                    onClick={onPrev}
                    disabled={activeIndex - 1 < 0}
                >
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <circle cx="25" cy="25" r="24.5" transform="matrix(-1 0 0 1 50 0)" stroke="#42567A"
                                strokeOpacity="0.5"/>
                        <path d="M27.4999 18.75L21.2499 25L27.4999 31.25" stroke="#42567A"
                              strokeWidth="2"/>
                    </svg>
                </button>
                <button
                    className={classNames(styles.circleNavBtn, styles.circleNavBtnNext)}
                    onClick={onNext}
                    disabled={activeIndex + 1 >= periods}
                >
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <circle cx="25" cy="25" r="24.5" stroke="#42567A" strokeOpacity="0.5"/>
                        <path d="M22.5001 18.75L28.7501 25L22.5001 31.25" stroke="#42567A"
                              strokeWidth="2"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Nav;