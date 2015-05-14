## Data Crowder

### Structura foldere

1. app - Cod legat de server si baza de date

	* controllers - Fisiere cu functiile serverului pentru fiecare modul. Cele mai importante sunt:
		- users - functii legate de autentificare, profil etc.
		- projects - functii legate de proiecte, care in general apeleaza BD: read, create, delete, edit, feed, find etc.

	* models - Modelele din BD (project, user), plus cateva functii de validare

	* routes - Routele middleware de la Express, care fac legatura intre apelurile clientului si functiile de pe server. Cele mai importante sunt cele de la projects. Pentru fiecare ruta (ex: /projects/:projectId/edit), exista cate o functie pentru fiecare tip de operatie ce poate aparea (ex: GET, PUT). Fiecare functie apeleaza apoi functiile corespunzatoare de pe server (adica din app/controllers).

	* views - Cateva pagini de confirmari si erori.

2. config - Configurari ale proiectului

3. database - Baza de date

4. node-modules - Modulele folosite de proiect, adaugate automat.

5. public - Cod legat de client

	* lib - Librarii (Angular, Bootstrap)

	* modules
		* core - Cod legat de Header, Home sau Menu

		* projects - Cod legat de proiecte
			* config
				* config.js - Adaugare in meniu a elementelor legate de proiecte
				* routes.js - Asocierile url-view folosite pe site.

			* controllers - Controllere pentru views ale proiectelor

			* services - Legatura dintre controllere si middleware-ul de pe server. Exista un singur serviciu (projects), pe care l-am impartit in diferite ramuri, in functie de ce fel de resurse sunt necesare.

			* views - Views pentru proiecte

		* users - Cod legat de useri

Cele mai importante foldere sunt app si public/modules.


### Traseul MEAN

(Url ->) Public routes -> View -> Controller -> Service -> App routes -> App controller (-> BD)

1. Public routes: public/modules/<module>/config/routes.js)
2. View: public/modules/<module>/views)
3. Controller: public/modules/<module>/controllers)
4. Service: public/modules/<module>/services)
5. App route: app/routes/<module>.routes
6. App controller: app/controllers/<module>.controller

Ce e important de notat aici este ca url-ul pe care il asociezi unui View (asociere stabilita in Public routes) este irelevant cand vine vorba de apelarea serverului. Pentru server conteaza doar ce ruta a avut asociata resursa in Service si apoi ruta corespunzatoare din App Routes.


### Structura modul Projects

####Views:

	* Feed
		- pagina de feed
		- controller: List
	* Create
		- pagina de create project
		- controller: Crud
	* Research
		- pagina cu proiectele create de un user
		- controller: List
	* Edit
		- pagina de editat un proiect (open sau closed)
		- controller: Crud
	* View
		- pagina unui proiect (open sau closed)
		- controller: View
	* Contribute
		- pagina cu form-ul unui proiect
		- controller: Contribute

####Route:

	- rutele din projects/services
	- fiecare ruta corespunde unei rute a aplicatiei (app/routes/projects)
	- fiecare ruta are asociate niste views (projects/views); views sunt grupate dupa functiile diferite de care au nevoie pe server; de exemplu, Feed apeleaza functia feed(), iar Research functie list() pentru GET

	Feed - pentru List View
	Research - pentru Research, Create
	Edit - pentru Edit
	View - pentru View
	Contribute - pentru Contribute

## GIT-ing

Always commit to development branch, then merge with master and push

## INSTALLING

### Clone and setup
    git clone git@github.com:vladootz/datacrowder.git
    npm install
    bower install

### Import database
    mongorestore --db datacrowder --collection projects ./database/datacrowder/projects.bson
    mongorestore --db datacrowder --collection regions ./database/datacrowder/regions.bson
    mongorestore --db datacrowder --collection sessions ./database/datacrowder/sessions.bson
    mongorestore --db datacrowder --collection users ./database/datacrowder/users.bson
    mongorestore --db datacrowder --collection system.indexes ./database/datacrowder/system.indexes.bson

### Export database
    mongodump -h localhost:27017 -d datacrowder -u <username> -p <password> -o ./database/

### Run with development env
    NODE_ENV=development grunt
