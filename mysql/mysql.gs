uses
	Mysql

class MysqlConnection: Object

	_mysql: Mysql.Database
	prop connected: bool

	init
		_mysql = new Mysql.Database()

	def get_users()
		if !connected
			return

		rc:int = 0
		print "Connected to MySQL server version: %s (%lu)\n" , _mysql.get_server_info() , (ulong) _mysql.get_server_version() 

		sql:string = "select * from user limit 10";
		rc = _mysql.query(sql);
		if  rc != 0  
			stdout.printf("ERROR %u: Query failed: %s\n", _mysql.errno(), _mysql.error());
			return

		ResultSet: Result = _mysql.use_result();

		MyRow: array of string

		while  (MyRow = ResultSet.fetch_row()) != null 
			print "id: %s | data: %s | ts: %s\n", MyRow[0], MyRow[1], MyRow[2];

	construct (host: string, user: string, password: string, database: string, port: int)
		_mysql = new Mysql.Database()

		connected = _mysql.real_connect(host, user, password, database, port);

		if  ! connected
			stdout.printf("ERROR %u: Connection failed: %s\n", _mysql.errno(), _mysql.error());

init
	var mysql = new MysqlConnection("localhost", "root", "", "mysql", 0)
	mysql.get_users()

