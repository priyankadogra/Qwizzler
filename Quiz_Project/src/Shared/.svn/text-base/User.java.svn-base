package Shared;

import java.security.MessageDigest;
import java.sql.*;
import java.util.*;

import SQL.DBConnection;

public class User {

	
	//******************************** Variables ******************************
	// connection to DB. shared across all sub-DB classes
	private static DBConnection myConnection;
	
	public String userID;
	public String firstName;
	public String lastName;
	public String imageURL = "http://t2.gstatic.com/images?q=tbn:ANd9GcTN1w8BZuWRlzsM4Vt1hwCeKDsUE-_a-YTLXi14Va0Lsf88Gi0heg"; 
	public String achievementCode;
	public Integer numQuizzesCreated;  	
	public Integer numQuizzesTaken;  

	public boolean isAdmin;
	public boolean isPrivate; 	//TODO://Create privacy settings which determine whether or not a user’s quiz performance shows up 

	//******************************** Constructors ******************************
	public static void initDBConnection(DBConnection con){
		myConnection = con;
	}

	public User(){};

	/*
	 * Constructor used after a user is created.
	 * Note: Creates a User object locally. Should call saveUser() method on the object to store it in DB.
	 */
	public User(String userID, String firstName, String lastName, String imageURL){
		this.userID = userID;
		this.firstName = firstName;
		this.lastName = lastName;
		this.imageURL = imageURL;
		if(imageURL=="") this.imageURL = DEFAULT_URL;
		this.numQuizzesTaken = 0;
		this.numQuizzesCreated = 0;
		this.achievementCode = "0000000000";
		this.isAdmin = false;
		this.isPrivate = false;
	}

	/*
	 * Constructor used by Database class.
	 * Note: Creates a User object locally. Should call saveUser() method on the object to store it in DB.
	 */
	public User(String userID, String firstName, String lastName, String imageURL,
				String achievementCode, Integer numQuizzesCreated, Integer numQuizzesTaken,
				boolean isAdmin, boolean isPrivate){
		this.userID = userID;
		this.firstName = firstName;
		this.lastName = lastName;
		this.imageURL = imageURL;
		this.numQuizzesTaken = numQuizzesTaken;
		this.numQuizzesCreated = numQuizzesCreated;
		this.achievementCode = achievementCode;
		this.isAdmin = isAdmin;
		this.isPrivate = isPrivate;
	}
	
	
	//*********************************************************************
	//******************** Login (Completed) ******************************
	//*********************************************************************
	
