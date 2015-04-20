#ifndef ZERLING_H
#define ZERLING_H
#include <string>
#include <opencv\highgui.h>
#include <opencv\cv.h>

using namespace std;
using namespace cv;

class Zerling
{
    public:
        Zerling();
        virtual ~Zerling();

        Zerling(string name);

        int getXPos();
        int getYPos();
        void setXPos(int x);
        void setYPos(int y);

        Scalar getHSVmin();
        Scalar getHSVmax();
        void setHSVmin(Scalar min);
        void setHSVmax(Scalar max);

        string getType(){return type;}
        void setType(string t){type = t;}

        Scalar getColor(){return color;}
        void setColor(Scalar c){color = c;}

    protected:

    private:
        int xPos;
        int yPos;
        string type;
        Scalar HSVmin,HSVmax;
        Scalar color;
};

#endif // ZERLING_H
