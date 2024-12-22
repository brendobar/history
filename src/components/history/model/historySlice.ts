import {HistorySlide} from "./types";
import {initialData} from "../data/data";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface State {
    activeSlide: HistorySlide,
    prevSlide: HistorySlide,
    activeIndex: number,
    periods: number
}

const initialState: State = {
    activeSlide: initialData[0],
    prevSlide: initialData[0],
    activeIndex: 0,
    periods: initialData.length
}


export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setActiveIndex: (state, action: PayloadAction<number>) => {
            state.activeIndex = action.payload
        },
        setActiveSlide: (state, action: PayloadAction<HistorySlide>) => {
            state.activeSlide = action.payload
        },
        setPrevSlide: (state, action: PayloadAction<HistorySlide>) => {
            state.activeSlide = action.payload
        },
        reset: () => initialState,
    }
})

export const { setActiveIndex, setActiveSlide, setPrevSlide } = historySlice.actions

export default historySlice.reducer