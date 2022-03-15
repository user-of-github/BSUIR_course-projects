#include "movie_ticket_sales_service.hpp"


Service::TicketSalesService::TicketSalesService() : app_{}
{}

void Service::TicketSalesService::Run()
{
	CROW_ROUTE(this->app_, "/id")([]() -> const char* {
	  return "Hello world (TEST)";
	});

	this->app_.port(8000).multithreaded().run();
}
