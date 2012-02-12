uses
	Purple

def static nullprpl_destroy(plugin: Plugin)
	debug_info("nullprpl", "shutting down\n")

const info: PluginInfo = {
  PLUGIN_MAGIC,
  MAJOR_VERSION,
  MINOR_VERSION,
  PluginType.PROTOCOL,
  null, /*ui_requirement */
  0, /* flags */
  null, /*dependencies*/
  (Purple.PluginPriority)PRIORITY_DEFAULT,
  "prpl-vala", /* id */
  "Null - Testing Plugin", /*name*/
  "0.0.1", /*version*/
  "Null - Protocol Plugin", /* summary */
  "Null - Protocol Plugin", /* description */
  "Reza Jelveh",/* author */
  "http://reza.jelveh.me", /*home page */
  null, /*load*/
  null, /*unload*/
  null, /* nullprpl_destroy, */
  null, /*ui_info */
  null, /*extra info*/
  null, /*prefs info*/
  null /* actions */
}

info2: PluginInfo

/* def nullprpl_actions(plugin: Plugin, context: var */
def purple_init_plugin(plugin: Plugin): bool
	/* plugin.info = &info */
	/* nullprpl_init(plugin) */

	/* return false; */
	return plugin.register()

	/* G_MODULE_EXPORT gboolean purple_init_plugin(Purple *plugin) { \ */
	/*                 plugin->info = &(plugininfo); \ */
	/*                 initfunc((plugin)); \ */
	/*                 return purple_plugin_register(plugin); \ */
	/*                 } */

