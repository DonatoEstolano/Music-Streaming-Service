package dfs;

import java.rmi.*;
import java.net.*;
import java.util.*;
import java.io.*;
import java.nio.file.*;
import java.math.BigInteger;
import java.security.*;
import com.google.gson.*;
import com.google.gson.JsonObject;
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


public class DFS implements Serializable 
{
    

    public class PagesJson
    {
		Long guid;
		Long size;
		String creationTS;
		String readTS;
		String writeTS;
		int referenceCount;
		String lowerBound;
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
		public String getLowerBound(){ return this.lowerBound; }
		// setters
		public void setGuid(Long guid){ this.guid = guid; }
		public void setSize(Long size){ this.size = size; }
		public void setCreationTS(String creationTS){ this.creationTS = creationTS; }
		public void setReadTS(String readTS){ this.readTS = readTS; }
		public void setWriteTS(String writeTS){ this.writeTS = writeTS; }
		public void setReferenceCount(int referenceCount){ this.referenceCount = referenceCount; }
		public void setLowerBound(String lowerBound){ this.lowerBound = lowerBound; }
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
			this.addPage(guid,size,cts,rts,wts,refCount,this.pages.size());
		}

		public void addPage(Long guid, Long size, String cts, String rts, String wts, int refCount,int loc){
			this.size += size;
			this.numberOfPages++;
			pages.add(loc,new PagesJson(guid,size,cts,rts,wts,refCount));
		}

