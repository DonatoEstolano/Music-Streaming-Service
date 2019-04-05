import java.rmi.*;
import java.net.*;
import java.util.*;
import java.io.*;
import java.nio.file.*;
import java.math.BigInteger;
import java.security.*;
import com.google.gson.Gson;
import java.io.InputStream;
import java.util.*;
import java.time.LocalDateTime;


/* JSON Format

{"file":
  [
     {"name":"MyFile",
      "size":128000000,
      "pages":
      [
         {
            "guid":11,
            "size":64000000
         },
         {
            "guid":13,
            "size":64000000
         }
      ]
      }
   ]
} 
*/


public class DFS
{
    

    public class PagesJson
    {
		Long guid;
		Long size;
		String creationTS;
		String readTS;
		String writeTS;
		int referenceCount;
        public PagesJson(Long guid, Long size, String cts, String rts, String wts, int refCount){
			this.guid = guid;
			this.size = size;
			this.creationTS = cts;
			this.readTS = rts;
			this.writeTS = wts;
			this.referenceCount = refCount;
        }

		// getters
		public Long getGuid(){ return this.guid; }
		public Long getSize(){ return this.size; }
		public String getCreationTS(){ return this.creationTS; }
		public String getReadTS(){ return this.readTS; }
		public String getWriteTS(){ return this.writeTS; }
		public int getReferenceCount(){ return this.referenceCount; }
		// setters
		public void setGuid(Long guid){ this.guid = guid; }
		public void setSize(Long size){ this.size = size; }
		public void setCreationTS(String creationTS){ this.creationTS = creationTS; }
		public void setReadTS(String readTS){ this.readTS = readTS; }
		public void setWriteTS(String writeTS){ this.writeTS = writeTS; }
		public void setReferenceCount(int referenceCount){ this.referenceCount = referenceCount; }
    };

	public class FileJson{
		String name;
		Long   size;
		ArrayList<PagesJson> pages;
		String creationTS;
		String readTS;
		String writeTS;
		int referenceCount;
		int numberOfPages;
		int maxPageSize;

		public FileJson(String name){
			this.name = name;
			this.size = new Long(0);
			this.pages = new ArrayList<PagesJson>();
			this.creationTS = LocalDateTime.now().toString();
			this.readTS = LocalDateTime.now().toString();
			this.writeTS = LocalDateTime.now().toString();
			this.maxPageSize = 0;
		}

		public void addPage(Long guid, Long size, String cts, String rts, String wts, int refCount){
			this.size += size;
			this.numberOfPages++;
			pages.add(new PagesJson(guid,size,cts,rts,wts,refCount));
			System.out.println("Adding a new page");
		}

		// getters
		public String getName(){ return this.name; }
		public Long getSize(){ return this.size; }
		public ArrayList<PagesJson> getPages(){ return this.pages; }
		public String getCreationTS(){ return this.creationTS; }
		public String getReadTS(){ return this.readTS; }
		public String getWriteTS(){ return this.writeTS; }
		public int getReferenceCount(){ return this.referenceCount; }
		public int getNumberOfPages(){ return this.numberOfPages; }
		public int getMaxPageSize(){ return this.maxPageSize; }
		// setters
		public void setName(String name){ this.name = name; }
		public void setSize(Long size){ this.size = size; }
		public void setCreationTS(String creationTS){ this.creationTS = creationTS; }
		public void setReadTS(String readTS){ this.readTS = readTS; }
		public void setWriteTS(String writeTS){ this.writeTS = writeTS; }
		public void setReferenceCount(int referenceCount){ this.referenceCount = referenceCount; }
		public void setNumberOfPages(int numberOfPages){ this.numberOfPages = numberOfPages; }
		public void setMaxPageSize(int maxPageSize){ this.maxPageSize= maxPageSize; }
    };
    
	public class FilesJson {
		List<FileJson> files;

		public FilesJson(){
			files = new ArrayList<FileJson>();
		}

		// getters
		public FileJson getFile(int index){
			return this.files.get(index); 
		}

		public FileJson getFile(String filename){
			for(int i=0;i<this.getSize();i++){
				if(this.getFile(i).getName().equals(filename)){
					return this.getFile(i);
				}
			}
			return null;
		}

