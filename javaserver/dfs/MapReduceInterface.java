package dfs;

import java.io.*;
import com.google.gson.*;

public interface MapReduceInterface extends Serializable {
	public void map(String key, JsonObject value, FileMap context,String file) throws IOException;
	public void reduce(String key, JsonArray values, ChordMessageInterface context,String file) throws Exception;
}
