package com.example.crisisapp;

import android.media.MediaMetadata;
import android.media.MediaMetadataRetriever;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.os.Bundle;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import android.app.AlertDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.util.Log;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    public void SendJsonPost(View view) throws JSONException, IOException {
        Log.i("myTag", "starting function SendJsonPost()");

        //get json data
        String jsonString = getJsonData();




        Log.i("myTag", "json_main = "+jsonString);



        BackgroundWorker backgroundWorker = new BackgroundWorker(this);
/*
        String str_name = "bungoName";
        String str_surname = "bungoSurname";
        String str_age = "77";
        String str_username = "bungoUsername";
        String str_password = "bungoPword";
        String type = "register";
        backgroundWorker.execute(type, str_name, str_surname, str_age, str_username, str_password);
*/

        String type = "registerJSON";
        backgroundWorker.execute(type, jsonString);

        Log.i("myTag", "end of func");
    }

    public String getJsonData() throws JSONException {
        String temp = "temp";
        JSONObject json_main = new JSONObject();
        json_main.put("Username", "martinbarker1");

        JSONObject json_song1 = new JSONObject();
        json_song1.put("Title", "Norway");
        json_song1.put("Artist", "Beach House");
        json_song1.put("Album", "Teen Dream");
        json_song1.put("DateTime","2019-3-9 13:17:17");
        json_song1.put("Source","blackplayer");
        json_song1.put("Device","androidPhone1");

        JSONObject json_song2 = new JSONObject();
        json_song2.put("Title", "Golden Symmetry");
        json_song2.put("Artist", "Von Haze");
        json_song2.put("Album", "Kar Dee Akk Ake");
        json_song2.put("DateTime","2019-3-10 13:17:17");
        json_song2.put("Source","spotify");
        json_song2.put("Device","browser1");

        json_main.put("Song1", json_song1);
        json_main.put("Song2", json_song2);

        return json_main.toString(); //temp;
    }

    public void saveFile(View view) {
        Log.i("myTag", "start of saveFile()");
        writeToFile("writeThis", this);
        Log.i("myTag", "now reading from file");
        readFromFile(this);
        Log.i("myTag", "end of saveFile()");
    }

    private void writeToFile(String data, Context context) {
        try {
            OutputStreamWriter outputStreamWriter = new OutputStreamWriter(context.openFileOutput("config.txt", Context.MODE_PRIVATE));
            outputStreamWriter.write(data);
            outputStreamWriter.close();
        }
        catch (IOException e) {
            Log.e("Exception", "File write failed: " + e.toString());
        }
    }

    private String readFromFile(Context context) {

        String ret = "";

        try {
            InputStream inputStream = context.openFileInput("config.txt");

            if ( inputStream != null ) {
                InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
                BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
                String receiveString = "";
                StringBuilder stringBuilder = new StringBuilder();

                while ( (receiveString = bufferedReader.readLine()) != null ) {
                    stringBuilder.append(receiveString);
                }

                inputStream.close();
                ret = stringBuilder.toString();
                Log.i("myTag", "read from file: "+ret);
            }
        }
        catch (FileNotFoundException e) {
            Log.e("login activity", "File not found: " + e.toString());
        } catch (IOException e) {
            Log.e("login activity", "Can not read file: " + e.toString());
        }

        return ret;
    }

    public void saveLogcat(View view) {
        Log.i("myTag", "start of saveLogcat()");

        Log.i("myTag", "end of saveLogcat()");
    }

    public void startTrackingMusic(View view) {
        Log.i("myTag", "start of startTrackingMusic()");

        MediaController mc = new MediaController();

        final long NANOSEC_PER_SEC = 1000l*1000*1000;
        long startTime = System.nanoTime();
        while ((System.nanoTime()-startTime)< 2*60*NANOSEC_PER_SEC){
            Log.i("myTag", "loop");

            //mc.getMediaMetadata();

        }
        Log.i("myTag", "end of startTrackingMusic()");
    }
}
