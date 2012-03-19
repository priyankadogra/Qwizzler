package Shared;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;

import SQL.DBConnection;

public class Question {

	//******************************** Variables ******************************
	// connection to DB. shared across all sub-DB classes
	private static DBConnection myConnection;

	public Integer questionID;	
	public String question;
	public String imageURL;
	public String type;
					/*
					 QR
					 PR
					 FIB
					 MC
					 MCMA
					 M
					 */
	public Integer timeInSeconds; //0 if not timed.
	
	
	/*
	 * In PR, QR, FIB, MA:
	 * 		Each "left" item corresponds to a correct answer/answer(s)
	 * 		Each "right" item is a number in String type that corresponds to the order of that item. (if order is not important all right items will have the same value= "0")
	 * 		Example:
	 * 				Question: Name Two presidents of USA?
	 * 				Aswer: 
	 * 						left = {"Obama,Barack Obama,President Obama" ,"Bush,George Bush"};
	 * 						right = {"0","0"}; //because order is not important
	 * 				Note that left.length() = right.length().  
	 * 		 
	 * In MC, MCMA:
	 * 		Each "left" item corresponds to a choice.
	 * 		Each "right" item is "1" if it is a correct choice and "0" otherwise.

	 * In M:
	 * 		Each "left" item corresponds to an item on the left column and 
	 * 		Each "right" item is the associated item on the right column that matches it.
	 */
	public List<String> left;
	public List<String> right;
	
	//******************************** Constructors ******************************
	public static void initDBConnection(DBConnection con){
		myConnection = con;
	}

	public Question(){
		left = new ArrayList<String>();
		right = new ArrayList<String>();
	}
	
	/*
	 * Constructor used by Database class.
	 */
	public Question(Integer questionID, String question, String imageURL, String type, Integer timeInSeconds, List<String> left, List<String> right){
		this.questionID = questionID;
		this.question = question;
		this.imageURL = imageURL;
		this.type = type;
		this.timeInSeconds = timeInSeconds;
		this.left = left;
		this.right = right;
	}
	
	
	
