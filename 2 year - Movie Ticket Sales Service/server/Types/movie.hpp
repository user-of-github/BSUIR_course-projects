#ifndef MOVIE_TICKET_SALES_SERVICE_SERVER_TYPES_MOVIE_HPP_
#define MOVIE_TICKET_SALES_SERVICE_SERVER_TYPES_MOVIE_HPP_

#include <string>
#include <crow.h>
#include <nlohmann/json.hpp>
#include "./range.hpp"
#include "./serializable.hpp"


namespace Service::Types
{
	class Movie : public ISerializable
	{
	public:
		std::string title;
		std::string id;
		Range<std::string> dates;
		unsigned char rating;
		std::string poster_image_link;
		unsigned short duration;
		unsigned char age_restriction;

		Movie(const std::string &, const std::string &, const Range<std::string> &,
			  const unsigned char, const std::string &, const unsigned short,
			  const unsigned char);

		nlohmann::json GetJson() const override;

		std::string Serialize() const override;
	};
}

#endif //MOVIE_TICKET_SALES_SERVICE_SERVER_TYPES_MOVIE_HPP_
