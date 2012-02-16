uses
	Gtk
	Mysql

conn:       static MysqlConnection
sourceview: static Gtk.SourceView
resultview: static Gtk.TreeView
statusbar:  static Gtk.Statusbar


class HelloWindow: Object
	prop window: Gtk.Window

	def process_mysql_result (result: Result): bool
		MyRow:        array of string
		fields:       array of Field

		fields           = result.fetch_fields()
		var column_types = new array of Type[fields.length]

		var i = 0
		for i = 0 to (fields.length-1)
			column_types[i] = typeof(string)

		/* I don't know if this is necessary or if the store model
		 * will be deferenced automatically
		 * on the first call model will be null
		 */
		var store = resultview.model as ListStore
		if store != null do store.clear()

		/* Lets create a new liststory with an array of column types
		 */
		store = new ListStore.newv(column_types)

		/* TODO: we need to clear the columns otherwise old column
		 * data will end up in the treeview if the new query has less
		 * columns than the old one. is there a better way to
		 * accomplish this?
		 */
		var columns = resultview.get_columns()
		for column in columns
			resultview.remove_column(column)

		/* insert column titles
		 */
		i = 0
		for field in fields
			resultview.insert_column_with_attributes (-1,
					field.org_name, new CellRendererText (),
					"text", i);
			i++

		resultview.columns_changed()

		/* fill data, for every column of a row at a time. is there a
		 * better way to do this? maybe we could use set_valuesv to
		 * only only one row at a time
		 */
		iter: TreeIter
		var row_counter = 0
		while  (MyRow = result.fetch_row()) != null && row_counter < 2000
			store.append(out iter)
			for i = 0 to (fields.length-1)
				store.set(iter, i, MyRow[i])

			row_counter++


		resultview.model = store

		return true

	def update_status(line: string)
		statusbar.pop(0)
		statusbar.push(0, line)

	/* [CCode(instance_pos=-1)] */
	def on_new(item: Gtk.MenuItem)
		var conn_dialog = new ConnectDialog()
		if (conn_dialog.run() == ResponseType.OK)
			conn = new MysqlConnection(conn_dialog.hostname.text,
					conn_dialog.username.text,
					conn_dialog.password.text,
					conn_dialog.database.text,
					int.parse(conn_dialog.port.text))
			conn.set_delegate(process_mysql_result)

		/* [> close dialog <] */
		conn_dialog.close()

	/* [CCode(instance_pos=-1)] */
	def on_run()
		var res = conn.execute_query(sourceview.buffer.text)
		if res != null
			update_status(res)


	init
		try
			/* create gtk.builder item */
			var builder = new Builder ()
			builder.add_from_file ("window.glade")
			/* connect signals to this instance */
			builder.connect_signals (this)
			/* get builder window */
			window = builder.get_object ("window") as Gtk.Window
			window.show_all ()
			window.destroy.connect(Gtk.main_quit)

			/* enable syntax highlighting for the sourceview */
			sourceview = (Gtk.SourceView)builder.get_object("sourceview")
			var langmanager = new SourceLanguageManager()
			var lang = langmanager.get_language("sql")
			sourceview.buffer = new SourceBuffer.with_language(lang)

			/* get statusbar for later */
			statusbar = builder.get_object("statusbar") as Statusbar

			resultview = builder.get_object("resultview") as TreeView



		except e: GLib.Error
			stderr.printf ("Could not load UI: %s\n", e.message)
			return

init
	Gtk.init (ref args)
	new HelloWindow()
	Gtk.main()
