pkg_check_modules(DEPS REQUIRED gtk+-3.0)
pkg_check_modules(SOURCEVIEW REQUIRED gtksourceview-3.0)
pkg_check_modules(GDA REQUIRED libgda-5.0)
pkg_check_modules(GDAUI REQUIRED libgda-ui-5.0)

include(${VALA_USE_FILE})

vala_precompile(VALA_C
	builder.gs
	# mysql.vala
	PACKAGES
	# glib-2.0
	gtk+-3.0
	gtksourceview-3.0
	libgda-5.0
	libgda-ui-5.0
	libxml-2.0
	mysql
	posix
	OPTIONS
	-g
	--thread
	GENERATE_HEADER
	myheader
	)
add_definitions(
	${DEPS_CFLAGS}
	${SOURCEVIEW_CFLAGS}
	${GDA_CFLAGS}
	${GDAUI_CFLAGS}
)

link_libraries(
	${DEPS_LDFLAGS}
	${SOURCEVIEW_LDFLAGS}
	${GDA_LDFLAGS}
	${GDAUI_LDFLAGS}
	mysqlclient
)

add_executable(builder ${VALA_C})
