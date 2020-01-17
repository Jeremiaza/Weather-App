# Weatherapp
from the https://github.com/eficode/weatherapp exercise
There was a beautiful idea of building an app that would show the upcoming weather. The developers wrote a nice backend and a frontend following the latest principles and - to be honest - bells and whistles. However, the developers did not remember to add any information about the infrastructure or even setup instructions in the source code.

Luckily we now have [docker compose](https://docs.docker.com/compose/) saving us from installing the tools on our computer, and making sure the app looks (and is) the same in development and in production. All we need is someone to add the few missing files!

## New features

- added Geolocation API for getting the weather of your nearest station
- added docker, docker-compose and kubernetes deployments

## Prerequisites

* An [openweathermap](http://openweathermap.org/) API key.
* Virtualbox (VM Provider)
* Vagrant (configuration layer to setup VMs)

## Instructions

Here are instructions on how to run the app using kubernetes and docker

- Run vagrant up, remember to have ports 8000 and 9000 forwarded. I suggest setting the VM memory to 4096 for minikube
- Navigate to where you have cloned this repository
- Install docker, kubernetes and kubectl to VM
- Run: docker-compose up
- After "Compiled successfully", run: docker-compose down
- Run: sudo minikube start
### Backend deployment
- Go to /backend folder in vagrant
- Run: kubectl run --env="APPID={openweathermapapikey}" backendapp --image=jeremiaza/kivataka:latest --image-pull-policy=Never
- Run: kubectl expose deployment backendapp --type=NodePort --port 9000
- Run: kubectl port-forward service/backendapp --address 0.0.0.0 9000:9000
If you do not see "Forwarding from 0.0.0.0:9000 -> 9000", check the commands again or run: kubectl delete services,deployment,pods --all
and try again
### Frontend deployment
- Start a new terminal window
- Go to /frontend folder in vagrant
- Run: kubectl run --env="APPID={openweathermapapikey}" frontendapp --image=jeremiaza/kivaetu:latest --image-pull-policy=Never
- Run: kubectl expose deployment frontendapp --type=NodePort --port 8000
- Run: kubectl port-forward service/frontendapp --address 0.0.0.0 8000:8000
Now go to localhost:8000, click allow to your location and click "Get the weather"

Always run backend before frontend.

After this go to frontend terminal, CTRL-C and:
- run: sudo minikube dashboard
- Press ctrl+c once you see: http://127.0.0.1:43661/... etc
- run: kubectl port-forward -n kubernetes-dashboard service/kubernetes-dashboard --address 0.0.0.0 8080:80

Now go to localhost:8080 and you should see something like this:
![alt text](https://github.com/Jeremiaza/Weather-App/blob/master/frontend/src/public/KubeDashBoard.jpg)
