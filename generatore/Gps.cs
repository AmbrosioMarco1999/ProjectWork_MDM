using System;

namespace ProjectWorking.Gps
{
    class Posizione
    {
        private double _latitudine;
        private double _longitudine;
        public Posizione(double latitudine, double longitudine)
        {
            _latitudine = latitudine;
            _longitudine = longitudine;
        }

        public Posizione()
        {

        }
        public void Change()
        {

        }

        public double GetLat()
        {
            return _latitudine;
        }

        public void SetLat(double lat)
        {
            _latitudine=lat;
        }

        public void SetLon(double lon)
        {
            _longitudine=lon;
        }
        public double GetLon()
        {
            return _longitudine;
        }
    }
}
