#ifndef TICKET_SALES_SERVICE_SERVER_CORE_TICKET_SALES_SERVICE_HPP_
#define TICKET_SALES_SERVICE_SERVER_CORE_TICKET_SALES_SERVICE_HPP_

#include <crow.h>
#include "../Types/movie.hpp"
#include "../Data/test_movies.hpp"
#include <crow/http_response.h>
#include <nlohmann/json.hpp>


namespace Service
{
  class TicketSalesService
  {
  public:
	  TicketSalesService();

	  const Types::Movie *GetMovieById(const std::string &);

	  const std::vector<Types::Movie> &GetAllMovies() const;

	  void Run(const unsigned short = TicketSalesService::kDefaultPort);

  private:
	  static const unsigned short kDefaultPort;
	  crow::SimpleApp app_;

	  void SetRequestForMovie();

	  void SetRequestForAllMovies();

	  void SetRequestForPopularMovies();

	  crow::response GetResponseObject() const;
  };
}

#endif //TICKET_SALES_SERVICE_SERVER_CORE_TICKET_SALES_SERVICE_HPP_
