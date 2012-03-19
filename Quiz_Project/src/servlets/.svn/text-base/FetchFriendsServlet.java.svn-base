package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Shared.User;

/**
 * Servlet implementation class FetchFriendsServlet
 */
public class FetchFriendsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FetchFriendsServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		User user = (User) request.getSession().getAttribute("user");
		PrintWriter out = response.getWriter();
		
		try {
			List<User> friends = user.loadFriends();
			for(User f:friends){
				out.println("<div class=\"friendBox\">");
				out.println("<div class=\"friendProfilePic\">");
				out.println("<a href=\"profilePage.jsp?userToDisplay="+f.userID+"\"><img src=\""+f.imageURL+"\" class=\"shadowed\"/></a>");
				out.println("</div>");
				out.println("<div class=\"friendProfileInfo\">");
				out.println("<a href=\"profilePage.jsp?userToDisplay="+f.userID+"\"><strong>"+f.firstName+" "+f.lastName+"</strong></a>");
				out.println("<br />");
				out.println("<span>Quizzes taken: "+f.numQuizzesTaken+"</span>");
				out.println("<br />");
				out.println("<span>Quizzes created: "+f.numQuizzesCreated+"</span>");
				out.println("<br />");
				try {
					out.println("<a href=\"friends.jsp\">" + user.loadFriends().size() + " friends</a>");
				} catch (java.sql.SQLException e) {
					e.printStackTrace();
				}
				
				out.println("<br />");
				out.println("</div>");
				out.println("</div>");
			}
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	}

}