		public int getSize(){ return this.files.size(); }
		// setters
		public void addFile(FileJson file){ this.files.add(file); }
	};
    
    
    int port;
    Chord  chord;
    FilesJson files;
    
    
    private long md5(String objectName)
    {
        try
        {
            MessageDigest m = MessageDigest.getInstance("MD5");
            m.reset();
            m.update(objectName.getBytes());
            BigInteger bigInt = new BigInteger(1,m.digest());
            return Math.abs(bigInt.longValue());
        }
        catch(NoSuchAlgorithmException e)
        {
                e.printStackTrace();
                
        }
        return 0;
    }
    
    
    
    public DFS(int port) throws Exception
    {
        
        this.files = new FilesJson();
        this.port = port;
        long guid = md5("" + port);
        chord = new Chord(port, guid);
        Files.createDirectories(Paths.get(guid+"/repository"));
        Files.createDirectories(Paths.get(guid+"/tmp"));
        Runtime.getRuntime().addShutdownHook(new Thread() {
            public void run() {
                chord.leave();
            }
        });
        
    }
    
	
    /**
    * Join the chord
    *
    */
    public void join(String Ip, int port) throws Exception
    {
        chord.joinRing(Ip, port);
        chord.print();
    }
    
    
   /**
    * leave the chord
    *
    */
    public void leave() throws Exception
    {        
       chord.leave();
    }
  
   /**
    * print the status of the peer in the chord
    *
    */
    public void print() throws Exception
    {
        chord.print();
    }
    
    /**
     * readMetaData read the metadata from the chord
     *
     */
    public FilesJson readMetaData() throws Exception
    {
        FilesJson filesJson = null;
        try {
            Gson gson = new Gson();
            long guid = md5("Metadata");
            ChordMessageInterface peer = chord.locateSuccessor(guid);
            RemoteInputFileStream metadataraw = peer.get(guid);
            metadataraw.connect();
            Scanner scan = new Scanner(metadataraw);
            scan.useDelimiter("\\A");
            String strMetaData = scan.next();
            System.out.println(strMetaData);
            filesJson= gson.fromJson(strMetaData, FilesJson.class);
        } catch (NoSuchElementException ex)
        {
            filesJson = new FilesJson();
        }
        return filesJson;
    }
    
/**
 * writeMetaData write the metadata back to the chord
  *
 */
    public void writeMetaData(FilesJson filesJson) throws Exception
    {
        long guid = md5("Metadata");
        ChordMessageInterface peer = chord.locateSuccessor(guid);
        
        Gson gson = new Gson();
        peer.put(guid, gson.toJson(filesJson));
    }
   
/**
 * Change Name
  *
 */
    public void move(String oldName, String newName) throws Exception
    {
        // TODO:  Change the name in Metadata
        // Write Metadata
    }

  
/**
 * List the files in the system
  *
 * @param filename Name of the file
 */
    public String lists() throws Exception
    {
        String listOfFiles = "";
 
        return listOfFiles;
    }

/**
 * create an empty file 
  *
 * @param filename Name of the file
 */
    public void create(String fileName) throws Exception{
	    FileJson file = new FileJson(fileName);
	    this.files.addFile(file);
	    writeMetaData(this.files);
    }
    
/**
 * delete file 
  *
 * @param filename Name of the file
 */
    public void delete(String fileName) throws Exception
    {
     
        
    }
    
	/**
	* Read block pageNumber of fileName 
	*
	* @param filename Name of the file
	* @param pageNumber number of block. 
	*/
	public RemoteInputFileStream read(String fileName, int pageNumber) throws Exception
	{
		return null;
	}
    
	/**
	* Add a page to the file                
	*
	* @param filename Name of the file
	* @param data RemoteInputStream. 
	*/
	public void append(String filename, RemoteInputFileStream data) throws Exception{

		/* Grab file from metadata */
		FileJson file = files.getFile(filename);
		System.out.println(file.getName());

		/* Parse page info */
		Long size = new Long(data.available());
		String time = LocalDateTime.now().toString();
		String name = filename + time;
		Long guid = md5(name);
		
		/* Write the physical file */
		ChordMessageInterface peer = chord.locateSuccessor(guid);
		peer.put(guid,data);

		/* Update the metadata */
		file.setWriteTS(time);
		file.addPage(guid,size,time,time,time,0);

		/* Write the metadata */
		writeMetaData(files);
	}
    
}
