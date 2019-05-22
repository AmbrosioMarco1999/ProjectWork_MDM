using System;
using ProjectWorking.Gps;

namespace ProjectWorking.Percorsi
{
    class Percorsi
    {
        Posizione _partenza;
        Posizione _arrivo;

        public Percorsi(Posizione partenza, Posizione arrivo)
        {
            _partenza = partenza;
            _arrivo = arrivo;
        }

        public Percorsi()
        {
            _partenza.Change();
            _arrivo.Change();
        }

        public Posizione GetPartenza()
        {
            return _partenza;            
        }

        public Posizione GetArrivo()
        {
            return _arrivo;
        }
    }
}