	/**
	 * isNewUser(String userID)
	 * Returns true if userID is not found in DB.
	 */
	public static boolean isNewUser(String userID) throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM login" + " WHERE userID='" + userID + "'";
		ResultSet rs = stmt.executeQuery(query);
		if(!rs.next()) return true;
		return false;
	}
	
	/**
	 * isLoginCorrect(String userID, String password)
	 * Returns true if (userID, getHash(password) ) exists in DB.
	 */
	public static boolean isLoginCorrect(String userID, String password) throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM login" + " WHERE userID='" + userID + "'";
		ResultSet rs = stmt.executeQuery(query); 
		if(rs.next()) {
			String hashedPassword = rs.getString("password");
			if(getHash(password).equals(hashedPassword)){
				return true;
			}
		}
		return false;
	}
	
	/**
	 * Stores the new password in login_table
	 */
	public void changePassword(String newPassword) throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "DELETE FROM login WHERE userID='" + userID + "';";
		stmt.executeUpdate(query);
		query = "INSERT INTO login VALUES('" + userID + "','" + getHash(newPassword) + "');";
		stmt.executeUpdate(query);
	}
	
	/**
	 * saveNewLogin(String userID, String password)
	 * Stores (userID, getHash(password) ) into DB only if the userID is new. 
	 */
	public void saveNewLogin(String userID, String password) throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "INSERT INTO login VALUES('" + userID + "','" + getHash(password) + "');";
		if(isNewUser(userID)) stmt.executeUpdate(query);
	}

	
	/**
	 * Returns the number of all users.
	 */
	public static Integer numUsers() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT COUNT(*) as 'count' FROM users;";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()){
			return rs.getInt("count");			
		}
		return 0;
	}	
	
	/**
	 * Deletes useIDToBeDeleted and recursively everything associated to him. (e.g. messages, quizzes, questions, etc.)
	 */
	public void deleteUser(String userIDToBeDeleted) throws SQLException{
		if(isAdmin==false){
			//this user is not admin and cannot make someone else Admin!
			return;
		}
		if(userIDToBeDeleted==userID){
			//cannot delete himself!
			return;
		}
		//delete the user from any related table in DB.
		Statement stmt = myConnection.stmt();
		String query = "DELETE FROM login WHERE userID='" +userIDToBeDeleted+ "';";
		stmt.executeUpdate(query);
		query = "DELETE FROM users WHERE userID='" +userIDToBeDeleted+ "';";
		stmt.executeUpdate(query);
		query = "DELETE FROM friendships WHERE userID1='" +userIDToBeDeleted+ "' OR userID2='" +userIDToBeDeleted+ "';";
		stmt.executeUpdate(query);
		query = "DELETE FROM messages WHERE fromUserID='" +userIDToBeDeleted+ "' OR toUserID='" +userIDToBeDeleted+ "';";
		stmt.executeUpdate(query);
		query = "DELETE FROM performances WHERE userID='" +userIDToBeDeleted+ "';";
		stmt.executeUpdate(query);
		query = "DELETE FROM announcements WHERE userID='" +userIDToBeDeleted+ "';";
		stmt.executeUpdate(query);
		query = "DELETE FROM ratings WHERE userID='" +userIDToBeDeleted+ "';";
		stmt.executeUpdate(query);
		
		//Detecting all quizzes created by this user
		query = "SELECT * FROM quizzes WHERE owner='" + userID + "';";
		ResultSet rs = stmt.executeQuery(query);
		List<Integer> quizIDs = new ArrayList<Integer>();
		while(rs.next()){
			quizIDs.add(rs.getInt("quizID"));
		}
		
		//For each created quiz: Deleting all the related questions and the quiz info
		for(Integer quizID: quizIDs){
			Quiz.deleteQuiz(quizID);
		}

	}

	public void makeAdmin(String userIDToBeAdmin) throws SQLException{
		if(isAdmin==false){
			//this user is not admin and cannot make someone else Admin!
			return;
		}
		Statement stmt = myConnection.stmt();
		String query = "UPDATE users SET isAdmin='1' WHERE userID='" +userIDToBeAdmin+ "';";
		stmt.executeUpdate(query);
	}

	//*********************************************************************
	//************************ Loading Users ******************************
	//*********************************************************************
	
	/**
	 * Returns the User given the userID.
	 * (null if invalid userID)
	 */
	public static User loadUser(String userID) throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM users" + " WHERE userID='" + userID + "'";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()) {		//valid user
			User user =  new User(rs.getString("userID"), rs.getString("firstName"), rs.getString("lastName"), rs.getString("imageURL"),
					rs.getString("achievementCode"), rs.getInt("numQuizzesCreated"), rs.getInt("numQuizzesTaken"),
					rs.getBoolean("isAdmin"), rs.getBoolean("isPrivate"));
			//TODO: clean :D
			user.numQuizzesCreated = user.numQuizzesCreated();
			user.numQuizzesTaken = user.numQuizzesTaken();
			user.achievementCode = user.getAchievementCode();
			return user;
		}
		else return null;
	}
	
	/**
	 * Stores this User object in DB.
	 * Overrides previous information for userID.
	 * @throws SQLException
	 */
	public void saveUser() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM users" + " WHERE userID='" + userID + "'";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()) {		//delete - user already in DB
			query = "DELETE FROM users" + " WHERE userID='" + userID + "'";
			stmt.executeUpdate(query);
		}		
		//add - user not in DB
		query = "INSERT INTO users VALUES('" + userID + "','" + firstName + "','" + lastName + "','" + imageURL + "','" + achievementCode + "','" + numQuizzesCreated + "','" + numQuizzesTaken + "','" + (isAdmin? 1:0) + "','" + (isPrivate? 1:0) + "');"; 
		stmt.executeUpdate(query);
	}

	
	/**
	 * Returns the WHOLE list of users for admin to look at
	 */
	public static List<User> loadListUsers() throws SQLException {
		List<User> result = new ArrayList<User>();
		DBConnection connection = new DBConnection();
		Statement stmt = connection.stmt();
		String query = "SELECT * FROM users;";
		ResultSet rs = stmt.executeQuery(query);
		while(rs.next()) {		//for every row in table
 
			User user =	new User(rs.getString("userID"), rs.getString("firstName"), rs.getString("lastName"), rs.getString("imageURL"),
					rs.getString("achievementCode"), rs.getInt("numQuizzesCreated"), rs.getInt("numQuizzesTaken"),
					rs.getBoolean("isAdmin"), rs.getBoolean("isPrivate")); 
			//TODO: clean :D
			user.numQuizzesCreated = user.numQuizzesCreated();
			user.numQuizzesTaken = user.numQuizzesTaken();
			user.achievementCode = user.getAchievementCode();
			result.add(user);
		}
		return result;
	}
		
	//**********FRIENDS***********/
	/**
	 * Returns a list of this user's friends 
	 */
	public List<User> loadFriends() throws SQLException {
		List<User> result = new ArrayList<User>();
		Statement stmt = myConnection.stmt();
		String query = "SELECT userID2 FROM friendships WHERE userID1='" + userID + "';";
		ResultSet rs = stmt.executeQuery(query);
		List<String> friends = new ArrayList<String>();
		while(rs.next()){
			friends.add(rs.getString("userID2"));
		}
		for(String f: friends){
			result.add(loadUser(f));
		}
		return result;		
	}

	/**
	 * Returns a list of 'num' most recent performances by this user.
	 */
	public List<Performance> loadPerformances(Integer num) throws SQLException{
		List<Performance> result = new ArrayList<Performance>();
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM performances WHERE userID='" +userID+ "';";
		ResultSet rs = stmt.executeQuery(query);
		int count=0;
		while(rs.next() && count<num){
			result.add( new Performance(rs.getInt("quizID"), rs.getString("userID"), rs.getInt("score"), rs.getInt("timeInSeconds"), rs.getTimestamp("timeStamp").toString() ) );
		}
		return result;
	}

	
	/**
	 * Returns a list of 'num' most recent performances by this user's friends.
	 */
	public List<Performance> loadFriendPerformances(Integer num) throws SQLException{
		List<Performance> result = new ArrayList<Performance>();
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM friendships JOIN performances ON friendships.userID2 = performances.userID "+
					   "WHERE friendships.userID1='" +userID+ "' ORDER BY timeStamp DESC";
		ResultSet rs = stmt.executeQuery(query);
		int count=0;
		while(rs.next() && count<num){
			result.add( new Performance(rs.getInt("quizID"), rs.getString("userID"), rs.getInt("score"), rs.getInt("timeInSeconds"), rs.getTimestamp("timeStamp").toString() ) );
		}
		return result;
	}
	
	/**
	 * Returns a list of 'num' most recent quizzes by this user's friends.
	 */
	public List<Quiz> loadFriendQuizzes(Integer num) throws SQLException{
		List<Quiz> result = new ArrayList<Quiz>();
		Statement stmt = myConnection.stmt();
		ResultSet rs = stmt.executeQuery("SELECT * FROM friendships where userID1='" +userID+ "';" );
		List<String> friendIDs = new ArrayList<String>();
		while(rs.next()){
			friendIDs.add(rs.getString("userID2"));
		}
		String query = "SELECT * FROM quizzes ORDER BY timeStamp DESC;";
		rs = stmt.executeQuery(query);
		int count=0;
		while(rs.next() && count<num){
			if(friendIDs.contains(rs.getString("owner"))){
				Quiz q = new Quiz(rs.getString("title"), rs.getString("description"), rs.getString("owner"), rs.getString("category"), rs.getInt("numLikes"), rs.getInt("numDislikes"), rs.getBoolean("isRandom"), rs.getBoolean("isMultiplePage"), rs.getBoolean("isPracticeEnabled"), rs.getBoolean("isImmediateCorrectionEnabled"), rs.getBoolean("isReported"), rs.getInt("timeInSeconds"));
				q.quizID = rs.getInt("quizID");
				q.timeStamp = rs.getTimestamp("timeStamp").toString();
				result.add(q);				
			}
		}
		return result;
	}

	
	
	/**
	 * Gets a list of suggested users for the autocomplete function. Returns five users, first from
	 * the user's friends, and then from the general user list for the whole site.
	 * @param term
	 * @return
	 * @throws SQLException 
	 */
	public List<User> loadSuggestions(String term, int limit) throws SQLException{
		List<User> result = new ArrayList<User>();
		Statement stmt = myConnection.stmt();
		String friendQuery = "SELECT * FROM friendships JOIN users ON friendships.userID2 = users.userID " +
				"WHERE friendships.userID1='" + this.userID + "' " +
				"AND (users.lastName LIKE '%" + term + "%' " +
				"OR users.firstName LIKE '%" + term + "%' " +
				"OR users.userID LIKE '%" + term + "%')";
		ResultSet rs = stmt.executeQuery(friendQuery);
		List<String> friendUserIDs = new ArrayList<String>();
		while(rs.next()){
			friendUserIDs.add(rs.getString("userID"));
		}
		for(int i = 0, cap = result.size(); i < friendUserIDs.size() && result.size() <= limit; i++, cap = result.size()){
			String userID = friendUserIDs.get(i);
			result.add(loadUser(userID));
		}
		if(friendUserIDs.size() < limit){
			String strangerQuery = "SELECT * FROM users " +
					"WHERE users.userID NOT IN (SELECT userID2 FROM friendships where userID1='" + this.userID + "') " +
					"AND (users.lastName LIKE '%" + term + "%' " +
					"OR users.firstName LIKE '%" + term + "%' " +
					"OR users.userID LIKE '%" + term + "%');";
			ResultSet rs2 = stmt.executeQuery(strangerQuery);
			List<String> strangerUserIDs = new ArrayList<String>();
			while(rs2.next()){
				strangerUserIDs.add(rs2.getString("userID"));
			}
			for(int i = 0, cap = result.size(); i < strangerUserIDs.size() && result.size() <= limit; i++, cap = result.size()){
				String userID = strangerUserIDs.get(i);
				result.add(loadUser(userID));
			}
		}
		return result;
	}
	
	/**
	 * loads the most recent n friends added, with friend.username, lastname, firstname
	 */	