	//******************************** DB Interactions ******************************
	
	
	/**
	 * Deletes this question from all related tables in DB.
	 */
	//TODO: done coding- should be tested
	public void deleteQuestion() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "DELETE FROM questions" + " WHERE questionID='" + questionID + "';";
		stmt.executeUpdate(query);
		query = "DELETE FROM quiz2question" + " WHERE questionID='" + questionID + "';";
		stmt.executeUpdate(query);
		query = "DELETE FROM answers" + " WHERE questionID='" + questionID + "';";
		stmt.executeUpdate(query);
	}

	
	/**
	 * Returns a pointer to the question object with the given questionID
	 */
	public static Question loadQuestion(Integer questionID) throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM questions" + " WHERE questionID='" + questionID + "';";
		ResultSet rs = stmt.executeQuery(query);
		Question q = new Question();
		if(rs.next()) { //a question found with this questionID		
			q.questionID = rs.getInt("questionID");
			q.question = rs.getString("question");
			q.imageURL = rs.getString("imageURL");
			q.type = rs.getString("type");
			q.timeInSeconds = rs.getInt("timeInSeconds");
		}		
		else{
			//no question found with this questionID
			return null;
		}
		query = "SELECT * FROM answers WHERE questionID='" + questionID + "';";
		rs = stmt.executeQuery(query);
		while(rs.next()){
			q.left.add(rs.getString("leftCol"));
			q.right.add(rs.getString("rightCol"));
		}
		return q;
	}
	
	/**
	 * Returns the score associated with the List<String> answers provided.
	 */
	//TODO: done coding- should be tested
	public Integer getScoreForAnswer(List<String> answers){
		if(answers.size()!=right.size()){
			//ERROR: number of items don't match.
			return -1;
		}
		Integer score=0;
		if(type.equals("PR") || type.equals("QR") || type.equals("FIB")){
			
			if(right.get(0).equals("1")){ //Ordered answers
				for(int i=0; i<answers.size(); i++){				
					if(right.get(i)!="0" && getSetSeperatedByCommas(left.get(i)).contains(answers.get(i).toLowerCase())){
						score++;
					}
				}								
			}
			
			if(right.get(0).equals("0")){ //Unordered answers
				List<Integer> acceptedLeftIDs = new ArrayList<Integer>();
				List<Integer> acceptedAnswerIDs = new ArrayList<Integer>();
				for(int i=0; i<answers.size(); i++){
					for(int j=0; j<left.size(); j++){
						if(getSetSeperatedByCommas(left.get(j)).contains(answers.get(i).toLowerCase()) 
								&& !acceptedAnswerIDs.contains(i)
								&& !acceptedLeftIDs.contains(j)){
							acceptedAnswerIDs.add(j);
							acceptedLeftIDs.add(j);
							score++;
						}
					}
				}								
			}
				
		}
		
		if(type.equals("MC") || type.equals("MCMA")){
			for(int i=0; i<answers.size(); i++){
				if(answers.get(i).equals(right.get(i)) && right.get(i).equals("1")) score++;
			}
		}
		
		if(type.equals("M")){
			for(int i=0; i<answers.size(); i++){
				if(answers.get(i).equals(right.get(i))) score++;
			}			
		}
		return score;
	}
	

	
	
	/**
	 * Saves the modified question object in DB. (Overrides previous information) 
	 * Warning: A new question should only be added to a quiz by calling addQuestion() method on that quiz object.  
	 */
	//TODO: done coding- should be tested
	public void saveQuestion() throws SQLException{
		if(questionID==0){
			//not previously saved in DB.
			return;
		}
		
		if(left.size()!=right.size()){
			//ERROR IN QUESTION OBJECT
			System.out.println("Cannot save Question with QuestionID:"+questionID+ ", left and right do not have the same size.");
			return;
		}
		
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM questions" + " WHERE questionID='" + questionID + "'";
		ResultSet rs = stmt.executeQuery(query);
		//delete - question already in questions_table
		if(rs.next()) {		
			query = "DELETE FROM questions" + " WHERE questionID='" + questionID + "'";
			stmt.executeUpdate(query);
		}		
		//delete - question in answers_table
		query = "SELECT * FROM answers" + " WHERE questionID='" + questionID + "'";
		rs = stmt.executeQuery(query);
		if(rs.next()) {		
			query = "DELETE FROM answers" + " WHERE questionID='" + questionID + "'";
			stmt.executeUpdate(query);
		}		
		
		//add - question not in DB
		query = "INSERT INTO questions VALUES('" + questionID + "','" + question + "','" + imageURL + "','" + type + "','" + timeInSeconds + "');"; 
		stmt.executeUpdate(query);
		
		//saving answers
		for(int i=0; i<left.size();i++){
			query = "INSERT INTO answers VALUES('" + questionID + "','" + left.get(i) + "','" + right.get(i) + "');"; 
			stmt.executeUpdate(query);			
		}
	}

	
	/**
	 * Returns the correct answer(s) for this question.
	 * Used in immediateCorrection mode.
	 */
	//TODO: test 
	public String getAnswer(){
		String result = "";
		if(type.equals("PR") || type.equals("QR") || type.equals("FIB")){
			
			if(right.get(0).equals("1")){ //Ordered answers
				for(int i=0; i<left.size(); i++){
					result = "Answers should be in the order below: \n ";
					result = result + " Answer" +(i+1)+ ": " + left.get(i) + " \n ";
				}				
			}			
			if(right.get(0).equals("0")){ //Unordered answers				
				for(int i=0; i<left.size(); i++){
					result = "Possible answers: \n ";
					result = result + " Answer: " + left.get(i) + " \n ";					
				}
			}
		}		
		if(type.equals("MC") || type.equals("MCMA")){
			result = "Correct choices: <br />";
			for(int i=0; i<right.size(); i++){
				if(right.get(i).equals("1")) result = result + (i+1) + "<br />";
			}
		}		
		if(type.equals("M")){
			for(int i=0; i<left.size(); i++){
				result = result + "(" +left.get(i)+ ") matches with (" +right.get(i)+ "). \n ";
			}			
		}
		return result;
	}

	
	//******************************** Helper Functions ******************************
	/**
	 * Helper function.
	 * Returns the next questionID to be used for storing purposes.
	 */
	protected static Integer getNextID() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM counters WHERE type='questionID';";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()){ 
			//already a counter available for questionID
			Integer count = rs.getInt("count");
			query = "UPDATE counters SET count='" + (count+1) + "' WHERE type='questionID';";
			stmt.executeUpdate(query);
			return count;
		}
		else{
			//No counter available for questionID
			query = "INSERT INTO counters VALUES ('questionID','2');";
			stmt.executeUpdate(query);			
			return 1;
		}
	}
	
	
	/*
	 * Helper function for debugging purposes
	 */
	protected void print(){
		System.out.println("questionID:"+ questionID+" question:"+question+" imageURL:"+imageURL+" time:"+ timeInSeconds);
		System.out.println("            Type:"+type);
		System.out.println("            left:"+left);
		System.out.println("            right:"+right);
	}

	private static List<String> getSetSeperatedByCommas(String set){
		List<String> result = new ArrayList<String>();
		String[] strs = set.split(",");
		for(String s: strs){
			/* remove leading whitespace */
			while(s.length()>0 && s.charAt(0)==' '){
				s = s.substring(1);
			}
		    /* remove trailing whitespace */
			while(s.length()>0 && s.charAt(s.length()-1)==' '){
				s = s.substring(0,s.length()-1);
			}
			result.add(s.toLowerCase());
		}
		return result;
	}
	
	public static void main(String[] args){
		String a = "President Obama   , Barack Obama";
		String b = "Obama";
		System.out.println(a.contains(b));
		System.out.println(" ");
		System.out.println(getSetSeperatedByCommas("President Obama   , Barak Obama,a,c d,z,"));
		System.out.println(getSetSeperatedByCommas("President Obama   , Barak Obama,a,c d,z,").contains(""));
		System.out.println("a\nb");
		
		List<String> l = new ArrayList<String>();
		l.add("a a");
		l.add("bbb");
		System.out.println(l);
		
		String s = "abcd";
		System.out.println(s.substring(0,3));
		
	}

}
