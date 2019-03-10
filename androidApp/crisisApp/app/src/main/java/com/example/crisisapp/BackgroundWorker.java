package com.example.crisisapp;

import android.app.AlertDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.util.Log;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;

//import static org.apache.http.entity.ContentType.APPLICATION_FORM_URLENCODED;

public class BackgroundWorker extends AsyncTask<String, Void, String> {

    Context context;
    AlertDialog alertDialog;

    BackgroundWorker(Context ctx){
        context = ctx;
    }

    public void makePostRequest(String urlStr, String jsonData) throws IOException {
        Log.i("myTag", "MakePostRequest()");

        /*
        URL myurl = new URL(urlStr);
        HttpURLConnection con = (HttpURLConnection) myurl.openConnection();
        con.setDoOutput(true);
        //con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type","application/json");

        con.setDoInput (true);
        con.setDoOutput (true);
        con.setUseCaches (false);
        // Send POST output.

        DataOutputStream printout = new DataOutputStream(con.getOutputStream ());
        Log.i("myTag", "made dataoutputstream");

        //printout.writeBytes(URLEncoder.encode(json_main.toString(),"UTF-8"));
        printout.flush();
        printout.close();
*/

    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    protected String doInBackground(String... params) {

        String type = params[0];

        String login_url = "http://decentralizedplaylist.com/login.php";
        String register_url = "http://decentralizedplaylist.com/register.php";

        String result = "initial result value";

        if(type.equals("register")) {
            Log.d("myTag", "inside reg");
            String name = params[1];
            String surname = params[2];
            String age = params[3];
            String username = params[4];
            String password = params[5];


            String urlParameters = "name=tin23''23{}2323&surname=bungoSurname&age=77&username=bungoUsername&password=bungoPword";
            String url = "http://decentralizedplaylist.com/register.php";

            String targetURL = url + "?" + urlParameters;
            byte[] postData = urlParameters.getBytes(StandardCharsets.UTF_8);

            try { //send post request

                URL myurl = new URL(url);
                HttpURLConnection con = (HttpURLConnection) myurl.openConnection();
                con.setDoOutput(true);
                con.setRequestMethod("POST");
               // con.setRequestProperty("User-Agent", "Java client");
                con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

                try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                    wr.write(postData);
                }

                //read input from echo statements in php file
                BufferedReader in = new BufferedReader(new InputStreamReader(myurl.openStream()));
                String inputLine;
                while ((inputLine = in.readLine()) != null)
                    Log.i("myTag", "Register inputline = "+inputLine);
                in.close();


                //con.disconnect();
                return "thang";//content.toString();

            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }


            return "tempRegVal";

        }else if(type.equals("registerJSON")){
            String urlParameters = params[1];

            HttpURLConnection urlConnection;
            String url;
            String data = params[1];
            String retresult = null;
            String uri = "http://decentralizedplaylist.com/jsonurlposttest.php";
            try {
                //Connect
                urlConnection = (HttpURLConnection) ((new URL(uri).openConnection()));
                urlConnection.setDoOutput(true);
                urlConnection.setRequestProperty("Content-Type", "application/json");
                urlConnection.setRequestProperty("Accept", "application/json");
                urlConnection.setRequestMethod("POST");
                urlConnection.connect();

                //Write
                OutputStream outputStream = urlConnection.getOutputStream();
                BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                writer.write(data);
                writer.close();
                outputStream.close();

                //Read
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

                String line = null;
                StringBuilder sb = new StringBuilder();

                while ((line = bufferedReader.readLine()) != null) {
                    sb.append(line);
                }

                bufferedReader.close();
                retresult = sb.toString();

            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            Log.i("myTag", "retresult = "+retresult);
            return retresult;

            //return "regJsonValOut";
        }


        return "lmao";
    }

    @Override
    protected void onPreExecute() {
        alertDialog = new AlertDialog.Builder(context).create();
        alertDialog.setTitle("LoginStatus");
    }

    @Override
    protected void onPostExecute(String result) {
        alertDialog.setMessage(result);
        alertDialog.show();
    }

    @Override
    protected void onProgressUpdate(Void... values) {
        super.onProgressUpdate(values);
    }
}
