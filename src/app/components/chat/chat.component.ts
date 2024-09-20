import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
// import * as firebase from 'firebase';
import * as firebase from 'firebase/app';
import { DatePipe } from '@angular/common';
import { ChatService } from './chat.service';


export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('chatcontent') chatcontent: ElementRef;
  scrolltop: number = null;

  chatForm: FormGroup;
  nickname = '';
  message = '';
  users = [];
  chats = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private chatService: ChatService) {
    firebase.database().ref('users/').on('value', resp => {
      this.users = [];
      this.users = snapshotToArray(resp);
      console.log(this.users);
    });
    firebase.database().ref('chats/').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      console.log(this.chats);
      setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
    });
  }

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
    this.getProfile();
  }

  async getProfile() {
    const res = await this.chatService.getProfile();
    if (res) {
      this.nickname = res.email;
      console.log(res, 'user');
    }
  }

  onFormSubmit(form: any) {
    const chat = form;
    chat.nickname = this.nickname;
    chat.type = 'global';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
  }

}
