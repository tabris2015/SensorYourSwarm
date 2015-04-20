#!/usr/bin/python
# -*- coding: utf-8 -*-
#
#

#programa para el overlord

from nrf24 import NRF24
import time
from motorDC import *
import re

############################
import json
import requests

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
#bucle principal
while True:
    pipe = [0]

    while not radio.available(pipe):
      time.sleep(0.250)

    recv_buffer = []
    radio.read(recv_buffer)
    out = ''.join(chr(i) for i in recv_buffer)
    print out    
    out = out.split('\x00')[0]
    datos_array = out.split(' ')

    myJson = '{ "datos": [ ' + datos_array[0] + ',' + datos_array[1] + ',' + datos_array[2] +  '] }'

    #datos[int(out.split()[0])]=
    #dic = {'datos': out}
    headers = {'content-type': 'application/json'}
    r = requests.post(url, data = myJson , headers=headers )

    #r = requests.post(url, data = json.dumps(dic), headers=headers, cookies = cookies)



#    print "--------------------"
#    if out:
#	info = parsear(out)
#        medidas[info[0]] = info[1:]
#	print medidas 
#
#    print "---------------------"
  
    #cont=cont+1
    #print cont


