//Written by  Kyle Hounslow 2013

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software")
//, to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
//and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
//IN THE SOFTWARE.

#include <sstream>
#include <vector>
#include <iostream>
#include "math.h"
#include "Zerling.h"
#include <curl/curl.h>

//initial min and max HSV filter values.
//these will be changed using trackbars
int H_MIN = 0;
int H_MAX = 255;
int S_MIN = 0;
int S_MAX = 255;
int V_MIN = 0;
int V_MAX = 255;
//default capture width and height
const int FRAME_WIDTH = 640;
const int FRAME_HEIGHT = 480;
//max number of objects to be detected in frame
const int MAX_NUM_OBJECTS=50;
//minimum and maximum object area
const int MIN_OBJECT_AREA = 20*20;
const int MAX_OBJECT_AREA = FRAME_HEIGHT*FRAME_WIDTH/1.5;
//names that will appear at the top of each window
const string windowName = "Original Image";
const string windowName1 = "HSV Image";
const string windowName2 = "Thresholded Image";
const string windowName3 = "After Morphological Operations";
const string trackbarWindowName = "Trackbars";
void on_trackbar( int, void* )
{//This function gets called whenever a
	// trackbar position is changed





}
string intToString(int number){


	std::stringstream ss;
	ss << number;
	return ss.str();
}
void createTrackbars(){
	//create window for trackbars


	namedWindow(trackbarWindowName,0);
	//create memory to store trackbar name on window
	char TrackbarName[50];
	sprintf( TrackbarName, "H_MIN", H_MIN);
	sprintf( TrackbarName, "H_MAX", H_MAX);
	sprintf( TrackbarName, "S_MIN", S_MIN);
	sprintf( TrackbarName, "S_MAX", S_MAX);
	sprintf( TrackbarName, "V_MIN", V_MIN);
	sprintf( TrackbarName, "V_MAX", V_MAX);
	//create trackbars and insert them into window
	//3 parameters are: the address of the variable that is changing when the trackbar is moved(eg.H_LOW),
	//the max value the trackbar can move (eg. H_HIGH),
	//and the function that is called whenever the trackbar is moved(eg. on_trackbar)
	//                                  ---->    ---->     ---->
	createTrackbar( "H_MIN", trackbarWindowName, &H_MIN, H_MAX, on_trackbar );
	createTrackbar( "H_MAX", trackbarWindowName, &H_MAX, H_MAX, on_trackbar );
	createTrackbar( "S_MIN", trackbarWindowName, &S_MIN, S_MAX, on_trackbar );
	createTrackbar( "S_MAX", trackbarWindowName, &S_MAX, S_MAX, on_trackbar );
	createTrackbar( "V_MIN", trackbarWindowName, &V_MIN, V_MAX, on_trackbar );
	createTrackbar( "V_MAX", trackbarWindowName, &V_MAX, V_MAX, on_trackbar );


}
void drawLine(vector<Zerling> redZerling, vector<Zerling> blueZerling, vector<Zerling> greenZerling, vector<Zerling> yellowZerling, Mat &frame){
    int Lm = 150;
    int Hm = 120;

    int xRed = redZerling.at(0).getXPos();
    int yRed = redZerling.at(0).getYPos();
    cout<<"Red :" + intToString(xRed)+","+intToString(yRed)<< endl;

    int xBlue = blueZerling.at(0).getXPos();
    int yBlue = blueZerling.at(0).getYPos();
    cout<<"Blue :" + intToString(xBlue)+","+intToString(yBlue)<< endl;

    int xGreen = greenZerling.at(0).getXPos();
    int yGreen = greenZerling.at(0).getYPos();
    cout<<"Green :" + intToString(xGreen)+","+intToString(yGreen)<< endl;

    int xYellow = yellowZerling.at(0).getXPos();
    int yYellow = yellowZerling.at(0).getYPos();

    cout<<"Green :" + intToString(xYellow)+","+intToString(yYellow)<< endl;

    int dRB = sqrt(pow(((xRed*Lm)/640 - (xBlue*Lm)/640),2) + pow(((yRed*Hm)/480 - (yBlue*Hm)/480),2));
    cout<<"dRB :" + intToString(dRB)<< endl;
    int dRBx = (xRed + xBlue)/2;
    int dRBy = (yRed + yBlue)/2;

    int dRG = sqrt(pow(((xRed*Lm)/640 - (xGreen*Lm)/640),2) + pow(((yRed*Hm)/480 - (yGreen*Hm)/480),2));
    cout<<"dRG :" + intToString(dRG)<< endl;
    int dRGx = (xRed + xGreen)/2;
    int dRGy = (yRed + yGreen)/2;

    int dRY = sqrt(pow(((xRed*Lm)/640 - (xYellow*Lm)/640),2) + pow(((yRed*Hm)/480 - (yYellow*Hm)/480),2));
    cout<<"dRY :" + intToString(dRY)<< endl;
    int dRYx = (xRed + xYellow)/2;
    int dRYy = (yRed + yYellow)/2;

    cv::line(frame, cv::Point(xRed,yRed), cv::Point(xBlue,yBlue), Scalar( 110, 220, 0 ),  2, 8 );
    cv::putText(frame,"dRB = " + intToString(dRB),cv::Point(dRBx,dRBy+20),1,1,Scalar(0,0,0));
    cv::line(frame, cv::Point(xRed,yRed), cv::Point(xGreen,yGreen), Scalar( 110, 220, 0 ),  2, 8 );
    cv::putText(frame,"dRG = " + intToString(dRG),cv::Point(dRGx,dRGy+20),1,1,Scalar(0,0,0));
    cv::line(frame, cv::Point(xRed,yRed), cv::Point(xYellow,yYellow), Scalar( 110, 220, 0 ),  2, 8 );
    cv::putText(frame,"dRY = " + intToString(dRY),cv::Point(dRYx,dRYy+20),1,1,Scalar(0,0,0));

}
void drawObject(vector<Zerling> theZerlings,Mat &frame){

    int Lm = 150;
    int Hm = 120;
    //bool drawLines = false;
    Scalar color;
    //string referenceType = "red";
    string name;
    int counterOfZerlings = theZerlings.size();
    //int referenceIndex;
    //int referenceXPos;
    //int referenceYPos;
    int x,xReal;
    int y,yReal;
    //cout<<intToString(counterOfZerlings)<< endl;
    for(int i=0; i<counterOfZerlings; i++){
        x = theZerlings.at(i).getXPos();
        xReal = (x*Lm)/640;
        y = theZerlings.at(i).getYPos();
        yReal = (y*Hm)/480;
        name = theZerlings.at(i).getType();
        color = theZerlings.at(i).getColor();
        cv::circle(frame,cv::Point(x,y),10,cv::Scalar(0,0,255));
        cv::putText(frame,intToString(xReal)+ " , " + intToString(yReal),cv::Point(x,y+20),1,1,Scalar(0,255,0));
        cv::putText(frame,name,cv::Point(x,y-30),1,2,color);
//        if(name.compare(referenceType) == 0) {
//            //cout<<name<< endl;
//            referenceIndex = i;
//            referenceXPos = x;
//            referenceYPos = y;
//            drawLines = true;
//        }
    }

//    if(drawLines){
//        //cout<<intToString(counterOfZerlings)<< endl;
//        //cout<<intToString(referenceIndex)<< endl;
//        for(int j=0; j<counterOfZerlings; j++){
//            //if(i != referenceIndex){
//                x = theZerlings.at(j).getXPos();
//                y = theZerlings.at(j).getYPos();
//                cv::line(frame, cv::Point(referenceXPos,referenceYPos), cv::Point(x,y), Scalar( 110, 220, 0 ),  2, 8 );
//            //}
//
//        }
//
//    }


}
void morphOps(Mat &thresh){

	//create structuring element that will be used to "dilate" and "erode" image.
	//the element chosen here is a 3px by 3px rectangle

	Mat erodeElement = getStructuringElement( MORPH_RECT,Size(3,3));
	//dilate with larger element so make sure object is nicely visible
	Mat dilateElement = getStructuringElement( MORPH_RECT,Size(8,8));

	erode(thresh,thresh,erodeElement);
	erode(thresh,thresh,erodeElement);

	dilate(thresh,thresh,dilateElement);
	dilate(thresh,thresh,dilateElement);



}
void trackFilteredObject(Mat threshold,Mat HSV, Mat &cameraFeed){

	//int x,y;
	//instance of class zerling
	//Zerling zerling;

	//instance of vector of zerlings
	vector<Zerling> zerlings;

	Mat temp;
	threshold.copyTo(temp);
	//these two vectors needed for output of findContours
	vector< vector<Point> > contours;
	vector<Vec4i> hierarchy;
	//find contours of filtered image using openCV findContours function
	findContours(temp,contours,hierarchy,CV_RETR_CCOMP,CV_CHAIN_APPROX_SIMPLE );
	//use moments method to find our filtered object
	double refArea = 0;
	bool objectFound = false;
	if (hierarchy.size() > 0) {
		int numObjects = hierarchy.size();
		//if number of objects greater than MAX_NUM_OBJECTS we have a noisy filter
		if(numObjects<MAX_NUM_OBJECTS){
			for (int index = 0; index >= 0; index = hierarchy[index][0]) {

				Moments moment = moments((cv::Mat)contours[index]);
				double area = moment.m00;

				//if the area is less than 20 px by 20px then it is probably just noise
				//if the area is the same as the 3/2 of the image size, probably just a bad filter
				//we only want the object with the largest area so we safe a reference area each
				//iteration and compare it to the area in the next iteration.
				if(area>MIN_OBJECT_AREA){

					//x = moment.m10/area;
					//y = moment.m01/area;
					Zerling zerling;

					zerling.setXPos(moment.m10/area);
                    zerling.setYPos(moment.m01/area);

                    zerlings.push_back(zerling);

					objectFound = true;

				}else objectFound = false;


			}
			//let user know you found an object
			if(objectFound == true){
				//draw object location on screen
				drawObject(zerlings,cameraFeed);}

		}else putText(cameraFeed,"TOO MUCH NOISE! ADJUST FILTER",Point(0,50),1,2,Scalar(0,0,255),2);
	}
}

