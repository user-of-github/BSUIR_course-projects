cmake_minimum_required(VERSION 3.21)
project(movie-ticket-sales-service-server)
set(CMAKE_CXX_STANDARD 20)

find_package(Crow)
add_executable(
        movie-ticket-sales-service-server
        main.cpp
        Types/movie.hpp Types/range.hpp
        Core/ticket_sales_service.cpp Core/ticket_sales_service.hpp
)
target_link_libraries(movie-ticket-sales-service-server PUBLIC Crow::Crow)