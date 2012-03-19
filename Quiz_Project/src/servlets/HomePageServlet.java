package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.jasper.tagplugins.jstl.core.Out;

import java.util.*;


import Shared.User;

/**
 * Servlet implementation class HomePageServlet
 */
public class HomePageServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HomePageServlet() {
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
		
		if(fetch.equals("getFriends")){
			try {
				List<User> list = user.loadFriends();
				Iterator it = list.iterator();
				out.println("<h4>Friends</h4>");
				while (it.hasNext()) {
					User u = (User) it.next();
					//System.out.println("<h4>"+u.firstName+"</h4>");
					out.println("<img src=\""+u.imageURL+"\"/ class=\"friendsPic\">");
					out.println("<a href=\"FriendsPageServlet?friendsId="+u.userID+"\">" + u.firstName + " "
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
			out.println("<div class=\"leftAligned\"><img src=\""+user.imageURL+"\" class=\"imageClass\"/></div>");
			out.println("<div class=\"leftAligned\"><h4>"+user.firstName + " "+ user.lastName+ "</h4><br>");
			out.println("No of quizzes created: "+user.numQuizzesCreated+"<br>");
			out.println("No of quizzes taken: "+user.numQuizzesTaken+"<br>");
			out.println("</div>");
		}
		//out.println("<div class=\"userAchievements\">");
		else if(fetch.equals("getUserAchievements")){
			out.println("<h4>Achievements:</h4><br>");
			//get users achievements and add the images corresponding to the achievements
			String achievementCode = user.achievementCode;
			//go through all the chars in the achievementCode and set the class
			for(int i=0;i<achievementCode.length();i++){
				//System.out.println("achievementCode: "+achievementCode.charAt(i));
				if(achievementCode.charAt(i) == '0'){
					//person hasn't achieved this title yet. Display the image with opacity of 0.2
					out.println("<img src=\""+User.ACH_IMAGE_URL[i]+"\" class=\"achievementImageOpaque\"/ title=\""+User.ACH_TITLE[i]+"\"/>");
				}else{
					//person has achieved this title. Display the image without any opacity
					out.println("<img src=\""+User.ACH_IMAGE_URL[i]+"\" class=\"achievementImageNotOpaque\" title=\""+User.ACH_TITLE[i]+"\"/>");
				}
			}
			//out.println("</div>");
		}
		
		out.flush();
		out.close();
	}
	

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("In doPost");
	}

}
