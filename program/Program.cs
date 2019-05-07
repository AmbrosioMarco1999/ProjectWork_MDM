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
namespace ProjectWorking
{
    class Program
    {
        static void Main(string[] args)
        {
            var redis = new RedisClient("127.0.0.1");
            Pullman p1 = new Pullman(1,70);  
            Pullman p2 = new Pullman(2,50); 
            Pullman p3 = new Pullman(3,30); 
            while(true)
            {
                Thread.Sleep(1000);
                p1.Update();
                redis.LPush("sensors_data", p1.JsonCreator());
                /* p2.Update();
                Console.WriteLine(p2.JsonCreator());
                p3.Update();
                Console.WriteLine(p3.JsonCreator()); */
                if(ping()){
                    sendToApi(redis.BLPop(30, "sensors_data"));
                };
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
             using (var client = new HttpClient())  
            {  
                client.BaseAddress = new Uri("http://127.0.0.1:3000/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
                var content = new StringContent(data, Encoding.UTF8);
                HttpResponseMessage response = await client.PostAsync("test", content);
                response.EnsureSuccessStatusCode();
            } 
        }
        
    }
}


    