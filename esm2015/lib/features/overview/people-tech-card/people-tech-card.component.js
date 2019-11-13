/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from "@angular/core";
import { ApiCallsService } from "../../../core/api/api-calls.service";
import { NavigationService } from "../../../core/services/navigation/navigation.service";
import { DataService } from "../../../core/services/data/data.service";
export class PeopleTechCardComponent {
    /**
     * @param {?} apiService
     * @param {?} navigationService
     * @param {?} dataService
     */
    constructor(apiService, navigationService, dataService) {
        this.apiService = apiService;
        this.navigationService = navigationService;
        this.dataService = dataService;
        this.users = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.users = [];
        this.users = this.dataService.users;
        console.log("incoming user are : " + this.users);
    }
    /**
     * @return {?}
     */
    onNavigateToPeopleTech() {
        this.navigationService.changeToPeoTech();
    }
}
PeopleTechCardComponent.decorators = [
    { type: Component, args: [{
                selector: "ecbui-people-tech-card",
                template: `<div class="container-fluid">
  <div class="row">
    <div class="card" style="width: 100%">
      <div class="card-body">
        <h5 class="card-title">
          <span class="people-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <g transform="translate(0.46)">
                <g class="a" transform="translate(-0.46)">
                  <circle class="b" cx="16" cy="16" r="16" />
                  <circle class="c" cx="16" cy="16" r="15.5" />
                </g>
                <g transform="translate(7.799 5.92)">
                  <path
                    d="M141.181,10.395h.128a3.686,3.686,0,0,0,2.816-1.218c1.538-1.734,1.282-4.706,1.254-4.99A4.076,4.076,0,0,0,143.442.563,4.442,4.442,0,0,0,141.293,0h-.068a4.449,4.449,0,0,0-2.149.547,4.078,4.078,0,0,0-1.962,3.639c-.028.284-.284,3.256,1.254,4.99A3.672,3.672,0,0,0,141.181,10.395Zm-3-6.108c0-.012,0-.024,0-.032.132-2.864,2.165-3.172,3.036-3.172h.048c1.079.024,2.912.463,3.036,3.172a.078.078,0,0,0,0,.032c0,.028.284,2.745-.987,4.175a2.618,2.618,0,0,1-2.057.855h-.04a2.61,2.61,0,0,1-2.053-.855C137.905,7.039,138.177,4.311,138.181,4.287Z"
                    transform="translate(-133.046)" />
                  <path
                    d="M52.481,264.212V264.2c0-.032,0-.064,0-.1-.024-.791-.076-2.641-1.81-3.232l-.04-.012a11.529,11.529,0,0,1-3.316-1.51.539.539,0,1,0-.619.883,12.439,12.439,0,0,0,3.647,1.666c.931.332,1.035,1.326,1.063,2.237a.8.8,0,0,0,0,.1,7.251,7.251,0,0,1-.084,1.234A14.7,14.7,0,0,1,44.28,267.1a14.786,14.786,0,0,1-7.047-1.642,6.865,6.865,0,0,1-.084-1.234c0-.032,0-.064,0-.1.028-.911.132-1.906,1.063-2.237a12.558,12.558,0,0,0,3.647-1.666.539.539,0,1,0-.619-.883,11.4,11.4,0,0,1-3.316,1.51l-.04.012c-1.734.6-1.786,2.445-1.81,3.232a.8.8,0,0,1,0,.1v.012a6.126,6.126,0,0,0,.2,1.81.512.512,0,0,0,.208.252,15.111,15.111,0,0,0,7.8,1.91,15.156,15.156,0,0,0,7.8-1.91.534.534,0,0,0,.208-.252A6.427,6.427,0,0,0,52.481,264.212Z"
                    transform="translate(-36.073 -248.887)" />
                </g>
              </g>
            </svg>
          </span>People</h5>
          <!-- <i class="fas fa-question-circle"></i> -->
          <div class="q-circle">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="question-circle" class="svg-inline--fa fa-question-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
            </div>
        <div class="row people-row">
          <div class="col">
              <div class="people-card" *ngFor="let user of users" (click)="onNavigateToPeopleTech()">
                  <div class="people-card__image" *ngIf="user.imageUrl == 'none' ; else image">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4lq60B8QUO-IJ7Ocv-5Nn77keApow2URygWAZRwdxYltUVb8jlQ" >
                  </div>
                  <ng-template #image>
                    <div class="people-card__image">
                      <img [src]="user.imageUrl" >
                  </div>
                  </ng-template>
                  
                  <div class="people-card__details">
                      <p class="people-card__details--name">{{ user.firstName}}  {{user.lastName}}</p>
                      <p class="people-card__details--type" *ngIf="user.type == 'FieldOfficer'">Field Officer</p>
                      <p class="people-card__details--type" *ngIf="user.type == 'TraceabilityAdvocate'">Traceabitily Admin</p>
                      <p class="people-card__details--type" *ngIf="user.type == 'Admin'">Admin</p>
                  </div>
                  <div class="people-card__navigation">
                      <div class="people-card__navigation--icon">
                          <!-- <i class="fa fa-angle-right"></i> -->
                          <div class="icon-angle-right">
                          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </div>
    </div>
  </div>
</div>`,
                styles: [`.row{padding:15px 30px;text-align:left}.card-body{text-align:left;box-shadow:1px 2px 4px 0 rgba(0,0,0,.1)}.card-title{display:inline-block;margin-right:.5rem;color:#36464f}.q-circle{width:15px;height:15px;display:inline-block;color:#949191}.fa-question-circle{color:#949191}.fa-question-circle:hover{cursor:pointer;color:#a0a0a0;transition:.5s ease-in-out}.people-row{padding:10px}.people-icon{display:inline-block;margin-right:15px;position:relative;bottom:2px}.people-card{display:inline-block;background:#f1efef;height:70px;padding:8px;margin-right:5px;margin-bottom:5px}.people-card:hover{box-shadow:.5px .5px 5px .2px rgba(35,35,35,.19);transition:.5s ease-in-out}.people-card__image img{width:45px;height:45px;border-radius:50%}.people-card div{display:inline-block;vertical-align:middle}.people-card__details{margin-left:16px}.people-card__details p{margin:3px;font-weight:400;color:#36464f}.people-card__details--name,.people-card__details--type{width:150px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.people-card__navigation{margin-left:11px}.people-card__navigation--icon{background:#fff;width:25px;height:25px;text-align:center;border-radius:50%}.icon-angle-right{display:inline-block;width:10px;vertical-align:top!important}.people-card__navigation--icon:hover{cursor:pointer}.fa-angle-right:hover{-webkit-transform:scale(1.1);transform:scale(1.1)}.a,.c{fill:none}.a{stroke:#000}.b{stroke:none}`]
            },] },
];
/** @nocollapse */
PeopleTechCardComponent.ctorParameters = () => [
    { type: ApiCallsService },
    { type: NavigationService },
    { type: DataService }
];
if (false) {
    /** @type {?} */
    PeopleTechCardComponent.prototype.users;
    /** @type {?} */
    PeopleTechCardComponent.prototype.userFullName;
    /** @type {?} */
    PeopleTechCardComponent.prototype.userType;
    /** @type {?} */
    PeopleTechCardComponent.prototype.apiService;
    /** @type {?} */
    PeopleTechCardComponent.prototype.navigationService;
    /** @type {?} */
    PeopleTechCardComponent.prototype.dataService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVvcGxlLXRlY2gtY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lY29tLWJsb2NrY2hhaW4tdWkvIiwic291cmNlcyI6WyJsaWIvZmVhdHVyZXMvb3ZlcnZpZXcvcGVvcGxlLXRlY2gtY2FyZC9wZW9wbGUtdGVjaC1jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDekYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBaUV2RSxNQUFNOzs7Ozs7SUFLSixZQUNVLFlBQ0EsbUJBQ0E7UUFGQSxlQUFVLEdBQVYsVUFBVTtRQUNWLHNCQUFpQixHQUFqQixpQkFBaUI7UUFDakIsZ0JBQVcsR0FBWCxXQUFXO3FCQVBOLEVBQUU7S0FRYjs7OztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2xEOzs7O0lBRUQsc0JBQXNCO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUMxQzs7O1lBbEZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EwREw7Z0JBQ0wsTUFBTSxFQUFFLENBQUMsKzRDQUErNEMsQ0FBQzthQUMxNUM7Ozs7WUFuRVEsZUFBZTtZQUVmLGlCQUFpQjtZQUNqQixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBBcGlDYWxsc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9hcGkvYXBpLWNhbGxzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvbW9kZWwvdXNlclwiO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24vbmF2aWdhdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmljZXMvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImVjYnVpLXBlb3BsZS10ZWNoLWNhcmRcIixcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj5cclxuICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiIHN0eWxlPVwid2lkdGg6IDEwMCVcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgIDxoNSBjbGFzcz1cImNhcmQtdGl0bGVcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGVvcGxlLWljb25cIj48c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjMyXCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDMyIDMyXCI+XHJcbiAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAuNDYpXCI+XHJcbiAgICAgICAgICAgICAgICA8ZyBjbGFzcz1cImFcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTAuNDYpXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY2xhc3M9XCJiXCIgY3g9XCIxNlwiIGN5PVwiMTZcIiByPVwiMTZcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8Y2lyY2xlIGNsYXNzPVwiY1wiIGN4PVwiMTZcIiBjeT1cIjE2XCIgcj1cIjE1LjVcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9nPlxyXG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDcuNzk5IDUuOTIpXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgZD1cIk0xNDEuMTgxLDEwLjM5NWguMTI4YTMuNjg2LDMuNjg2LDAsMCwwLDIuODE2LTEuMjE4YzEuNTM4LTEuNzM0LDEuMjgyLTQuNzA2LDEuMjU0LTQuOTlBNC4wNzYsNC4wNzYsMCwwLDAsMTQzLjQ0Mi41NjMsNC40NDIsNC40NDIsMCwwLDAsMTQxLjI5MywwaC0uMDY4YTQuNDQ5LDQuNDQ5LDAsMCwwLTIuMTQ5LjU0Nyw0LjA3OCw0LjA3OCwwLDAsMC0xLjk2MiwzLjYzOWMtLjAyOC4yODQtLjI4NCwzLjI1NiwxLjI1NCw0Ljk5QTMuNjcyLDMuNjcyLDAsMCwwLDE0MS4xODEsMTAuMzk1Wm0tMy02LjEwOGMwLS4wMTIsMC0uMDI0LDAtLjAzMi4xMzItMi44NjQsMi4xNjUtMy4xNzIsMy4wMzYtMy4xNzJoLjA0OGMxLjA3OS4wMjQsMi45MTIuNDYzLDMuMDM2LDMuMTcyYS4wNzguMDc4LDAsMCwwLDAsLjAzMmMwLC4wMjguMjg0LDIuNzQ1LS45ODcsNC4xNzVhMi42MTgsMi42MTgsMCwwLDEtMi4wNTcuODU1aC0uMDRhMi42MSwyLjYxLDAsMCwxLTIuMDUzLS44NTVDMTM3LjkwNSw3LjAzOSwxMzguMTc3LDQuMzExLDEzOC4xODEsNC4yODdaXCJcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTEzMy4wNDYpXCIgLz5cclxuICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICBkPVwiTTUyLjQ4MSwyNjQuMjEyVjI2NC4yYzAtLjAzMiwwLS4wNjQsMC0uMS0uMDI0LS43OTEtLjA3Ni0yLjY0MS0xLjgxLTMuMjMybC0uMDQtLjAxMmExMS41MjksMTEuNTI5LDAsMCwxLTMuMzE2LTEuNTEuNTM5LjUzOSwwLDEsMC0uNjE5Ljg4MywxMi40MzksMTIuNDM5LDAsMCwwLDMuNjQ3LDEuNjY2Yy45MzEuMzMyLDEuMDM1LDEuMzI2LDEuMDYzLDIuMjM3YS44LjgsMCwwLDAsMCwuMSw3LjI1MSw3LjI1MSwwLDAsMS0uMDg0LDEuMjM0QTE0LjcsMTQuNywwLDAsMSw0NC4yOCwyNjcuMWExNC43ODYsMTQuNzg2LDAsMCwxLTcuMDQ3LTEuNjQyLDYuODY1LDYuODY1LDAsMCwxLS4wODQtMS4yMzRjMC0uMDMyLDAtLjA2NCwwLS4xLjAyOC0uOTExLjEzMi0xLjkwNiwxLjA2My0yLjIzN2ExMi41NTgsMTIuNTU4LDAsMCwwLDMuNjQ3LTEuNjY2LjUzOS41MzksMCwxLDAtLjYxOS0uODgzLDExLjQsMTEuNCwwLDAsMS0zLjMxNiwxLjUxbC0uMDQuMDEyYy0xLjczNC42LTEuNzg2LDIuNDQ1LTEuODEsMy4yMzJhLjguOCwwLDAsMSwwLC4xdi4wMTJhNi4xMjYsNi4xMjYsMCwwLDAsLjIsMS44MS41MTIuNTEyLDAsMCwwLC4yMDguMjUyLDE1LjExMSwxNS4xMTEsMCwwLDAsNy44LDEuOTEsMTUuMTU2LDE1LjE1NiwwLDAsMCw3LjgtMS45MS41MzQuNTM0LDAsMCwwLC4yMDgtLjI1MkE2LjQyNyw2LjQyNywwLDAsMCw1Mi40ODEsMjY0LjIxMlpcIlxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtMzYuMDczIC0yNDguODg3KVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgICAgPC9nPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgIDwvc3Bhbj5QZW9wbGU8L2g1PlxyXG4gICAgICAgICAgPCEtLSA8aSBjbGFzcz1cImZhcyBmYS1xdWVzdGlvbi1jaXJjbGVcIj48L2k+IC0tPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtY2lyY2xlXCI+XHJcbiAgICAgICAgICAgIDxzdmcgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBkYXRhLXByZWZpeD1cImZhc1wiIGRhdGEtaWNvbj1cInF1ZXN0aW9uLWNpcmNsZVwiIGNsYXNzPVwic3ZnLWlubGluZS0tZmEgZmEtcXVlc3Rpb24tY2lyY2xlIGZhLXctMTZcIiByb2xlPVwiaW1nXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTUwNCAyNTZjMCAxMzYuOTk3LTExMS4wNDMgMjQ4LTI0OCAyNDhTOCAzOTIuOTk3IDggMjU2QzggMTE5LjA4MyAxMTkuMDQzIDggMjU2IDhzMjQ4IDExMS4wODMgMjQ4IDI0OHpNMjYyLjY1NSA5MGMtNTQuNDk3IDAtODkuMjU1IDIyLjk1Ny0xMTYuNTQ5IDYzLjc1OC0zLjUzNiA1LjI4Ni0yLjM1MyAxMi40MTUgMi43MTUgMTYuMjU4bDM0LjY5OSAyNi4zMWM1LjIwNSAzLjk0NyAxMi42MjEgMy4wMDggMTYuNjY1LTIuMTIyIDE3Ljg2NC0yMi42NTggMzAuMTEzLTM1Ljc5NyA1Ny4zMDMtMzUuNzk3IDIwLjQyOSAwIDQ1LjY5OCAxMy4xNDggNDUuNjk4IDMyLjk1OCAwIDE0Ljk3Ni0xMi4zNjMgMjIuNjY3LTMyLjUzNCAzMy45NzZDMjQ3LjEyOCAyMzguNTI4IDIxNiAyNTQuOTQxIDIxNiAyOTZ2NGMwIDYuNjI3IDUuMzczIDEyIDEyIDEyaDU2YzYuNjI3IDAgMTItNS4zNzMgMTItMTJ2LTEuMzMzYzAtMjguNDYyIDgzLjE4Ni0yOS42NDcgODMuMTg2LTEwNi42NjcgMC01OC4wMDItNjAuMTY1LTEwMi0xMTYuNTMxLTEwMnpNMjU2IDMzOGMtMjUuMzY1IDAtNDYgMjAuNjM1LTQ2IDQ2IDAgMjUuMzY0IDIwLjYzNSA0NiA0NiA0NnM0Ni0yMC42MzYgNDYtNDZjMC0yNS4zNjUtMjAuNjM1LTQ2LTQ2LTQ2elwiPjwvcGF0aD48L3N2Zz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBwZW9wbGUtcm93XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlb3BsZS1jYXJkXCIgKm5nRm9yPVwibGV0IHVzZXIgb2YgdXNlcnNcIiAoY2xpY2spPVwib25OYXZpZ2F0ZVRvUGVvcGxlVGVjaCgpXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW9wbGUtY2FyZF9faW1hZ2VcIiAqbmdJZj1cInVzZXIuaW1hZ2VVcmwgPT0gJ25vbmUnIDsgZWxzZSBpbWFnZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL2VuY3J5cHRlZC10Ym4wLmdzdGF0aWMuY29tL2ltYWdlcz9xPXRibjpBTmQ5R2NSNGxxNjBCOFFVTy1JSjdPY3YtNU5uNzdrZUFwb3cyVVJ5Z1dBWlJ3ZHhZbHRVVmI4amxRXCIgPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNpbWFnZT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVvcGxlLWNhcmRfX2ltYWdlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8aW1nIFtzcmNdPVwidXNlci5pbWFnZVVybFwiID5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVvcGxlLWNhcmRfX2RldGFpbHNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicGVvcGxlLWNhcmRfX2RldGFpbHMtLW5hbWVcIj57eyB1c2VyLmZpcnN0TmFtZX19ICB7e3VzZXIubGFzdE5hbWV9fTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicGVvcGxlLWNhcmRfX2RldGFpbHMtLXR5cGVcIiAqbmdJZj1cInVzZXIudHlwZSA9PSAnRmllbGRPZmZpY2VyJ1wiPkZpZWxkIE9mZmljZXI8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInBlb3BsZS1jYXJkX19kZXRhaWxzLS10eXBlXCIgKm5nSWY9XCJ1c2VyLnR5cGUgPT0gJ1RyYWNlYWJpbGl0eUFkdm9jYXRlJ1wiPlRyYWNlYWJpdGlseSBBZG1pbjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicGVvcGxlLWNhcmRfX2RldGFpbHMtLXR5cGVcIiAqbmdJZj1cInVzZXIudHlwZSA9PSAnQWRtaW4nXCI+QWRtaW48L3A+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVvcGxlLWNhcmRfX25hdmlnYXRpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW9wbGUtY2FyZF9fbmF2aWdhdGlvbi0taWNvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gPGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1yaWdodFwiPjwvaT4gLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljb24tYW5nbGUtcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJhbmdsZS1yaWdodFwiIGNsYXNzPVwic3ZnLWlubGluZS0tZmEgZmEtYW5nbGUtcmlnaHQgZmEtdy04XCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI1NiA1MTJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yMjQuMyAyNzNsLTEzNiAxMzZjLTkuNCA5LjQtMjQuNiA5LjQtMzMuOSAwbC0yMi42LTIyLjZjLTkuNC05LjQtOS40LTI0LjYgMC0zMy45bDk2LjQtOTYuNC05Ni40LTk2LjRjLTkuNC05LjQtOS40LTI0LjYgMC0zMy45TDU0LjMgMTAzYzkuNC05LjQgMjQuNi05LjQgMzMuOSAwbDEzNiAxMzZjOS41IDkuNCA5LjUgMjQuNi4xIDM0elwiPjwvcGF0aD48L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+YCxcclxuICBzdHlsZXM6IFtgLnJvd3twYWRkaW5nOjE1cHggMzBweDt0ZXh0LWFsaWduOmxlZnR9LmNhcmQtYm9keXt0ZXh0LWFsaWduOmxlZnQ7Ym94LXNoYWRvdzoxcHggMnB4IDRweCAwIHJnYmEoMCwwLDAsLjEpfS5jYXJkLXRpdGxle2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1yaWdodDouNXJlbTtjb2xvcjojMzY0NjRmfS5xLWNpcmNsZXt3aWR0aDoxNXB4O2hlaWdodDoxNXB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO2NvbG9yOiM5NDkxOTF9LmZhLXF1ZXN0aW9uLWNpcmNsZXtjb2xvcjojOTQ5MTkxfS5mYS1xdWVzdGlvbi1jaXJjbGU6aG92ZXJ7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6I2EwYTBhMDt0cmFuc2l0aW9uOi41cyBlYXNlLWluLW91dH0ucGVvcGxlLXJvd3twYWRkaW5nOjEwcHh9LnBlb3BsZS1pY29ue2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1yaWdodDoxNXB4O3Bvc2l0aW9uOnJlbGF0aXZlO2JvdHRvbToycHh9LnBlb3BsZS1jYXJke2Rpc3BsYXk6aW5saW5lLWJsb2NrO2JhY2tncm91bmQ6I2YxZWZlZjtoZWlnaHQ6NzBweDtwYWRkaW5nOjhweDttYXJnaW4tcmlnaHQ6NXB4O21hcmdpbi1ib3R0b206NXB4fS5wZW9wbGUtY2FyZDpob3Zlcntib3gtc2hhZG93Oi41cHggLjVweCA1cHggLjJweCByZ2JhKDM1LDM1LDM1LC4xOSk7dHJhbnNpdGlvbjouNXMgZWFzZS1pbi1vdXR9LnBlb3BsZS1jYXJkX19pbWFnZSBpbWd7d2lkdGg6NDVweDtoZWlnaHQ6NDVweDtib3JkZXItcmFkaXVzOjUwJX0ucGVvcGxlLWNhcmQgZGl2e2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0ucGVvcGxlLWNhcmRfX2RldGFpbHN7bWFyZ2luLWxlZnQ6MTZweH0ucGVvcGxlLWNhcmRfX2RldGFpbHMgcHttYXJnaW46M3B4O2ZvbnQtd2VpZ2h0OjQwMDtjb2xvcjojMzY0NjRmfS5wZW9wbGUtY2FyZF9fZGV0YWlscy0tbmFtZSwucGVvcGxlLWNhcmRfX2RldGFpbHMtLXR5cGV7d2lkdGg6MTUwcHg7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzfS5wZW9wbGUtY2FyZF9fbmF2aWdhdGlvbnttYXJnaW4tbGVmdDoxMXB4fS5wZW9wbGUtY2FyZF9fbmF2aWdhdGlvbi0taWNvbntiYWNrZ3JvdW5kOiNmZmY7d2lkdGg6MjVweDtoZWlnaHQ6MjVweDt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItcmFkaXVzOjUwJX0uaWNvbi1hbmdsZS1yaWdodHtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMHB4O3ZlcnRpY2FsLWFsaWduOnRvcCFpbXBvcnRhbnR9LnBlb3BsZS1jYXJkX19uYXZpZ2F0aW9uLS1pY29uOmhvdmVye2N1cnNvcjpwb2ludGVyfS5mYS1hbmdsZS1yaWdodDpob3Zlcnstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxLjEpO3RyYW5zZm9ybTpzY2FsZSgxLjEpfS5hLC5je2ZpbGw6bm9uZX0uYXtzdHJva2U6IzAwMH0uYntzdHJva2U6bm9uZX1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGVvcGxlVGVjaENhcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHVzZXJzOiBhbnlbXSA9IFtdO1xyXG4gIHVzZXJGdWxsTmFtZTogc3RyaW5nO1xyXG4gIHVzZXJUeXBlOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhcGlTZXJ2aWNlOiBBcGlDYWxsc1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudXNlcnMgPSBbXTtcclxuICAgIHRoaXMudXNlcnMgPSB0aGlzLmRhdGFTZXJ2aWNlLnVzZXJzO1xyXG4gICAgY29uc29sZS5sb2coXCJpbmNvbWluZyB1c2VyIGFyZSA6IFwiICsgdGhpcy51c2Vycyk7XHJcbiAgfVxyXG5cclxuICBvbk5hdmlnYXRlVG9QZW9wbGVUZWNoKCkge1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5jaGFuZ2VUb1Blb1RlY2goKTtcclxuICB9XHJcbn1cclxuIl19