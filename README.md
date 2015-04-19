# Sensor Your Swarm Project

<p>Picture hundreds of mini-robots sensing dangerous area that will allow us to determine a safe path and to avoid deathly objects. This is what our project attempts to display.</p>

<IMG SRC="http://i.dailymail.co.uk/i/pix/2011/08/23/article-0-02D26216000005DC-732_468x375.jpg" ALT="some text" WIDTH=320 HEIGHT=320>---------<IMG SRC="http://groups.csail.mit.edu/drl/BoeingPages/ResearchProblems/whole-swarm-from-above.jpg" ALT="some text" WIDTH=320 HEIGHT=320>

<h3>Sensing a hazardous location with a swarm of random walkers</h3>

<p>Sensing your swarm proposes an idea that provides humans a way to navigate in dangerous environments such as airplanes accidents, shipwrenks and outer space exploring situations. As a bio-inspired robotic system, this project hands in a prototype which mimics the random movement of flies swarms and applies it to measure risky gases and deathly temperatures in hazardous locations. This multiple measurements allows us to graph on a web-page a safe path through the field dodging obstacles. Furthermore, in this project a main robot acts as a guide dog which could lead a person along the safe path while it is gathering all the information sent by each measurement terminal (mini-robot).</p>

<h3>System's architecture</h3>

<p>The robotic system's architecture is divided into four layers. At the lowest place lies the mini-robots (miniBots) which randomly measure parameters all over the field. Each of this independent units carries two sensors: the first one is used to measure risky gases, such as butane or monoxide, and the second one is used to measure perilous temperatures over the terrain. Moreover, each of these units also incoporates a RF-module, which is based on the SPI protocol, for communicational purposes. The whole swarm of miniBots builds a star-shaped network architecture that sends all the sensed information towards the next layer. In the next layer, it is the guide-gateway robot (ggBot) which channels all the information towards the server using a json object within a http-post. Every post contains the identifier and the measurements asociated to each miniBot.</p>

<p>Above the ggBot and the miniBots is placed a HD camera which captures video. From the streaming video, it is calculated the distances of the miniBots related to the ggBot and the relative positions related to the captured frame. In order to characterize the miniBots and the ggBot, different colors were placed over each unit so they can distinguished them from each other. Computational color filters and contour finding algorithms were applied in order to identify all the units and their positions. This system was denominated Multiple Object Tracking system (MOT system). 

Finally, on the top of the architecture it is placed the GUI and mapping system that displays the heat map and determines the safest path over the field based on repulsive funtions and path planning algorithms.</p>

<a href="http://es.tinypic.com?ref=25jcsco" target="_blank"><img src="http://i57.tinypic.com/25jcsco.jpg" border="0" alt="Image and video hosting by TinyPic"></a>

<h4>MiniBots</h4>
<p>Mini-bots are hacked Chinese toys which had been reconstructed with addition of two sensors:  a temperature sensor LM35 in full range configuration and a dangerous gas sensor XXX which can measure butane, CO2 and CO concentrations with a very good precision. Also, each of these robots are equipped with a RF module, such element allows to mini-robot sent its measurement toward the user's screen. Lastly an arduino-nano controls measurement and  communication functions on the mini-bot. </p>

<a href="http://es.tinypic.com?ref=fu49id" target="_blank"><img src="http://i59.tinypic.com/fu49id.png" border="0" alt="Image and video hosting by TinyPic"></a>

<h4>Guide-Gateway Bot</h4>
<p>The GGBoy plays two main funcions into the robotic system. First, it integrates all the information  as the central node into a star shaped communication architecture. Basically all the measurement nodes, which are the mini-bots, are SPI slaves sending information to an SPI Master module constituted by another RF module connected to a RaspBerry Pi B+. Futhermore, the latter also is connected to an Wi-Fi network that allows to send all the measurement into an json object which is being interpreted by the Back-End algorithm on the user interface. Second, not implemented but hoping in the final model, the GGBot performs the human guiding functions. In the matter of fact, based on the on the map it shall to steer human along the secure path.</p>
<a href="http://es.tinypic.com?ref=2nk6fc6" target="_blank"><img src="http://i59.tinypic.com/2nk6fc6.png" border="0" alt="Image and video hosting by TinyPic"></a>
<p>To navigate an determine objects on his way, the GGBot uses an laser position measurement system. This system is based into an laser pointer and an RapiCam. As the figure shows, the laser is aiming into a secant line to focal axis of the camera, and using trigonometric operations the RaspBerry calculates the distance of an obstacle in front the camera based on the movement of the laser point on projection plane.</p>
<a href="http://es.tinypic.com?ref=23kxhyg" target="_blank"><img src="http://i61.tinypic.com/23kxhyg.jpg" border="0" alt="Image and video hosting by TinyPic"></a>
<h4>Inside of the PS System</h4>
<p>Alongside, the PS system determines the position of all the robots based on the position of color marks on the robots. That is using colored squares on the top of the robots and a HD-cam this system calculates the position based on morphological and color filters embedded into the Open CV library. All the code have been written in C++ to ensure an soft real time calculation.  Besides, the PS system is also connected to the Wi-Fi network and sends posts on jsons objects which contain the position of each robot that information is used to graph and potential field of heat which represents the temperature mantle over the field.</p>
<a href="http://es.tinypic.com?ref=nodlag" target="_blank"><img src="http://i59.tinypic.com/nodlag.jpg" border="0" alt="Image and video hosting by TinyPic"></a>
<h4>presenting the dish: Graphical User Interface</h4>
<h4>Secured path planing</h4>

