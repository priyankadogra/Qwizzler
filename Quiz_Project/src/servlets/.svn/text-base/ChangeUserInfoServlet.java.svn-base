package servlets;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Shared.User;

/**
 * Servlet implementation class ChangeUserInfoServlet
 */
public class ChangeUserInfoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ChangeUserInfoServlet() {
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
		
		String password = request.getParameter("pw");
		if(password != null) {
			try {
				user.changePassword(password);
			} catch (SQLException e) {
				response.getWriter().println("Failure!");
				e.printStackTrace();
			}
		} else {
		
			String fname = request.getParameter("fname");
			if(fname != null) user.firstName = fname;
			String lname = request.getParameter("lname");
			if(lname != null) user.lastName = lname;
			String image = request.getParameter("image");
			if(image != null) user.imageURL = image;
			
			try {
				user.saveUser();
			} catch (SQLException e) {
				response.getWriter().println("Failure!");
				e.printStackTrace();
			}
		}
			response.getWriter().println("Success!");
	}

}
