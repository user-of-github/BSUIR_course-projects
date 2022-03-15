#include "./Core/movie_ticket_sales_service.hpp"
#include "./Types/movie.hpp"


int main()
{
	Service::Types::Movie test_data[]
		{{ "Batman", "etjg", { "123", "588" }, 5, "", 12, 6 }, { "Batman", "etjg", { "123", "588" }, 5, "", 12, 6 },
		 { "Batman", "etjg", { "123", "588" }, 5, "", 12, 6 }};

	Service::TicketSalesService app{};

	app.Run();

	return 0;
}
