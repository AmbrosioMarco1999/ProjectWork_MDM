using System;
using ProjectWorking.ContaPersone;
using ProjectWorking.Gps;
using System.Threading;
using ProjectWorking.Percorsi;
using System.Collections.Generic;

namespace ProjectWorking.Mezzi
{
    class Pullman
    {
        private static Random rnd = new Random();

        List<Percorso> Percorsi=GeneratorlstPercorsi();
        private int _id;
        public int Id
        {
            get => _id;
            set => _id = value;
        }
        private int _numeroPosti;
        private bool _movimento = true;

        public bool Movimento{
            get => _movimento;
        }
        private int _tempososta;
        private Contapersone _contaPersone;
        public int PersoneABordo
        {
            get => _contaPersone.GetNumber();
        }
        private Posizione _posizione;

        /* public List<Posizione> PosizioneAttuale{
            
        } */

        public double Longitudine{
            get => _posizione.GetLon();
        }
        public double Latitudine{
            get => _posizione.GetLat();
        }
        private DateTime _oraInserimento;
        public string OraInserimento
        {
            get => _oraInserimento.ToString("MM/dd/yyyy HH:mm:ss");
        }
        private Percorso _percorso;
        public int IdPercorso{
            get => Percorsi.IndexOf(_percorso);
        }
        public Pullman(int id, int numeroposti, int idPercorso)
        {
            _id = id;
            _numeroPosti = numeroposti;
            _contaPersone = new Contapersone(_numeroPosti);
            _posizione = new Posizione(CoordsGenerator(),CoordsGenerator());
            _oraInserimento = DateTime.Now;
            _percorso=Percorsi[idPercorso];
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

        /* public string JsonCreator()
        {
            string json = "{\""+"id"+"\":\""+_id+"\",\"Latitudine\":\""+_posizione.GetLat()+"\",\"Longitudine\":\""+_posizione.GetLon()+"\",\"Passeggeri\":\""+_contaPersone.GetNumber()+"\",\"OraInserimento\":\""+ _oraInserimento +"\",\"Movimento\":\"" + _movimento+"\"}";
            return json;
        } */
        private static double CoordsGenerator()
        {
            double minimum = -20;
            double maximum = 20;
            Random random = new Random();
            return Math.Round((random.NextDouble() * (maximum - minimum) + minimum),5);
        }

        private static Percorso PercorsoGenerator()
        {
            Posizione partenza = new Posizione(CoordsGenerator(), CoordsGenerator());
            Posizione arrivo = new Posizione(CoordsGenerator(), CoordsGenerator());

            Percorso percorso = new Percorso(partenza, arrivo);


            return percorso;
        }

        private static List<Percorso> GeneratorlstPercorsi()
        {
            List<Percorso> lstPercorsi = new List<Percorso>();

            for (int i = 0; i < 10; i++)
            {
                //lstPercorsi[i]=PercorsoGenerator();
                lstPercorsi.Add(PercorsoGenerator());
            }

            return lstPercorsi;
        }

        
    }
}
