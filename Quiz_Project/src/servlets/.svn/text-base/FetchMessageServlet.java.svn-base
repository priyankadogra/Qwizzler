package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Shared.Message;

/**
 * Servlet implementation class FetchMessageServlet
 */
public class FetchMessageServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	private PrintWriter out;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FetchMessageServlet() {
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
		int index = Integer.parseInt(request.getParameter("index"));
		List<Message> messages = (List<Message>) request.getSession().getAttribute("messages");
		Message m = messages.get(index);
		out = response.getWriter();
		
		if(m.type.equals("FRIEND")){
			printFriendRequest(m);
		} else if(m.type.equals("CHALLENGE")){
			printQuizChallenge(m);
		} else {
			printNote(m);
		}
		
		try {
			m.setAsRead();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private void printNote(Message m){
		out.println("<div id=\"viewMessageFrom\">");
		out.println(m.fromUserID);
		out.println("</div>");
		out.println("<br />");
		out.println("<div id=\"viewMessageSubject\">");
		out.println(m.subject);
		out.println("</div>");
		out.println("<br />");
		out.println("<div id=\"viewMessageBody\">");
		out.println(m.body);
		out.println("</div>");
		out.println("<div id=\"messageButtons\">");
		out.println("<button type=\"button\" id=\"popUpCancelButton\">Close</button>");
		out.println("<button type=\"button\" id=\"replyButton\">Reply</button>");
		out.println("</div>");
	}
	
	private void printQuizChallenge(Message m){
		out.println("<div id=\"viewMessageFrom\">");
		out.println(m.fromUserID);
		out.println("</div>");
		out.println("<br />");
		out.println("<div id=\"viewMessageSubject\">");
		out.println(m.subject);
		out.println("</div>");
		out.println("<br />");
		out.println("<div id=\"viewMessageBody\">");
		out.println(m.body);
		out.println("</div>");
		out.println("<div id=\"messageButtons\">");
		out.println("<button type=\"button\" id=\"popUpCancelButton\">Decline</button>");
		out.println("<button type=\"button\" id=\"takeQuizButton\">Take Quiz</button>");
		out.println("</div>");
	}
	
	private void printFriendRequest(Message m){
		out.println("<div id=\"viewMessageFrom\"><span>");
		out.println(m.fromUserID);
		out.println("</span></div>");
		out.println("<br />");
		out.println("<div id=\"viewMessageSubject\">");
		out.println(m.subject);
		out.println("</div>");
		out.println("<br />");
		out.println("<div id=\"viewMessageBody\">");
		out.println(m.body);
		out.println("</div>");
		out.println("<div id=\"messageButtons\">");
		out.println("<button type=\"button\" id=\"popUpCancelButton\">Ignore</button>");
		out.println("<button type=\"button\" id=\"acceptButton\">Accept</button>");
		out.println("</div>");
	}
}