//	public List<User> loadListFriends(String username, Integer n) throws SQLException {
//	}
	
	/**
	 * loads friend number idx to idx+(n-1) ordered by most recently added first, 
	 * with friend.username, lastname, firstname
	 */	
//	public List<User> loadListFriends(String username, Integer idx, Integer n) throws SQLException {
//	}
	

	/**
	 * Returns true if userID1 and userID2 are friends.
	 */
	public static boolean isFriendship(String userID1, String userID2) throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM friendships" + " WHERE userID1='" + userID1 + "'" + " AND userID2='" + userID2 + "';";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()) {		
			//already friends
			return true;
		}		
		return false;
	}

	/**
	 * Adds friend to user's list of friends, and vice versa. Should be called
	 * only after a friend request has been accepted.
	 * @param username
	 * @param friend
	 * @throws SQLException
	 */
	public static void saveFriendship(String userID1, String userID2) throws SQLException{
		if(!userExists(userID1) || !userExists(userID2)) return; //invalid user(s)
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM friendships" + " WHERE userID1='" + userID1 + "'" + " AND userID2='" + userID2 + "';";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()) {		
			//already friends
			return;
		}
		else{
			query = "INSERT INTO friendships VALUES ('" + userID1 +"','" + userID2 + "'),('" + userID2 + "','"+ userID1 + "');";
			stmt.executeUpdate(query);
		}
	}
	
	
	/**
	 * Removes friend link between userID1 and userID2
	 */
	public static void removeFriendship(String userID1, String userID2) throws SQLException{ 
		if(!userExists(userID1) || !userExists(userID2)) return; //invalid user(s)
		Statement stmt = myConnection.stmt();
		String query = "DELETE FROM friendships" + " WHERE userID1='" + userID1 + "'" + " AND userID2='" + userID2 + "';";
		stmt.executeUpdate(query);
		query = "DELETE FROM friendships" + " WHERE userID1='" + userID2 + "'" + " AND userID2='" + userID1 + "';";
		stmt.executeUpdate(query);
	}
	
	//*********************************************************************
	//******************************** User's Messages  *******************
	//*********************************************************************

	/** 
	 * Returns the number of UNREAD messages for this user
	 */
	public Integer numUnreadMessages() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT COUNT(messageID) FROM messages" + " WHERE toUserID='" + userID + "'" + " AND isRead='FALSE';";
		ResultSet rs = stmt.executeQuery(query);
		rs.absolute(1);
		return rs.getInt("COUNT(messageID)");
	}
	
	/** 
	 * Returns the messages received by this user.
	 */
	public List<Message> loadMessages() throws SQLException{
		List<Message> result = new ArrayList<Message>();
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM messages" + " WHERE toUserID='" + userID + "';";
		ResultSet rs = stmt.executeQuery(query);
		while(rs.next()){
			result.add( new Message(rs.getInt("messageID"), rs.getString("fromUserID"), rs.getString("toUserID"), 
					    rs.getTimestamp("timeStamp").toString(), rs.getString("subject"), rs.getString("body"), rs.getBoolean("isRead"), 
					    rs.getString("type"), rs.getInt("quizID"), rs.getInt("score"), rs.getInt("timeInSeconds") )
					);
		}		
		return result;
	}	
	
	/**
	 * Used to make an announcement by this user.
	 * Note: Only works on Admin users.
	 */
	public void makeAnnouncement(String text) throws SQLException{
		if(isAdmin==false){
			//cannot make announcement because user is not admin
			return;
		}
		Statement stmt = myConnection.stmt();
		Integer newID = Announcement.getNextID();
		String query = "INSERT INTO announcements VALUES ('" +newID+ "','" + userID+ "','" +text+ "',CURRENT_TIMESTAMP());";   
		stmt.executeUpdate(query);
	}
	
	/**
	 * Sends a note message originating from this user to the 'toUserID' 
	 * with the given arguments 'subject' and 'body'.
	 * (Will Stores the message with correct messageID in DB.)
	 */
	public void sendNoteMessage(String toUserID, String subject, String body) throws SQLException{
		Statement stmt = myConnection.stmt();
		Integer newID = Message.getNextID();
		String query = "INSERT INTO messages VALUES ('" +newID+ "','" + userID+ "','" +toUserID+ "',CURRENT_TIMESTAMP(),'" +subject+ "','" +body+ "','0','NOTE','0','0','0');";  
		stmt.executeUpdate(query);
	}
	
	/**
	 * Sends a friend request message originating from this user to the 'toUserID' 
	 * (Will Stores the message with correct messageID in DB.)
	 */
	public void sendFriendRequestMessage(String toUserID) throws SQLException{
		Statement stmt = myConnection.stmt();
		Integer newID = Message.getNextID();
		String subject = "Friendship request from "+ firstName+ " "+ lastName;
		String body = firstName+ " "+ lastName + " has sent you a friend request. Click on one of the buttons below to accpet or ignore this request.";
		String query = "INSERT INTO messages VALUES ('" +newID+ "','" + userID+ "','" +toUserID+ "',CURRENT_TIMESTAMP(),'" +subject+ "','" +body+ "','0','FRIEND','0','0','0');";  
		stmt.executeUpdate(query);
	}
	
	/**
	 * Sends a challenge message originating from this user to the 'toUserID'
 	 * with the given arguments 'subject' and 'body'. 
	 * (Will Stores the message with correct messageID in DB.)
	 */
	public void sendChallengeMessage(String toUserID, Integer quizID) throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM quizzes WHERE quizID='" +quizID+ "';";
		ResultSet rs = stmt.executeQuery(query);
		String quizTitle = "";
		if(rs.next()){
			quizTitle = rs.getString("title");
		}
		else{ //not a valid quizID
			return;
		}		
		//finding the best score achieved by this user
		query = "SELECT * FROM performances" + " WHERE quizID='" +quizID+ "' AND userID='" +userID+  "' ORDER BY score DESC, timeInSeconds ASC;";
		rs = stmt.executeQuery(query);
		Integer score = 0;
		double timeInSeconds= 0;
		if(rs.next()){
			score = rs.getInt("score");
			timeInSeconds = rs.getDouble("timeInSeconds");
		}		
		Integer newID = Message.getNextID();
		String subject = "Quiz challenge request from "+ firstName+ " "+ lastName;
		String body = firstName+ " "+ lastName + ", who has achieved the score " +score+ " in " +(timeInSeconds / 1000)+ " seconds, has challenged you to take the quiz: " + quizTitle +"!" +
				"<input type=\"hidden\" id=\"quizToTake\" value=\"" + quizID + "\" />";
		query = "INSERT INTO messages VALUES ('" +newID+ "','" + userID+ "','" +toUserID+ "',CURRENT_TIMESTAMP(),'" +subject+ "','" +body+ "','0','CHALLENGE','" +quizID+ "','" +score+ "','" +timeInSeconds+ "');";
		stmt.executeUpdate(query);
	}
	

	//******************************** Quizzes ******************************
	
	/**
	 * Returns a list of quizzes created by this user.
	 */
	public List<Quiz> loadQuizzesCreated() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM quizzes WHERE owner='" + userID + "';";
		ResultSet rs = stmt.executeQuery(query);
		List<Quiz> result = new ArrayList<Quiz>();
		while(rs.next()){
			Quiz q = new Quiz(rs.getString("title"), rs.getString("description"), rs.getString("owner"), rs.getString("category"), rs.getInt("numLikes"), rs.getInt("numDislikes"), rs.getBoolean("isRandom"), rs.getBoolean("isMultiplePage"), rs.getBoolean("isPracticeEnabled"), rs.getBoolean("isImmediateCorrectionEnabled"), rs.getBoolean("isReported"), rs.getInt("timeInSeconds"));
			q.quizID = rs.getInt("quizID");
			q.timeStamp = rs.getTimestamp("timeStamp").toString();
			result.add(q);
		}
		return result;
	}
	
	/**
	 * Should be called once the user takes a quiz in practice mode. //TODO:
	 * Note: used for achievementCode purposes.
	 */
	//TODO: test
	public void achievedPracticeMode() throws SQLException{
		String newCode = getAchievementCode();
		newCode = newCode.substring(0,5) + "1" + newCode.substring(6,10);
		Statement stmt = myConnection.stmt();
		String query = "UPDATE users SET achievementCode='" +newCode+ "' WHERE userID='" +userID+ "';";
		stmt.executeUpdate(query);
	}
	
	/**
	 * Returns the most up-to-date achievementCode for this user.
	 */
	private String getAchievementCode() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT * FROM users WHERE userID='" +userID+ "';";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()){
			achievementCode = rs.getString("achievementCode");
			if(numQuizzesCreated()>=1) achievementCode = "1" + achievementCode.substring(1,10);
			if(numQuizzesCreated()>=5) achievementCode = achievementCode.substring(0,1) +"1" + achievementCode.substring(2,10);
			if(numQuizzesCreated()>=10) achievementCode = achievementCode.substring(0,2) +"1" + achievementCode.substring(3,10);
			if(numQuizzesTaken()>=10) achievementCode = achievementCode.substring(0,3) +"1"+ achievementCode.substring(4,10);
			//bestScore achievement >> taken care of in addPerformance() 
			//practiceMode achievement >> taken care of in by calling achievedPracticeMode() 
			if(numFriends()>=10) achievementCode = achievementCode.substring(0,6)+ "1" + achievementCode.substring(7,10);
			if(numFriends()>=5) achievementCode = achievementCode.substring(0,7)+ "1" + achievementCode.substring(8,10);
			if(numFriends()>=1) achievementCode = achievementCode.substring(0,8)+ "1" + achievementCode.substring(9,10);
			if(isAdmin) achievementCode = achievementCode.substring(0,9) +"1";			
			//setting zeros
			if(numQuizzesCreated()<1) achievementCode = "0" + achievementCode.substring(1,10);
			if(numQuizzesCreated()<5) achievementCode = achievementCode.substring(0,1) +"0" + achievementCode.substring(2,10);
			if(numQuizzesCreated()<10) achievementCode = achievementCode.substring(0,2) +"0" + achievementCode.substring(3,10);
			if(numQuizzesTaken()<10) achievementCode = achievementCode.substring(0,3) +"0"+ achievementCode.substring(4,10);
			if(numFriends()<10) achievementCode = achievementCode.substring(0,6)+ "0" + achievementCode.substring(7,10);
			if(numFriends()<5) achievementCode = achievementCode.substring(0,7)+ "0" + achievementCode.substring(8,10);
			if(numFriends()<1) achievementCode = achievementCode.substring(0,8)+ "0" + achievementCode.substring(9,10);
			if(!isAdmin) achievementCode = achievementCode.substring(0,9) +"0";			
		}
		//Updating in DB
		query = "UPDATE users SET achievementCode='" +achievementCode+ "' WHERE userID='" +userID+ "';";
		stmt.executeUpdate(query);
		return achievementCode;
	}

	/**
	 * Returns the number of friends for this user.
	 */
	public Integer numFriends() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT COUNT(*) as 'numFriends' FROM friendships WHERE userID1='" +userID+ "';";
		ResultSet rs = stmt.executeQuery(query);		
		if(rs.next()){
			return rs.getInt("numFriends");			
		}
		return 0;
	}
	
	/**
	 * Returns the number of quizzes created by this user.
	 */
	public Integer numQuizzesCreated() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT COUNT(*) as 'numQuizzesCreated' FROM quizzes WHERE owner='" +userID+ "';";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()){
			return rs.getInt("numQuizzesCreated");			
		}
		else return 0;
	}
	
	/**
	 * Returns the number of quizzes taken by this user.
	 */
	private Integer numQuizzesTaken() throws SQLException{
		Statement stmt = myConnection.stmt();
		String query = "SELECT COUNT(*) as 'numQuizzesTaken' FROM performances WHERE userID='" +userID+ "';";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()){
			return rs.getInt("numQuizzesTaken");
		}
		else return 0;
	}

	
	//******************************** Helper Functions ******************************

	/*
	 * Helper function for hashing passwords before storing in DB.
	 */
	private static String getHash(String string){		
		try{
			MessageDigest md = MessageDigest.getInstance("SHA");
			byte[] hash = md.digest(string.getBytes());
			return hexToString(hash);
		}
		catch(Exception e){
			e.printStackTrace();
			return null; //error
		}
	}
		
	
	/*
	 Given a byte[] array, produces a hex String,
	 such as "234a6f". with 2 chars for each byte in the array.
	 (provided code)
	*/
	private static String hexToString(byte[] bytes) {
		StringBuffer buff = new StringBuffer();
		for (int i=0; i<bytes.length; i++) {
			int val = bytes[i];
			val = val & 0xff;  // remove higher bits, sign
			if (val<16) buff.append('0'); // leading 0
			buff.append(Integer.toString(val, 16));
		}
		return buff.toString();
	}
	
	private static boolean userExists(String userID) throws SQLException{
		DBConnection con = new DBConnection();
		Statement stmt = con.stmt();
		String query = "SELECT * FROM users WHERE userID='" + userID + "';";
		ResultSet rs = stmt.executeQuery(query);
		if(rs.next()) {		
			return true;
		}
		return false;
	}

	//******************************** Main Function for testing ******************************

	public static void main(String[] args){
		DBConnection con = new DBConnection();
		User.initDBConnection(con);
		Quiz.initDBConnection(con);
		Message.initDBConnection(con);
		Announcement.initDBConnection(con);
		User db = new User();
		try {
			
			//Logins
			db.saveNewLogin("Soheil", "Soheil");
			db.saveNewLogin("Priyanka", "Priyanka");
			db.saveNewLogin("David", "David");
			db.saveNewLogin("Bill", "Bill");
			db.saveNewLogin("George", "George");
			db.saveNewLogin("Brad", "Brad");
			db.saveNewLogin("Tom", "Tom");
			db.saveNewLogin("Angelina", "Angelina");
			db.saveNewLogin("Lionel", "Lionel");
			db.saveNewLogin("Angelina", "Angelina");
			
			//Users
 			User u;
 			u = new User("Soheil","Soheil","Norouzi","data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBhMSEBQUEhIUFRUUEhQVGBAUFBYWFxcgHRUWGx8XFRoXHCceFx8vGxYXHzAsIycpLCwuGB4xNTAqNiYrLSkBCQoKDgsNGg8OGikkHyEsNCwsKSkpNCwpKiksLCwsKSwsLDUuKSwpKSw1KikuKSkpLCksKSwsKSkpKSkpKSkpKf/AABEIAEoASgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAQIDBgcEAAj/xAAyEAABAwIDBAgGAwEAAAAAAAABAAIRAyEEBRIGEzFRByIyQWFxgaEUQnKR0fBSscEz/8QAGQEAAgMBAAAAAAAAAAAAAAAAAgMAAQQF/8QAHhEAAgMBAQADAQAAAAAAAAAAAAECAxEhEgQxQRP/2gAMAwEAAhEDEQA/ALo0J4TU5qQWPCrW1W3tLAvawsdUc4aoaQIHjKNZrjxQoVKp+Rhd5mLD7wFgOdZxUxNZ1WpBcfT9siRTNSwvS5hnOh1Oowc7FXXB4+nUALHAyAYm8HmF81MRjZ/aKphqzajXElp7JJgjhB8FZD6GhIQuHZ7NficPTqwBqbcAzB5IjpVkGQl0qQNS6FCjgK8ConJ1NLDK70lNJy6rDohzCfHrRHv7LK8gyVtTrP4TYLYttcpOIwNZje0G6x5tvH2lZLQ1sp09LnN6oNgO8zJJ81H9B1peulpwuS0m8GAel0N2p2ZbuzVpgNLYJERIRHK8RWfhXvnrMnrBtz3KDK6dWqHCo+odTXtIcGwbcRHBKWp7pvmk45hbeiSvqwJbEaKrhPOQD/v9K7Cmqj0RYJzcC4mYdXeW+QawSPUH7K7imtJy2QBidu1OKadu1MK0AOpp1Nim3afTpIAhNzII5iFlL8Du2uY4DUwub9nEfhbBSZdUnpDy4MqNqaYbUYWSLda5m3fB9kM1w0USSkCNm6jdDgdUyO63n4iUey/Cth1gHXjkhOzzbBsCwI1mSeEc1a9mcEzeBoJNy4lxk+6Vms6DlkehrZ7LNzhaNP8AjTaPb9PqiO7U4Yl0LXmHGb16Q6EuhThiXQoCVreBObVCA/HnmpmY+OJQrpZYablUOk/Gk0qVMD5i9x5Wgelyp8XtMWg6GyR8x/CBb51d+qqZkXnlyTVW5cK/oo9BuR1KkCNIHNXvZYuFYeR1HkD/AFdUl+ZUaB00XsfJA1zLacmOtAvHgtDySgxlNuh2qbmpx1HvPghqocpd/B9/yIxhz9LWAvaULw+akHSRIHfyROjXa4S0ymyg4mSNikh4C9CVKgCMiFY2A4ldrcJYE3XFl3E/SUYo9hvl+E/49a8+jPfY/WHC/DNMjmDdDMyoNFBwdN7QDx+yLYc2d+96E7R/8h9Y/wAT39C4vWVvZvBOFRuqQ18AOOkjQXFpk8Q02ZBs7We4LTsBlbabi6m4tJ4gdk8pbw4LMKbz8Kbm+Og+IDQQDzAJJHJa7R4HzUp6iXcZMCIJNrpabiOsJBCQcPVece19JTWkxKbDuX4zWL8V1yg2V9pv0IyufavMsRupbnHWf//Z");
 			u.saveUser();
 			u = new User("Priyanka","Priyanka","Dogra","http://m3.licdn.com/mpr/mpr/shrink_100_100/p/3/000/024/024/08f9783.jpg");
 			u.saveUser();
 			u = new User("David","David","Rockwood","http://profile.ak.fbcdn.net/hprofile-ak-snc4/157706_1159440108_650735537_n.jpg");
 			u.isAdmin = true;
 			u.saveUser();
 			u = new User("Bill","Bill(FirstName)","Bill(LastName)","");
 			u.achievementCode = "1010101010";
 			u.saveUser();
 			u = new User("George","George","Clooney","https://encrypted-tbn0.google.com/images?q=tbn:ANd9GcQLcr6njyolkIdV4wnF4xqMSaR-p453KpVovPKD59fjDEwSiSPeiQ");
 			u.saveUser();
 			u = new User("Brad","Brad","Pitt","https://encrypted-tbn2.google.com/images?q=tbn:ANd9GcRvZCa505TSHuGlsTl6_o68ZkyuK81enUfr1W-nCtPI6d4Vb9bXjw");
 			u.saveUser();
 			u = new User("Tom","Tom","Cruise","https://encrypted-tbn1.google.com/images?q=tbn:ANd9GcRvHkHSy2lbVIdAAOveKQLqHXlpaDFm116fia0k4UXlReXpqxfU");
 			u.saveUser();
 			u = new User("Angelina","Angelina","Jolie","https://encrypted-tbn0.google.com/images?q=tbn:ANd9GcT09kJzqR7GbruyM7Gys5n889TaPvV0rVXiGpTQ_xWyLC6c58Jm");
 			u.saveUser();
 			u = new User("Lionel","Lionel","Messi","https://encrypted-tbn0.google.com/images?q=tbn:ANd9GcSna-fZLYzp88mecb_o6SLhWLOyE_iGol99PQoIHkgTf-VSnTlGYw");
 			u.saveUser();
 			
 			//Friendships
			User.saveFriendship("Soheil", "Priyanka");
			User.saveFriendship("Soheil", "David");
			User.saveFriendship("Priyanka", "David");
			User.saveFriendship("Brad", "David");
			User.saveFriendship("Tom", "David");
			User.saveFriendship("George", "David");
			User.saveFriendship("Angelina", "David");
			User.saveFriendship("Brad", "Priyanka");
			User.saveFriendship("Tom", "Priyanka");
			User.saveFriendship("George", "Priyanka");
			User.saveFriendship("Angelina", "Priyanka");
			User.saveFriendship("Brad", "Soheil");
			User.saveFriendship("Tom", "Soheil");
			User.saveFriendship("George", "Soheil");
			User.saveFriendship("Angelina", "Soheil");
			User.saveFriendship("Lionel", "Soheil");
			
			//Messages
			u = User.loadUser("Bill");
			u.sendFriendRequestMessage("David");
			u.sendNoteMessage("David", "This is the subject of a note message", "This is the body of a note message");
			u.sendChallengeMessage("David", 1);
			
			User d = User.loadUser("David");
			d.makeAnnouncement("An announcement from David!");
			d.makeAnnouncement("An announcement from David!");
			d.makeAnnouncement("An announcement from David!");
			List<User> df = d.loadFriends();
			for(User f : df){
				System.out.println(f.userID.toString());
			}
			List<Message> dm = d.loadMessages();
			for(Message m : dm){
				System.out.println(m.toString());				
			}
			
			
			for(Announcement a: Announcement.loadAnnouncements(2)){
				a.deleteAnnouncement();
			}

			
			
			
			df = User.loadListUsers();
			for(User user: df){
				user.print();
			}
			
			User soheil = User.loadUser("Soheil");
			List<Quiz> lq = soheil.loadFriendQuizzes(10);
			System.out.println("Testing loadFriendQuizzes---");
			for(Quiz q: lq){
				System.out.println(q.quizID);
			}
			
			
//			System.out.println(Message.getNextID());
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	
	/*
	 * Helper function for debugging purposes
	 */
	private void print(){
		System.out.println(userID+": "+firstName+" "+lastName+" | Achievements:"+ achievementCode);
	}
	
	
	//************************ some constants. can be adjusted ************************
	
	final static Integer NUM_FRIENDS_LOADED = 10; 
	final static Integer NUM_ANNOUNCEMENTS_LOADED = 10;
	final static Integer NUM_ACHIEVEMENTS_LOADED = 10; 
	final static Integer NUM_FRIEND_HISTORIES_LOADED = 10; 
	final static Integer NUM_POPULAR_QUIZZES_LOADED = 10; 
	final static Integer NUM_RECENT_QUIZZES_LOADED = 10; 
	final static Integer NUM_MESSAGES_LOADED = 10;
	
	public final static String[] ACH_TITLE = 
	{
		"Amateur Author",
		"Prolific Author",
		"prodigious Author",
		"Quiz Machine",
		"I am the Greatest",
		"Practice Makes Perfect",
		"The Lovelies!",
		"The sociable!",
		"Not a nerd anymore",
		"The Admin",
	};
	
	public final static String[] ACH_DESCRIPTION = 
	{
		"Congratulations! You have created your first quiz!",
		"Congratulations! You have created five quizzes!",
		"Congratulations! You have created ten quizzes!",
		"Congratulations! You have taken ten quizzes!",
		"Congratulations! You had the highest score on a quiz!",
		"Congratulations! You took a quiz in practice mode",
		"Congratulations! The number of your friends have reached ten!",
		"Congratulations! The number of your friends have reached 5!",
		"Congratulations! You made your first friend!",
		"Congratulations! You have become an admin!"
	};

	public final static String[] ACH_IMAGE_URL =
	{
		"http://cdn1.iconfinder.com/data/icons/SUPERVISTA/graphics/png/256/drawing_pen.png",
		"https://encrypted-tbn1.google.com/images?q=tbn:ANd9GcSbJ11bJpY1PUmuJyYQ8-4YapyDOtk-TkZPt6CLs-M8NtTQBp69yw",
		"https://encrypted-tbn1.google.com/images?q=tbn:ANd9GcR86H_v-pv-PMEsVPPs0lfGpXbvW9vfiGSY4dcm-_afj4WSHZtp",
		"data:image/jpeg;base64,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",
		"https://encrypted-tbn3.google.com/images?q=tbn:ANd9GcR2FfskMF68FoTVdH28NSVxjN1AvVLmjVQBXo7lnqC2GzNqHKBi",
		"https://encrypted-tbn1.google.com/images?q=tbn:ANd9GcTRp0dWGpO3lKg_839Y16Cu14EofcnZicRtWYoRE79eLl1AMLH75A",
		"https://encrypted-tbn1.google.com/images?q=tbn:ANd9GcQvBl16pDttSc-Q3zDP3owF7ps-plDgipl-aeZENQ47mvNVgZYReA",
		"https://encrypted-tbn3.google.com/images?q=tbn:ANd9GcRZ-IRtU4It-Z1FScyq3mWlCM4ifpb4uY9YC5retkqAB1kn7AcmdQ",
		"https://encrypted-tbn3.google.com/images?q=tbn:ANd9GcRPCLM1oVoVwTasEmR_N3tRBdGPMi5ftpeu5O4uZkd6yJQqdNut",
		"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBhISERUUExQWFRUWFRgUGBQUFxIZHBgcFR4XGBUaHRYdHCYeGBovGhUYHzIgJjMpLCwsGh8xNTAqNScrLTUBCQoKDgwOGQ8PGTUkHyQuKyosMSosLDUsLzUwMTU1LC80NTQsNS4sLyo0LCkwLCkuNCw1LDQsKSwtKiwsLCosKf/AABEIAGYAZgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAABgQFBwMCAf/EAEYQAAIBAwEEBwQFBwoHAAAAAAECAwAEEQUGEiExBxNBUWFxgSIykaEUQnKxwSRSgpLC0uEzQ1NVYqKyw/DxFhcjJTRkc//EABsBAAEFAQEAAAAAAAAAAAAAAAUAAgMEBgcB/8QALxEAAQMCAwcCBQUAAAAAAAAAAQACAwQRBSFBEhMxUWFxwTKxBoHR8PEiI1KR4f/aAAwDAQACEQMRAD8A3GswuOlC9lmmFnaRyRRSNFvySEFivAkcQMU/7Qal9HtZpv6OJ3HmoJHzxWVdHdnu2kZPN96Q57d48PlihGLVrqSIOZxvqiVDA2TaLxkFcLt7rH9Xwnym/jXv/j7V/wCrEPlMK97S6oLW1kmCglFGB3ljuj0pI6/V4bZdRd1MBKkpnjuscAgd3GhVFiGIVbHPjDbDnf6qy6CAWuOPdOn/ADG1Qc9Kz5Tr+7V9sdt39MklgmhNtcxYLQswb2TyIbAzzHDxFd9F3ZoQxUZZQf1gCPvpF1Ob6HrtncE7qXEZhkJ4Dej9g59Orq9h2Iy1DrSADsq0sUdiGixC1+uU90iDLsqjvYgffSbNrl3qDslkept1O610w4sRzEa/68xXqPo0tfemMtw55vK7cfQfxouZf4i6p7q3qKbbfUIn4JIjfZZT9xqRSNddHFifdjaM9jI7gj45qKLq+072t83dsPeD/wAog789o+XlUYqQDZ2SduL+krQ6Kh6Tq0VzEssTbyt8Qe0EdhqZVsG6rkWRRRRSSSN0y35TTHQe9PJHCPHJ3j8lqv0S2EcaqOSqqD9EYqT03QZ05ZBziuI5PvX9quOlSbyg94B+IrIfEhNmDTPwj2H23Drc1PvNNSeNo3XeVl3WU8Mg+PYc8Qaobbo1X2I5Li6mt423ktZCoQHs3mB9oeQHpTVb1ZRVlabEaimvHG6wKZK8hdLG33Fx28zj8PCs96YtO/Jutxxt50l4fmyey/8AeCVpEdKHSlcqlhdEgH/oBMHvkdQvw5+lajDstk9ff7uqkbjtlNek9WIo+qAEe4pQDlukAj5GpjtS9sjG0djaoxJZYIwc/ZB/HFW5lrRiUAWUJZmvkpqHNXaSSosr1RldcqdgslzTJvoF+FXhb3J93sR+XD1I9D4VotZltk2Y1Pargg/GtHspN6NG70U/EA1coZC5padPKiqm+l3Pwu1FFFEFTSv0m2fW6VdL3RF/1CG/ClDY6637aFiecaj1HD8K0/ULJZopIm92RGjOO5wVPyNYjc6LfaTNbQvKklvLL1a4AzjIJ4cwfa8aBY1RuqIgW6Zovh0rQDGdVpdtUq1vlZ2jGd5Rk5Bx6HtqDp3uivlj/wCXJ9j8RXOWNBeb6KWVvq6JhjrPOlhjJFHAOdxeQw+igk/NhXHa3bOW1nigigMzyx749thx3mXAAHH3c0q67q9/NcWnXW/UNE7SRxqWZ3Zt3B3Sc4G6OPAc63eE0lRJslrL5XHXL/VXLWQ/qc4LY0kA4DkOA8hyr0ZqXtJ2iWUFW9mVeDxnmCOeO8VPN6O+pi4jIpWU15aiXNxgVFn1ICqLVdaVQST/ABqNz+ScGqNtDOZGjiXizuBjz4fj8q1m3i3UVe5QPgMVlGxU0Z1H8qJjk3QYUcYD57VbkTjs861ujlNSyU7f3BYuz+WiozzNkNmm4CKKKKtKuikbpX2enuYIZLdd+S3mEu5nBYYOceOccKeaDTXNDgQU+N5Y4OGizDYXXWu4VlZQpLMpVScez50wWY/K3+wfvWkTo3vFhMtq+VmimcmNuBxy4d/KnuyObliO2NvvSuXVkO5q3tAsM7I9NmCenlZ5tvqDw6vZvGm+6wDcT852eYKPiRTnZbNvCoBfrNRu8mW4PHqlGOsKjkFXIVR2sV7BgUtyoOv2hIBxZsRnsIM2D58ad9Ik3i8x5yYC+EaZ3B65Zz4t4V1LB5C2gYGjQX65Cw7Dj1QKvI3oB5eSqqfZG3WPqmVk6veeOVSRJun2m9v6x3iSc5557aTtdmu7JY2kYMj5ALDipHEBiMZO72+BrWpCrjDAEeNI/SkQyxqFzuxTSeXBFB+ZrysjjkYXOb+rn981Nht3VDYybtOiUtI1Oe8m6qMoPZLFgCQAO3jz4kCmfT9mFHAgyTNlCXwd3sYgcgoHb5d9VPR7B1d5AWAxJE6Y/RDj/Ca1VERCWVQC3M99NoI4o27ezd3NS4wwsm3bDZtuHNJ0mx0TA2U+dwqXtZfrxlfeQN3rwI71yD7uak7EbRzCV9PvD+UQjKSf00f1WHecY/3Bq71ZDImF4OpDxnudeK+h4qfBjSN0hSEJb6jDwkt3Unv6tzhlPkxx+kaNx3qBu368Oh+juB/tBdoMNwtToqNpt8s0SSr7rqGHqM0UIVtSajaleiGGSUgsI0aQqOZ3AWwPHhUmvhFJILHth4/pcsmoTFTNOxAA5RIOAQeOAB5Ad5p0tVxdH/5sPnHSTHp50/WHtYuMFwnXqoP8lz59wypHkVp1tDm4BPMxv/l1zfFo5GVrts3uMuyPPIMd28LJL1tv+9WwHNrJl8t5pgT8M09wzgDA4AcAPupD1lsa3bn/ANL9qWmeO5rpmCR7VCzsPYLN4o/ZnHbyVfJc0j7eXrF5QoyFtlBPdvsx+4CmFbqkXabVGZ7tR3oufsqv4k0/EW7ESv8Aw/eWrFtM8u4HletDldZrSQtwWVFI+2Cn7VaZLMcEjHMgZz2AVh1pfFI95n4rKjAfZYH8K197vgRwIJJ5kHjjt9KjwwbbCrPxOzd1A7e35XCO7kwnWFd/Izub2OfZnwqFtGga1u4+wxu49QW/xqT617ljJIOQMEHtPI5x2Cq3avURHazuT/NOvqw3VHxNaCKKxaBpZZEPPBMfRDfGTS4c/V3k9AeFFcehi3K6XHn6zMw8iaKB1Nt8+3M+6NN4BPVFFFQJyx3ZO7F5e3d6x4vJ1SDtSNMYyOzIC/A06pgXAPZuP+xSvtzsZLZTNqNgMj3ri3HIjmzqPmR2c++o11t9brardKQzYZFgJ9ouwGAR+aMZJ7uXE1hMVw+oNYHjMOyHTJHWlssYLO1uSo9vtaW11SCQjeAtVVgOYDNLx88EHFMGnavHMoeJw694PLzHMHwNfejnYB53e+vxvvLkhHHMNwyR3Y4AdgqVrXQbAzmSzmktXPHdBJX045Aro+ESx0tO2CTTX5LO4lAJ5Nph4Cy9rdVE1LT4pxh144xvLwYevb61WS9Heuxe5cxyj+1u5/vKTXFtmtoR9SA/q0Xc+llFnOBHX8IdFFVQPD4nWI1BIKl6Rsvb253sdY+c78nHHkOQq6a6pZGzu0J/m4R+rXtdh9oJOBkijHh1f7uaTHUsTbNcAOi9ljqp3l8jrk6kq8uL5VUszBVHNmIAHqaRtSvpNWuEtLUEx7wLyYODjt8FHzNNNn0GTSsGvbtpP7Kkn5nlWlbObJ21im5BGF727T5mopcQjYLRZnnoFJDR7J2nlS9F0tbaCOFeSKF+HOiptFAURRRRRSSQRSS3RHY/TPpIUj2t8xDG5vd4HZx7OVFFeWunBxbwKdVUAYHADsr7RRXqaiiiikkiiiikkiiiikkiiiikkv/Z",
	};

	public final static String DEFAULT_URL = "http://t2.gstatic.com/images?q=tbn:ANd9GcTN1w8BZuWRlzsM4Vt1hwCeKDsUE-_a-YTLXi14Va0Lsf88Gi0heg";


	
}
