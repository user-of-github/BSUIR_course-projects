export interface MovieShorten {
    title: string
    date_from: string
    date_to: string
    movie_id: string
    poster_image_link: string
}


export interface Movie {
    title: string
    year: number
    date_from: string
    date_to: string
    id: string
    rating: number
    poster_image_link: string
    duration: number
    age_restriction: number
    movie_id: string
}