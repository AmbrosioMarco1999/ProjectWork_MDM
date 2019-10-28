using System;
using ProjectWorking.Mezzi;
using System.Threading;
using System.Net.Http;
using System.Text;
using CSRedis;
using Newtonsoft.Json;
using System.Net.NetworkInformation;

namespace ProjectWorking
{
    class Program
    {
        static void Main(string[] args)
        {
            var redis = new RedisClient("192.168.0.18");
            Pullman p1 = new Pullman("CA128TD",70);  
/*          Pullman p2 = new Pullman("DB94111",40); 
            Pullman p3 = new Pullman("AA17424",50);
            Pullman p4 = new Pullman("EE119CA",70);
            Pullman p5 = new Pullman("PI11063",70);
            Pullman p6 = new Pullman("PD54715",30);
*/
            while(true)
            {
                Thread.Sleep(1000);
                p1.Update();
/*              p2.Update();
                p3.Update();
                p4.Update();
                p5.Update();
                p6.Update();
                
*/              
                sendToApi(JsonCreator(p1));
/*              sendToApi(JsonCreator(p2));
                sendToApi(JsonCreator(p3));                
                sendToApi(JsonCreator(p4));
                sendToApi(JsonCreator(p5));
                sendToApi(JsonCreator(p6));
                */
                //if(ping()){
                 //   if(count>0){
                 //       for(int i=0 ;i<count * pullmanNumber;i++){
                 //           sendToApi(redis.BLPop(30, "sensors_data"));
                 //       }
                 //   }
                 //   for(int i = 0; i < pullmanNumber; i++){
                 //       sendToApi(redis.BLPop(30, "sensors_data"));
                //    }
                 //   count=0;
               // }
                //else{
                  //  count ++;
               // }            
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
                    client.BaseAddress = new Uri("http://192.168.0.2:5000/");
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


    