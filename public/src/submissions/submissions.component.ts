import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubmissionService } from '../shared/services/submission.service';
import { RemoveSubmissionComponent } from '../shared/components/submissions/remove-submission/remove-submission.component';
import { ViewSubmissionComponent } from '../shared/components/submissions/view-submission/view-submission.component';
import { DrawerComponent } from '../shared/components/drawer/drawer.component';

declare var __moduleName: string;
declare var toast: any;

@Component({
    selector: 'respond-submissions',
    moduleId: __moduleName,
    templateUrl: '/app/submissions/submissions.component.html',
    providers: [SubmissionService],
    directives: [RemoveSubmissionComponent, ViewSubmissionComponent, DrawerComponent]
})

export class SubmissionsComponent {

  id;
  submission;
  submissions;
  errorMessage;
  selectedSubmission;
  removeVisible: boolean;
  viewVisible: boolean;
  drawerVisible: boolean;

  constructor (private _submissionService: SubmissionService, private _router: Router) {}

  /**
   * Init submissions
   *
   */
  ngOnInit() {

    this.id = localStorage.getItem('respond.siteId');
    this.removeVisible = false;
    this.drawerVisible = false;
    this.submission = {};
    this.submissions = [];

    this.list();

  }

  /**
   * Updates the list
   */
  list() {

    this.reset();
    this._submissionService.list()
                     .subscribe(
                       data => { this.submissions = data; },
                       error =>  { this.failure(<any>error); }
                      );
  }

  /**
   * Resets an modal booleans
   */
  reset() {
    this.removeVisible = false;
    this.viewVisible = false;
    this.drawerVisible = false;
    this.submission = {};
  }

  /**
   * Sets the list item to active
   *
   * @param {Submission} submission
   */
  setActive(submission) {
    this.selectedSubmission = submission;
  }

  /**
   * Shows the drawer
   */
  toggleDrawer() {
    this.drawerVisible = !this.drawerVisible;
  }

  /**
   * Shows the view dialog
   *
   * @param {Submission} submission
   */
  showView(submission) {
    this.viewVisible = true;
    this.submission = submission;
  }

  /**
   * Shows the remove dialog
   *
   * @param {Submission} submission
   */
  showRemove(submission) {
    this.removeVisible = true;
    this.submission = submission;
  }

  /**
   * handles error
   */
  failure (obj) {

    toast.show('failure');

    if(obj.status == 401) {
      this._router.navigate( ['/login', this.id] );
    }

  }

}