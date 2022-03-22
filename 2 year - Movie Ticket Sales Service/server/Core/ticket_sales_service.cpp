#include "ticket_sales_service.hpp"


namespace Service
{
  const unsigned short TicketSalesService::kDefaultPort{8000};

  TicketSalesService::TicketSalesService() : app_{}
  {}

  const Types::Movie *TicketSalesService::GetMovieById(const std::string &id)
  {
	  const auto response{std::find_if(
		  std::begin(kTestMovies),
		  std::end(kTestMovies),
		  [&](const Types::Movie &movie) { return movie.id == id; }
	  )};

	  return response == std::end(kTestMovies) ? nullptr : &*response;
  }

  void Service::TicketSalesService::Run(const unsigned short port)
  {
	  this->SetRequestForMovie();
	  this->SetRequestForAllMovies();
	  this->SetRequestForPopularMovies();

	  this->app_.port(port).run();
  }

  void TicketSalesService::SetRequestForMovie()
  {
	  CROW_ROUTE(this->app_, "/movies/id=<string>")([this](const std::string &movie_id) {
		auto response{this->GetResponseObject()};

		const auto found_movie{this->GetMovieById(movie_id)};

		nlohmann::json response_json{};

		response_json["success"] = found_movie != nullptr;
		response_json["data"] = found_movie != nullptr ? (*found_movie).Serialize() : "{}";

		response.body = response_json.dump();

		return response;
	  });
  }

  crow::response TicketSalesService::GetResponseObject() const
  {
	  crow::response response{};

	  response.set_header("Access-Control-Allow-Methods", "GET, POST, PUT");
	  response.set_header("Access-Control-Allow-Origin", "*");
	  response.set_header("Access-Control-Allow-Headers", "*");

	  response.body = "";

	  return response;
  }

  const std::vector<Types::Movie> &TicketSalesService::GetAllMovies() const
  {
	  return kTestMovies;
  }

  void TicketSalesService::SetRequestForAllMovies()
  {
	  CROW_ROUTE(this->app_, "/movies/<int>/<int>")([this](const int from, const int to) {
		auto response{this->GetResponseObject()};

		auto response_movies_array_json{nlohmann::json::array()};
		response_movies_array_json.clear();

		const auto all_movies{this->GetAllMovies()};

		for (int counter = from; counter < std::min((int)all_movies.size(), to + 1) && counter >= 0; ++counter)
			response_movies_array_json.push_back(all_movies.at(counter).GetJson());

		nlohmann::json response_json{};

		response_json["success"] = true;
		response_json["data"]["movies"] = response_movies_array_json;
		response_json["data"]["howManyLeft"] = all_movies.size() - std::min((int)all_movies.size(), to + 1);

		response.body = response_json.dump();

		return response;
	  });
  }

  void TicketSalesService::SetRequestForPopularMovies()
  {
	  CROW_ROUTE(this->app_, "/popular/movies")([this]() {
		auto response{this->GetResponseObject()};

		auto response_movies_array_json{nlohmann::json::array()};
		response_movies_array_json.clear();

		const auto all_movies{this->GetAllMovies()};

		for (std::size_t counter = 0; counter < std::min((int)all_movies.size(), 3 + 1); ++counter)
			response_movies_array_json.push_back(all_movies.at(counter).GetJson());

		nlohmann::json response_json{};

		response_json["success"] = true;
		response_json["data"] = response_movies_array_json;

		response.body = response_json.dump();

		return response;
	  });
  }
}
