#ifndef MOVIE_TICKET_SALES_SERVICE_SERVER_TYPES_MOVIE_HPP_
#define MOVIE_TICKET_SALES_SERVICE_SERVER_TYPES_MOVIE_HPP_

#include <string>
#include "./range.hpp"


namespace Service::Types
{
	struct Movie
	{
		std::string title;
		std::string id;
		Range<std::string> dates;
		unsigned char rating;
		std::string poster_image_link;
		unsigned short duration;
		unsigned char age_restriction;
	};
}

#endif //MOVIE_TICKET_SALES_SERVICE_SERVER_TYPES_MOVIE_HPP_
