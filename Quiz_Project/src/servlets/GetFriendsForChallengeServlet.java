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
import Shared.*;

/**
 * Servlet implementation class GetFriendsForChallengeServlet
 */
public class GetFriendsForChallengeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetFriendsForChallengeServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		User user = (User) request.getSession().getAttribute("user");
		PrintWriter out = response.getWriter();
		
		try {
			List<User> friends = user.loadFriends();
			out.print("<div class=\"friendsContainer\">");
			//arrange the friends
			Iterator<User> it = friends.iterator();
			while(it.hasNext()){
				User u = it.next();
				
				out.print("<span><input type=\"checkbox\" value=\""+u.userID+"\" name=\"friends\"/><a href=\"profilePage.jsp?userToDisplay="+u.userID+"\">"+u.firstName+" "+u.lastName+"</a></span><br/>");
			}
			out.print("</div>");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		out.close();
		out.flush();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
