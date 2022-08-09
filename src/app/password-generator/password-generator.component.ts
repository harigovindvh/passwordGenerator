import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.css']
})
export class PasswordGeneratorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  // Alternative for checkboxes
  checkboxes = [
    {
      "id": "alphabets",
      "label": "Must include alphabets",
      "library": "ABCDEFGHIJKLMNOPWRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      "checked": true
    }, {
      "id": "numbers",
      "label": "Must include numbers",
      "library": "0123456789",
      "checked": true
    }, {
      "id": "symbols",
      "label": "Must include special characters",
      "library": "!@#$%^&*-_=+\\|:;',.\<>/?~",
      "checked": false
    }
  ]

  // Declarations
  dictionary: string[] = [];
  generatedPassword = '';
  alphabets: Boolean = this.checkboxes[0].checked;
  numbers: Boolean = this.checkboxes[1].checked;
  symbols: Boolean = this.checkboxes[2].checked;

  passwordLength = 8;
  buttonLabel: String = "Generate";
  newPassword: string = '';
  showWarning: boolean = false;

  // Checkbox value
  updateCheckboxValue(event: any) {
    if (event.target.id == "alphabets")
      this.alphabets = event.target.checked;

    if (event.target.id == "numbers")
      this.numbers = event.target.checked;

    if (event.target.id == "symbols")
      this.symbols = event.target.checked;
  }

  /**
   * to include from entity
   */
  generateEntitySpecificPass(entity: any) {
    this.newPassword += entity[Math.floor(Math.random() * entity.length)];
    this.dictionary = this.dictionary.concat(entity);
  }


  /**
   * Generate password
   */
  generatePassword(): void {
    this.newPassword = '';
    if (this.passwordLength > 32 || this.passwordLength < 8) {
      this.showWarning = true;
      return;
    }
    this.showWarning = false;
    let newPassword = '';
    let alphabetsEntity = this.checkboxes[0].library.split("");
    let numberEntity = this.checkboxes[1].library.split("");
    let symbolsEntity = this.checkboxes[2].library.split("");
    this.dictionary = [];
    if (this.alphabets) {
      this.generateEntitySpecificPass(alphabetsEntity);
    } else {
      this.dictionary = this.dictionary.concat(alphabetsEntity);
    }
    if (this.numbers) {
      this.generateEntitySpecificPass(numberEntity);
    }
    if (this.symbols) {
      this.generateEntitySpecificPass(symbolsEntity);
    }
    newPassword = this.newPassword;
    // Generate random password from array
    for (var i = 0; i < (this.passwordLength - this.newPassword.length); i++) {
      newPassword += this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
    }
    //shuffle password and assign
    this.newPassword = newPassword.split('').sort(function () { return 0.5 - Math.random() }).join('');;
  }

}
