uses
	Gtk

class HelloWindow: Object
	_window: Gtk.Window

	def on_key_release(widget: Gtk.Widget)
		Gtk.main_quit()

	init
		try
			var builder = new Builder ()
			builder.add_from_file ("window.glade")
			builder.connect_signals (this)
			_window = builder.get_object ("window1") as Gtk.Window
			_window.show_all ()
			_window.destroy.connect(Gtk.main_quit)

		except e: GLib.Error
			stderr.printf ("Could not load UI: %s\n", e.message)
			return

init
	Gtk.init (ref args)
	/* var window = new MainWindow() */
	/* [> quit application on window close <] */
	/* window.destroy.connect(Gtk.main_quit) */
	new HelloWindow()

	Gtk.main()
