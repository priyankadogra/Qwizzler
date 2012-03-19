package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Shared.Quiz;
import Shared.User;

/**
 * Servlet implementation class ProfilePageServlet
 */
public class ProfilePageServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ProfilePageServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		User user = (User) request.getSession().getAttribute("user");
		//System.out.println("in doGet");
		PrintWriter out = response.getWriter();
		String fetch = request.getParameter("fetch");
		String userToDisplay = request.getParameter("userToDisplay");
		User userToBeDisplayed = null;
		try {
			userToBeDisplayed = User.loadUser(userToDisplay);
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		
		if(fetch.equals("getFriends")){
			try {
				//load the friends of the userToBeDisplayed
				List<User> list = userToBeDisplayed.loadFriends();
				Iterator<User> it = list.iterator();
				out.println("<h1>Friends</h1>");
				
				while (it.hasNext() ) {
					User u = (User) it.next();
					//System.out.println("<h4>"+u.imageURL+"</h4>");
					out.println("<img src=\""+u.imageURL+"\"/ class=\"friendsPic\">");
					out.println("<a href=\"profilePage.jsp?userToDisplay="+u.userID+"\">" + u.firstName + " "
							+ u.lastName + "<a><br>");
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				out.flush();
				out.close();
			}
		}
		
		else if(fetch.equals("getUserDetails")){
			//display the name and image
			//System.out.println("In get user details...");
			out.println("<div id=\"profilePic\"><img src=\""+userToBeDisplayed.imageURL+"\" class=\"imageClass\"/></div>");
			out.println("<div id=\"profileInfo\"><h4>"+userToBeDisplayed.firstName + " "+ userToBeDisplayed.lastName+ "</h4><br>");
			out.println("<span>No of quizzes created: "+userToBeDisplayed.numQuizzesCreated+"</span><br>");
			out.println("<span>No of quizzes taken: "+userToBeDisplayed.numQuizzesTaken+"</span><br>");
			
			try {
				if(user.userID.equals(userToBeDisplayed.userID)){
					//logged in user is viewing his profile. No need to add the Add Friend Button
				}
				else if(User.isFriendship(user.userID, userToBeDisplayed.userID)){
					//already friends. Add a Remove friend button
					out.println("<button id=\"delFriendButton\" type=\"button\" onclick=\"delFriendButton()\">Remove Friend</button>");
					out.println("<button id=\"friendButton\" type=\"button\" onclick=\"addFriendButton()\" class=\"hide\">Add Friend</button>");
				}else{
					//not friends, Add the "Add Friend button"
					out.println("<button id=\"friendButton\" type=\"button\" onclick=\"addFriendButton()\">Add Friend</button>");
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			out.println("</div>");
		}
		//out.println("<div class=\"userAchievements\">");
		else if(fetch.equals("getUserAchievements")){
			
			out.println("<h4>Achievements:</h4><br>");
			//get users achievements and add the images corresponding to the achievements
			String achievementCode = userToBeDisplayed.achievementCode;
			//go through all the chars in the achievementCode and set the class
			for(int i=0;i<achievementCode.length();i++){
				//System.out.println("achievementCode: "+achievementCode.charAt(i));
				if(achievementCode.charAt(i) == '0'){
					//person hasn't achieved this title yet. Display the image with opacity of 0.2
					out.println("<img src=\""+User.ACH_IMAGE_URL[i]+"\" class=\"achievementImageOpaque\"/ title=\""+User.ACH_TITLE[i]+" - "+User.ACH_DESCRIPTION[i]+"\"/>");
				}else{
					//person has achieved this title. Display the image without any opacity
					out.println("<img src=\""+User.ACH_IMAGE_URL[i]+"\" class=\"achievementImageNotOpaque\" title=\""+User.ACH_TITLE[i]+" - "+User.ACH_DESCRIPTION[i]+"\"/>");
				}
			}
			//out.println("</div>");
		}
		
		else if(fetch.equals("getQuizzesCreated")){
			try {
				List<Quiz> quizzes = userToBeDisplayed.loadQuizzesCreated();
				Iterator<Quiz> it = quizzes.iterator();
				int count = 0;
				out.println("<h1>Quizzes Created</h1><br/>");
				while(it.hasNext() && (count < 16)){
					Quiz q = (Quiz)it.next();
					
					out.println("<a href=\"quizInfo.jsp?quizID="+q.quizID+"\">"+q.title+"</a><br/>");
					count++;
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		out.flush();
		out.close();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

}
