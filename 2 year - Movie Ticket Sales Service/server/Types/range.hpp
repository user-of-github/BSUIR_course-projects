#ifndef MOVIE_TICKET_SALES_SERVICE_SERVER_TYPES_RANGE_HPP_
#define MOVIE_TICKET_SALES_SERVICE_SERVER_TYPES_RANGE_HPP_


namespace Service::Types
{
	template <typename ValueType>
	struct Range
	{
		ValueType from;
		ValueType to;
	};
}

#endif //MOVIE_TICKET_SALES_SERVICE_SERVER_TYPES_RANGE_HPP_
