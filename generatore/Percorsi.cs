using System;
using ProjectWorking.Gps;
using System.Collections.Generic;

namespace ProjectWorking.Percorsi
{
    class Percorso
    {
        Posizione _partenza;
        Posizione _arrivo;

        List<Posizione> lstTappe = new List<Posizione>();

        public Percorso(Posizione partenza, Posizione arrivo)
        {
            //_partenza = partenza;
            //_arrivo = arrivo;
            lstTappe[0] = partenza;
            lstTappe[lstTappe.Count - 1] = arrivo;
        }

        public Percorso()
        {
            _partenza = lstTappe[0];
            _arrivo = lstTappe[lstTappe.Count - 1];
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