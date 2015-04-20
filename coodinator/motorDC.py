#importamos el modulo de GPIO
import RPIO as GPIO
from RPIO import PWM
from RPIO.PWM import Servo
import time


#funcional !!
class Motores(object):
    def __init__(self,senM11=22, senM12=27, senM21=24, senM22=23):
	self.senM11=senM11
	self.senM12=senM12
	self.senM21=senM21
	self.senM22=senM22

    def iniciar(self):
	#especificamos modo numerado CPU
	GPIO.setmode(GPIO.BCM)
	#configuracion de pines
	#motor 1
	GPIO.setup(self.senM11, GPIO.OUT)
	GPIO.setup(self.senM12, GPIO.OUT)
	#motor 2
	GPIO.setup(self.senM21, GPIO.OUT)
	GPIO.setup(self.senM22, GPIO.OUT)
    
    def cerrar(self):
	GPIO.cleanup()

    def avanzar(self,sentido):
	if sentido == 1:
	    self.__avanzarDer()
	    self.__avanzarIzq()
	elif sentido == -1:
	    self.__retrocederDer()
	    self.__retrocederIzq()
	else:
	    print "el sentido debe ser 1 o -1"


    def pivotar(self, sentido):
	if sentido == 1:
            self.__avanzarDer()
            self.__retrocederIzq()
        elif sentido == -1:
            self.__retrocederDer()
            self.__avanzarIzq()
        else:
            print "el sentido debe ser 1 o -1"

    def moverDer(self, sentido):
	if sentido == 1:
            self.__avanzarDer()
        elif sentido == -1:
            self.__retrocederDer()
        else:
            print "el sentido debe ser 1 o -1"


    def moverIzq(self, sentido):
	if sentido == 1:
            self.__avanzarIzq()
        elif sentido == -1:
            self.__retrocederIzq()
        else:
            print "el sentido debe ser 1 o -1"


    def detener(self):
	self.detenerDer()
	self.detenerIzq()

    def frenar(self):
	self.frenarDer()
	self.frenarIzq()

    def detenerDer(self):
	GPIO.output(self.senM11,0)
	GPIO.output(self.senM12,0)

    def detenerIzq(self):
	GPIO.output(self.senM21,0)
        GPIO.output(self.senM22,0)

    def frenarDer(self):
	GPIO.output(self.senM11,1)
        GPIO.output(self.senM12,1)

    def frenarIzq(self):
	GPIO.output(self.senM21,1)
        GPIO.output(self.senM22,1)

    def __avanzarDer(self):
	GPIO.output(self.senM11,1)
        GPIO.output(self.senM12,0)

    def __retrocederDer(self):
	GPIO.output(self.senM11,0)
        GPIO.output(self.senM12,1)

    def __avanzarIzq(self):
	GPIO.output(self.senM21,1)
        GPIO.output(self.senM22,0)

    def __retrocederIzq(self):
	GPIO.output(self.senM21,0)
        GPIO.output(self.senM22,1)

# hay que probar con sensor ultrasonico
class USensor(object):
    def __init__(self,ECHO_PIN=5, TRIG_PIN=6):
	self.ECHO_PIN=ECHO_PIN
	self.TRIG_PIN=TRIG_PIN

    def iniciar(self):
	GPIO.setmode(GPIO.BCM)
        #configuracion de pines
        #sensor
        GPIO.setup(self.ECHO_PIN, GPIO.IN)
        GPIO.setup(self.TRIG_PIN, GPIO.OUT)

    def medir(self):
	#disparar
	GPIO.output(self.TRIG_PIN,1)
	time.sleep(0.00001)
	GPIO.output(self.TRIG_PIN,0)
	#medir el tiempo
	pulse_start = time.time()
	while GPIO.input(self.ECHO_PIN)==1:
	    pulse_end=time.time()

	#duracion
	pulse_duration = pulse_end-pulse_start
	distance = round(pulse_duration * 17150,2)
	
	return distance

    def cerrar(self):
	GPIO.cleanup()
# probar con servo!

def set_us(angulo):
    return 11 * angulo + 500



