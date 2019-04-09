package dfs;
import java.io.*;


public class DFSCommand{
	DFS dfs;
        
	public DFSCommand(int p, int portToJoin) throws Exception {
		dfs = new DFS(p);

		if (portToJoin > 0){
			System.out.println("Joining "+ portToJoin);
			dfs.join("127.0.0.1", portToJoin);            
		}

		BufferedReader buffer=new BufferedReader(new InputStreamReader(System.in));
		String line = buffer.readLine();  
		while (!line.equals("quit")){
			String[] result = line.split("\\s");
			parseCommand(result);
			line=buffer.readLine();  
		}
	}

	public void parseCommand(String[] command){
		try{
			if (command[0].equals("join")  && command.length > 1){
				dfs.join("127.0.0.1", Integer.parseInt(command[1]));     

			}else if (command[0].equals("print")){
				dfs.print();     

			}else if (command[0].equals("leave")){
				dfs.leave();     

			}else if(command[0].equals("touch") && command.length>1){
				dfs.create(command[1]);
				System.out.println("Touched file '"+command[1]+"'");

			}else if(command[0].equals("write") && command.length>3){
				RemoteInputFileStream rifs = new RemoteInputFileStream(command[2]);
				int page = Integer.parseInt(command[3]);
				dfs.write(command[1], rifs, page);
				System.out.println("wrote '"+command[2]+"' to '"+command[1]+"' page "+page);

			}else if(command[0].equals("append") && command.length>2){
				RemoteInputFileStream rifs = new RemoteInputFileStream(command[2]);
				dfs.append(command[1], rifs);
				System.out.println("Appended '"+command[2]+"' to '"+command[1]+"'");

			}else if(command[0].equals("read") && command.length>2){
				int page = Integer.parseInt(command[2]);
				RemoteInputFileStream rifs = dfs.read(command[1],page);
				printStream(rifs);
				System.out.println("Read '"+command[1]+"' page "+command[2]);

			}else if(command[0].equals("head") && command.length>1){
				RemoteInputFileStream rifs = dfs.head(command[1]);
				printStream(rifs);
				System.out.println("Printed first page of '"+command[1]+"'");

			}else if(command[0].equals("tail") && command.length>1){
				RemoteInputFileStream rifs = dfs.tail(command[1]);
				printStream(rifs);
				System.out.println("Printed last page of '"+command[1]+"'");

			}else if(command[0].equals("delete") && command.length>1){
				dfs.delete(command[1]);
				System.out.println("Deleted file '"+command[1]+"'");

			}else if(command[0].equals("move") && command.length>2){
				dfs.move(command[1],command[2]);
				System.out.println("Moved '"+command[1]+"' to '"+command[2]+"'");

			}else if(command[0].equals("ls")){
				String list = dfs.lists();
				System.out.println(list);

			}else{
				System.out.println("Unkown command");
			}
		}catch(Exception e){
			System.out.println("Failed to execute command");
		}
	}

	public static void printStream(RemoteInputFileStream rifs) throws Exception{
		rifs.connect();
		while(rifs.available()>0)
			System.out.print((char)rifs.read());
		System.out.print("\n");
	}
    
	/*
	static public void main(String args[]) throws Exception{
		if (args.length < 1 ) {
			throw new IllegalArgumentException("Parameter: <port> <portToJoin>");
		}
		if (args.length > 1 ) {
			DFSCommand dfsCommand=new DFSCommand(Integer.parseInt(args[0]), Integer.parseInt(args[1]));
		}else{
			DFSCommand dfsCommand=new DFSCommand( Integer.parseInt(args[0]), 0);
		}
	} 
	*/
}
