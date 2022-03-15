#ifndef TICKET_SALES_SERVICE_SERVER_CORE_TICKET_SALES_SERVICE_HPP_
#define TICKET_SALES_SERVICE_SERVER_CORE_TICKET_SALES_SERVICE_HPP_

#include <crow.h>


namespace Service
{
	class TicketSalesService
	{
	 public:
		TicketSalesService();
		void Run();

	 private:
		crow::SimpleApp app_;
	};
}

#endif //TICKET_SALES_SERVICE_SERVER_CORE_TICKET_SALES_SERVICE_HPP_
