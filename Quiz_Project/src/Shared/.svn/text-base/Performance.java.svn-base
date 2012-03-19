package Shared;

import java.sql.*;
import java.util.*;

import SQL.DBConnection;

public class Performance {

	//******************************** Variables ******************************
	// connection to DB. shared across all sub-DB classes
	private static DBConnection myConnection;

	public Integer quizID; 	
	public String userID;
	public Integer score; 	
	public Integer timeInSeconds; 	
	public String timeStamp;
	
	//******************************** Constructors ******************************
	public static void initDBConnection(DBConnection con){
		myConnection = con;
	}
	
	public Performance(){	
	}
		
	/*
	 * Constructor used by Database class.
	 */
	public Performance(Integer quizID, String userID, Integer score, Integer timeInSeconds, String timeStamp){
		this.quizID = quizID;
		this.userID = userID;
		this.score = score;
		this.timeInSeconds = timeInSeconds;
		this.timeStamp = timeStamp;
	}
	
	
	//******************************** DB Interactions ******************************	
	
	
	
	/*
	 * Helper function for debugging purposes
	 */
	protected void print(){
		System.out.println("performance | quizID:"+ quizID+" userID:"+userID+" score:"+score+" timeInSeconds:"+timeInSeconds+ " "+ timeStamp);
	}

	
}

