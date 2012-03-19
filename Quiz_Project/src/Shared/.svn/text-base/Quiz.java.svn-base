package Shared;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;

import SQL.DBConnection;
 
public class Quiz {
	//******************************** Variables ******************************
	// connection to DB. shared across all sub-DB classes
	private static DBConnection myConnection;

	public Integer quizID; 
	public String title; 
	public String description;
	public String owner; 
	public String category;	
								/*
								HISTORY,
								GEOGRAPHY,
								ENTERTAINMENT,
								MATH_AND_SCIENCE,
								LITERATURE,
								SPORTS,
								LANGUAGE,
								JUST_FOR_FUN,
								RELIGION,
								MOVIES,
								TELEVISION, 
								 */
	public Integer numLikes;
	public Integer numDislikes;
	public boolean isRandom;		  
	public boolean isMultiplePage;
	public boolean isPracticeEnabled; 			  
	public boolean isImmediateCorrectionEnabled;  
	public boolean isReported;	
	public Integer timeInSeconds;	//0 if not timed.	
	public String timeStamp;
	
	public static final Integer NUM_QUIZZES_LOADED = 10; 
	
	//******************************** Constructors ******************************
	public static void initDBConnection(DBConnection con){
		myConnection = con;
	}

	/*
	 * Constructor used by servlets as well as DB class.
	 */
//	public Quiz(String title, String description, String owner, String category,
//			    Integer numLikes, Integer numDislikes, boolean isRandom,
//			    boolean isMultiplePage, boolean isReported, Integer timeInSeconds){
//		quizID = 0; 		//not a valid value until saveQuiz() is called.
//		timeStamp = "0"; 	//not a valid value until saveQuiz() is called.
//		this.title = title;
//		this.description = description;
//		this.owner = owner;
//		this.category = category;
//		this.timeInSeconds = timeInSeconds;
//		this.numLikes = numLikes;
//		this.numDislikes = numDislikes;
//		this.isRandom = isRandom;
//		this.isMultiplePage = isMultiplePage;
//		this.isReported = isReported;				
//	}

	/*
	 * Constructor used by servlets as well as DB class.
	 */
	public Quiz(String title, String description, String owner, String category,
			    Integer numLikes, Integer numDislikes, boolean isRandom,
			    boolean isMultiplePage, boolean isPracticeEnabled, 
			    boolean isImmediateCorrectionEnabled, boolean isReported, Integer timeInSeconds){
		quizID = 0; 		//not a valid value until saveQuiz() is called.
		timeStamp = "0"; 	//not a valid value until saveQuiz() is called.
		this.title = title;
		this.description = description;
		this.owner = owner;
		this.category = category;
		this.timeInSeconds = timeInSeconds;
		this.numLikes = numLikes;
		this.numDislikes = numDislikes;
		this.isRandom = isRandom;
		this.isMultiplePage = isMultiplePage;
		this.isReported = isReported;
		this.isPracticeEnabled = isPracticeEnabled;
		this.isImmediateCorrectionEnabled = isImmediateCorrectionEnabled;
	}

	
	//******************************** DB Interactions ******************************
	
