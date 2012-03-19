package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Shared.User;

/**
 * Servlet implementation class PopulateSettingsServlet
 */
public class PopulateSettingsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PopulateSettingsServlet() {
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
		
		out.println("<div id=\"settingsBox\" ");
		
		if(user.isAdmin){
			out.println("style=\"height:60px;\">");
		} else {
			out.println("style=\"height:40px;\">");
		}
		
		out.println("<a href=\"javascript:profileSettings()\">Edit profile</a>");
		
		if(user.isAdmin)
			out.println("<a href=\"admin.jsp\">Admin tools</a>");
		
		out.println("<a href=\"LogoutServlet\">Logout</a>");
		out.println("</div>");
	}

}
