using System;
using ProjectWorking.Mezzi;
using System.Threading;
using System.Net.Http;
using System.Text;
using System.Net.Http.Headers; 
using System.Threading.Tasks;
using CSRedis;
namespace ProjectWorking
{
    class Program
    {
        private static string URL = "https://sub.domain.com/objects.json";
        private static string urlParameters = "?api_key=123";
        static void Main(string[] args)
        {
            var redis = new RedisClient("127.0.0.1");
            Pullman p1 = new Pullman(1,70);  
            Pullman p2 = new Pullman(2,50); 
            Pullman p3 = new Pullman(3,30); 
            while(true)
            {
            Thread.Sleep(2000);
            p1.Update();
            Console.WriteLine(p1.JsonCreator());
            redis.LPush("sensors_data", p1.JsonCreator());
            /* p2.Update();
            Console.WriteLine(p2.JsonCreator());
            p3.Update();
            Console.WriteLine(p3.JsonCreator()); */
            Console.WriteLine(redis.BLPop(30, "sensors_data"));
            // SendData(p1);
            }
        }
        // static void SendData(Pullman data)
        // {
        //     using (var client = new HttpClient())
        //     {
        //         client.BaseAddress = new Uri("http://localhost:3000/");
        //         client.DefaultRequestHeaders.Accept.Clear();
        //         client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        //         // HTTP POST
        //         //var content = new StringContent(data, Encoding.UTF8, "application/json");
        //         //var response = client.PostAsync("test", data);
        //         response = client.PostAsJsonAsync("api/products", data);
        //     }
        // }
    }
}


    