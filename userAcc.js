
import { NewAcount, us } from "./newAcc.js";
let user = us;

export class User extends NewAcount {

    constructor() {
        super()
        this.newAccUser.addEventListener('click', this._newAcount.bind(this));
        this.type = 'user';



    }
    _newAcount(e) {
        e.preventDefault();
        this._createHtmlPage()
        this.newUserName = document.getElementById('user_auten_name');
        this.btnAcc = document.querySelector('.btn_form_submit_acc');
        this.passwordAcc = document.getElementById('user_password_acc');//New Account Password
        this.passwordRepeatAcc = document.getElementById('user_password_repeat');
        this.newAreaAcc = document.getElementById('user_zone_acc');
        this.userAcc = document.getElementById('user_auten_acc');
        this.messageNew = document.querySelector('.messageNewAcc');
        this.btnAcc.addEventListener('click', this._submitData.bind(this));


    }
}