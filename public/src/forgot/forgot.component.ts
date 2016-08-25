import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

declare var __moduleName: string;
declare var toast: any;

@Component({
    selector: 'respond-forgot',
    moduleId: __moduleName,
    templateUrl: '/app/forgot/forgot.component.html',
    providers: [UserService],
    pipes: [TranslatePipe]
})

export class ForgotComponent {

  data;
  id;
  errorMessage;

  constructor (private _userService: UserService, private _route: ActivatedRoute) {}

  ngOnInit() {
      
      this._route.params.subscribe(params => {
        this.id = params['id'];
      });
  }

  forgot(event, email, password){

      event.preventDefault();

      this._userService.forgot(this.id, email)
                   .subscribe(
                     () => { toast.show('success'); },
                     error =>  { this.failure(<any>error); }
                    );

  }

  /**
   * handles errors
   */
  failure(obj) {

    toast.show('failure');

  }


}