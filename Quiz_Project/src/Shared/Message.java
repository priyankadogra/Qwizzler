package Shared;

import java.sql.*;
import java.util.*;

import SQL.DBConnection;

public class Message {

	//******************************** Variables ******************************
	// connection to DB. shared across all sub-DB classes
	private static DBConnection myConnection;

	public Integer messageID; 	//filled by DB
	public String fromUserID;
	public String toUserID;
	public String timeStamp; 	//filled by DB
	public String subject;
	public String body;
	public boolean isRead;
	public String type; 
				/*
				 NOTE
				 FRIEND
				 CHALLENGE
				 */
	
	public Integer quizID;
	public Integer score;
	public Integer timeInSeconds;
	
	//******************************** Constructors ******************************
	public static void initDBConnection(DBConnection con){
		myConnection = con;
	}
	
	public Message(){	
	}
		
	/*
	 * Constructor used by Database class.
	 */
	public Message(Integer messageID, String fromUserID, String toUserID, String timeStamp,
			       String subject, String body, boolean isRead, String type, Integer quizID, Integer score, Integer timeInSeconds){
		this.messageID = messageID;
		this.fromUserID = fromUserID;
		this.toUserID = toUserID;
		this.timeStamp = timeStamp;
		this.subject = subject;
		this.body = body;
		this.isRead = isRead;
		this.type = type;
		this.quizID = quizID;
		this.score = score;
		this.timeInSeconds = timeInSeconds;
	}
	
	
	//******************************** DB Interactions ******************************
	/**
	 * Sets this message as read.
	 */
	public void setAsRead() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "UPDATE messages SET isREAD='1' WHERE messageID='" +messageID+ "';";
		stmt.executeUpdate(query);
	}
	
	/**
	 * Deletes this message from DB.
	 */
	public void deleteMessage() throws SQLException{ 
		Statement stmt = myConnection.stmt();
		String query = "DELETE FROM messages WHERE messageID='" + messageID + "';";
		stmt.executeUpdate(query);
	}
	
	
	//******************************** Helper Functions ******************************
	/**
	 * Helper function.
	 * Returns the next messageID to be used for storing purposes.
	 */
	protected static Integer getNextID() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM counters WHERE type='messageID';";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()){ 
			//already a counter available for messageID
			Integer count = rs.getInt("count");
			query = "UPDATE counters SET count='" + (count+1) + "' WHERE type='messageID';";
			stmt.executeUpdate(query);
			return count;
		}
		else{
			//No counter available for messageID
			query = "INSERT INTO counters VALUES ('messageID','2');";
			stmt.executeUpdate(query);			
			return 1;
		}
	}
	
	
	/*
	 * Helper function for debugging purposes
	 */
	protected void print(){
		System.out.println("MessageID:"+ messageID+" from:"+fromUserID+" to:"+toUserID+" "+ timeStamp);
		System.out.println("            Subject:"+subject);
		System.out.println("            Body:"+body);
		System.out.println("            Type:"+type + " quizID:"+quizID + " isRead:"+isRead);
	}
	
}

