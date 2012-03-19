package servlets;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Shared.User;

/**
 * Servlet implementation class AddAsFriendServlet
 */
public class AddAsFriendServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddAsFriendServlet() {
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
		User curUser = (User) request.getSession().getAttribute("user");
		String otherUserID = request.getParameter("otherUser");
		
		try {
			User.saveFriendship(curUser.userID, otherUserID);
			response.getWriter().println("<span>Friend Added</span>");
		} catch (SQLException e) {
			response.getWriter().println("<span>Friend Add Failed</span>");
			e.printStackTrace();
		}
	}

}