//void trackFilteredObject(Zerling theZerling, Mat threshold,Mat HSV, Mat &cameraFeed){
vector<Zerling> trackFilteredObject(Zerling theZerling, Mat threshold,Mat HSV, Mat &cameraFeed){

	//int x,y;
	//instance of class zerling
	//Zerling zerling;

	//instance of vector of zerlings
	vector<Zerling> zerlings;

	Mat temp;
	threshold.copyTo(temp);
	//these two vectors needed for output of findContours
	vector< vector<Point> > contours;
	vector<Vec4i> hierarchy;
	//find contours of filtered image using openCV findContours function
	findContours(temp,contours,hierarchy,CV_RETR_CCOMP,CV_CHAIN_APPROX_SIMPLE );
	//use moments method to find our filtered object
	double refArea = 0;
	bool objectFound = false;
	if (hierarchy.size() > 0) {
		int numObjects = hierarchy.size();
		//if number of objects greater than MAX_NUM_OBJECTS we have a noisy filter
		if(numObjects<MAX_NUM_OBJECTS){
			for (int index = 0; index >= 0; index = hierarchy[index][0]) {

				Moments moment = moments((cv::Mat)contours[index]);
				double area = moment.m00;

				//if the area is less than 20 px by 20px then it is probably just noise
				//if the area is the same as the 3/2 of the image size, probably just a bad filter
				//we only want the object with the largest area so we safe a reference area each
				//iteration and compare it to the area in the next iteration.
				if(area>MIN_OBJECT_AREA){

					//x = moment.m10/area;
					//y = moment.m01/area;
					Zerling zerling;

					zerling.setXPos(moment.m10/area);
                    zerling.setYPos(moment.m01/area);
                    zerling.setType(theZerling.getType());
                    zerling.setColor(theZerling.getColor());

                    zerlings.push_back(zerling);

					objectFound = true;

				}else objectFound = false;


			}
			//let user know you found an object
			if(objectFound ==true){
				//draw object location on screen
				drawObject(zerlings,cameraFeed);
				//return zerlings;
				}

		} else {
		    putText(cameraFeed,"TOO MUCH NOISE! ADJUST FILTER",Point(0,50),1,2,Scalar(0,0,255),2);
		    //return ;
		}
	}
    return zerlings;
}

