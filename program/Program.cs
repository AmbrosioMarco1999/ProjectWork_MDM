using System;
using ProjectWorking.Mezzi;
using System.Threading;
using CSRedis;
namespace ProjectWorking
{
    class Program
    {
        static void Main(string[] args)
        {
            Pullman p1 = new Pullman(1,70);  
            Pullman p2 = new Pullman(2,50); 
            Pullman p3 = new Pullman(3,30); 
            while(true)
            {
            Thread.Sleep(2000);
            p1.Update();
            Console.WriteLine(p1.JsonCreator());
            /* p2.Update();
            Console.WriteLine(p2.JsonCreator());
            p3.Update();
            Console.WriteLine(p3.JsonCreator()); */
            }
        }
    }
}
