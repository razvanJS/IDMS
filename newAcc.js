
import { getData, u } from "./data.js";
await getData()
let user = u
let userCopy = Object.assign([], user)
6

class NewAcount {
    #userObject
    #user
    #createNewUser
    #newPass;
    #submitPass;
    #findUserPass;
    #accName;
    #accAccount;
    #accNew;
    #accPass;
    #accNewPass;
    constructor() {
        this.inputUser = document.getElementById('user_auten');
        this.inputPassword = document.getElementById('user_password');
        this.submitAccBtn = document.querySelector('.btn_form_submit');
        this.message = document.querySelector('.message');
        this.newAccUser = document.getElementById('new_acc_user');
        this.newUserName = document.getElementById('user_auten_name');
        this.formAuten = document.querySelector('.form_auten');
        this.btnAcc;
        this.passwordAcc;//New Account Password
        this.passwordRepeatAcc;
        this.newAreaAcc;
        this.userAcc;
        this.messageNew;
        this.type;
        this.#newPass = document.getElementById('new_pasword_acc');
        this.#submitPass;
        this.#findUserPass;
        //newPass
        this.#accName;
        this.#accAccount;
        this.#accNew;
        this.#accPass;
        this.#accNewPass;
        // this.user = user
        // user = this.user
        this._createId()

        // this._setLocalStorage();
        this._getLocatStorage();

        if (!user) {
            user = userCopy;
            this._setLocalStorage()
        }

        document.addEventListener('keydown', this._refresh.bind(this))
        this.#newPass.addEventListener('click', this._changePassWord.bind(this))


    }

    _changePassWord(e) {
        e.preventDefault()

        this.messageNew = document.querySelector('.message')
        this.messageNew.style.display = 'flex'
        this.#findUserPass = user.find(u => this.inputUser.value === u.acc);

        if (this.#findUserPass && (this.inputPassword.value === this.#findUserPass.password) && this.#findUserPass.acc !== user[3].acc) {
            this._htmlNewPass()
            this.#accName = document.getElementById('user_name_passForm');
            this.#accAccount = document.getElementById('user_auten_passForm');
            this.#accNew = document.getElementById('user_newAcc_passForm');
            this.#accPass = document.getElementById('user_pass_passForm');
            this.#accNewPass = document.getElementById('user_passwordNew_passForm')
            this.messageNew = document.querySelector('.message')
            this.#submitPass = document.querySelector('.submit_password');
            this.#submitPass.addEventListener('click', this._newPassword.bind(this))

            this.#accName.value = this.#findUserPass.name;
            this.#accAccount.value = this.#findUserPass.acc;
            this.#accPass.value = this.#findUserPass.password
            this.#accNew.value = this.#findUserPass.acc;
        }
        else {
            this._redMessage('Contul Nu Exista')
        }

    }