int main(int argc, char* argv[])
{
    CURL *curl;
    CURLcode res;

//    struct curl_httppost *formpost=NULL;
//    struct curl_httppost *lastptr=NULL;
//    struct curl_slist *headerlist=NULL;
//    static const char buf[] = "Content-type: application/json";
    char data[100];

    curl_global_init(CURL_GLOBAL_ALL);
	//if we would like to calibrate our filter values, set to true.
	bool calibrationMode = false;
	int x1,x2,x3,x4,y1,y2,y3,y4;

	//Matrix to store each frame of the webcam feed
	Mat cameraFeed;
	Mat threshold;
	Mat HSV;

	//curl ops

	//headerlist = curl_slist_append(headerlist, buf);

	if(calibrationMode){
		//create slider bars for HSV filtering
		createTrackbars();
	}
	//video capture object to acquire webcam feed
	VideoCapture capture;
	//open capture object at location zero (default location for webcam)
	capture.open(0);
	//set height and width of capture frame
	capture.set(CV_CAP_PROP_FRAME_WIDTH,FRAME_WIDTH);
	capture.set(CV_CAP_PROP_FRAME_HEIGHT,FRAME_HEIGHT);
	//start an infinite loop where webcam feed is copied to cameraFeed matrix
	//all of our operations will be performed within this loop
	while(1){
		//store image to matrix
		capture.read(cameraFeed);
		//convert frame from BGR to HSV colorspace
		cvtColor(cameraFeed,HSV,COLOR_BGR2HSV);

		if(calibrationMode==true){
            //if in calibration mode, we track objects based on the HSV slider values.
            cvtColor(cameraFeed,HSV,COLOR_BGR2HSV);
            inRange(HSV,Scalar(H_MIN,S_MIN,V_MIN),Scalar(H_MAX,S_MAX,V_MAX),threshold);
            morphOps(threshold);
            imshow(windowName2,threshold);
            trackFilteredObject(threshold,HSV,cameraFeed);
		} else {

		    Zerling redZerg("red"), blueZerg("blue"), greenZerg("green"), yellowZerg("yellow");

		    cvtColor(cameraFeed,HSV,COLOR_BGR2HSV);
            inRange(HSV,redZerg.getHSVmin(),redZerg.getHSVmax(),threshold);
            morphOps(threshold);
            vector<Zerling> redVec = trackFilteredObject(redZerg,threshold,HSV,cameraFeed);
            cout<<"Red :" + intToString(redVec.size())<< endl;

            cvtColor(cameraFeed,HSV,COLOR_BGR2HSV);
            inRange(HSV,blueZerg.getHSVmin(),blueZerg.getHSVmax(),threshold);
            morphOps(threshold);
            vector<Zerling> blueVec = trackFilteredObject(blueZerg,threshold,HSV,cameraFeed);
            cout<<"Blue :" + intToString(blueVec.size())<< endl;

            cvtColor(cameraFeed,HSV,COLOR_BGR2HSV);
            inRange(HSV,greenZerg.getHSVmin(),greenZerg.getHSVmax(),threshold);
            morphOps(threshold);
            vector<Zerling> greenVec = trackFilteredObject(greenZerg,threshold,HSV,cameraFeed);
            cout<<"Green :" + intToString(greenVec.size())<< endl;

            cvtColor(cameraFeed,HSV,COLOR_BGR2HSV);
            inRange(HSV,yellowZerg.getHSVmin(),yellowZerg.getHSVmax(),threshold);
            morphOps(threshold);
            vector<Zerling> yellowVec = trackFilteredObject(yellowZerg,threshold,HSV,cameraFeed);
            cout<<"Yellow :" + intToString(yellowVec.size())<< endl;

            if(redVec.size()==1&&blueVec.size()==1&&greenVec.size()==1&&yellowVec.size()==1) {
                drawLine(redVec,blueVec,greenVec,yellowVec,cameraFeed);
                x1 = redVec.at(0).getXPos();
                y1 = redVec.at(0).getYPos();
                x2 = greenVec.at(0).getXPos();
                y2 = greenVec.at(0).getYPos();
                x3 = blueVec.at(0).getXPos();
                y3 = blueVec.at(0).getYPos();
                x4 = yellowVec.at(0).getXPos();
                y4 = yellowVec.at(0).getYPos();
                sprintf(data,"x1=%d&y1=%d&x2=%d&y2=%d&x3=%d&y3=%d&x4=%d&y4=%d",x1,y1,x2,y2,x3,y3,x4,y4);
//                curl = curl_easy_init();
//                if(curl) {
//                    /* what URL that receives this POST */
//
//                    curl_easy_setopt(curl, CURLOPT_URL, "http://192.168.1.10:5000/api/spaceapps/camera");
//                    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data);
//        //            if ( (argc == 2) && (!strcmp(argv[1], "noexpectheader")) )
//        //            /* only disable 100-continue header if explicitly requested */
//        //            curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headerlist);
//                    //curl_easy_setopt(curl, CURLOPT_HTTPPOST, formpost);
//
//                    /* Perform the request, res will get the return code */
//                    res = curl_easy_perform(curl);
//
//                    /* Check for errors */
//                    //if(res != CURLE_OK)
//                    //fprintf(stderr, "curl_easy_perform() failed: %s\n",
//                    //      curl_easy_strerror(res));
//
//                    /* always cleanup */
//                    curl_easy_cleanup(curl);
//
//                    /* then cleanup the formpost chain */
//                    //curl_formfree(formpost);
//                    /* free slist */
//                    //curl_slist_free_all (headerlist);
//                }
            }

        }

		//show frames
		//imshow(windowName2,threshold);


		imshow(windowName,cameraFeed);
		//imshow(windowName1,HSV);


		//delay 30ms so that screen can refresh.
		//image will not appear without this waitKey() command
		waitKey(30);
	}






	return 0;
}

