export type HistoryEvent = {
    year: number,
    text: string,
}

export type HistorySlide = {
    title: string,
    start: number,
    end: number,
    data: HistoryEvent[],
}

export type Coord = {
    x: number;
    y: number;
    d: number;
    i: number;
}

export type Coords = Coord[]