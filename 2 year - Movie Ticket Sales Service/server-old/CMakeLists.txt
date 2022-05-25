cmake_minimum_required(VERSION 3.21)
project(movie-ticket-sales-service-server)
set(CMAKE_CXX_STANDARD 20)

find_package(nlohmann_json 3.7.0 REQUIRED)
find_package(Crow)

add_executable(
        movie-ticket-sales-service-server
        main.cpp
        Types/movie.hpp Types/range.hpp
        Core/ticket_sales_service.cpp Core/ticket_sales_service.hpp
        Types/movie.cpp Data/test_movies.hpp Types/serializable.hpp
)

target_link_libraries(movie-ticket-sales-service-server PUBLIC Crow::Crow)
target_link_libraries(movie-ticket-sales-service-server PRIVATE nlohmann_json::nlohmann_json)