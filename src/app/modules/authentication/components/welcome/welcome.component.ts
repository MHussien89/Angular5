import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  loading: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  goToLogin() {
    localStorage.clear();
    this.router.navigate(['../../auth'], { relativeTo: this.route });
  }

  ngOnInit() {
  }

}
