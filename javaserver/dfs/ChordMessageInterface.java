package dfs;
import java.rmi.*;
import java.io.*;
import com.google.gson.*;

public interface ChordMessageInterface extends Remote
{
    public ChordMessageInterface getPredecessor()  throws RemoteException;
    ChordMessageInterface locateSuccessor(long key) throws RemoteException;
    ChordMessageInterface closestPrecedingNode(long key) throws RemoteException;
    public void joinRing(String Ip, int port)  throws RemoteException;
    public void joinRing(ChordMessageInterface successor)  throws RemoteException;
    public void notify(ChordMessageInterface j) throws RemoteException;
    public boolean isAlive() throws RemoteException;
    public long getId() throws RemoteException;
    
    
    public void put(long guidObject, RemoteInputFileStream inputStream) throws IOException, RemoteException;
    public void put(long guidObject, String text) throws IOException, RemoteException;
    public RemoteInputFileStream get(long guidObject) throws IOException, RemoteException;   
    public byte[] get(long guidObject, long offset, int len) throws IOException, RemoteException;  
    public void delete(long guidObject) throws IOException, RemoteException;

	public void onChordSize(long id, int i) throws Exception;
	public void mapContext(Long guid, MapReduceInterface mapreducer, FileMap filemap, String fileOutput) throws Exception;
	public void reduceContext(Long guid, MapReduceInterface mapreducer, FileMap filemap, String fileOutput) throws Exception;
	public void mapBulk(long pageId) throws Exception;
	public void updateMap(String key, String values) throws Exception;
	public void reduceBulk(long pageId) throws Exception;
	public void resetMap() throws Exception;
	public void resetReduce(String lower) throws Exception;
	public void reduceEmit(String key, String values) throws Exception;
	public void saveLocally(String values) throws Exception;

}
