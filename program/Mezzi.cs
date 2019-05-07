using System;
using ProjectWorking.ContaPersone;
using ProjectWorking.Gps;
using System.Threading;
namespace ProjectWorking.Mezzi
{
    class Pullman
    {
        private static Random rnd = new Random();
        private int _id;
        private int _numeroPosti;
        private bool _movimento = true;
        private int _tempososta;
        private Contapersone _contaPersone;
        private Posizione _posizione;
        private DateTime _oraInserimento;
        public Pullman(int id, int numeroposti)
        {
            _id = id;
            _numeroPosti = numeroposti;
            _contaPersone = new Contapersone(_numeroPosti);
            _posizione = new Posizione(CoordsGenerator(),CoordsGenerator());
            _oraInserimento = DateTime.Now;
        }
        public void Update()
        {
            if(_movimento == true)
            {
            _posizione.Change();
            int random = rnd.Next(0,30);
            if(random == 0)
            {
                _movimento = false;
                _tempososta = rnd.Next(10,20);   
            }
            }
            else if(_movimento == false)
            {
                _tempososta --;
                _contaPersone.Change();
                if(_tempososta == 0)
                {
                    _movimento = true;
                }
            }
            _oraInserimento=DateTime.Now;
        }
        public string JsonCreator()
        {
            string json = "{\""+_id+"\":{\"Latitudine\":\""+_posizione.GetLat()+"\",\"Longitudine\":\""+_posizione.GetLon()+"\",\"Passeggeri\":\""+_contaPersone.GetNumber()+"\",\"OraInserimento\":\""+ _oraInserimento +"\",\"Movimento\":\"" + _movimento+"\"}";
            return json;
        }
        private static double CoordsGenerator()
        {
            double minimum = -20;
            double maximum = 20;
            Random random = new Random();
            return Math.Round((random.NextDouble() * (maximum - minimum) + minimum),5);
        }
    }
}
