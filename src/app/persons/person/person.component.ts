import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Person } from './../../interfaces/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  genderList = [
    { id: 1, value: 'Hombre' },
    { id: 2, value: 'Mujer' },
  ];

  do: String = 'insert';
  position: any = 0;

  contacts: Array<Person> = [];

  calculateNextAssociateNumber(){
    if(this.contacts.length>0){
      let associate = this.contacts.map( function (x){
       return x.associate;
      }).reduce((a,b)=>Math.max(a,b));
      console.log(associate);
       return associate + 1 ;
    } else return 0;
  }

  contact: Person = {
    name: '',
    surname: '',
    associate: this.calculateNextAssociateNumber(),
    dni: '',
    telephone: undefined,
    gender: '',
  };

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {}
  add(form: NgForm) {
    if (this.do === 'insert') {
       

      this.contacts.push(this.contact);
    } else {
      
      this.contacts[this.position] = this.contact;
      this.do = 'insert';
    }
    this.contact = {
      name: '',
      surname: '',
      associate: this.calculateNextAssociateNumber(),
      dni: '',
      telephone: undefined,
      gender: '',
    };
    form.resetForm();
  }

  delete(delPosition: number): void {
    this.contacts.splice(delPosition, 1);
    this.contact.associate= this.calculateNextAssociateNumber();
  }
  update(upPosition: number): void {
    this.contact = this.contacts[upPosition];
    this.do = 'update';
    this.position = upPosition;
  }
}