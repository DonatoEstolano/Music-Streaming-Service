/**
* SongDispatcher is the main responsable for obtaining the songs 
*
* @author  Oscar Morales-Ponce
* @version 0.15
* @since   02-11-2019 
*/

import java.io.IOException;
import java.io.InputStream;
import java.io.FileReader;
import java.io.FileInputStream;
import java.io.File;
import java.util.Base64;
import java.io.FileNotFoundException;


public class SongDispatcher
{
    static final int FRAGMENT_SIZE = 8192; 
    public SongDispatcher()
    {
        
    }
    
    /* 
    * getSongChunk: Gets a chunk of a given song
    * @param song: Song ID. Each song has a unique ID 
    * @param fragment: The chunk corresponds to 
    * [fragment * FRAGMENT_SIZE, FRAGMENT_SIZE]
    */
    public String getSongChunk(String song, Long fragment) throws FileNotFoundException, IOException
    {
	    System.out.println(song);
	    System.out.println(fragment);
        byte buf[] = new byte[FRAGMENT_SIZE];

        File file = new File("./songs/" + song);
        FileInputStream inputStream = new FileInputStream(file);
        inputStream.skip(fragment * FRAGMENT_SIZE);
        inputStream.read(buf);
        inputStream.close(); 
        // Encode in base64 so it can be transmitted 
         return Base64.getEncoder().encodeToString(buf);
    }
    
    /* 
    * getFileSize: Gets a size of the file
    * @param song: Song ID. Each song has a unique ID 
     */
    public Integer getFileSize(String song) throws FileNotFoundException, IOException
    {
        File file = new File("./songs/" + song);        
        Integer total =  (int)file.length();
        
        return total;
    }
    
}
