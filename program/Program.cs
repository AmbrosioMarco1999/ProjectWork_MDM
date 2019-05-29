﻿using System;
using ProjectWorking.Mezzi;
using System.Threading;
using System.Net.Http;
using System.Text;
using System.Net.Http.Headers; 
using System.Threading.Tasks;
using System.Net.Http.Formatting;
using CSRedis;
using System.Net;
using Newtonsoft.Json;
using System.Net.NetworkInformation;

namespace ProjectWorking
{
    class Program
    {
        static void Main(string[] args)
        {
            int pullmanNumber = 3;
            int count = 0;
            var redis = new RedisClient("192.168.101.143");
            Pullman p1 = new Pullman(1,70, 1);  
            Pullman p2 = new Pullman(2,50, 2); 
            Pullman p3 = new Pullman(3,30, 3);
            while(true)
            {
                Thread.Sleep(1000);
                p1.Update();
                p2.Update();
                p3.Update();
                redis.LPush("sensors_data",JsonCreator(p1));
                redis.LPush("sensors_data",JsonCreator(p2));
                redis.LPush("sensors_data",JsonCreator(p3));
                if(ping()){
                    if(count>0){
                        for(int i=0 ;i<count * pullmanNumber;i++){
                            sendToApi(redis.BLPop(30, "sensors_data"));
                        }
                    }
                    for(int i = 0; i < pullmanNumber; i++){
                        sendToApi(redis.BLPop(30, "sensors_data"));
                    }
                    count=0;
                }
                else{
                    count ++;
                }            
            }
        }
        
       static bool ping()
        {
            Ping pingSender = new Ping();
            PingReply reply = pingSender.Send("8.8.8.8");
            if (reply.Status == IPStatus.Success)
            {                
                return true;
            }
            return false;
        }

        static string JsonCreator(Pullman p){
            string json = JsonConvert.SerializeObject(p, Formatting.Indented);
            return json;            
        }

        static async void sendToApi(string data){
            try{
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("http://127.0.0.1:5000/");
                    var content = new StringContent(data, Encoding.UTF8, "application/json"); 
                    var result = await client.PostAsync("pullman", content);
                    string resultContent = await result.Content.ReadAsStringAsync();
                }
            }catch
            {

            }
        }
    }
}


    