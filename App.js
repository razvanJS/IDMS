// import * as L from './node_modules/leaflet/dist/leaflet-src.js';
// import './node_modules/leaflet/dist/leaflet.css';

import { getData, u } from "./data.js";
import { NewAcount, us } from "./newAcc.js";
import { User } from "./userAcc.js";
import { Admin } from "./admin.js";


let user = us;

export class App {

    //user
    #admin
    #user
    #submitBtn
    #inputUserAuten;
    #inputPassAuten;
    #userObj;
    #message;
    #autenForm;
    #sidebar;
    #map;
    #accountFind;
    #mapEvent;
    #userForm;
    #formUser;
    #userNameForm;
    #userDateForm;
    #userAreaForm;
    #userDurationWork;
    #coords;
    #icon;
    #userTimeWork;
    #workContainer;
    #idData;
    #dateReverse;
    #mark;

    //admin
    #adminForm;
    #adminName;
    #adminTime;
    #adminDate;
    #adminArea;
    #agentSelect;
    #userAccByAdm;
    #workAdm
    #findUserByName;
    #enter;
    #nosort;


    //Display,Move,Remove,Output work
    #idHtml;
    #lat;
    #lng;
    #workElement;
    #work;
    #findWork
    #markers;
    #workTitle;
    #latLng;
    #workRemove;
    #allWorks;
    #workTime;
    #workDate;
    #workDuration;
    #accMoveRemove;
    #sortTime;
    #isorted;
    #sortDate;
    #workSort;
    #sortDuration;

    constructor() {


        //Creearea Conturilor noi
        this.#admin = new Admin();
        this.#user = new User();

        this.#workContainer = document.querySelector('.work_container')

        //Autentification Form
        this.#submitBtn = document.querySelector('.btn_form_submit');
        this.#inputUserAuten = document.getElementById('user_auten');
        this.#inputPassAuten = document.getElementById('user_password');
        this.#message = document.querySelector('.message');
        this.#autenForm = document.querySelector('.auten');
        this.#sidebar = document.querySelector('.sidebar');
        this.#idData;
        this.#dateReverse;
        this.#sortTime;
        this.#workSort;
        this.#sortDuration;

        //ELemente Doom User
        this.#userObj = user;
        this.#userForm = document.querySelector('.user');//user Ul element
        this.#formUser = document.querySelector('.form_user')//Form User
        this.#userNameForm = document.getElementById('user_name_user_form');
        this.#userDateForm = document.getElementById('form_user_date');
        this.#userAreaForm = document.getElementById('user_area');
        this.#userDurationWork = document.getElementById('user_work_duration');
        this.#userTimeWork = document.getElementById('user_work_time');
        this.#icon = document.querySelector('.icon');
        this.#mark;
        this.#accMoveRemove;

        //ELemente Doom Admin
        this.#adminForm = document.querySelector('.work_form_admin')
        this.#adminName = document.getElementById('user_name_admin')
        this.#adminTime = document.getElementById('user_time_admin')
        this.#adminDate = document.getElementById('form_admin_date')
        this.#adminArea = document.getElementById('user_zone_adm')
        this.#agentSelect = document.getElementById('form_select_agent')
        this.#userAccByAdm;
        this.#workAdm = document.querySelectorAll('.work');
        this.#findUserByName;
        this.#enter = true;
        this.#isorted = false;
        this.#markers = [];

        //Work Display Move Remove Sort
        //(workElement)

        //Manipulate work
        this.#idHtml;
        this.#lat;
        this.#lng;
        this.#workElement;
        this.#work;
        this.#findWork;
        //remove
        this.#workTitle;
        this.#latLng;
        this.#workRemove;
        //sort
        this.#allWorks;
        this.#workDate;
        this.#workDuration;
        this.#workTime
        this.#nosort = true





        //Constructor Events
        this.#submitBtn.addEventListener('click', this._submitData.bind(this))
        this.#adminForm.addEventListener('input', this._inputFnAdmin.bind(this))





    }


