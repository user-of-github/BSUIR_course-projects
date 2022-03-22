#include "./movie.hpp"


namespace Service::Types
{
  Movie::Movie(const std::string &title, const std::string &id, const Range<std::string> &dates,
			   const unsigned char rating, const std::string &poster_image_link,
			   const unsigned short duration, const unsigned char age_restriction)
  {
	  std::tie(
		  this->title, this->id, this->dates, this->rating,
		  this->poster_image_link, this->duration, this->age_restriction
	  ) = std::tie(
		  title, id, dates, rating,
		  poster_image_link, duration, age_restriction
	  );
  }

  nlohmann::json Movie::GetJson() const
  {
	  nlohmann::json response{};

	  response["title"] = this->title;
	  response["id"] = this->id;
	  response["cover"] = this->poster_image_link;
	  response["rating"] = this->rating;
	  response["duration"] = this->duration;
	  response["dates"]["from"] = std::stoi(this->dates.from);
	  response["dates"]["to"] = std::stoi(this->dates.to);
	  response["ageRestriction"] = this->age_restriction;

	  return response;
  }

  std::string Movie::Serialize() const
  {
	  return this->GetJson().dump();
  }
}
