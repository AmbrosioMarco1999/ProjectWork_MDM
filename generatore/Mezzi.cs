using System;
using ProjectWorking.ContaPersone;
using System.Threading;
using System.Collections.Generic;
using Newtonsoft.Json;
using ProjectWorking.Gps;
using System.IO;


namespace ProjectWorking.Mezzi
{
    class Pullman
    {
        private static Random rnd = new Random();

        private List<Posizione> _percorsoPullman;
        [JsonIgnore]
        public List<Posizione> PercorsoPullman
        {
            get => _percorsoPullman;
        }

        private string _targa;
        public string Targa
        {
            get => _targa;
            set => _targa = value;
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

        // private Percorso _percorso;
        // public int IdPercorso{
        //     get => Percorsi.IndexOf(_percorso);
        // }


        private bool _started;
        public bool Started{
            get => _started;
        }
        
        private int _rootStatus;

        public int RootStatus
        {
            get => _rootStatus;
            set => _rootStatus = value;
        }

        public Pullman(string targa, int numeroposti)
        {
            _started = false;
            _targa = targa;
            _numeroPosti = numeroposti;
            _percorsoPullman=Percorso(targa);
            _contaPersone = new Contapersone(_numeroPosti);
            _posizione = _percorsoPullman[0];
            _oraInserimento = DateTime.Now;
            _rootStatus = 0;
        }

        public void Update()
        {
            _started = true;
            //Console.WriteLine("Count: " + (_percorsoPullman.Count-1).ToString());
            if(_movimento == true)
            {
                if(_rootStatus==(_percorsoPullman.Count-1)){
                    _rootStatus=1;
                }
                _posizione = _percorsoPullman[_rootStatus];
                // _posizione.Change();
                int random = rnd.Next(0,30);
                _rootStatus++;
                //_posizione = _percorsoPullman[_rootStatus];
                
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

/*        private static double CoordsGenerator()
        {
            double minimum = -20;
            double maximum = 20;
            Random random = new Random();
            return Math.Round((random.NextDouble() * (maximum - minimum) + minimum),5);
        }
*/
/*        private static Percorso PercorsoGenerator()
        {
            Posizione partenza = new Posizione(CoordsGenerator(), CoordsGenerator());
            Posizione arrivo = new Posizione(CoordsGenerator(), CoordsGenerator());

            Percorso percorso = new Percorso(partenza, arrivo);


            return percorso;
        }
*/
/*        private static List<Percorso> GeneratorlstPercorsi()
        {
            List<Percorso> lstPercorsi = new List<Percorso>();

            for (int i = 0; i < 10; i++)
            {
                //lstPercorsi[i]=PercorsoGenerator();
                lstPercorsi.Add(PercorsoGenerator());
            }

            return lstPercorsi;
        }
*/   

        public List<Posizione> Percorso(string nomeFile)
        {
            string linea="";
            Posizione posizione=new Posizione();
            List<Posizione>lstTappe=new List<Posizione>();

            StreamReader sr = new StreamReader(@"Percorsi/"+nomeFile+".txt");
            while((linea = sr.ReadLine()) != null){
                if(linea.Trim()=="["){
                    linea = sr.ReadLine();
                    posizione.SetLon(Convert.ToDouble(linea));
//                  Console.WriteLine(posizione.GetLat());
                    linea=sr.ReadLine();
                    posizione.SetLat(Convert.ToDouble(linea));
//                  Console.WriteLine(posizione.GetLon());
                    linea=sr.ReadLine();
                }
                lstTappe.Add(posizione);
                posizione=new Posizione();
            }
            // foreach (var item in lstTappe)
            // {
            //     Console.WriteLine(item.GetLat());
            //     Console.WriteLine(item.GetLon());
            //     Console.WriteLine();
            // }
            return lstTappe;
        }
    }
}