    //Ascunderea Formularului de Autentificare

    _inputFnAdmin() {
        if (this.#agentSelect.value !== '') {
            this.#adminDate.value = this.#adminTime.value = ''
        }
        else if (this.#adminDate.value !== '') {
            this.#agentSelect.value = this.#adminTime.value = ''
        }
        else if (this.#adminTime.value !== '') {
            this.#agentSelect.value = this.#adminDate.value = ''
        }

    }
    _hideForm() {

        setTimeout(() => {
            this.#autenForm.classList.add('auten_hidden')
            this.#sidebar.classList.remove('sidebar_hidden')
        }, 350)

    }

    //Autentificarea
    _autentification() {

        this.#message.style.display = 'flex'
        //creearea unei functi callBack care gaseste obiectul in fuctie userName si Prola data din obiectul User :)
        const accontFinder = user.find(u => {
            if (u.acc === this.#inputUserAuten.value && u.password === this.#inputPassAuten.value) {
                if (!user) user = us
                this._getLocalStorage();


                return u

            }

        })


        this.#accountFind = accontFinder



        //daca gasim contul===ture/// 
        if (this.#accountFind) {
            this._hideForm();

            user.forEach(u => {
                if (u.name === this.#accountFind.name) {
                    this.#accountFind.work = u.work;
                    if (u.work === undefined) u.work = []
                }

            }
            )


            // this.#accountFind.work = user.work;
            this.#accountFind.type === 'user' ? this._displayUser() : this._displayAdmin()
            //daca tipul  de cont este 'user' se returneaza functia displayUser() pentru tipul de user 'admin' display_admin()

        }

        //daca contul nu poate gasit accountFind===false
        if (!this.#accountFind) {
            this.#inputUserAuten.value = this.#inputPassAuten.value = ''
            this.#message.style.display = 'flex'
            this.#message.textContent = 'Datele Nu Exista'


        }




    }
    _submitData(e) {
        e.preventDefault()
        if (!user) user = us;
        this._getLocalStorage()

        //Autentificarea Contului 
        this._autentification()
    }

