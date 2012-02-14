cmake_minimum_required(VERSION 2.6)

list(APPEND CMAKE_MODULE_PATH
	${CMAKE_SOURCE_DIR}/cmake
	)

find_package(Vala REQUIRED)
find_package(PkgConfig)

add_subdirectory(curses)
add_subdirectory(pidgin)
add_subdirectory(builder)
add_subdirectory(mysql)
add_subdirectory(genieSQL)
