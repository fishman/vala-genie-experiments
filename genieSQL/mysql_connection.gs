uses
	Mysql

delegate ProcessMysqlResultType (result: Result): bool

class MysqlConnection: Object

	_mysql: Mysql.Database
	_connected: bool
	_delegate: ProcessMysqlResultType

	init
		_mysql = new Mysql.Database()

	def execute_query(query: string): string?
		if ! _connected
			return "ERROR not connected"

		rc:int = 0
		/* print "Connected to MySQL server version: %s (%lu)\n" , _mysql.get_server_info() , (ulong) _mysql.get_server_version()  */

		rc = _mysql.query(query);
		if  rc != 0  
			return @"ERROR $(_mysql.errno()) Query failed: $(_mysql.error())"

		ResultSet: Result = _mysql.use_result();
		
		_delegate(ResultSet)

		return null


	construct (host: string, user: string, password: string, database: string, port: int)
		_connected = _mysql.real_connect(host, user, password, database, port);

		if  ! _connected
			stdout.printf("ERROR %u: Connection failed: %s\n", _mysql.errno(), _mysql.error());

	def set_delegate(del: ProcessMysqlResultType)
		_delegate = del

