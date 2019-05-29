using System;

namespace ProjectWorking.ContaPersone
{
    class Contapersone
    {
        private static Random rndom = new Random();
        private int _numeroMaxPersone;
        private int _numeroPasseggeri;
        
        public Contapersone(int posti)
        {
            _numeroMaxPersone = posti;
            _numeroPasseggeri = rndom.Next(0,_numeroMaxPersone);
        }
        public void Change()
        {
            int numero = rndom.Next(-10,10);
            int scelta = rndom.Next(0,2);
            if(_numeroPasseggeri + numero < _numeroMaxPersone && _numeroPasseggeri + numero >=0)
            {
               _numeroPasseggeri += numero;
            }
        }
        public int GetNumber()
        {
            return _numeroPasseggeri;
        }
    }
    
}
