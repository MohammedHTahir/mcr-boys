import { Component, OnInit, Input, Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.7/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  model: any = {};

  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  // tslint:disable-next-line: max-line-length
  signatureEndpoint = 'https://mcrboys.herokuapp.com/';
  apiKey = 'JvZNVi2QRwKo5FYz5WUUJQ';
  meetingNumber = 5750457879;
  role = 0;
  leaveUrl = 'http://localhost:4200';
  userName = 'Name';
  userEmail = '';
  passWord = '205354';

  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) {

  }

  ngOnInit() {

  }

  getSignature() {
    this.httpClient.post(this.signatureEndpoint, {
	    meetingNumber: this.meetingNumber,
	    role: this.role
    }).toPromise().then((data: any) => {
      if(data.signature) {
        console.log(data.signature)
        this.startMeeting(data.signature)
      } else {
        console.log(data)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  startMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      debug: true, //optional
    showMeetingHeader: true, //option
    disableInvite: false, //optional
    disableCallOut: false, //optional
    disableRecord: false, //optional
    disableJoinAudio: false, //optional
    audioPanelAlwaysOpen: true, //optional
    showPureSharingContent: false, //optional
    isSupportAV: true, //optional,
    isSupportChat: true, //optional,
    isSupportQA: true, //optional,
    isSupportCC: true, //optional,
    screenShare: true, //optional,
    rwcBackup: '', //optional,
    videoDrag: true, //optional,
    sharingMode: 'both', //optional,
    videoHeader: true, //optional,
    isLockBottom: true, // optional,
    isSupportNonverbal: true, // optional,
    isShowJoiningErrorDialog: true, // optional,
      leaveUrl: this.leaveUrl,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.model.username,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
