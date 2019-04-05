import java.net.*;
import java.util.UUID;
import java.io.*;

public class Server{

	private static final int PORT = 6543;
	private static Dispatcher dispatcher;

	public static void main(String args[]){
		try{

		/* Register and init dispatcher */
		initDispatcher();

		/* Create datagram socket */
		final DatagramSocket socket = new DatagramSocket(PORT);
		System.out.println("Starting server on port "+PORT);

		byte[] buffer = new byte[1024];

		while(true){

			/* Receive request */
			DatagramPacket request = new DatagramPacket(buffer,buffer.length);
			socket.receive(request);
			System.out.println("Request from port: "+request.getPort());
			System.out.println("Request: "+new String(request.getData()));

			/* Handle request by sending it to our dispatcher and sending reply */
			new Thread(new Runnable(){
				@Override
				public void run(){
					try{

						/* Get return */
	        				String ret =  dispatcher.dispatch(new String(request.getData()));
						System.out.println("Ret: "+ret);

						/* Send return back to client */
						DatagramPacket reply = new DatagramPacket(ret.getBytes(),ret.length(),request.getAddress(),request.getPort());
						socket.send(reply);

					}catch(Exception e){
						e.printStackTrace();
					}
				}
			}).start();
		}

		}catch(Exception e){
			e.printStackTrace();
		}
	}

	public static void initDispatcher(){
		dispatcher = new Dispatcher();
		SongDispatcher songDispatcher = new SongDispatcher();
		dispatcher.registerObject(songDispatcher, "SongServices");  
		UserDispatcher userDispatcher = new UserDispatcher();
		dispatcher.registerObject(userDispatcher, "UserServices");  
	}

}
