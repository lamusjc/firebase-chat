import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private snap: ActivatedRoute) { }
  ngOnInit() {
    var link = window.location.hash.split("/");
    // console.log(link)
    // console.log(link[2])
    if (link[2] == 'chat' || link[2] == undefined) {
      this.router.navigate(['home/chat']);
    } else if (link.length > 3) {
      this.router.navigate(['home/' + link[2] + '/' + link[3]]);
    } else {
      this.router.navigate(['home/' + link[2]]);
    }
  }
}
