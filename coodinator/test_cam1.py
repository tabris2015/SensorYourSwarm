#Algoritmo de deteccion de colores#Por Glar3
#
#
#Detecta objetos verdes, elimina el ruido y busca su centro
import io 
import cv2
import numpy as np
import picamera
import picamera.array
import time
import math


def distancia(y):
    h= 2.1
    K = 10.0
    offset = 2.3
    theta = K*abs(300-y)+offset
    tanTheta = math.tan(theta)
    dist = 1 / tanTheta
    return dist 

camara = picamera.PiCamera()
camara.resolution = (160, 600)

#stream = picamera.array.PiRGBArray(camara)

#switch = '0 : OFF \n1 : ON'
#font = cv2.FONT_HERSHEY_SIMPLEX
#cv2.createTrackbar(switch, 'binario', 0, 1, nada)
while(1):
    #cargamos la imagen
    #img = cv2.imread('bright2s.jpg')
    stream = picamera.array.PiRGBArray(camara)
    camara.capture(stream, format='bgr')
    img = stream.array
    #print img
    #cv2.imshow("foto", img)
    #convertimos a escala de grises
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    #level= cv2.getTrackbarPos('L','binario')
    #s = cv2.getTrackbarPos(switch, 'binario')
    ret, binario = cv2.threshold(gray,200, 255, cv2.THRESH_BINARY)
    momentos = cv2.moments(binario)
    area = momentos['m00']
 
    #Descomentar para ver el area por pantalla
    #print area
    if(area > 20):
         
        #Buscamos el centro x, y del objeto
        x = int(momentos['m10']/momentos['m00'])
        y = int(momentos['m01']/momentos['m00'])
         
        #Mostramos sus coordenadas por pantalla
        #print "x = ", x
        #print "y = ", y
	print "distancia: "+str(distancia(y)) + "cm"
        #Dibujamos una marca en el centro del objeto
        #cv2.rectangle(binario, (x, y), (x+2, y+2),(0,0,255), 2)
        #texto = "x: " + str(x) + "\n" + "y: " + str(y)
        #cv2.putText(binario,texto,(x,y),font, 0.7,(255,255,255),2)
    #cv2.imshow('binario', binario)

    #if s==0:
    #    binario[:] = 0
    #kernel = np.ones((3,3),np.uint8)
    #erosion = cv2.erode(img,kernel,iterations = 1)
    #print type(erosion)
    #cv2.imshow("erosion",erosion)
    tecla = cv2.waitKey(5) & 0xFF
    if tecla == 27:
        break
    
#cv2.destroyAllWindows()

