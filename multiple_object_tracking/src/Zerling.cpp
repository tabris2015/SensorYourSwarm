#include "Zerling.h"

Zerling::Zerling()
{
    //ctor
}

Zerling::Zerling(string name){

    setType(name);
    if(name == "red"){
        setHSVmin(Scalar(0,125,107));
        setHSVmax(Scalar(249,255,166));
        setColor(Scalar(0,0,255));
    }
    if(name == "blue"){
        setHSVmin(Scalar(99,45,30));
        setHSVmax(Scalar(138,255,170));
        setColor(Scalar(255,0,0));
    }
    if(name == "green"){
        setHSVmin(Scalar(59,34,87));
        setHSVmax(Scalar(255,148,140));
        setColor(Scalar(0,255,0));
    }
    if(name == "yellow"){
        setHSVmin(Scalar(0,43,125));
        setHSVmax(Scalar(43,255,184));
        setColor(Scalar(0,255,255));
    }

}

Zerling::~Zerling()
{
    //dtor
}

int Zerling::getXPos(){

    return Zerling::xPos;

}

int Zerling::getYPos(){

    return Zerling::yPos;

}

void Zerling::setXPos(int x){

    Zerling::xPos = x;

}

void Zerling::setYPos(int y){

    Zerling::yPos = y;

}

Scalar Zerling::getHSVmin(){

    return Zerling::HSVmin;

}

Scalar Zerling::getHSVmax(){

    return Zerling::HSVmax;

}

void Zerling::setHSVmin(Scalar min){

    Zerling::HSVmin = min;

}

void Zerling::setHSVmax(Scalar max){

    Zerling::HSVmax = max;

}
