uses
	Curses

init
	initscr()

	start_color()
	init_pair (1, Color.GREEN, Color.RED)

	/* create a window */
	var win = new Window(LINES - 8, COLS - 8, 4, 4)
	win.bkgdset( COLOR_PAIR(1) | Attribute.BOLD)
	win.addstr("hello world!")
	win.clrtobot()
	win.getch()

	endwin()

	return
