# Sensor Your Swarm Project

<p>Picture hundreds of mini-robots sensing a dangerous area and a processing system that will allow the user to determine a safe path and to avoid deathly objects. This is how our solution faces the challenge "Sensor Yourself".</p>

<IMG SRC="http://i.dailymail.co.uk/i/pix/2011/08/23/article-0-02D26216000005DC-732_468x375.jpg" ALT="some text" WIDTH=320 HEIGHT=320>---------<IMG SRC="http://groups.csail.mit.edu/drl/BoeingPages/ResearchProblems/whole-swarm-from-above.jpg" ALT="some text" WIDTH=320 HEIGHT=320>

<h4>Sensing a hazardous location with a swarm of random walkers</h4>

<p>"Sensor Your Swarm" provides humans a way to navigate in dangerous environments such as airplanes accidents, shipwrenks and outer space exploring situations. As a bio-inspired robotic system, this project hands in a prototype which mimics the random movement of flies swarms and applies it to measure risky gases and deathly temperatures in hazardous locations. This multiple measurements allows us to graph on a web-page a safe path through the field dodging obstacles. Furthermore, in this project a main robot acts as a guide dog which could lead a person along the safe path while it is gathering all the information sent by each measurement terminal (mini-robot).</p>

<h4>System's architecture</h4>

<p>The robotic system's architecture is divided into four layers. At the lowest place lies the mini-robots (miniBots) which randomly measure parameters all over the field. Each of this independent units carries two sensors: the first one is used to measure risky gases, such as butane or monoxide, and the second one is used to measure perilous temperatures over the terrain. Moreover, each of these units also incoporates a RF-module, which is based on the SPI protocol, for communicational purposes. The whole swarm of miniBots builds a star-shaped network architecture that sends all the sensed information towards the next layer. In the next layer, it is the guide-gateway robot (GG-Bot) which channels all the information towards the server using a json object within a http-post. Every post contains the identifier and the measurements asociated to each miniBot.</p>

<p>Above the GGBot and the miniBots is placed a HD camera which captures video. From the streaming video, it is calculated the distances of the miniBots related to the GGBot and the relative positions related to the captured frame. In order to characterize the miniBots and the ggBot, different colors were placed over each unit so they can be distinguished them from each other. Computational color filters and contour finding algorithms were applied in order to identify all the units and their positions. This system was denominated Multiple Object Tracking system (MOT system). 

<p>Finally, at the top of the architecture lies the GUI and mapping system that display the heat map and determines the safest path over the field based on repulsive functions and path planning algorithms.</p>

<a href="http://es.tinypic.com?ref=25jcsco" target="_blank"><img src="http://i57.tinypic.com/25jcsco.jpg" border="0" alt="Image and video hosting by TinyPic"></a>

<h4>MiniBots</h4>
<p>The miniBots are hacked Chinese toys which have been reconstructed adding two sensors: a temperature sensor LM35 in full range configuration, and gas sensor MQ-2 which can measure SnO2, LPG, propane, hydrogen and metane presence and concentration those gases. Also, each one of these robots are equipped with a RF module that let the miniBot send its measurements toward the user's screen through a web application. Lastly, an arduino-nano controls the measurement and the communication functions in the mini-bot.</p>

<a href="http://es.tinypic.com?ref=fu49id" target="_blank"><img src="http://i59.tinypic.com/fu49id.png" border="0" alt="Image and video hosting by TinyPic"></a>

<h4>Guide-Gateway Bot</h4>
<p>The GGBot plays two functions into the robotic system. First, it integrates all the information as a central node within a star-shaped communication architecture. Basically, all the measurement nodes, which are the miniBots, are SPI slaves sending information to an SPI Master module constituted by another RF module connected to a RaspBerry Pi B+. Second, the GGBot sends the information that was brought together into a json object from the miniBots to a web application via WiFi communication. The back-end algorithms of the web application interprets the data and displays them on a webpage.</p>

<a href="http://es.tinypic.com?ref=2nk6fc6" target="_blank"><img src="http://i59.tinypic.com/2nk6fc6.png" border="0" alt="Image and video hosting by TinyPic"></a>

<p>In order to navigate and determine objects on its way, the GGBot uses a laser position measurement system. This system is based on a laser pointer and a RaspiCam. As the figure shows, a laser-beam is projected onto an object in the field of view of a camera. The dot from the laser is captured along with the rest of the scene by the camera. A simple algorithm is run over the image looking for the brightest pixels. Assuming that the laser is the brightest area of the scene, the dots position in the image frame is known. Then, the range to the object is calculated based on where along the y axis of the image this laser dot falls. The closer to the center of the image the laser dot is, the farther away the object is.</p>

<a href="http://es.tinypic.com?ref=23kxhyg" target="_blank"><img src="http://i61.tinypic.com/23kxhyg.jpg" border="0" alt="Image and video hosting by TinyPic"></a>

<h4>Inside of the Multi Object Tracking System</h4>
<p>The MOT system determines the position of all the robots based on the color marks placed over the robots. That is, using colored squares on the top of the robots and a HD-cam this system calculates the position based on color filters and morphological operations embedded in the Open CV libraries. All the code has been written in C++ to approximate a real time calculation. Besides, the MOT system is also connected to the Wi-Fi network, and it sends json objects within http posts which contain the position of each robot. This information is used to draw a potential field of heat which represents the temperature mantle over the field.</p>

<a href="http://es.tinypic.com?ref=nodlag" target="_blank"><img src="http://i59.tinypic.com/nodlag.jpg" border="0" alt="Image and video hosting by TinyPic"></a>

<h4>Presenting the dish: Graphical User Interface</h4>

