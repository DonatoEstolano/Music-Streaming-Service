
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

	public void parseCommand(String[] command) throws Exception{
		if (command[0].equals("join")  && command.length > 1){
			dfs.join("127.0.0.1", Integer.parseInt(command[1]));     

		}else if (command[0].equals("print")){
			dfs.print();     

		}else if (command[0].equals("leave")){
			dfs.leave();     

		}else if(command[0].equals("touch") && command.length>1){
			dfs.create(command[1]);

		}else if(command[0].equals("append") && command.length>2){
			RemoteInputFileStream rifs = new RemoteInputFileStream(command[2]);
			dfs.append(command[1], rifs);

		}else{
			System.out.println("Unkown command");
		}
	}
    
    static public void main(String args[]) throws Exception
    {
        if (args.length < 1 ) {
            throw new IllegalArgumentException("Parameter: <port> <portToJoin>");
        }
        if (args.length > 1 ) {
            DFSCommand dfsCommand=new DFSCommand(Integer.parseInt(args[0]), Integer.parseInt(args[1]));
        }
        else
        {
            DFSCommand dfsCommand=new DFSCommand( Integer.parseInt(args[0]), 0);
        }
     } 
}
