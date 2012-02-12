pkg_check_modules(DEPS REQUIRED purple)
# pkg_check_modules(GTK REQUIRED gtk+-2.0)

include(${VALA_USE_FILE})

vala_precompile(VALA_C
	prpl-null.gs
	PACKAGES
	# gtk+-2.0
	purple
	posix
	OPTIONS
	-g
	--thread
	GENERATE_HEADER
	myheader
	)
add_definitions(
	${DEPS_CFLAGS}
	# ${GTK_CFLAGS}
	-I/usr/include/libpurple
)

link_libraries(
	${DEPS_LDFLAGS}
	# ${GTK_LDFLAGS}
)

add_library(prpl-null SHARED ${VALA_C})
