package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Shared.User;

/**
 * Servlet implementation class ProfileSettingsServlet
 */
public class ProfileSettingsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ProfileSettingsServlet() {
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
		
		out.println("<div id=\"settingsContainer\">");
		out.println("<h2>Profile Settings</h2>");
		out.println("<div>");
		out.println("<label>");
		out.println("<span>Password:</span>");
		out.println("<span id=\"pwResult\"></span>");
		out.println("</label>");
		out.println("<input type=\"text\" name=\"password\" id=\"password\" />");
		out.println("<button type=\"button\" id=\"passwordSave\">Save</button>");
		out.println("</div>");
		out.println("<div>");
		out.println("<label>");
		out.println("<span>First name:</span>");
		out.println("<span id=\"fnameResult\"></span>");
		out.println("<input type=\"text\" name=\"firstName\" id=\"firstName\"value=\"" + user.firstName + "\"/>");
		out.println("<button type=\"button\" id=\"firstNameSave\">Save</button>");
		out.println("</label>");
		out.println("</div>");
		out.println("<div>");
		out.println("<label>");
		out.println("<span>Last name:</span>");
		out.println("<span id=\"lnameResult\"></span>");
		out.println("<input type=\"text\" name=\"lastName\" id=\"lastName\" value=\"" + user.lastName + "\"/>");
		out.println("<button type=\"button\" id=\"lastNameSave\">Save</button>");
		out.println("</label>");
		out.println("</div>");
		out.println("<div>");
		out.println("<label>");
		out.println("<span>Image URL:</span>");
		out.println("<span id=\"urlResult\"></span>");
		out.println("<input type=\"text\" name=\"imageURL\" id=\"imageURL\" value=\"" + user.imageURL + "\"/>");
		out.println("<button type=\"button\" id=\"imageURLSave\">Save</button>");
		out.println("</label>");
		out.println("</div>");
		/*out.println("<div id=\"radioButtonsDiv\">");
		out.println("<label>");
		out.println("<span>Private Mode:</span>");
		if(user.isPrivate){
			out.println("<input type=\"radio\" name=\"privacy\" value=\"on\" checked> On<br>");
			out.println("<input type=\"radio\" name=\"privacy\" value=\"off\"> Off<br>");
		} else {
			out.println("<input type=\"radio\" name=\"privacy\" value=\"on\"> On<br>");
			out.println("<input type=\"radio\" name=\"privacy\" value=\"off\" checked> Off<br>");
		}
		out.println("</label>");
		out.println("</div>");*/
		out.println("</div>");
	}

}