    _newPassword(e) {
        e.preventDefault();
        this.messageNew = document.querySelector('.message')
        this.messageNew.style.display = 'flex'


        if (this.#accNew.value === '' || this.#accNewPass.value === '') {
            this._redMessage('Date Necompletate')

        }
        else if ((this.#findUserPass.password === this.#accNewPass.value)) {
            this._redMessage('Parola Deja Folosita')

        }
        else if ((this.#accNewPass.value.length < 7) || (this.#accNew.value.length < 5)) {
            this._redMessage('Lungimea Parolei este prea Mica')

        }
        else {
            user.forEach(u => {
                if (this.#findUserPass.name === u.name) {
                    u.acc = this.#accNew.value
                    u.password = this.#accNewPass.value
                }
            })

            this._redMessage('Parola Schimbata')
            this._setLocalStorage()
            this._initialAutenHtmlPage()
        }


    }
    _existingData() {
        let dataDuplicate = false;

        user.forEach((u, p) => {

            if ((this.newUserName.value === u.name) || (this.passwordAcc.value === u.password)
                || this.userAcc.value === u.acc) {
                dataDuplicate = true

            }

        })
        return dataDuplicate
    }

    _refresh(e) {
        if (e.key === 'Escape') {
            this._initialHtmlPage()

        }
    }

    _initialHtmlPage() {
        setTimeout(() => location.reload(), 1000)
    }

    _htmlNewPass() {
        this.formAuten.innerHTML = `

        <form class="form_auten">
<div class="form_row_auten">
    <label class="form_label_auten">Nume Utilizator:</label>
    <input type="text" id="user_name_passForm"maxlength="30" class="form_input_auten">
</div>
<div class="form_row_auten">
    <label class="form_label_auten">Nume Cont:</label>
    <input type="text" id="user_auten_passForm"maxlength="15" class="form_input_auten">
</div>
<div class="form_row_auten">
    <label class="form_label_auten">Cont Nou:</label>
    <input type="text" id="user_newAcc_passForm"maxlength="15" class="form_input_auten">
</div>
<div class="form_row_auten">
    <label class="form_label_auten">Parola:</label>
    <input type="password" id="user_pass_passForm"maxlength="15" class="form_input_auten">
</div>
<div class="form_row_auten">
    <label class="form_label_auten">Parola Noua:</label>
    <input type="password" id="user_passwordNew_passForm" maxlength="15" class="form_input_auten">
</div>
<div class="form_row_auten change_sub_btn">
    <input type="submit" class="btn submit_password" value="Trimite">
   </div>
   <p class="message"></p>
        `
        this.formAuten.style.height = '47rem';
    }


    // //crearea pagini Html a formului pentru crearea unui cont nou
    _htmlNewAccPage = function () {
        this.formAuten.innerHTML = `
<form class="form_auten">
<div class="form_row_auten">
    <label class="form_label_auten">Nume Utilizator:</label>
    <input type="text" id="user_auten_name"maxlength="30" class="form_input_auten">
</div>
<div class="form_row_auten">
    <label class="form_label_auten">Nume Cont:</label>
    <input type="text" id="user_auten_acc"maxlength="30" class="form_input_auten">
</div>
<div class="form_row_auten">
    <label class="form_label_auten">Parola:</label>
    <input type="password" id="user_password_acc"maxlength="30" class="form_input_auten">
</div>
<div class="form_row_auten">
    <label class="form_label_auten">Repetare Parola:</label>
    <input type="password" id="user_password_repeat" maxlength="30" class="form_input_auten">
</div>
<div class="form_row_auten form_row_change_zone">
    <label class="form_label_auten">Zona:</label>
    <input type="text"  id="user_zone_acc" maxlength="30" class="form_input_auten">
</div>
<div class="form_row_auten change_sub_btn">
    <input type="submit" class="btn btn_form_submit_acc btn_form_submit_admin" value="Trimite">


</div>
<div class="form_row_auten">
<p class="messageNewAcc"></p>

</div>


</form>

`
        this.formAuten.style.height = '47rem';


    }

    _initialAutenHtmlPage() {
        setTimeout(() => location.reload(), 300)
    }

    _createId() {
        //     //crerea Id Unic pentru fiecare Utlizator,Admin are un id care incepe cu A

        user.forEach((u, i) => {
            if (u.type === 'user') {
                if (i <= 9) u.id = `000${i + 1}`
                if (i >= 9) u.id = `00${i + 1}`
                if (i >= 99) u.id = `0${i + 1}`
            }
            if (u.type === 'admin') {
                if (i <= 9) u.id = `A00${i + 1}`
                if (i >= 9) u.id = `A0${i + 1}`
                if (i >= 99) u.id = `A${i + 1}`
            }
        }
        )
    }




    _createHtmlPage() {

        this.inputPassword.value = this.inputUser.value = ''
        this._htmlNewAccPage()


    }
    _createNewUser = function () {

        this.userObject = [
            {
                name: this.newUserName.value,
                acc: this.userAcc.value,
                password: this.passwordAcc.value,
                area: this.newAreaAcc.value,
                type: this.type,
                work: []



            }]

        user.push(...this.userObject)


        return this.userObject

    }


    //datele pe care le Implemetam La Sfarsitul Obiectului User    


    _timeoutMessage = function () {
        return setTimeout(() => this.messageNew.style.display = 'none', 2000)

    }


    _setLocalStorage() {
        localStorage.setItem('user', JSON.stringify(user))
    }
    _getLocatStorage() {
        const data = localStorage.getItem('user')
        const dataObj = JSON.parse(data)
        user = dataObj
    }
    restoreStorge() {
        localStorage.removeItem('user')
    }
    _redMessage(txt) {
        this.messageNew.textContent = txt
        this.messageNew.style.width = '150px'
        this.messageNew.style.fontSize = '1rem'
        this.messageNew.style.marginLeft = '1rem'
        this._timeoutMessage()
    }
    _submitData(e) {
        e.preventDefault()
        this.messageNew.style.display = 'flex';
        this.messageNew.style.width = '19rem';


        //A//Cand Nu se poate implementa Creearea Unui Utilizator Nou

        //Cand Parola nu este idetica cu cu Parola Repetata
        if (this.passwordAcc.value !== this.passwordRepeatAcc.value) this._redMessage("Repetati din nou parola")

        // Cand Nu este Completat nici un camp
        else if (this.newUserName.value === '' || this.userAcc.value === '' || this.passwordAcc.value === '' || this.passwordAcc.value === '' || this.passwordRepeatAcc.value === '') this._redMessage('Completati Campurile Obligatorii')

        //cand Inputurile sunt Idenctice
        else if (this.newUserName.value === this.userAcc.value ||
            this.newUserName.value === this.passwordAcc.value || this.userAcc.value === this.passwordAcc.value) this._redMessage('Folositi Alte Date De Logare')

        //cand length este mai mic de 6 pentru imputuri
        else if (this.passwordAcc.value.length < 8 || this.passwordRepeatAcc.length < 8)
            this._redMessage('Parola Trebuie Sa Aiba Cel Putin 8 Caractere')

        //Cand datele introduse exista deja
        else if (this._existingData()) this._redMessage("Utilizatorul Exsita Deja")





        //B//Cand Se poate implementa Crearea unui Cont Nou
        else {
            this._redMessage('')
            //crearea Unui utilizator nou
            this._createNewUser()
            //crearea id pentru Utilizatorul Repectiv

            this._createId()
            //stocarea in local storage a datelor
            this._setLocalStorage()
            //Revenirea la pagina initiala
            this._initialAutenHtmlPage()

        }



    }




}



export { NewAcount, user as us }