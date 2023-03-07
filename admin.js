import { NewAcount, us } from "./newAcc.js";
let user = us;

export class Admin extends NewAcount {
    #newAccAdmin
    #submitAdminBtn
    #bjectAdmin
    constructor() {
        super()

        this.btnFormNewUser;
        this.btnFormNewAdmin;
        this.#submitAdminBtn
        this.newAccAdmin = document.getElementById('new_acc_admin')
        this.newAccAdmin.addEventListener('click', this._submitAdminData.bind(this))
        document.addEventListener('keydown', this._refresh.bind(this))
        this.type = 'admin'






    }

    _dispayNewAdminForm() {


        document.querySelector('.form_auten').innerHTML = `

        <form class="form_auten">
        <div class="form_row_auten">
            <label class="form_label_auten">Utilizator:</label>
            <input type="text" id="user_auten" maxlength="30" class="form_input_auten">
        </div>
        <div class="form_row_auten">
            <label class="form_label_auten">Parola:</label>
            <input type="password" id="user_password" maxlength="15" class="form_input_auten">
        </div>
        <div class="form_row_auten">
        <input type="submit" class="btn btn_form_submit_admin" value="Trimite">

      </div>

        `
        this.inputPassword = this.inputUser = ''


    }



    _adminAccess(e) {
        e.preventDefault()
        this.inputUser = document.getElementById('user_auten');
        this.inputPassword = document.getElementById('user_password');




        const { acc: adminAccName } = user[3];
        const { password: adminAccPass } = user[3];

        if ((this.inputPassword.value === adminAccPass) && (this.inputUser.value === adminAccName)) {
            this.message.style.display = "none"
            this._htmlNewAccPage()


            document.querySelector('.form_row_change_zone').innerHTML = `<label class="form_label_auten">Tip:</label>
           <input type="text"  id="user_zone_acc" placeholder="Administrator" disabled maxlength="15" class="form_input_auten">`
            document.querySelector('.change_sub_btn').innerHTML =
                `<input type="submit" class="btn btn_Send_admin" value="Trimite">`
            this.btnAcc = document.querySelector('.btn_Send_admin');

            this.passwordAcc = document.getElementById('user_password_acc');//New Account Password
            this.passwordRepeatAcc = document.getElementById('user_password_repeat');
            this.newAreaAcc = document.getElementById('user_zone_acc');
            this.userAcc = document.getElementById('user_auten_acc');
            this.newUserName = document.getElementById('user_auten_name');
            this.messageNew = document.querySelector('.messageNewAcc');
            this.messageNew.style.display = 'flex';

            this.btnAcc.addEventListener('click', this._submitData.bind(this))


        }
        else {

            this.message.style.display = "flex"
            if (this.inputPassword.value !== adminAccPass) this.message.textContent = 'Parola Este Gresita'
            if (this.inputUser.value !== adminAccName) this.message.textContent = 'Contul Introdus Este Gresit'


        }


    }
    _submitAdminData(e) {
        e.preventDefault()
        this._dispayNewAdminForm()
        this.#submitAdminBtn = document.querySelector('.btn_form_submit_admin')
        this.#submitAdminBtn.addEventListener('click', this._adminAccess.bind(this))

    }



}
