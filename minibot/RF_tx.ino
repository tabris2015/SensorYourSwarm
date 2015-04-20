#include <SPI.h>
#include "nRF24L01.h"
#include "RF24.h"


//-------------ZERLING--------//

// def pins
const int smokeDigitalSensorPin = 4;
const int motorPin = 3;
char payload_array[32];
// def estados variables
int smokeDigitalSensorState = 0;

// the setup routine runs once when you press reset:
//------------------//
//Debug
int serial_putc( char c, FILE * ) 
{
  Serial.write( c );
  return c;
} 

//Debug
void printf_begin(void)
{
  fdevopen( &serial_putc, 0 );
}

//nRF24 Cableado utilizado. El pin 9 es CE y 10 a CSN/SS
//     CE       -> 9
//     SS       -> 10
//     MOSI     -> 11
//     MISO     -> 12
//     SCK      -> 13

RF24 radio(9,10);
                          //  TX-MASTER    RX-1  31
//const uint64_t pipes[6] = {0x65646f4e32LL,0x65646f4e31LL};

                          //  TX-MASTER    RX-2  33
//const uint64_t pipes[6] = {0x65646f4e32LL,0x65646f4e33LL};
                          //  TX-MASTER    RX-3  34
const uint64_t pipes[6] = {0x65646f4e32LL,0x65646f4e34LL};

int a=0;
char b[4];
String str;
int msg[1];
String theMessage = "";
char rev[50]="";

void setup(void) {
  
   //---------------ZERLING--------//
  pinMode(motorPin, OUTPUT);
  pinMode(smokeDigitalSensorPin, INPUT);
  analogReference(INTERNAL);
  //Serial.begin(9600); 
   //--------------------------//
  Serial.begin(57600);
  printf_begin();      //Debug

  //nRF24 configuración
  radio.begin();
  radio.setChannel(0x4c);
  radio.setAutoAck(1);
  radio.setRetries(15,15);
  radio.setPayloadSize(32);
  radio.openReadingPipe(1,pipes[0]);
  radio.openWritingPipe(pipes[1]);
  radio.startListening();
  radio.printDetails(); //Debug

  radio.powerUp();
};

void loop() {

  
  //--------------ZERLING ------------//
  // lectura del estado de los sensores
  int tempSensor = analogRead(A0);
  delay(100);
  int smokeAnalogSensor = analogRead(A1);
  delay(100);
  smokeDigitalSensorState = digitalRead(smokeDigitalSensorPin);
  
  // concatenación del dato del sensor de Temperatura
// String stringOneTemp = "1 ";
  
//  String stringOneTemp = "2 ";    //OTROS ZERLINGS !
  String stringOneTemp = "3 ";
  
  
  //String stringTemp = stringOneTemp + (tempSensor*0.00489*30); //5[V]/1023=0.00489; 150[°C]/5[V]=30
  String stringTemp = stringOneTemp + (tempSensor*0.000977*100); //con analogReference(INTERNAL)=0-1,1 [V]; 1,1/1023=0.000977
  
  // concatenación del dato del sensor de Humo
  delay(20);
  String stringOneSmoke = " ";
  String stringAnalogSmoke = stringOneSmoke + smokeDigitalSensorState;//(smokeAnalogSensor*0.000977*100);  
  String payload = stringTemp + stringAnalogSmoke;
  /*
  // verifica e imprime el estados de los sensores 
  if (smokeDigitalSensorState == LOW) Serial.println("Smoke ON");
  else Serial.println("Smoke OFF");  
  delay(20);
  Serial.println(stringTemp + stringAnalogSmoke);
  */
  // control ON/OFF de velocidad del motor 0 - 255
  analogWrite(motorPin, 100);
  //delay(1000);
  //----------------------------------//
  /*if (radio.available()){
    Serial.println("recibido datos");
    while (radio.available()) {                
      radio.read( &rev, sizeof(rev) );     
      Serial.print(rev);  
    }
    Serial.println();
  } */ 

  
  payload.toCharArray(payload_array,32);
  //char dato[]="--> DATO ";
  //strcat(dato,b);
  radio.stopListening();
  Serial.println("Enviando datos...");
  delay(20);
  bool ok = radio.write(&payload_array,strlen(payload_array));
  delay(20);
  //radio.startListening(); 
  delay(900); 
}
