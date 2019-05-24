using System;
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

namespace ProjectWorking
{
    class Program
    {
        static void Main(string[] args)
        {
            var redis = new RedisClient("127.0.0.1");
            Pullman p1 = new Pullman(1,70, 1);  
            Pullman p2 = new Pullman(2,50, 2); 
            Pullman p3 = new Pullman(3,30, 3); 
            while(true)
            {
                Thread.Sleep(1000);
                p1.Update();
                //p2.Update();
                //p3.Update();
                //redis.LPush("sensors_data", p1.JsonCreator());
                Console.WriteLine(JsonCreator(p1));
                /* p2.Update();
                //Console.WriteLine(JsonCreator(p2));
                p3.Update();
                //Console.WriteLine(JsonCreator(p1)); */
                /* if(ping()){
                    //sendToApi(redis.BLPop(30, "sensors_data"));
                    sendToApi(JsonCreator(p1));
                    sendToApi(JsonCreator(p2));
                    sendToApi(JsonCreator(p3));
                }; */              
            }
        }
       static bool ping()
        {
            System.Net.NetworkInformation.Ping pingSender = new System.Net.NetworkInformation.Ping();
            System.Net.NetworkInformation.PingReply reply = pingSender.Send("8.8.8.8");
            if (reply.Status == System.Net.NetworkInformation.IPStatus.Success)
            {                
                return true;
            }
            else
            {                
                return false;
            }
        }
        static async void sendToApi(string data)
        {
            try{
             using (var client = new HttpClient())  
            {  
                client.BaseAddress = new Uri("http://127.0.0.1:3000/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
                var content = new StringContent(data, Encoding.UTF8);
                HttpResponseMessage response = await client.PostAsync("api/pullman", content);
                response.EnsureSuccessStatusCode();
            } 
            }catch{};
        }

        static string JsonCreator(Pullman p){
            string json = JsonConvert.SerializeObject(p, Formatting.Indented);
            Console.WriteLine(json);
            return json;
            
        }
        
    }
}


    