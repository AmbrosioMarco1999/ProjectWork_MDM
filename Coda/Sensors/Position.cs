using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coda.Sensors
{
    class Position
    {

        double _latitudine;
        double _longitudine;
        Position()
        {

        }

        Position(double latitudine, double longitudine)
        {
            _latitudine = latitudine;
            _longitudine = longitudine;
        }

        public double Longitudine { get => _longitudine; set => _longitudine = value; }
        public double Latitudine { get => _latitudine; set => _latitudine = value; }

        private double GetRandomPosition()


        public string GetPositionToJSON()
        {
            return "{\"latitude\":\"" + Latitudine + "\"" + "," + "\"temperature\":\"" + Longitudine + "\"}";
        }
    }
}
