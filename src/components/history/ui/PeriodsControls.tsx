import React, {useEffect, useRef, useState} from 'react';
import styles from "./PeriodsControls.module.scss";
import classNames from "classnames";
import {initialData} from "@/components/history/data/data";
import Nav from "@/components/history/ui/Nav";


type PeriodsControlsProps = {
    periodToggle: (index: number) => void
    rotationAngle: number,
    animatedStart: number,
    animatedEnd: number,
    activeIndex: number,
    periods: number
}

const PeriodsControls = ({ periodToggle, rotationAngle, animatedStart, animatedEnd, activeIndex, periods}: PeriodsControlsProps) => {
    const swiperData = initialData

    const circle = useRef<HTMLDivElement>(null)
    const [circleWidth, setCircleWidth] = useState(530);


    useEffect(() => {
        const updateCircleWidth = () => {
            if (circle.current) {
                setCircleWidth(circle.current.getBoundingClientRect().width);
            }
        };

        updateCircleWidth();

        window.addEventListener('resize', updateCircleWidth);
        return () => window.removeEventListener('resize', updateCircleWidth);
    }, [circle.current, window.innerWidth]);

    return (
        <div className={styles.circleContainer}>
            <div className={styles.dateContainer}>
                <span className={styles.dateStart}>
                    {animatedStart}
                </span>
                <span className={styles.dateEnd}>{animatedEnd}</span>
            </div>
            <div ref={circle} className={styles.circle}>
                {swiperData.map((item, index) => {
                    const angle = (index * 360) / periods + rotationAngle
                    const x = circleWidth / 2 * Math.cos((angle * Math.PI) / 180)
                    const y = circleWidth / 2 * Math.sin((angle * Math.PI) / 180)

                    return (
                        <button
                            key={item.title}
                            className={classNames(styles.navBtn, {[styles.active]: index === activeIndex})}
                            style={{
                                top: `calc(50% + ${y}px)`,
                                left: `calc(50% + ${x}px)`,
                            }}
                            onClick={() => periodToggle(index)}
                        >
                            <span className={styles.navBtnNum}>{index + 1}</span>
                            <span className={styles.navBtnLabel}>{item.title}</span>
                        </button>
                    )
                })}
            </div>

            <div className={styles.circleNav}>
                <Nav
                    activeIndex={activeIndex}
                    periods={periods}
                    onPrev={() => periodToggle(activeIndex - 1)}
                    onNext={() => periodToggle(activeIndex + 1)}/>

            </div>

        </div>
    );
};

export default PeriodsControls;