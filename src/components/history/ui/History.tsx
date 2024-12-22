import * as React from 'react'
import {useRef, useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Pagination} from "swiper/modules"
import "swiper/css"
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import type SwiperCore from 'swiper'
import styles from './History.module.scss'
import classNames from "classnames"
import PeriodsControls from "@/components/history/ui/PeriodsControls"
import Nav from "@/components/history/ui/Nav";
import {initialData} from "@/components/history/data/data";
import {HistorySlide} from "@/components/history/model/types";


const History = () => {
    const swiperData = initialData


    // History Data
    const [prevSlide, setPrevSlide] = useState<HistorySlide>(swiperData[0])
    const [activeSlide, setActiveSlide] = useState<HistorySlide>(swiperData[0])
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [periods, setPeriods] = useState<number>(swiperData.length)


    // Swiper
    const [controlledSwiper, setControlledSwiper] = useState<SwiperCore>()
    const prevRef = useRef<HTMLButtonElement>(null)
    const nextRef = useRef<HTMLButtonElement>(null)


    const [slidesHiding, setSlidesHiding] = useState(false);


    // Circle Data
    const [rotationAngle, setRotationAngle] = useState(-60)
    const [animatedStart, setAnimatedStart] = useState(activeSlide.start);
    const [animatedEnd, setAnimatedEnd] = useState(activeSlide.end);


    if (!activeSlide) {
        return
    }


    const rotateButtons = (clickedIndex: number) => {

        if (clickedIndex == activeIndex) return
        setSlidesHiding(true)

        const rotate = (clickedIndex - activeIndex + periods) % periods
        setRotationAngle((prevAngle) => prevAngle - (rotate * 360) / periods)

        if (prevSlide && activeSlide) {
            animateValue(prevSlide.start, swiperData[clickedIndex].start, 1000, setAnimatedStart);
            animateValue(prevSlide.end, swiperData[clickedIndex].end, 1000, setAnimatedEnd);
        }
        setTimeout(() => {
            controlledSwiper?.slideTo(0, 0)
            setActiveIndex(clickedIndex)
            setPrevSlide(activeSlide)
            setActiveSlide(swiperData[clickedIndex])
            setSlidesHiding(false)
        }, 800);


    }


    const animateValue = (start: number, end: number, duration: number, callback: (value: number) => void) => {
        const startTime = performance.now();

        const step = (currentTime: number) => {
            const elapsedTime = currentTime - startTime
            const progress = Math.min(elapsedTime / duration, 1)
            const easeOutProgress = 1 - Math.pow(1 - progress, 3)
            const value = Math.round(start + (end - start) * easeOutProgress)

            callback(value)

            if (progress < 1) {
                requestAnimationFrame(step)
            }
        };

        requestAnimationFrame(step);
    };


    return (
        <div className={styles.history}>
            <div className={styles.pageCenter}>

                <div className={styles.head}>
                    <h1 className={styles.title}>Исторические даты</h1>
                </div>

                <PeriodsControls
                    periodToggle={rotateButtons}
                    rotationAngle={rotationAngle}
                    animatedStart={animatedStart}
                    animatedEnd={animatedEnd}
                    activeIndex={activeIndex}
                    periods={periods}
                />

                <div className={styles.eventsSliderWrapper}>
                    <Swiper
                        className={classNames(styles.eventsSlider, {[styles.hidden]: slidesHiding})}
                        modules={[Navigation, Pagination]}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        pagination={{
                            type: 'bullets',
                            enabled: true,
                            clickable: true,
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1.36,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 100,
                            },
                        }}
                        loop={false}
                        onSwiper={setControlledSwiper}
                        onInit={(swiper: SwiperCore) => {
                            if (
                                prevRef.current &&
                                nextRef.current
                            ) {
                                const navigation = swiper.params.navigation
                                if (navigation && typeof navigation !== "boolean") {
                                    navigation.prevEl = prevRef.current;
                                    navigation.nextEl = nextRef.current;
                                    swiper.navigation.init();
                                    swiper.navigation.update();
                                }
                            }
                        }}
                    >
                        {activeSlide.data.map((item, index) => (
                            <SwiperSlide key={item.year} className={styles.eventsSlide}>
                                <p className={styles.eventsSlideYear}>{item.year}</p>
                                <p className={styles.eventsSlideText}>{item.text}</p>
                            </SwiperSlide>
                        ))}
                        <button ref={prevRef}
                                className={classNames(styles.eventsSliderBtn, styles.eventsSliderBtnPrev)}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" transform="rotate(-180 20 20)" fill="white"/>
                                <path d="M22 25L17 20L22 15" stroke="#3877EE" strokeWidth="2"/>
                            </svg>
                        </button>
                        <button ref={nextRef}
                                className={classNames(styles.eventsSliderBtn, styles.eventsSliderBtnNext)}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="white"/>
                                <path d="M18 15L23 20L18 25" stroke="#3877EE" strokeWidth="2"/>
                            </svg>
                        </button>
                    </Swiper>
                </div>


                <div className={styles.mobNav}>
                    <Nav
                        activeIndex={activeIndex}
                        periods={periods}
                        onPrev={() => rotateButtons(activeIndex - 1)}
                        onNext={() => rotateButtons(activeIndex + 1)}/>
                </div>


            </div>
        </div>
    )
}

export default History