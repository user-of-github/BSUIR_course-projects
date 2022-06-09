# _Movie Service [client]_   
### Client part of my full-stack project
## FULL-APP: [movies-service-project.surge.sh](http://movies-service-project.surge.sh/)


&nbsp;  

### _Technologies stack:_ 
* _[React](https://reactjs.org/)_  
* _[TypeScript](https://www.typescriptlang.org/)_  
* _[MobX](https://mobx.js.org/README.html)_


### _Features:_  
* _Fully single page application_  
* _Minimum page refreshes (reloads)_
* _Maximum types coverage_  
* _Object-oriented style_  
* _Storing of already loaded data locally (like forced caching) => so no necessity to fetch data again_
* _Partial fetching of data in movies list_ 

### Demo (actual for 16 May 2022)  
![demo](demo.gif)


### _Developed in:_  
* _[JetBrains WebStorm](https://www.jetbrains.com/webstorm/)_  
* _[Microsoft Edge](https://www.microsoft.com/en-us/edge) & [Mozilla Firefox](https://www.mozilla.org/en-US/exp/firefox/new/)_  
* _OS Linux Ubuntu_


### To run my application locally (no docker):  
1. Set `PRODUCTION` variable to `false` in `configuration.ts` (the same in server)
2. `yarn` or `npm install`  
3. `yarn start` or `npm run start`  
&nbsp;   


### To run my application locally (with docker):  
1. Set `PRODUCTION` variable to `false` in `configuration.ts` (the same in server)  
2. `docker-compose build`  
3. `docker-compose up -d`  
4. `docker-compose up` 


### To deploy my application:  
1. Set `PRODUCTION` variable to `true` in `configuration.ts`  (the same in server)
2. `yarn`  
3. `yarn build`  
4. `cd build`  
5. `surge`  (url: `movies-service-project.surge.sh`)

[Link: ](http://movies-service-project.surge.sh/)

###### © 2022 | All Rights Reserved
