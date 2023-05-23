import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent {
  isToggle = false;
  unSubscribe$ = new Subject();
  constructor(private sharedService: SharedService) {}
  ngOnInit() {
    this.sharedService.isToggle$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((isToggle) => {
        this.isToggle = isToggle;
      });
  }
  ngOnDestroy() {
    this.unSubscribe$.next(true);
    this.unSubscribe$.complete();
  }
}
