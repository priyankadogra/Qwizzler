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
 * Servlet implementation class AdminRetrieveQuizListServlet
 */
public class AdminRetrieveQuizListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AdminRetrieveQuizListServlet() {
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
			out.println("<div class=\"quizRow\">");
			out.println("<div class=\"quizID\">" + q.quizID + "</div>");
			out.println("<div class=\"quizTitle\">" + q.title + "</div>");
			out.println("<div class=\"quizDelete\"><a href=\"javascript:deleteQuiz(\'" + q.quizID + "\')\">Delete</a></div>");
			out.println("<div class=\"quizReset\"><a href=\"javascript:resetQuiz(\'" + q.quizID + "\')\">Clear History</a></div>");
			out.println("</div>");
		}
	}

}
