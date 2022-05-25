#ifndef MOVIE_TICKET_SALES_SERVICE_SERVER_TYPES_SERIALIZABLE_HPP_
#define MOVIE_TICKET_SALES_SERVICE_SERVER_TYPES_SERIALIZABLE_HPP_

#include <string>


namespace Service::Types
{
  class ISerializable
  {
  public:
	  virtual nlohmann::json GetJson() const = 0;

	  virtual std::string Serialize() const = 0;
  };
}

#endif //MOVIE_TICKET_SALES_SERVICE_SERVER_TYPES_SERIALIZABLE_HPP_
