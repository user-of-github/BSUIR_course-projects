export interface Movie {
    title: string
    dates: {
        from: number
        to: number
    }
    id: string
    rating: number
    cover: string
    duration: number
    ageRestriction: number
}