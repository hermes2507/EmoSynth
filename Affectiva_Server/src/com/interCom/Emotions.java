package com.interCom;
import java.util.*;

public class Emotions{
	private Hashtable<String, Integer> Emotions;
	
	public Emotions(){
		Emotions = new Hashtable<String, Integer>();
	}
	
	public void addEmotion(String emotion, int intensity){
		if(intensity > 100)
			intensity = 100;
		if(intensity < 0)
			intensity = 0;
		Emotions.put(emotion, intensity);
	}
	
	public boolean hasEmotion(String emotion){
		if(Emotions.containsValue(emotion))
			return true;
		else
			return false;
	}
	
	public ArrayList<String> returnEmotions(){
		return Collections.list(Emotions.keys());
	}
	
	public int returnEmotion(String emotion){
		if(Emotions.containsKey(emotion))
			return Emotions.get(emotion);
		else
			return 0;
	}
}
