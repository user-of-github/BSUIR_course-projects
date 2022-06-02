#ifndef MOVIE_TICKET_SALES_SERVICE_SERVER_DATA_TEST_MOVIES_HPP_
#define MOVIE_TICKET_SALES_SERVICE_SERVER_DATA_TEST_MOVIES_HPP_

#include <vector>
#include "../Types/movie.hpp"


const std::vector<Service::Types::Movie> kTestMovies{
	{"Black Adam", 2022, "blackadam2022", {"25", "25"}, 4,
	 "https://m.media-amazon.com/images/M/MV5BNTAxMGQ2NTQtMDYwMC00NDQ3LTgwYTAtOWYzMjE4OGVkZjk2XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
	 122, 6},
	{"Avengers: EndGame", 2019, "avengers4", {"25", "25"}, 5,
	 "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/d1pklzbuyaab0la-1552597012.jpg", 181, 6},
	{"Spider-Man: No Way Home", 2021, "spiderman3nowayhome", {"25", "25"}, 5,
	 "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a8b0fd132117385.61a2ad5d83d0f.png", 148, 6},
	{"Doctor Strange 2: In The Multiverse of Madness", 2022, "doctorstrange2", {"25", "25"}, 5,
	 "https://nerdist.com/wp-content/uploads/2021/01/DoctorStrangeInTheMultiverseOfMadness_Teaser2_Printed_1-Sht_v4_lg.jpg",
	 122, 6},
	{"Batman", 2022, "batman2022", {"25", "25"}, 4,
	 "https://m.media-amazon.com/images/M/MV5BYTExZTdhY2ItNGQ1YS00NjJlLWIxMjYtZTI1MzNlMzY0OTk4XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg",
	 176, 6},
	{"Shazam", 2019, "shazam2019", {"25", "25"}, 5,
	 "https://cdn.europosters.eu/image/1300/posters/shazam-one-sheet-i71939.jpg", 132, 5},
	{"Deadpool", 2016, "Deadpool", {"25", "25"}, 5, "https://i.ebayimg.com/images/g/QEYAAOSw4DJYmmOQ/s-l400.jpg", 108, 6},
	{"Captain America: Civil War", 2016, "CaptainAmerica32016", {"25", "25"}, 5, "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_.jpg", 147, 6},
};

#endif //MOVIE_TICKET_SALES_SERVICE_SERVER_DATA_TEST_MOVIES_HPP_