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

		this->app_.port(port).multithreaded().run();
	}

	void TicketSalesService::SetRequestForMovie()
	{
		CROW_ROUTE(this->app_, "/movie-id=<string>")([this](const std::string &movie_id) {
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

		  for (int counter = from; counter < std::min((int)all_movies.size(), to) && counter >= 0; ++counter)
			  response_movies_array_json.push_back(all_movies.at(counter).GetJson());

		  nlohmann::json response_json{};
		  response_json["success"] = true;
		  response_json["data"] = response_movies_array_json;

		  response.body = response_json.dump();

		  return response;
		});
	}
}
