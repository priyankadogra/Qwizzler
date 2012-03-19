package SQL;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DBConnection {

	private Connection con;
	private Statement stmt;

	private static String serverName = "";
	private static String accountName = "";
	private static String password = "";
	private static String database = "";

	public DBConnection() {
		try {
			Class.forName("com.mysql.jdbc.Driver");

			con = DriverManager.getConnection
			( "jdbc:mysql://" + serverName, accountName, password);

			stmt = con.createStatement();
			stmt.executeQuery("USE " + database);
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

	public Statement stmt() {
		return stmt;
	}
	public Connection con() {
		return con;
	}

}


