package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Shared.Quiz;

/**
 * Servlet implementation class RetrieveQuizListServlet
 */
public class RetrieveQuizListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RetrieveQuizListServlet() {
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
		String category = request.getParameter("category");
		List<Quiz> quizzes = new ArrayList<Quiz>();
		PrintWriter out = response.getWriter();
		try {
			if(category.equals("ALL"))
				quizzes = Quiz.loadAllQuizzes();
			else 
				quizzes = Quiz.loadQuizzesByCategory(category);
		} catch (SQLException e) {
			out.println("SQL Error; failed to load quizzes");
			e.printStackTrace();
		}
		
		for(Quiz q:quizzes){
			out.println("<div id='quizRow" + q.quizID + "' class=\"quizRow\">");
			out.println("<div class=\"quizRowClickable\">");
			out.println("<input type=\"hidden\" value=\"" + q.quizID + "\" />");
			out.println("<div class=\"quizTitle\">" + q.title + "</div>");
			out.println("</div>");
			if(((Shared.User)request.getSession().getAttribute("user")).isAdmin){
				out.println("<div class=\"quizDelete\">Delete</div>");
				out.println("<div class=\"quizReset\">Clear History</div>");
			}
			out.println("</div>");
		}
	}

}