	/**
	 * Adds a question with the given arguments to this quiz.
	 * Returns a pointer to the question object. 
	 */
	public Question addQuestion(String question, String imageURL, String type, Integer timeInSeconds, List<String> left, List<String> right) throws SQLException{
		Integer questionID = Question.getNextID();
		Statement stmt = myConnection.stmt();
		String query = "INSERT INTO quiz2question VALUES ('" + quizID + "','" + questionID + "');";
		stmt.executeUpdate(query);
		Question q = new Question(questionID, question, imageURL, type, timeInSeconds, left, right);
		q.saveQuestion();
		return q;
	}
	
	
	/**
	 * Returns the Quiz object from DB given the quizID.
	 * (null if invalid userID)
	 */
	public static Quiz loadQuiz(Integer quizID) throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM quizzes" + " WHERE quizID='" + quizID + "'";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()) {		//valid quiz
			Quiz q = new Quiz(rs.getString("title"), rs.getString("description"), rs.getString("owner"), rs.getString("category"), rs.getInt("numLikes"), rs.getInt("numDislikes"), rs.getBoolean("isRandom"), rs.getBoolean("isMultiplePage"), rs.getBoolean("isPracticeEnabled"), rs.getBoolean("isImmediateCorrectionEnabled"), rs.getBoolean("isReported"), rs.getInt("timeInSeconds"));
			q.quizID = rs.getInt("quizID");
			q.timeStamp = rs.getTimestamp("timeStamp").toString();
			//TODO: clean
			q.numLikes = q.numLikes();
			q.numDislikes = q.numDislikes();
			return q;
		}
		else return null;
	}
	
	
	/**
	 * Stores this Quiz object in DB.
	 * Overrides previous information for quizID.
	 * @throws SQLException
	 */
	public void saveQuiz() throws SQLException{
		if(quizID==0){
			//not saved in DB before.
			quizID=Quiz.getNextID();
		}
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM quizzes" + " WHERE quizID='" + quizID + "'";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()) {		//delete - user already in DB
			query = "DELETE FROM quizzes" + " WHERE quizID='" + quizID + "'";
			stmt.executeUpdate(query);
		}		
		//add - quiz not in DB
		query = "INSERT INTO quizzes VALUES('" + quizID + "','" + title + "','" + description + "','" + owner + "','" + category + "','" + numLikes + "','" + numDislikes + "','" + (isRandom? 1:0) + "','" + (isMultiplePage? 1:0) + "','" +(isPracticeEnabled? 1:0)+ "','" +(isImmediateCorrectionEnabled? 1:0)+ "','" + (isReported? 1:0) + "','" + timeInSeconds + "',CURRENT_TIMESTAMP());"; 
		stmt.executeUpdate(query);
	}

	/**
	 * Gets a list of suggested quizzes for the auto-complete function.
	 */
	public static List<Quiz> loadSuggestions(String term, int limit) throws SQLException{
		List<Quiz> result = new ArrayList<Quiz>();
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM quizzes WHERE title LIKE '%" +term+ "%';";
		ResultSet rs = stmt.executeQuery(query);
		int count=0;
		while(rs.next() && count<limit){
			Quiz q = new Quiz(rs.getString("title"), rs.getString("description"), rs.getString("owner"), rs.getString("category"), rs.getInt("numLikes"), rs.getInt("numDislikes"), rs.getBoolean("isRandom"), rs.getBoolean("isMultiplePage"), rs.getBoolean("isPracticeEnabled"), rs.getBoolean("isImmediateCorrectionEnabled"), rs.getBoolean("isReported"), rs.getInt("timeInSeconds"));
			q.quizID = rs.getInt("quizID");
			q.timeStamp = rs.getTimestamp("timeStamp").toString();
			q.numLikes = q.numLikes();
			q.numDislikes = q.numDislikes();
			result.add(q);
		}
		return result;
	}

	/**
	 * Removes a quiz with the given ID from the list of reported quizzes.
	 */
	public static void removeFromReportedList(Integer quizID) throws SQLException{
		Statement stmt = myConnection.stmt();
		stmt.executeQuery("UPDATE quizzes SET isReported='0' WHERE quizID='" +quizID+ "';");		
	}
	
	
	/**
	 * Deletes (and recursively all its questions) this Quiz from DB.
	 */
	public void deleteQuiz() throws SQLException{
		deleteQuestions();
		Statement stmt = myConnection.stmt();
		String query = "DELETE FROM quizzes" + " WHERE quizID='" + quizID + "'";
		stmt.executeUpdate(query);
		query = "DELETE FROM performances" + " WHERE quizID='" + quizID + "'";
		stmt.executeUpdate(query);
		query = "DELETE FROM messages" + " WHERE quizID='" + quizID + "'";
		stmt.executeUpdate(query);
		query = "DELETE FROM ratings" + " WHERE quizID='" + quizID + "'";
		stmt.executeUpdate(query);
	}

	/**
	 * Returns the number of questions for this quiz.
	 */
	public Integer numQuestions() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT COUNT(*) as 'numQuestions' FROM quiz2question WHERE quizID='" +quizID+ "';";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()){
			return rs.getInt("numQuestions");			
		}
		return 0;
	}

	/**
	 * Returns the number of times users have taken this quiz.
	 */
	public Integer numTaken() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT COUNT(*) as 'numTaken' FROM performances WHERE quizID='" +quizID+ "';";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()){
			return rs.getInt("numTaken");
		}
		return 0;
	}
	
	/**
	 * Stores a new performance for this quiz in DB.
	 */
	public void addPerformance(String userID, Integer score, Integer timeInSeconds) throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "INSERT INTO performances VALUES ('" +quizID+ "','" +userID+ "','" +score+ "','" +timeInSeconds+ "',CURRENT_TIMESTAMP());"; 			
		stmt.executeUpdate(query);
		//Add bestScore achievement to the userID if he is best scorer.
		query = "SELECT * FROM performances" + " WHERE quizID='" + quizID + "' ORDER BY score DESC, timeInSeconds ASC;";
		ResultSet rs = stmt.executeQuery(query);
		boolean achievedBestScore = false;
		if(rs.next()){
			if(rs.getString("userID").equals(userID)){				
				achievedBestScore = true;	//this userID has achieved a best score!
			}
		}
		rs.close();
		if(achievedBestScore){
			//Giving bestScore achievement to this user!
			ResultSet rs2 = stmt.executeQuery("SELECT * FROM users WHERE userID='" +userID+ "';");
			if(rs2.next()){
				String newCode = rs2.getString("achievementCode");
				newCode = newCode.substring(0,4) + "1" + newCode.substring(5,10);
				stmt.executeUpdate("UPDATE users SET achievementCode='" +newCode+ "' WHERE userID='" +userID+ "';");
			}

		}
	}

	/**
	 *	Returns the list of performances for this quiz taken by the given user ID. (ordered by score) 
	 */
	public List<Performance> loadPerformancesForUser(String userID) throws SQLException{
		List<Performance> result = new ArrayList<Performance>();
		Statement stmt = myConnection.stmt();
		//TODO: change query to last day only
		String query = "SELECT * FROM performances" + " WHERE userID='" +userID+ "' AND quizID='" + quizID + "' ORDER BY score DESC, timeInSeconds ASC;";
		ResultSet rs = stmt.executeQuery(query);
		while(rs.next()){
			result.add( new Performance(rs.getInt("quizID"), rs.getString("userID"), rs.getInt("score"), rs.getInt("timeInseconds"), rs.getTimestamp("timeStamp").toString() ) );
		}		
		return result;		
	}

	/**
	 * Returns a list of 'num' top performances in the last day for this quiz.
	 * Criteria is first score and then completion time
	 */
	public List<Performance> loadTopPerformancesInLastDay() throws SQLException{
		List<Performance> result = new ArrayList<Performance>();
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM performances" + " WHERE quizID='" + quizID + "' AND DATE(timeStamp)=CURDATE();";
		ResultSet rs = stmt.executeQuery(query);
		while(rs.next()){
			result.add( new Performance(rs.getInt("quizID"), rs.getString("userID"), rs.getInt("score"), rs.getInt("timeInseconds"), rs.getTimestamp("timeStamp").toString() ) );
		}		
		return result;
	}

	/**
	 * Returns a list of 'num' most recent performances for this quiz.
	 */
	public List<Performance> loadRecentPerformances(Integer num) throws SQLException{
		List<Performance> result = new ArrayList<Performance>();
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM performances" + " WHERE quizID='" + quizID + "' ORDER BY timeStamp DESC;";
		ResultSet rs = stmt.executeQuery(query);
		int count = 0;
		while(rs.next() && count<num){
			count++;
			result.add( new Performance(rs.getInt("quizID"), rs.getString("userID"), rs.getInt("score"), rs.getInt("timeInseconds"), rs.getTimestamp("timeStamp").toString() ) );
		}		
		return result;		
	}
	
	/**
	 * Returns the list of all performances associated with this quiz.
	 */
	public List<Performance> loadPerformances() throws SQLException{
		List<Performance> result = new ArrayList<Performance>();
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM performances" + " WHERE quizID='" + quizID + "'";
		ResultSet rs = stmt.executeQuery(query);
		while(rs.next()){		
			result.add( new Performance(rs.getInt("quizID"), rs.getString("userID"), rs.getInt("score"), rs.getInt("timeInseconds"), rs.getTimestamp("timeStamp").toString() ) );
		}
		return result;
	}
	
	/**
	 * Returns a list of 'num' top performances for this quiz.
	 * Criteria is first score and then completion time
	 */
	public List<Performance> loadTopPerformances(Integer num) throws SQLException{
		List<Performance> result = new ArrayList<Performance>();
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM performances" + " WHERE quizID='" + quizID + "' ORDER BY score DESC, timeInSeconds ASC;";
		ResultSet rs = stmt.executeQuery(query);
		int count = 0;
		while(rs.next() && count<num){
			count++;
			result.add( new Performance(rs.getInt("quizID"), rs.getString("userID"), rs.getInt("score"), rs.getInt("timeInseconds"), rs.getTimestamp("timeStamp").toString() ) );
		}		
		return result;
	}


	/**
	 * Sets isReported as 'true' for this quiz.
	 */
	public void reportQuiz() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "UPDATE quizzes SET isReported='1' WHERE quizID='" +quizID+ "';";
		stmt.executeUpdate(query);
	}
	
	
	/**
	 * Returns the list of questions associated with this quiz.
	 */
	//test
	public List<Question> loadQuestions() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM quiz2question" + " WHERE quizID='" + quizID + "'";
		ResultSet rs = stmt.executeQuery(query);
		List<Integer> questionIDs = new ArrayList<Integer>();
		while(rs.next()){
			questionIDs.add(rs.getInt("questionID"));
		}
		List<Question> result = new ArrayList<Question>();
		for(Integer questionID: questionIDs){
			result.add(Question.loadQuestion(questionID));
		}
		if(isRandom) Collections.shuffle(result);
		return result;
	}
	
	
	/**
	 * Deletes recursively all the questions of this Quiz from DB.
	 * Note: Does not delete the quiz itself.
	 */
	public void deleteQuestions() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM quiz2question" + " WHERE quizID='" + quizID + "'";
		ResultSet rs = stmt.executeQuery(query);
		List<Integer> questionIDs = new ArrayList<Integer>();
		while(rs.next()){
			questionIDs.add(rs.getInt("questionID"));
		}
		//deleting questions from quiz2question table in DB.
		query = "DELETE FROM quiz2question" + " WHERE quizID='" + quizID + "'";
		stmt.executeUpdate(query);
		//deleting question from tables questions_table and answers_table
		for(Integer questionID: questionIDs){
			query = "DELETE FROM questions" + " WHERE questionID='" + questionID + "'";
			stmt.executeUpdate(query);			
			query = "DELETE FROM answers" + " WHERE questionID='" + questionID + "'";
			stmt.executeUpdate(query);			
		}

	}

	/**
	 * Returns a list of reported quizzes for admin purposes.
	 */
	public static List<Quiz> loadReportedQuizzes() throws SQLException{
		List<Quiz> result = new ArrayList<Quiz>();
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM quizzes WHERE isReported='1';";
		ResultSet rs = stmt.executeQuery(query);
		while(rs.next()){
			Quiz q = new Quiz(rs.getString("title"), rs.getString("description"), rs.getString("owner"), rs.getString("category"), rs.getInt("numLikes"), rs.getInt("numDislikes"), rs.getBoolean("isRandom"), rs.getBoolean("isMultiplePage"), rs.getBoolean("isPracticeEnabled"), rs.getBoolean("isImmediateCorrectionEnabled"), rs.getBoolean("isReported"), rs.getInt("timeInSeconds"));
			q.quizID = rs.getInt("quizID");
			q.timeStamp = rs.getTimestamp("timeStamp").toString();
			result.add(q);
		}
		return result;
	}

	/**
	 * Returns the number of all performances.
	 */
	public static Integer numQuizzesTaken() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT COUNT(*) as 'count' FROM performances;";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()){
			return rs.getInt("count");			
		}
		return 0;
	}	

	/**
	 * Returns the number of all quizzes.
	 */
	public static Integer numQuizzes() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT COUNT(*) as 'count' FROM quizzes;";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()){
			return rs.getInt("count");			
		}
		return 0;
	}	

	/**
	 * Deletes all the history for the given quizID
	 */
	public static void clearHistoryForQuiz(Integer quizID) throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "DELETE FROM performances WHERE quizID='" +quizID+ "';";
		stmt.executeUpdate(query);
	}
	
	/**
	 * Deletes all the history for this quiz
	 */
	public void clearHistory() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "DELETE FROM performances WHERE quizID='" +quizID+ "';";
		stmt.executeUpdate(query);
	}

	
	/**
	 * Deletes a quiz and recursively all the questions and information associated with it.
	 */
	public static void deleteQuiz(Integer quizID) throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM quiz2question" + " WHERE quizID='" + quizID + "'";
		ResultSet rs = stmt.executeQuery(query);
		List<Integer> questionIDs = new ArrayList<Integer>();
		while(rs.next()){
			questionIDs.add(rs.getInt("questionID"));
		}
		//deleting quesions from quiz2question table in DB.
		query = "DELETE FROM quiz2question" + " WHERE quizID='" + quizID + "'";
		stmt.executeUpdate(query);
		//deleting question from tables questions_table and answers_table
		for(Integer questionID: questionIDs){
			query = "DELETE FROM questions" + " WHERE questionID='" + questionID + "'";
			stmt.executeUpdate(query);			
			query = "DELETE FROM answers" + " WHERE questionID='" + questionID + "'";
			stmt.executeUpdate(query);			
		}
		//Deleting quiz Info
		query = "DELETE FROM quizzes" + " WHERE quizID='" + quizID + "'";
		stmt.executeUpdate(query);
		query = "DELETE FROM performances" + " WHERE quizID='" + quizID + "'";
		stmt.executeUpdate(query);					
	}
	
	/**
	 * Returns a list of all quizzes by the given category. 
	 */
	public static List<Quiz> loadQuizzesByCategory(String category) throws SQLException{
		List<Quiz> result = new ArrayList<Quiz>();
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM quizzes WHERE category='" + category + "' ORDER BY timeStamp DESC;";
		ResultSet rs = stmt.executeQuery(query);
		List<Integer> quizIDs = new ArrayList<Integer>();
		while(rs.next()){
			quizIDs.add(rs.getInt("quizID"));
		}
		for(Integer quizID: quizIDs){
			result.add(loadQuiz(quizID));
		}
		return result;
	}
	
	/**
	 * Returns a list of all quizzes (in chronological order). 
	 */
	public static List<Quiz> loadAllQuizzes() throws SQLException{
		List<Quiz> result = new ArrayList<Quiz>();
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM quizzes ORDER BY timeStamp DESC;";
		ResultSet rs = stmt.executeQuery(query);
		List<Integer> quizIDs = new ArrayList<Integer>();
		while(rs.next()){
			quizIDs.add(rs.getInt("quizID"));
		}
		for(Integer quizID: quizIDs){
			result.add(loadQuiz(quizID));
		}
		return result;
	}
	
	
	/**
	 * Returns a list of most popular quizzes (that have been taken most). 
	 * Argument is the number of quizzes to be loaded.  
	 */
	public static List<Quiz> loadPopularQuizzes(Integer num) throws SQLException{
		List<Quiz> result = new ArrayList<Quiz>();
		Statement stmt = myConnection.stmt();
		String query = "SELECT quizID,COUNT(*) as 'numTaken' FROM performances GROUP BY quizID ORDER BY numTaken DESC";
		ResultSet rs = stmt.executeQuery(query);
		int count = 0;
		List<Integer> quizIDs = new ArrayList<Integer>();
		while(rs.next() && count<num){
			count++;
			quizIDs.add(rs.getInt("quizID"));
		}
		for(Integer quizID: quizIDs){
			result.add(loadQuiz(quizID));
		}
		return result;		
	}

	/**
	 * Returns a list of quizzes recently created. 
	 * Argument is the number of quizzes to be loaded.  
	 */
	public static List<Quiz> loadRecentQuizzes(Integer num) throws SQLException{
		List<Quiz> result = new ArrayList<Quiz>();
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM quizzes ORDER BY timeStamp DESC;";
		ResultSet rs = stmt.executeQuery(query);
		int count = 0;
		List<Integer> quizIDs = new ArrayList<Integer>();
		while(rs.next() && count<num){
			count++;
			quizIDs.add(rs.getInt("quizID"));
		}
		for(Integer quizID: quizIDs){
			result.add(loadQuiz(quizID));
		}
		return result;		
	}
	
	/**
	 * Returns the average score for this quiz.
	 * Warning: returns -1.0 if no performance is stored for this quiz.
	 */
	public Double averageScore() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT AVG(score) as 'averageScore' FROM performances WHERE quizID='" +quizID+ "';";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()){
			return rs.getDouble("averageScore");
		}
		return -1.0;
	}
	
	/**
	 * Returns the average completion time for this quiz.
	 * Warning: returns -1.0 if no performance is stored for this quiz.
	 */
	public Double averageCompletionTime() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT AVG(timeInSeconds) as 'averageTime' FROM performances WHERE quizID='" +quizID+ "';";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()){
			return rs.getDouble("averageTime");
		}
		return -1.0;
	}

	/**
	 * Adds or modifies the rating from userID for this quizID.
	 */
	public void addRating(String userID, boolean likes) throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM ratings WHERE quizID='" +quizID+ "' AND userID='" +userID+ "';";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()){
			//userID already have rated this quizID >> should override
			query = "UPDATE ratings SET likes='" +(likes? 1:0)+ "' WHERE quizID='" +quizID+ "' AND userID='" +userID+ "';";
			stmt.executeUpdate(query);
		}
		else{
			//new rating by this userID
			query = "INSERT INTO ratings VALUES ('" +quizID+ "','" +userID+ "','" +(likes?1:0)+ "');";
			stmt.executeUpdate(query);			
		}
	}
	
	/**
	 * Returns the number of likes for this quizID from the ratings table.
	 */
	public Integer numLikes() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT COUNT(*) as 'numLikes' FROM ratings WHERE quizID='" +quizID+ "' AND likes='1';";
		ResultSet rs = stmt.executeQuery(query);		
		if(rs.next()){
			return rs.getInt("numLikes");
		}
		return 0;
	}
		
	/**
	 * Returns the number of dislikes for this quizID from the ratings table.
	 */
	public Integer numDislikes() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT COUNT(*) as 'numLikes' FROM ratings WHERE quizID='" +quizID+ "' AND likes='0';";
		ResultSet rs = stmt.executeQuery(query);		
		if(rs.next()){
			return rs.getInt("numLikes");
		}
		return 0;
	}
	//******************************** Helper Functions ******************************
	/**
	 * Helper function.
	 * Returns the next messageID to be used for storing purposes.
	 */
	protected static Integer getNextID() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM counters WHERE type='quizID';";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()){ 
			//already a counter available for quizID
			Integer count = rs.getInt("count");
			query = "UPDATE counters SET count='" + (count+1) + "' WHERE type='quizID';";
			stmt.executeUpdate(query);
			return count;
		}
		else{
			//No counter available for quizID
			query = "INSERT INTO counters VALUES ('quizID','1');";
			stmt.executeUpdate(query);			
			return 1;
		}
	}

	/*
	 * Helper function for debugging purposes
	 */
	protected void print() throws SQLException{
		System.out.println("quizID:"+ quizID+" title:"+title+" owner:"+owner+" category:"+category+" "+ timeStamp);
		System.out.println("            numLikes:"+numLikes+ " numDislikes:"+numDislikes);
		System.out.println("            description:"+description);
		System.out.println("            isRandom:"+isRandom+" isMultiplePage:"+isMultiplePage+" isReported:"+isReported);
		System.out.println("            Questions with questionIDs:");
		List<Question> questions = loadQuestions();
		for(Question q: questions){
			System.out.println("            "+q.questionID);
		}
	}

	
	
	//test
	public static void main(String[] args) throws SQLException{
		DBConnection con = new DBConnection();
		Quiz.initDBConnection(con);
		Question.initDBConnection(con);
				
//		Quiz.loadPopularQuizzes(10);
//		Quiz.loadRecentQuizzes(10);
//		for(Quiz a: Quiz.loadRecentQuizzes(10)){
//			a.print();
//		}
		System.out.println("Running...");
		
		Quiz q = new Quiz("Basic Math","This is a basic math quiz!","David","MATH_AND_SCIENCE",50,20,true,false, false, false, false, 60);
		q.saveQuiz();
		
		List<String> left = new ArrayList<String>();
		List<String> right = new ArrayList<String>();
		left.add("2+2=4");
		left.add("7+2=10");
		left.add("1+3=5");
		right.add("1");
		right.add("0");
		right.add("0");
		q.addQuestion("Select the correct statement from the bellow", "", "MC", 20, left, right);
		left.clear();
		right.clear();
		left.add("2*10=30");
		left.add("7-5=2");
		left.add("0*9=90");
		right.add("0");
		right.add("1");
		right.add("0");
		q.addQuestion("Select the correct statement from the bellow", "", "MC", 20, left, right);
		left.clear();
		right.clear();
		left.add("2+20=24");
		left.add("35/7=7");
		left.add("56/8=7");
		right.add("0");
		right.add("0");
		right.add("1");
		q.addQuestion("Select the correct statement from the bellow", "", "MC", 20, left, right);		
		q.print();
				
		q.addPerformance("Brad", 2, 60);
		q.addPerformance("Soheil", 2, 61);
		q.addPerformance("Soheil", 2, 7);
		q.addPerformance("Soheil", 2, 9);
		q.addPerformance("Soheil", 2, 1);
		q.addPerformance("Soheil", 2, 5);
		q.addPerformance("Soheil", 2, 2);
		q.addPerformance("Angelina", 2, 59);
		q.addPerformance("David", 3, 58);
		q.addPerformance("Priyanka", 3, 60);
		q.addPerformance("Tom", 1, 60);
		
		q.reportQuiz();
		
		System.out.println(q.numTaken());
		System.out.println(q.numQuestions());
		System.out.println(q.averageCompletionTime());
		System.out.println(q.averageScore());
		
		for(Performance p: q.loadTopPerformances(10)){
			p.print();
		}
		
		for(Quiz asd: Quiz.loadReportedQuizzes()){
			asd.print();
		}
		
		Quiz nq = Quiz.loadQuiz(33);
		System.out.println(nq.averageCompletionTime());
		
//		List<Integer> nums = new ArrayList<Integer>();
//		for(int i=0;i<10;i++){ nums.add(i);}
//		Collections.shuffle(nums);
//		System.out.println(nums);
		
	}
	
	
}
