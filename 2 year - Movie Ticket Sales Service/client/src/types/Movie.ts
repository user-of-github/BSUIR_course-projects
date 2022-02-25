export interface Movie {
    title: string
    dates: {
        from: Date
        to: Date
    }
    id: string
    rating: 1 | 2 | 3 | 4 | 5
    cover?: string
    duration?: number
    ageRestriction?: '0+' | '6+' | '12+' | '16+' | '18+' | '21+'
}


export const testMovies: Array<Movie> = [{
    title: 'Black Adam',
    dates: {from: new Date(), to: new Date()},
    rating: 5,
    id: 'blackadam2022',
    cover: 'https://m.media-amazon.com/images/M/MV5BNTAxMGQ2NTQtMDYwMC00NDQ3LTgwYTAtOWYzMjE4OGVkZjk2XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg'
}, {
    title: 'Avengers: EndGame',
    dates: {from: new Date(), to: new Date()},
    rating: 5,
    id: 'avengers4',
    cover: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/d1pklzbuyaab0la-1552597012.jpg'
}, {
    title: 'Spider-Man: No Way Home',
    dates: {from: new Date(), to: new Date()},
    rating: 5,
    id: 'spiderman3nowayhome',
    cover: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a8b0fd132117385.61a2ad5d83d0f.png'
}, {
    title: 'Doctor Strange 2: In The Multiverse of Madness',
    dates: {from: new Date(), to: new Date()},
    rating: 5,
    id: 'doctorstrange2',
    cover: 'https://nerdist.com/wp-content/uploads/2021/01/DoctorStrangeInTheMultiverseOfMadness_Teaser2_Printed_1-Sht_v4_lg.jpg'
}, {
    title: 'Batman',
    dates: {from: new Date(), to: new Date()},
    rating: 5,
    id: 'batman2022',
    cover: 'https://m.media-amazon.com/images/M/MV5BYTExZTdhY2ItNGQ1YS00NjJlLWIxMjYtZTI1MzNlMzY0OTk4XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg'
}, {
    title: 'Shazam',
    dates: {from: new Date(), to: new Date()},
    rating: 5,
    id: 'shazam2019',
    cover: 'https://cdn.europosters.eu/image/1300/posters/shazam-one-sheet-i71939.jpg'
}, {
    title: 'Deadpool',
    dates: {from: new Date(), to: new Date()},
    rating: 5,
    id: 'deadpool2016',
    cover: 'https://i.ebayimg.com/images/g/QEYAAOSw4DJYmmOQ/s-l400.jpg'
}]