    _displayUser() {
        if (!this.#accountFind) return

        //1.Luam pozita Utilizatorului ,si randam Harta
        this._getPostion(this._displayMapUser);

        //Sterge Marker La Event de Dublu click pe el



        //2 Randam Harta
        this.#icon.addEventListener('click', function () {
            this._randerElements()
            this._emtyImp();
        }.bind(this))

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                this._randerElements()
                this._emtyImp();


            }
        }.bind(this))


        this.#workContainer.addEventListener('click', this._manipulatingWorkElements.bind(this))
        //eliminarea Workului 

        // this._moveToMarker().bind(this)
    }
    _displayAdmin() {



        // this._randerWork(this.#accountFind.name, this.#idData, this.#userDurationWork.value, this.#userTimeWork.value, this.#userDateForm.value)


        //Randarea tutror elemetelor in pagina toate Workurile existente
        this._getLocalStorage()
        this._getPostion(this._displayMapAdmin);



        user.forEach(u => {

            if (u.work) {

                u.work.forEach(wElement => this.#accountFind.work.push(wElement))


            }


        })


        // this.#accountFind.work.sort((a, b) => {
        //     const dateA = new Date(a.date);
        //     const dateB = new Date(b.date);
        //     return dateB - dateA;
        // });

        this.#accountFind.work.sort((a, b) => {
            if (a.name !== b.name) {
                return b.name.localeCompare(a.name);
            }
            else if (a.time !== b.time) {
                return b.time.localeCompare(a.time)
            }
            else if (a.duration !== b.duration) {
                return b.duration.localeCompare(b.duration)
            }
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);


            return dateB - dateA;
        });

        // this.#accountFind.name, this.#idData, this.#userDurationWork.value, this.#userTimeWork.value, this.#userDateForm.value

        this.#accountFind.work.forEach(w => {
            this._randerWork(w.name, w.id, w.duration, w.time, w.date)
        })


        this.#workContainer.addEventListener('click', this._manipulatingWorkElements.bind(this))


        document.addEventListener('keydown', this._keyEvent.bind(this))

        this.#icon.addEventListener('click', this._findUser.bind(this))





    }
    _keyEvent(e) {

        if (e.key === 'Enter') {
            this._findUser()
            this.#agentSelect.value = this.#adminTime.value = this.#adminDate.value = ''
            // this.#workContainer.style.display = 'none'



        }

    }

    _findUser() {

        let workElement;

        const worksEl = document.querySelectorAll('.work')
        worksEl.forEach(w => w.style.display = 'none')
        this.#findUserByName = user.find(u => u.name === this.#agentSelect.value)
        const findUserByNameIncludes = user.find(u => {
            if (this.#agentSelect.value !== '') return u.name.toLowerCase().includes(this.#agentSelect.value.toLowerCase())
        })


        const findUserByTime = [];
        const findUserByDate = [];
        const findAll = [];
        const idLength = function () {

            worksEl.forEach(el => { if (el.dataset.id.includes(workElement.id)) { el.style.display = 'flex' } })
        }


        user.forEach(u => {
            if (u.work) {
                findUserByTime.push(...u.work.filter(w => {
                    if (w.time === this.#adminTime.value) return u
                }))
                findUserByDate.push(...u.work.filter(w => {
                    if (w.date === this.#adminDate.value) return u
                }))
                findAll.push(...u.work.filter(w => {
                    if (this.#agentSelect.value === 'all' || this.#agentSelect.value === 'toti') return u
                }))
            }

        })


        this.#adminDate.value


        //daca Admin tasteaza numele utilizatorlui elementele Display care apartin utlizatorului sunt vizibile in pagina 


        this.#findUserByName?.work.forEach(w => {
            workElement = w
            // worksEl.forEach(el => { if (el.dataset.id.includes(workElement.id)) { el.style.display = 'flex' } })
            idLength()
        })

        findUserByNameIncludes?.work.forEach(w => {
            workElement = w
            // worksEl.forEach(el => { if (el.dataset.id.includes(workElement.id)) { el.style.display = 'flex' } })
            idLength()
        })







        findUserByTime?.forEach(w => {
            workElement = w
            idLength()
        })




        findUserByDate?.forEach(w => {
            workElement = w;
            idLength()
        })
        findAll?.forEach(w => {
            workElement = w;
            idLength()
        })


        // this.#adminDate.value = this.#adminTime.value = this.#agentSelect = ""




    };






    _getPostion(type) {
        //folosind geolocation Api luam cordonatele ultizatorului cand se randeza harta
        navigator.geolocation?.getCurrentPosition(type.bind(this), err => alert(err.message))
    }

    _displayMapUser(position) {

        this._getMap(position, this._showFormUser.bind(this), this._removeFormUser.bind(this))
        if (this.#accountFind.work) {
            //daca exista acountFind.work un work creat ulterior dupa eventul de Enter dupa completare Formului,
            // workul este implemetat in obiectu user sub forma de array

            //cand Harta se Incarca Elemetele Html 'work' se randeaza din Local Storage
            const work = this.#accountFind.work
            work.forEach(w => {
                this._randerMarker(w.latitude, w.longitude)//radam markerul pentru fiecare work in parte 
                this._randerWork(w.name, w.id, w.duration, w.time, w.date)//randarea workului sub forma de element in pagina pentru fiecare [work]
            })

        }
    }

    _displayMapAdmin(position) {

        this._getMap(position, this._showFormAdmin.bind(this), this._removeFormAdim.bind(this));
        user.forEach(u => {
            u.work.forEach(w => {
                this._randerMarker(w.latitude, w.longitude)
            })
        })



    }



    _getMap(position, showForm, removeForm) {

        const { latitude, longitude } = position.coords
        this.#coords = [latitude, longitude]
        //Randarea Harti folosind documentatia Leflet 
        this.#map = L.map('map').setView(this.#coords, 14);
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {

            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        //Event click Harta 'click'===randarea Formului
        this.#map.on('click', showForm)
        this.#map.on('dblclick', removeForm)

    }


    _showFormUser(mapE) {

        this.#mapEvent = mapE;
        this.#userForm.classList.add('user_show_form');

        //MapE va lua efectiv cordonatele cand dam click pe harta

        // document.querySelector('.admin').classList.remove('admin_hidden')
        this._emtyImp()

        this.#userNameForm.value = this.#accountFind.name;//User name va fi idenitc cu user Name din obiectul User 
        this.#accountFind?.area ? this.#userAreaForm.value = this.#accountFind.area
            : this.#userAreaForm.value = "Nedefinit";
        //Este posibil ca Area sa nu fie defnita nefiind obligatorie 

        let userTime = this.#userTimeWork;
        userTime.focus();
        //focalizare pe Timp



    }

    _showFormAdmin(mapE) {
        this.#mapEvent = mapE;
        this.#adminForm.classList.remove('admin_hidden')
        this._emtyImpAdmin();
        this.#accountFind;
        this.#adminName.value = this.#accountFind.name;

    }

    _removeFormUser() {
        this.#userForm.classList.remove('user_show_form');
    }

    _removeFormAdim() {
        this.#adminForm.classList.add('admin_hidden')
    }


    //Mici functi ajutoare pentru Validare Inputurilor

    _finiteInp(input) {
        return isFinite(input)
    }
    _pozitiveInput(inp) {
        if (inp > 0) return inp
    }
    _emtyImp() {
        this.#userDateForm.value = this.#userTimeWork.value = this.#userDurationWork.value = '';
    }

    _emtyImpAdmin() {
        this.#adminDate.value = this.#adminTime.value = this.#agentSelect.value = ''
    }

    _randerElements() {

        if (this.#userForm.classList.contains('user_show_form')) {
            // if (!this.#userDateForm.value || !this.#userTimeWork.value || !this.#userDurationWork.value) return alert('Campurile sunt Obligatorii')
            if
                ((this.#userDateForm.value && this.#userTimeWork.value && this.#userDurationWork.value)
                && (this._finiteInp(this.#userDurationWork.value)) && (this._pozitiveInput(this.#userDurationWork.value))) {
                //doar daca valorile specificate exista si daca durata este trasformata in Nr Finit si daca durata este un input pozitv 


                if (this.#userDurationWork.value > 700) return this.#userDurationWork.value = 0
                //O durata maxima de lucru pe o singura strada de 160 de minute

                // this.#userForm.classList.remove('user_show_form');
                const { lat, lng } = this.#mapEvent.latlng;//destrucurarea latitudini si logitudini 


                this._randerMarker(lat, lng);//randarea Markerului

                this.#idData = Date.now()//crearea unui id unic




                //randarea unui work in pagina ,folosim o functie cu multe Argumete :( 

                this._randerWork(this.#accountFind.name, this.#idData, this.#userDurationWork.value, this.#userTimeWork.value, this.#userDateForm.value)

                //adaugarea unui  work [{}] in obiectul User pe pozitia utilizatorului Logat
                //work este creat by default [] pentru fiecare user in parte
                user.forEach(u => {
                    if (u.name === this.#accountFind.name) {
                        u.work.push({
                            id: this.#idData, name: this.#accountFind.name, time: this.#userTimeWork.value, latitude: lat, longitude: lng,
                            date: this.#userDateForm.value, duration: this.#userDurationWork.value
                        })

                    }


                })




                //setarea StorgeLocal
                this._setLocalStorage()

            }
            else {
                ('Campurile sunt Obligatorii');


            }
        }


    }


    //Inversarea Datei folosind o functie ajutatoare


    _reverseDate(date) {
        return date = date.split("-").reverse().join('.')

    }

    //Display Element "Work" Manipulation 

    _cLikOnElement() {
        this.#idHtml = +this.#workElement.dataset.id;
        this.#findWork = this.#work.find(w => w.id === this.#idHtml);


    }



    _moveToMarker() {
        //MoveToMarker
        //folosirea Lefletului pentru a crea o animatie care sa ne duca la markerul dorit 
        //Move To The Marker And Create POPUP
        this.#lat = this.#findWork.latitude;
        this.#lng = this.#findWork.longitude
        setTimeout(() => {
            this.#map.setView([this.#lat, this.#lng], 18, {
                animate: true,
                pan: {
                    duration: 1.4
                }
            });


        }, 500)


        this.#latLng = L.latLng(this.#lat, this.#lng);

        this.#dateReverse = this._reverseDate(this.#findWork.date);
        L.popup()
            .setLatLng(this.#latLng)
            .setContent(`<p class="popup_dis">Distribuire ${this.#workElement.childNodes[1].textContent}<br>
            In data de ${this.#dateReverse}</p>`)
            .openOn(this.#map);

    }
    _removeWork() {
        //Pentru a Evita un Bug masiv doar cand elemetele nu sunt sortate putem sterge elemtele din pagina :(
        // "To prevent a massive bug, we can only delete elements from the page when they are not sorted."

        //Stergerea Workului dupa X event     
        //remove Work
        if (!this.#isorted) {

            this.#mark.setLatLng([this.#findWork.latitude, this.#findWork.longitude])
            this.#markers.push(this.#mark)
            this.#markers = [...new Set(this.#markers)]


            //remove Html Work
            setTimeout(() => { this.#workElement.style.display = 'none' }, 250)

            //remove element from original Array
            //eliminarea elementului din arrayul original
            //user.work sunt stocate toate distriburile "Workurile"



            user.forEach(u => {

                const removeFind = u.work.find(w => w === this.#findWork)
                this._removeItemOnce(u.work, removeFind)


            })




            // To remove Marker from the map:
            //eliminarea Markului cel mai greu Task :( 

            const findMark = this.#markers.find(mark => this.#findWork.latitude === mark.getLatLng().lat && this.#findWork.longitude === mark.getLatLng().lng)

            findMark.remove();
            this.#map.closePopup();

            //Reset Local Storage
            //Resetarea Storegelui Local
            this._setLocalStorage();



        }
        else {

            alert('Doar cand elementele nu sunt sortate se pot sterge  🙁'.toUpperCase())

        }
    }
    _sortFunction(hide, type) {
        if (this.#accountFind.type === 'user') {
            this.#isorted = true
            const hideFn = function () {
                return hide.forEach(w => w.style.display = 'none');

            }
            if (this.#accountFind.type === 'admin') {
                if (this.#sortDate) this._removeItemOnce(this.#sortDate, this.#findWork)
                if (this.#sortTime) this._removeItemOnce(this.#sortTime, this.#findWork)
                if (this.#sortDuration) this._removeItemOnce(this.#sortDuration, this.#findWork)

            }
            if (type === 'time') {



                this.#sortTime = this.#work.slice().sort(function (a, b) {
                    //sortarea Elementelor in functie de timp (slice)creaza un nou array sortat
                    const timeA = new Date("1970-01-01 " + a.time);
                    const timeB = new Date("1970-01-01 " + b.time);
                    return timeB - timeA;


                })
                hideFn()

                this.#sortTime.forEach(w => {
                    this._randerWork(w.name, w.id, w.duration, w.time, w.date);
                });


            }
            else if (type === 'date') {

                this.#sortDate = this.#work.slice().sort((a, b) => {
                    const dateA = new Date(a.date)
                    const dateB = new Date(b.date)
                    return dateB - dateA

                })
                hideFn()

                this.#sortDate.forEach(w => {
                    this._randerWork(w.name, w.id, w.duration, w.time, w.date);
                });


            }
            else if (type === 'duration') {

                this.#sortDuration = this.#work.slice().sort((a, b) => {
                    const durA = Number(a.duration);
                    const durB = Number(b.duration);
                    return durB - durA
                })
                hideFn()
                this.#sortDuration.forEach(w => {
                    this._randerWork(w.name, w.id, w.duration, w.time, w.date);
                });


            }
        }


    }
    _unsortedFunction(arr, typeArr) {
        this.#isorted = false;
        const hideFn = function () {
            return arr.forEach(w => w.style.display = 'none');

        }
        hideFn()
        typeArr.forEach(w => {
            this._randerWork(w.name, w.id, w.duration, w.time, w.date);
        });


    }




    _manipulatingWorkElements(e) {
        e.preventDefault()
        this.#allWorks = document.querySelectorAll('.work')
        this.#workElement = e.target.closest('.work')
        this.#workTitle = e.target.closest('.work_title')
        //gasirea targetului dupa eventul de click 
        this.#accMoveRemove = this.#accountFind;
        this.#workRemove = e.target.closest('.w_remove');
        this.#workTime = e.target.closest('.work_time');
        this.#workDate = e.target.closest('.work_date');
        this.#workDuration = e.target.closest(".work_duration");


        // const title = target.document.querySelector('.work_title')

        this.#work = this.#accMoveRemove.work


        if (this.#workElement) this._cLikOnElement()
        if (this.#workTitle) this._moveToMarker();
        if (this.#workRemove) this.#workRemove.addEventListener('dblclick', this._removeWork.bind(this));

        //sortarea elementelor in functie de variabila isSorted care initial are valoarea False




        if (!this.#isorted) {
            //sortarea elemetelor work in functie de timpul distribuiri  
            if (this.#workTime) this._sortFunction(this.#allWorks, 'time')
            if (this.#workDate) this._sortFunction(this.#allWorks, 'date')
            if (this.#workDuration) this._sortFunction(this.#allWorks, 'duration')

        }

        //daca este Sortat
        else if (this.#isorted) {

            if (this.#workTime) this._unsortedFunction(this.#allWorks, this.#work)
            if (this.#workDate) this._unsortedFunction(this.#allWorks, this.#work)
            if (this.#workDuration) this._unsortedFunction(this.#allWorks, this.#work)
        }


    }

    //Sort Elements()




    //randarea Markerului
    _randerMarker(lat, lng) {
        this.#mark = new L.marker([lat, lng])
        this.#markers.push(this.#mark)

        return this.#map.addLayer(this.#mark);



    }




    //randarea workului in pagina
    _randerWork(name, id, duration, time, date) {


        this.#dateReverse = this._reverseDate(date);


        const html = `
           
         <li class="work" data-id="${id}">
        <h2 class="work_title"> ${name} </h2>
        <div class="work_details">
            <span class="work_icon">⏱</span>
            <span class="work_duration">${duration}min</span>
        </div>
        <div class="work_details">
            <span class="work_icon">⌚</span>
            <span class="work_time">${time}</span>
        </div>
        <div class="work_details">
            <span class="work_icon">📅</span>
            <span class="work_date">${this.#dateReverse}</span>
        </div>
        <h2 class="w_remove">❎ </h2>
      

    </li> 
 `

        this.#workContainer.insertAdjacentHTML('afterbegin', html)




    }


    //Mutarea La marker dupa un click pe ficare work din pagina

    _removeItemOnce(arr, value) {
        let index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    // setarea local storage
    _setLocalStorage() {
        localStorage.setItem('user', JSON.stringify(user))


    }

    //folosim stringul creat de functia anterioara si creem o alta functie care folostete stringul si il trasforma in obiect

    _getLocalStorage() {
        const data = localStorage.getItem('user')
        const dataObj = JSON.parse(data)
        user = dataObj
    }


    //resetarea Local Storage
    restoreLocalStorage() {
        localStorage.removeItem('user')
    }

}

