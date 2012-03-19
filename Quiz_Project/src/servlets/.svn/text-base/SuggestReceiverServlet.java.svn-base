package servlets;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Shared.User;

/**
 * Servlet implementation class SuggestReceiverServlet
 */
public class SuggestReceiverServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SuggestReceiverServlet() {
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
		response.setContentType("text/html");
		String term = request.getParameter("typed");
		try {
			List<User> friends = ((User)request.getSession().getAttribute("user")).loadSuggestions(term, 8);
			StringBuilder returnString = new StringBuilder();
			returnString.append("<ul id=\"autocompleteList\">");
			for(int i = 0; i < friends.size(); i++){
				User friend = friends.get(i);
				returnString.append("<li class=\"autocompleteRow\">");
				returnString.append(friend.firstName + " " + friend.lastName);
				returnString.append("<input type=\"hidden\" value=\"" + friend.userID + "\" />");
				returnString.append("</li>");
			}
			returnString.append("</ul>");
			response.getWriter().println(returnString.toString());
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}
