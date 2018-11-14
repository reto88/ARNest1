import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isVisible;
  activeRouterUrl;
  blockingPath;
  urlwithout;
  id;
 isCollapsed = false;
  constructor(private router: Router, private route: ActivatedRoute) {
    router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {

          // GET /URL
          this.activeRouterUrl = router.url;
          // Without id
          this.urlwithout = this.activeRouterUrl.split('/', 2);
          this.urlwithout = this.urlwithout.slice(1, 2);

          // GET /scan/:id of Route
          this.route.firstChild.params.subscribe(params => {
            this.id = params['firebaseId'];
          });
          this.blockingPath = '/scan/' + this.id;
          // if scan/:id then doen't show header
          if ((this.activeRouterUrl === this.blockingPath) || (this.activeRouterUrl === '/augmented')) {
            this.isVisible = false;
          } else {
            this.isVisible = true;
          }
        }
      }
    );
  }

  ngOnInit() {
  }

}
