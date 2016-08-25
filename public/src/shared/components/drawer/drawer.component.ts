import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {SiteService} from '../../../shared/services/site.service';
import {AppService} from '../../../shared/services/app.service';

declare var __moduleName: string;
declare var toast: any;

@Component({
    selector: 'respond-drawer',
    moduleId: __moduleName,
    templateUrl: '/app/shared/components/drawer/drawer.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [SiteService, AppService],
    pipes: [TranslatePipe]
})

export class DrawerComponent {

  id;
  dev;
  siteUrl;
  _visible: boolean = false;
  _active: string;

  @Input()
  set visible(visible: boolean){
    this._visible = visible;
  }

  get visible() { return this._visible; }

  @Input()
  set active(active: string){
    this._active = active;
  }

  get active() { return this._active; }


  @Output() onHide = new EventEmitter<any>();

  constructor (private _siteService: SiteService, private _appService: AppService, private _router: Router) {}

  /**
   * Init pages
   */
  ngOnInit() {
    this.id = localStorage.getItem('respond.siteId');
    this.dev = false;
    this.siteUrl = '';

    var url = window.location.href;

    if(url.indexOf('?dev') !== -1) {
      this.dev = true;
    }

    // get app settings
    this.settings();

  }

  /**
   * Get settings
   */
  settings() {

    // list themes in the app
    this._appService.retrieveSettings()
                     .subscribe(
                       data => {
                         this.siteUrl = data.siteUrl;
                         this.siteUrl = this.siteUrl.replace('{{siteId}}', this.id);
                       },
                       error =>  { }
                      );
  }

  /**
   * Hides the add page modal
   */
  hide() {
    this._visible = false;
    this.onHide.emit(null);
  }

  /**
   * Reload system files
   */
  reload() {

    this._siteService.reload()
                     .subscribe(
                       data => { toast.show('success'); },
                       error => { toast.show('failure');  }
                      );

  }

  /**
   * Republish siteamp
   */
  sitemap() {
    this._siteService.sitemap()
                     .subscribe(
                       data => { toast.show('success'); },
                       error => { toast.show('failure');  }
                      );
  }

  /**
   * Signs out of the system
   */
  signOut() {

    // remove token
    localStorage.removeItem('respond.siteId');

    // redirect
    this._router.navigate( ['/login', this.id] );

  }

}