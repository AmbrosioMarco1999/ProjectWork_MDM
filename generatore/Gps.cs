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
            // _latitudine +=0.0020;
            // _longitudine -=0.0020;
            // _latitudine = Math.Round(_latitudine,5);
            // _longitudine = Math.Round(_longitudine,5);
            
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
