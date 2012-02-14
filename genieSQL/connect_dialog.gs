uses
	Gtk

class ConnectDialog: Dialog
	hostname: Entry
	database: Entry
	username: Entry
	password: Entry
	port: Entry

	init
		add_buttons(Stock.CANCEL, ResponseType.NONE, Stock.OK, ResponseType.OK,null)
		var grid = new Gtk.Grid()
		
		var label = new Label("Hostname: ")
		grid.attach (label, 0, 0, 1, 1)
		label = new Label("Username: ")
		grid.attach (label, 0, 1, 1, 1)
		label = new Label("Password: ")
		grid.attach (label, 0, 2, 1, 1)
		label = new Label("Database: ")
		grid.attach (label, 0, 3, 1, 1)
		label = new Label("Port: ")
		grid.attach (label, 0, 4, 1, 1)

		hostname = new Entry()
		username = new Entry()
		password = new Entry()
		password.visibility = false
		database = new Entry()
		port = new Entry()

		grid.attach(hostname, 1, 0, 1, 1)
		grid.attach(username, 1, 1, 1, 1)
		grid.attach(password, 1, 2, 1, 1)
		grid.attach(database, 1, 3, 1, 1)
		grid.attach(port, 1, 4, 1, 1)

		grid.show_all()

		get_content_area().pack_start(grid)
