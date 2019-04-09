import java.io.*;
import dfs.*;

/**
 * This class checks user input and runs the command given
 */
public class MainChord {

	public static void main(String args[]) {
		try {
			if (args.length < 1) {
				throw new IllegalArgumentException("Parameter: <port> <portToJoin>");
			}
			if (args.length > 1) {
				DFSCommand dfsCommand = new DFSCommand(Integer.parseInt(args[0]), Integer.parseInt(args[1]));
			} else {
				DFSCommand dfsCommand = new DFSCommand(Integer.parseInt(args[0]), 0);
			}
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
