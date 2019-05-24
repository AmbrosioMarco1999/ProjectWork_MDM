using System;
using ProjectWorking.Gps;

namespace ProjectWorking.Percorsi
{
    class Percorso
    {
        Posizione _partenza;
        Posizione _arrivo;

        public Percorso(Posizione partenza, Posizione arrivo)
        {
            _partenza = partenza;
            _arrivo = arrivo;
        }

        public Percorso()
        {
            //_partenza.Change();
            //_arrivo.Change();
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