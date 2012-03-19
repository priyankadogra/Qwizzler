package Shared;

import java.sql.*;
import java.util.*;

import SQL.DBConnection;

public class Announcement {

	//******************************** Variables ******************************
	// connection to DB. shared across all sub-DB classes
	private static DBConnection myConnection;

	public Integer announcementID; 	//filled by DB
	public String fromUserID;
	public String text;
	public String timeStamp; 	//filled by DB
	
	//******************************** Constructors ******************************
	public static void initDBConnection(DBConnection con){
		myConnection = con;
	}
	
	public Announcement(){	
	}
		
	/*
	 * Constructor used by Database class.
	 */
	public Announcement(Integer announcementID, String fromUserID, String text, String timeStamp){
		this.announcementID = announcementID;
		this.fromUserID = fromUserID;
		this.text = text;
		this.timeStamp = timeStamp;
	}
	
	
	//******************************** DB Interactions ******************************
	
	/**
	 * Deletes this announcement from DB.
	 */
	public void deleteAnnouncement() throws SQLException{ 
		Statement stmt = myConnection.stmt();
		String query = "DELETE FROM announcements WHERE announcementID='" + announcementID + "';";
		stmt.executeUpdate(query);
	}
	
	
	//******************************** Helper Functions ******************************
	/**
	 * Helper function.
	 * Returns the next announcementID to be used for storing purposes.
	 */
	protected static Integer getNextID() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM counters WHERE type='announcementID';";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()){ 
			//already a counter available for announcementID
			Integer count = rs.getInt("count");
			query = "UPDATE counters SET count='" + (count+1) + "' WHERE type='announcementID';";
			stmt.executeUpdate(query);
			return count;
		}
		else{
			//No counter available for announcementID
			query = "INSERT INTO counters VALUES ('announcementID','2');";
			stmt.executeUpdate(query);			
			return 1;
		}
	}
	
	
	/*
	 * Helper function for debugging purposes
	 */
	protected void print(){
		System.out.println("announcementID:"+ announcementID+" from:"+fromUserID+ timeStamp);
		System.out.println("               Text:"+text);
	}

	/** 
	 * Returns a list of all announcements in sorted by timeStamp.
	 */
	public static List<Announcement> loadAnnouncements(Integer num) throws SQLException{
		List<Announcement> result = new ArrayList<Announcement>();
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM announcements ORDER BY timeStamp DESC";
		ResultSet rs = stmt.executeQuery(query);
		int count=0;
		while(rs.next() && count<num){
			count++;
			result.add( new Announcement(rs.getInt("announcementID"), rs.getString("fromUserID"), rs.getString("text"), rs.getTimestamp("timeStamp").toString()) );
		}		
		return result;
	}

	
	
}

