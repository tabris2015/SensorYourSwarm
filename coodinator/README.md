<h2>COORDINATOR ROBOT</h2>
<p>The coordinator robot is more sophisticated than the minibots and has 2 main tasks:</p>
<ul>
  <li>Serve as a gateway for the collected data from the minibots which are pretty simple robots</li>
  <li>and show the optimal path across the potentially dangerous enviroment avoiding any harm</li>
  
</ul>
<p>this robot is based on a Raspberry Pi computer which communicate with the swarm
through its GPIO and serial communications protocols for the RF module. Then, the coordinator translate this 
information and send a HTTP request over a wireless LAN network to a web server. </p>

<p> Besides, this robot has advanced features that differs from the minibots: </p>
<ul>
  <li>Differential Drive robot</li>
  <li>rf communication with nfr24l01 chip</li>
  <li>a laser range finder made whit a laser pointer and a camera module</li>
  <li>accelerometer + magnetometer for heading</li>
  <li>LAN connection over wifi dongle</li>
  
</ul>
<p>The source code is in python language and uses standard python/raspberry pi libraries</p>
