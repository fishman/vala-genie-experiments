cmake_minimum_required(VERSION 2.6)

pkg_check_modules(GLIB REQUIRED glib-2.0)
pkg_check_modules(GTHREAD REQUIRED gthread-2.0)
pkg_check_modules(GOBJECT REQUIRED gobject-2.0)

include(${VALA_USE_FILE})

vala_precompile(VALA_C
	mysql.gs
	# mysql.vala
	PACKAGES
	glib-2.0
	gobject-2.0
	mysql
	posix
	OPTIONS
	-g
	--thread
	GENERATE_HEADER
	mysql_example
	)
add_definitions(
	${GLIB_CFLAGS}
	${GTHREAD_CFLAGS}
	${GOBJECT_CFLAGS}
)

link_libraries(
	${GLIB_LDFLAGS}
	${GTHREAD_LDFLAGS}
	${GOBJECT_LDFLAGS}
	mysqlclient
)

add_executable(mysql ${VALA_C})
