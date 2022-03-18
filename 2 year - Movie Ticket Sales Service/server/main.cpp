#include "./Core/ticket_sales_service.hpp"
#include "./Types/movie.hpp"


int main()
{
  Service::TicketSalesService app{};

  app.Run();

  return 0;
}
