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
from motorDC import *
from Adafruit_LSM303 import *

###################cccccccc################
#programa para el overlord

from nrf24 import NRF24
import time
from motorDC import *
import re

############################
import json
import requests
#######################################

def distancia(y,orden=1):
    #h= 2.1
    #K = 10.0
    #offset = 2.3
    #theta = K*abs(300-y)+offset
    #tanTheta = math.tan(theta)
    #dist = 1 / tanTheta
    if y > 155:
	return 10000.0
    elif y < 45 and y > 8:
	return round((0.1532 * y + 1.5882),1) 
    elif y >=45 and y <=155:
	return round((0.0012*y**2 - 0.0922*y + 11.74),1)
    else:
	return 0.0

##############################################
##############OVERLORD##########################
#DEFINICION DE VARIABLES E INICIALIZACION

url = 'http://192.168.1.10:5000/api/spaceapps/raspberry'

print "url: " + url


cookies = dict(cookies_are='fucking')

###########################



def parsear(datos):
    datos_array = datos.split()
    zerling = int(datos_array[0])
    temp = float(datos_array[1])
    humo = float(datos_array[2])
    info= [zerling, temp, humo]
    return info
    

#pipes = [[0xf0, 0xf0, 0xf0, 0xf0, 0xe1], [0xf0, 0xf0, 0xf0, 0xf0, 0xd2]]

pipes = [[0x65, 0x64, 0x6f, 0x4e, 0x32], [0x65, 0x64, 0x6f, 0x4e, 0x31], [0x65, 0x64, 0x6f, 0x4e, 0x33],[0x65, 0x64, 0x6f, 0x4e, 0x34]]

radio = NRF24()
radio.begin(0, 0, 25, 18) #Set CE and IRQ pins
radio.setRetries(15,15)
radio.setPayloadSize(32)
radio.setChannel(0x4c)
radio.setPALevel(NRF24.PA_MAX)

radio.openReadingPipe(1, pipes[1]) # pipe 1
radio.openReadingPipe(2, pipes[2]) # pipe 2
radio.openReadingPipe(3, pipes[3]) # pipe 3

radio.openWritingPipe(pipes[0])

radio.startListening()
radio.printDetails()
radio.powerUp()
cont=0
sens=0
datos=[]

#############################################
## CAMARA ##
camara = picamera.PiCamera()
camara.resolution = (200, 600)

print "inicializando Overlord..."
carro = Motores()
carro.iniciar()
carro.detener()
cabeza = Servo()
cabeza.set_servo(4, 1250)
sensor = Adafruit_LSM303()
direccion = 0
valores_servo = [1250, 850, 1250, 1500, 1750, 1500, 1250]

#for valor in valores_servo:
#    cabeza.set_servo(4,valor)
#    time.sleep(0.4)
#carro.avanzar(-1)
#time.sleep(1)
#carro.detener()



## INICIAR HEADERS PARA JSON
headers = {'content-type': 'application/json'}
##
y_1=0

while(1):
    
    pipe = [0]

    while not radio.available(pipe):
        time.sleep(0.250)

    recv_buffer = []
    radio.read(recv_buffer)
    out = ''.join(chr(i) for i in recv_buffer)

    out = out.split('\x00')[0];
    datos_array = out.split(' ')
    print out
    print " "
    #headers = {'content-type': 'application/json'}
    myJson = '{ "datos": [ ' + datos_array[0] + ',' + datos_array[1] + ',' + datos_array[2] + '] }'
    print myJson
    q = requests.post(url, data = myJson , headers=headers )
    print q.text()
    #time.sleep(0.001)

    #overlordJson = '{ "datos": [' + '1,' + str(sensor.read()[1][3]) + ',' + $
    #print overlordJson
    #print myJson
    #headers = {'content-type': 'application/json'}

    #cargamos la imagen
    stream = picamera.array.PiRGBArray(camara)
    camara.capture(stream, format='bgr')
    img = stream.array
    #convertimos a escala de grises
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ret, binario = cv2.threshold(gray,200, 255, cv2.THRESH_BINARY)
    momentos = cv2.moments(binario)
    area = momentos['m00']
    #Descomentar para ver el area por pantallA
    if(area > 20):
         
        #Buscamos el centro x, y del objeto
        x = int(momentos['m10']/momentos['m00'])
        y = int(momentos['m01']/momentos['m00'])
        y_1= y 
        #Mostramos sus coordenadas por pantalla
        #print "x = ", x
        print "y = ", y
	print "distancia: " + str(distancia(y,1))	
	dist = distancia(y)
	if dist < 10:
	    carro.moverDer(1)
 	elif dist < 5:
	    carro.avanzar(1)
	else:
	    carro.avanzar(-1)
    ###################BUCLE OVERLORD#############
    # RECIBIMOS DATOS Y ENVIAMOS CON REQUEST POST
    overlordJson = '{ "datos": [' + '1,' + str(sensor.read()[1][3]) + ',' + str(distancia(y_1)) + '] }'
    print overlordJson
    r = requests.post(url, data = overlordJson , headers=headers )
    #r = requests.post(url, data = json.dumps(dic), headers=headers, cookies = cookies )
 


    ##############################################
    tecla = cv2.waitKey(5) & 0xFF
    if tecla == 27:
        break
    
#cv2.destroyAllWindows()