		public PagesJson getPage(int pageNum){
			PagesJson page = pages.get(pageNum);
			String time = LocalDateTime.now().toString();
			page.setReadTS(time);
			this.readTS = time;
			return page;
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
		public List<FileJson> getFiles(){ return this.files; }
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
		public void addFile(FileJson file){
			this.files.add(file); 
		}

		public FileJson removeFile(String filename){
			for(int i=0;i<this.getSize();i++){
				if(this.getFile(i).getName().equals(filename)){
					return this.files.remove(i);
				}
			}
			return null;
		}
	};
    
    
    int port;
    Chord  chord;
    
    
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
        this.port = port;
        long guid = md5("" + port);
        chord = new Chord(port, guid);
		chord.bind(this);
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
	public FilesJson readMetaData() throws Exception{
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
			//There were several bugs with the method so I had to change it
			/*
			String strMetaData = "";
			while(metadataraw.available()>0){
				strMetaData += (char)metadataraw.read();
			}
			*/
			//System.out.println(strMetaData);
			filesJson= gson.fromJson(strMetaData, FilesJson.class);
		} catch (NoSuchElementException ex){
			System.out.println(ex);
			filesJson = new FilesJson();
		} catch(Exception e){
			System.out.println(e);
		}
		return filesJson;
	}
    
	/**
	* writeMetaData write the metadata back to the chord
	*
	*/
	public void writeMetaData(FilesJson filesJson) throws Exception{
		long guid = md5("Metadata");
		ChordMessageInterface peer = chord.locateSuccessor(guid);

		Gson gson = new Gson();
		String strMetaData = gson.toJson(filesJson);
		//System.out.println(strMetaData);
		peer.put(guid, strMetaData);
	}
   
	/**
	* Change Name
	*
	*/
	public void move(String oldName, String newName) throws Exception{
		/* Get metadeta and locate file */
		FilesJson files = readMetaData();
		FileJson file = files.getFile(oldName);

		/* rename the file */
		file.setName(newName);

		/* save metadata */
		writeMetaData(files);
	}


	/**
	* List the files in the system
	*
	* @param filename Name of the file
	*/
	public String lists() throws Exception{
		/* Get metadeta and locate file */
		FilesJson files = readMetaData();
		List<FileJson> fileList = files.getFiles();
		String listOfFiles = "";
		for(int i=0;i<fileList.size();i++){
			listOfFiles += fileList.get(i).getName()+" ";
		}
		return listOfFiles;
	}

	/**
	* create an empty file 
	*
	* @param filename Name of the file
	*/
	public void create(String filename) throws Exception{
		FileJson file = new FileJson(filename);
		FilesJson files = readMetaData();
		files.addFile(file);
		writeMetaData(files);
	}
    
	/**
	* delete file 
	*
	* @param filename Name of the file
	*/
	public void delete(String filename) throws Exception{
		/* Get metadeta and locate file */
		FilesJson files = readMetaData();
		FileJson file = files.removeFile(filename);

		/* Delete physical file */
		ArrayList<PagesJson> pages = file.getPages();
		for(int i=0;i<pages.size();i++){
			Long guid = pages.get(i).getGuid();
			ChordMessageInterface peer = chord.locateSuccessor(guid);
			peer.delete(guid);
		}

		writeMetaData(files);
	}
    
	/**
	* Read block pageNumber of fileName 
	*
	* @param filename Name of the file
	* @param pageNumber number of block. 
	*/
	public RemoteInputFileStream read(String filename, int pageNumber) throws Exception{
		/* Grab file from metadata */
		FilesJson files = readMetaData();
		FileJson file = files.getFile(filename);
		PagesJson page = file.getPage(pageNumber);

		/* Get file stream from chord */
		Long guid = page.getGuid();
		ChordMessageInterface peer = chord.locateSuccessor(guid);
		RemoteInputFileStream rifs = peer.get(guid);

		/* Save updated metadata */
		writeMetaData(files);

		/* return stream */
		return rifs;
	}

	/**
	 * Read the head of the file
	 * @param filename Name of the file
	 */
	public RemoteInputFileStream head(String filename) throws Exception{
		return read(filename,0);
	}

	/**
	 * Read the last page of the file
	 * @param filename Name of the file
	 */
	public RemoteInputFileStream tail(String filename) throws Exception{
		/* Grab file from metadata */
		FilesJson files = readMetaData();
		FileJson file = files.getFile(filename);
		int pageNumber = file.getPages().size()-1;
		PagesJson page = file.getPage(pageNumber);

		/* Get file stream from chord */
		Long guid = page.getGuid();
		ChordMessageInterface peer = chord.locateSuccessor(guid);
		RemoteInputFileStream rifs = peer.get(guid);

		/* Save updated metadata */
		writeMetaData(files);

		/* return stream */
		return rifs;
	}
    
	/**
	* Add a page to the file                
	*
	* @param filename Name of the file
	* @param data RemoteInputStream. 
	*/
	public void append(String filename, RemoteInputFileStream data) throws Exception{
		/* Grab file from metadata */
		FilesJson files = readMetaData();
		FileJson file = files.getFile(filename);

		/* Parse page info */
		Long size = new Long(data.available());
		String time = LocalDateTime.now().toString();
		String name = filename + time;
		Long guid = md5(name);
		
		/* Write the physical file */
		//ChordMessageInterface peer = chord.locateSuccessor(guid);
		//peer.put(guid,data);
		chord.put(guid,data);

		/* Update the metadata */
		file.setWriteTS(time);
		file.addPage(guid,size,time,time,time,0);

		/* Write the metadata */
		writeMetaData(files);
	}

	/**
	 * Add a page to a given location
	 * @param filename Name of the file
	 * @param data RemoteInputStream
	 * @param pageNumber Page number to insert the file
	 */
	public void write(String filename, RemoteInputFileStream data, int pageNumber) throws Exception{
		/* Grab file from metadata */
		FilesJson files = readMetaData();
		FileJson file = files.getFile(filename);

		/* Parse page info */
		Long size = new Long(data.available());
		String time = LocalDateTime.now().toString();
		String name = filename + time;
		Long guid = md5(name);
		
		/* Write the physical file */
		//ChordMessageInterface peer = chord.locateSuccessor(guid);
		//peer.put(guid,data);
		chord.put(guid,data);

		/* Update the metadata */
		file.setWriteTS(time);
		file.addPage(guid,size,time,time,time,0,pageNumber);

		/* Write the metadata */
		writeMetaData(files);
	}


	public void runMapReduce(String fileInput, String fileOutput) throws Exception {

		/* Get the number of nodes */
		chord.size = 0;
		chord.successor.onChordSize(chord.getId(),1);
		while(chord.size==0) Thread.sleep(10);
		int interval = 1444 / chord.size;

		/* Create map file */
		FileMap fileMap = createFile(fileOutput+".map",interval,chord.size);
		MapReduceInterface mapper = new Mapper();

		/* for each page in file input do map*/
		FileJson file = readMetaData().getFile(fileInput);
		System.out.println("Going to start mapping "+file.getPages().size()+" total pages");
		for(PagesJson page : file.getPages()){
			System.out.println("    Mapping page "+page.getGuid());
			ChordMessageInterface peer = chord.locateSuccessor(page.getGuid());
			peer.mapContext(page.getGuid(), mapper, fileMap, fileOutput+".map");
		}
		//while(fileMap.counter!=0) Thread.sleep(10);
		mapBulkTree(fileOutput+".map");
		System.out.println("Finished mapping");

		// create reduce file 
		System.out.println("Going to reduce into "+fileMap.pages.size()+" total pages");
		FileMap fileReduce = createFile(fileOutput,interval,chord.size);
		for(FileMap.Page page : fileMap.pages){
			System.out.println("    Starting reduce for page "+page.pageId);
			ChordMessageInterface peer = chord.locateSuccessor(page.pageId);
			peer.reduceContext(page.pageId,mapper,fileReduce,fileOutput);
		}
		reduceBulkTree(fileOutput);
		System.out.println("Finished reducing");
	}

	char[] index = new char[]{'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9','-','+'};
	public FileMap createFile(String file, int interval, int size) throws Exception{
		int lower = 0;
		create(file);
		ChordMessageInterface currentChord = chord;
		FileMap fileMap = new FileMap(file);
		for(int i=0;i<size;i++){
			long page = md5(file+i);
			String lowerBoundInterval = ""+index[(int)(lower/38)]+index[lower%38];
			fileMap.appendEmptyPage(page,lowerBoundInterval);
			appendEmptyPage(file,page,lowerBoundInterval);
			currentChord.put(page,"{}");
			currentChord.resetMap();
			currentChord.resetReduce(lowerBoundInterval);

			currentChord = currentChord.getPredecessor();
			lower += interval;
		}
		return fileMap; 
	}

	public void appendEmptyPage(String filename, long guid, String lowerBoundInterval) throws Exception{
		/* Grab file from metadata */
		FilesJson files = readMetaData();
		FileJson file = files.getFile(filename);

		/* Parse page info */
		String time = LocalDateTime.now().toString();
		
		/* Update the metadata */
		file.setWriteTS(time);
		file.addPage(guid,new Long(0),time,time,time,0);
		ArrayList<PagesJson> tempPages = file.getPages();
		tempPages.get(tempPages.size()-1).setLowerBound(lowerBoundInterval);

		/* Write the metadata */
		writeMetaData(files);
	}

	public void mapBulkTree(String file) throws Exception{
		ChordMessageInterface peer = chord;
		for(int i=0;i<chord.size;i++){
			Long page = md5(file+i);
			peer.mapBulk(page);
			peer = peer.getPredecessor();
		}
	}

	public void reduceBulkTree(String file) throws Exception{
		ChordMessageInterface peer = chord;
		for(int i=0;i<chord.size;i++){
			Long page = md5(file+i);
			peer.reduceBulk(page);
			peer = peer.getPredecessor();
		}
	}

	ArrayList<FileMap> mapFile = new ArrayList<FileMap>();
	public void resetMapFile(){
		mapFile = new ArrayList<FileMap>();
	}

	public void setMapFile(FileMap mapFile){
		this.mapFile.add(mapFile);
	}

	public String getMapString(){
		if(mapFile.size()==0) return "{}";

		FileMap newMap = mapFile.get(0);
		for(int i=1;i<mapFile.size();i++){
			newMap.combine(mapFile.get(i));
		}

		JsonObject result = new JsonObject();
		for(FileMap.Page page : newMap.pages){
			JsonArray array = page.getValues();
			result.add(page.lowerBound,array);
		}
		return result.toString();
	}

	JsonArray reduceFile = new JsonArray();
	String chordLowerBound;
	public void resetReduceFile(String lower){
		reduceFile = new JsonArray();
		chordLowerBound = lower;
	}

	public void addReduceFile(String lower, String values){
		if(!chordLowerBound.equals(lower)) return;
		JsonParser parser = new JsonParser();
		JsonArray array = parser.parse(values).getAsJsonArray();
		for(JsonElement e : array){
			reduceFile.add(e.getAsJsonObject());
		}
	}

	public String getReduceString(){
		return reduceFile.toString();
	}

}
