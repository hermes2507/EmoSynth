package com.interCom;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;
import com.illposed.osc.*;
import java.net.*;

@WebServlet("/InterCom")
public class InterCom extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final int PORT = 9000;
	private static final String IPAddress = "10.49.1.39";
	private OSCPortOut out;
	private InetAddress ip;
	private ArrayList<String> Names;
	
    public InterCom() {
        super();
        try{
        	ip = InetAddress.getByName(IPAddress);
        	out = new OSCPortOut(ip, PORT);
         } catch (Exception e) {
        	 e.printStackTrace();
         }
   }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("From doGet");
		doPost(request,response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Names = Collections.list(request.getParameterNames());
		Names.stream()
			.forEach(p -> sendByOSC(p, Float.valueOf(request.getParameter(p))));
		
	}
	
	private void sendByOSC(String eToSend, float value){
		try{
        	OSCMessage msg = new OSCMessage("/emotionalComposer/"+eToSend);
        	msg.addArgument(value/100);
        	out.send(msg);
        	
        } catch (Exception e) {
        	 e.printStackTrace();
         }
	}
	
}
