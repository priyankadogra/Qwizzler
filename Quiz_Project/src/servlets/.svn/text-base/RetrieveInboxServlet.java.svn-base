package servlets;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Shared.Message;
import Shared.User;

/**
 * Servlet implementation class RetrieveInboxServlet
 */
public class RetrieveInboxServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RetrieveInboxServlet() {
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
		List<Message> messages = (List<Message>) request.getSession().getAttribute("messages");
		StringBuilder result = new StringBuilder();
		
		for(int i = 0; i < messages.size(); i++){
			Message m = messages.get(i);
			result.append("<div class=\"inboxRow ");
			if(m.isRead)result.append(" read\" ");
			else result.append("unread\" ");
			result.append(">");
			result.append("<div class=\"checkBox\"><input type=\"checkbox\" value=\"" + i + "\" /></div>");
			result.append("<div class=\"inboxRowClickable\">");
			result.append("<div class=\"fromUser\">" + m.fromUserID + "</div>");
			result.append("<div class=\"subject\">" + m.subject + "</div>");
			result.append("<div class=\"timeStamp\">" + m.timeStamp + "</div>");
			result.append("</div>");
			result.append("</div>");
		}
		
		response.getWriter().println(result.toString());
	}

}
