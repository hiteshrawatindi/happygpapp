import { Component, OnInit, HostBinding, ViewChild} from '@angular/core';
import { fadeAnimation } from './animations/fade.animation';
import { Router, RouterEvent, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
  title = 'happygpapp';

  constructor(private route: Router) {
    this.routeEvent(this.route);
  }

  routeEvent(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        // console.log(e);
      }

      if (e instanceof NavigationStart) {
        if ((e.url.indexOf('authentication') === -1) && (e.url.indexOf('signup') === -1) && (e.url !== '/')) {
          setTimeout(() => {
            document.getElementById('bottom_nav_container').style.display = 'flex';
            const targetElement: HTMLCollection = document.getElementById('bottom_nav_container').children[0].children;

            // tslint:disable-next-line: prefer-for-of
            for (let index = 0; index < targetElement.length; index++) {
              const element: any = document.getElementById('bottom_nav_container').children[0].children[index];
              element.classList.remove('active');
              const compareURL: string = '/' + element.getAttribute('routerLink');
              if (compareURL === e.url) {
                element.classList.add('active');
              }
            }





          }, 100);
        } else {
          setTimeout(() => {
            document.getElementById('bottom_nav_container').style.display = 'none';
          }, 100);
        }

      }

    });
  }

  ngOnInit() {
    console.log('application launched');
  }
  public getRouterOutletState(outlet: any) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

}
