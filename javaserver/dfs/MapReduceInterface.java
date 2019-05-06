package dfs;

import java.io.*;
import com.google.gson.JsonObject;

public interface MapReduceInterface extends Serializable {
	public void map(String key, JsonObject value, FileMap context,String file) throws IOException;
	public void reduce(String key, JsonObject values, FileMap context,String file) throws IOException;
}
