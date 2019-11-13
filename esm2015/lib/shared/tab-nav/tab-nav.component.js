/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from "@angular/core";
import { NavigationService } from "../../core/services/navigation/navigation.service";
import { DataService } from "../../core/services/data/data.service";
import { ApiCallsService } from "../../core/api/api-calls.service";
import { Proof } from "../model/proof";
import * as _ from "lodash";
export class TabNavComponent {
    /**
     * @param {?} navigationService
     * @param {?} dataService
     * @param {?} apiService
     */
    constructor(navigationService, dataService, apiService) {
        this.navigationService = navigationService;
        this.dataService = dataService;
        this.apiService = apiService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /**
             * Getting widget data from POS
             */
        this.dataService.templateData = JSON.parse(this.data);
        console.log("incoming data is " + this.data);
        /**
             * Getting user details form ADMIN endpoint
             */
        this.ids = _.uniq(this.dataService.templateData.userid);
        /** @type {?} */
        const usersDetails = {
            ids: this.ids
        };
        this.apiService.getUsersDetails(usersDetails).subscribe(results => {
            this.setUser(results);
            console.log("users are " + JSON.stringify(results));
        });
        /** *
         * Getting txn details from gateway
          @type {?} */
        const TDPID = {
            TdpID: this.dataService.templateData.tdpid
        };
        this.apiService.getTxnDetails(TDPID).subscribe(res => {
            this.setProofs(res);
            console.log("txn details: " + JSON.stringify(res));
        });
        this.changeToOverview();
        this.navigationService.navMenuStatus.subscribe(status => {
            this.navStatus = status;
        });
    }
    /**
     * @param {?} result
     * @return {?}
     */
    setUser(result) {
        this.dataService.users = [];
        result.forEach(element => {
            this.dataService.addUserToList(element);
            // this.dataService.users.push(element);
        });
        // console.log('new set' + this.users);
    }
    /**
     * @param {?} result
     * @return {?}
     */
    setProofs(result) {
        /** @type {?} */
        var allProofData = [];
        this.dataService.proofs = [];
        this.proofData = this.dataService.templateData.proofs;
        /** @type {?} */
        var i = 0;
        for (let pfdata of this.proofData) {
            this.proof = new Proof();
            this.proof.name = pfdata.name;
            this.proof.description = pfdata.description;
            this.proof.Txnhash = result[i].Txnhash;
            this.proof.Url = result[i].Url;
            this.proof.Identifier = result[i].Identifier;
            this.proof.TdpId = result[i].TdpID;
            i++;
            allProofData.push(this.proof);
        }
        allProofData.forEach(proof => {
            this.dataService.addProofToList(proof);
        });
        // this.dataService.proofs = allProofData;
    }
    /**
     * @return {?}
     */
    changeToOverview() {
        this.navigationService.changeToOverview();
        this.setNavStatus();
    }
    /**
     * @return {?}
     */
    changeToBCProofs() {
        this.navigationService.changeToBCProofs();
        this.setNavStatus();
    }
    /**
     * @return {?}
     */
    changeToPeoTech() {
        this.navigationService.changeToPeoTech();
        this.setNavStatus();
    }
    /**
     * @return {?}
     */
    setNavStatus() {
        this.navStatus = this.navigationService.getNavigationValue().toString();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // this.dataService.users = []
    }
}
TabNavComponent.decorators = [
    { type: Component, args: [{
                selector: "ecbui-tab-nav",
                template: `<ul class="nav nav-tabs nav-fill">
  {{testData}}
  <li class="nav-item">
    <a class="nav-link" [ngClass]="{'nav-link active': navStatus == 'overview'}"
      (click)="changeToOverview()">Overview</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" [ngClass]="{'nav-link active': navStatus == 'proofs'}" (click)="changeToBCProofs()">Blockchain
      Proofs</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" [ngClass]="{'nav-link active': navStatus == 'people'}" (click)="changeToPeoTech()">People &
      Technologies</a>
  </li>
</ul>

<div *ngIf="navStatus == 'overview' ">
  <ecbui-main-view></ecbui-main-view>
</div>

<div *ngIf="navStatus == 'proofs' ">
  <ecbui-blockchain-proofs></ecbui-blockchain-proofs>
</div>

<div *ngIf="navStatus == 'people' ">
  <ecbui-people-tech></ecbui-people-tech>
</div>`,
                styles: [`*{color:#000}.nav-link.active,.nav-link.active:hover{background-color:#36464f;color:#fff;padding:16px}.nav-tabs .nav-item{margin-bottom:0}.nav-tabs .nav-link{border:none;border-radius:0}.nav-tabs .nav-item:hover{cursor:pointer}a{padding:16px!important;display:inline-block!important;width:100%}`]
            },] },
];
/** @nocollapse */
TabNavComponent.ctorParameters = () => [
    { type: NavigationService },
    { type: DataService },
    { type: ApiCallsService }
];
TabNavComponent.propDecorators = {
    data: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    TabNavComponent.prototype.data;
    /** @type {?} */
    TabNavComponent.prototype.navStatus;
    /** @type {?} */
    TabNavComponent.prototype.testData;
    /** @type {?} */
    TabNavComponent.prototype.proof;
    /** @type {?} */
    TabNavComponent.prototype.proofData;
    /** @type {?} */
    TabNavComponent.prototype.ids;
    /** @type {?} */
    TabNavComponent.prototype.navigationService;
    /** @type {?} */
    TabNavComponent.prototype.dataService;
    /** @type {?} */
    TabNavComponent.prototype.apiService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lY29tLWJsb2NrY2hhaW4tdWkvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3RhYi1uYXYvdGFiLW5hdi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBRXRGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbkUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBaUM1QixNQUFNOzs7Ozs7SUFRSixZQUNVLG1CQUNBLGFBQ0E7UUFGQSxzQkFBaUIsR0FBakIsaUJBQWlCO1FBQ2pCLGdCQUFXLEdBQVgsV0FBVztRQUNYLGVBQVUsR0FBVixVQUFVO0tBQ2hCOzs7O0lBRUosUUFBUTs7OztRQUtOLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O1FBSzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFDeEQsTUFBTSxZQUFZLEdBQUc7WUFDbkIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1NBQ2QsQ0FBQztRQUVGLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFD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LElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNyQjs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3JCOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDekU7Ozs7SUFFRCxXQUFXOztLQUVWOzs7WUEzSUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMEJMO2dCQUNMLE1BQU0sRUFBRSxDQUFDLHdTQUF3UyxDQUFDO2FBQ25UOzs7O1lBckNRLGlCQUFpQjtZQUVqQixXQUFXO1lBQ1gsZUFBZTs7O21CQW9DckIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uL25hdmlnYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9zZXJ2aWNlcy9kYXRhL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBcGlDYWxsc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9hcGkvYXBpLWNhbGxzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUHJvb2YgfSBmcm9tIFwiLi4vbW9kZWwvcHJvb2ZcIjtcclxuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJlY2J1aS10YWItbmF2XCIsXHJcbiAgdGVtcGxhdGU6IGA8dWwgY2xhc3M9XCJuYXYgbmF2LXRhYnMgbmF2LWZpbGxcIj5cclxuICB7e3Rlc3REYXRhfX1cclxuICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPlxyXG4gICAgPGEgY2xhc3M9XCJuYXYtbGlua1wiIFtuZ0NsYXNzXT1cInsnbmF2LWxpbmsgYWN0aXZlJzogbmF2U3RhdHVzID09ICdvdmVydmlldyd9XCJcclxuICAgICAgKGNsaWNrKT1cImNoYW5nZVRvT3ZlcnZpZXcoKVwiPk92ZXJ2aWV3PC9hPlxyXG4gIDwvbGk+XHJcbiAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj5cclxuICAgIDxhIGNsYXNzPVwibmF2LWxpbmtcIiBbbmdDbGFzc109XCJ7J25hdi1saW5rIGFjdGl2ZSc6IG5hdlN0YXR1cyA9PSAncHJvb2ZzJ31cIiAoY2xpY2spPVwiY2hhbmdlVG9CQ1Byb29mcygpXCI+QmxvY2tjaGFpblxyXG4gICAgICBQcm9vZnM8L2E+XHJcbiAgPC9saT5cclxuICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPlxyXG4gICAgPGEgY2xhc3M9XCJuYXYtbGlua1wiIFtuZ0NsYXNzXT1cInsnbmF2LWxpbmsgYWN0aXZlJzogbmF2U3RhdHVzID09ICdwZW9wbGUnfVwiIChjbGljayk9XCJjaGFuZ2VUb1Blb1RlY2goKVwiPlBlb3BsZSAmXHJcbiAgICAgIFRlY2hub2xvZ2llczwvYT5cclxuICA8L2xpPlxyXG48L3VsPlxyXG5cclxuPGRpdiAqbmdJZj1cIm5hdlN0YXR1cyA9PSAnb3ZlcnZpZXcnIFwiPlxyXG4gIDxlY2J1aS1tYWluLXZpZXc+PC9lY2J1aS1tYWluLXZpZXc+XHJcbjwvZGl2PlxyXG5cclxuPGRpdiAqbmdJZj1cIm5hdlN0YXR1cyA9PSAncHJvb2ZzJyBcIj5cclxuICA8ZWNidWktYmxvY2tjaGFpbi1wcm9vZnM+PC9lY2J1aS1ibG9ja2NoYWluLXByb29mcz5cclxuPC9kaXY+XHJcblxyXG48ZGl2ICpuZ0lmPVwibmF2U3RhdHVzID09ICdwZW9wbGUnIFwiPlxyXG4gIDxlY2J1aS1wZW9wbGUtdGVjaD48L2VjYnVpLXBlb3BsZS10ZWNoPlxyXG48L2Rpdj5gLFxyXG4gIHN0eWxlczogW2Aqe2NvbG9yOiMwMDB9Lm5hdi1saW5rLmFjdGl2ZSwubmF2LWxpbmsuYWN0aXZlOmhvdmVye2JhY2tncm91bmQtY29sb3I6IzM2NDY0Zjtjb2xvcjojZmZmO3BhZGRpbmc6MTZweH0ubmF2LXRhYnMgLm5hdi1pdGVte21hcmdpbi1ib3R0b206MH0ubmF2LXRhYnMgLm5hdi1saW5re2JvcmRlcjpub25lO2JvcmRlci1yYWRpdXM6MH0ubmF2LXRhYnMgLm5hdi1pdGVtOmhvdmVye2N1cnNvcjpwb2ludGVyfWF7cGFkZGluZzoxNnB4IWltcG9ydGFudDtkaXNwbGF5OmlubGluZS1ibG9jayFpbXBvcnRhbnQ7d2lkdGg6MTAwJX1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFiTmF2Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIGRhdGE6IGFueTtcclxuICBuYXZTdGF0dXM6IHN0cmluZztcclxuICB0ZXN0RGF0YTogYW55O1xyXG4gIHByb29mOiBQcm9vZjtcclxuICBwcm9vZkRhdGE6IGFueTtcclxuICBpZHM6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhcGlTZXJ2aWNlOiBBcGlDYWxsc1NlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXR0aW5nIHdpZGdldCBkYXRhIGZyb20gUE9TXHJcbiAgICAgKi9cclxuXHJcbiAgICB0aGlzLmRhdGFTZXJ2aWNlLnRlbXBsYXRlRGF0YSA9IEpTT04ucGFyc2UodGhpcy5kYXRhKTtcclxuICAgIGNvbnNvbGUubG9nKFwiaW5jb21pbmcgZGF0YSBpcyBcIiArIHRoaXMuZGF0YSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXR0aW5nIHVzZXIgZGV0YWlscyBmb3JtIEFETUlOIGVuZHBvaW50XHJcbiAgICAgKi9cclxuICAgIHRoaXMuaWRzID0gXy51bmlxKHRoaXMuZGF0YVNlcnZpY2UudGVtcGxhdGVEYXRhLnVzZXJpZCk7XHJcbiAgICBjb25zdCB1c2Vyc0RldGFpbHMgPSB7XHJcbiAgICAgIGlkczogdGhpcy5pZHNcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5hcGlTZXJ2aWNlLmdldFVzZXJzRGV0YWlscyh1c2Vyc0RldGFpbHMpLnN1YnNjcmliZShyZXN1bHRzID0+IHtcclxuICAgICAgdGhpcy5zZXRVc2VyKHJlc3VsdHMpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInVzZXJzIGFyZSBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3VsdHMpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0dGluZyB0eG4gZGV0YWlscyBmcm9tIGdhdGV3YXlcclxuICAgICAqL1xyXG4gICAgY29uc3QgVERQSUQgPSB7XHJcbiAgICAgIFRkcElEOiB0aGlzLmRhdGFTZXJ2aWNlLnRlbXBsYXRlRGF0YS50ZHBpZFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmFwaVNlcnZpY2UuZ2V0VHhuRGV0YWlscyhURFBJRCkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMuc2V0UHJvb2ZzKHJlcyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwidHhuIGRldGFpbHM6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNoYW5nZVRvT3ZlcnZpZXcoKTtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2TWVudVN0YXR1cy5zdWJzY3JpYmUoc3RhdHVzID0+IHtcclxuICAgICAgdGhpcy5uYXZTdGF0dXMgPSBzdGF0dXM7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFVzZXIocmVzdWx0OiBhbnkpIHtcclxuICAgIHRoaXMuZGF0YVNlcnZpY2UudXNlcnMgPSBbXTtcclxuICAgIHJlc3VsdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICB0aGlzLmRhdGFTZXJ2aWNlLmFkZFVzZXJUb0xpc3QoZWxlbWVudCk7XHJcbiAgICAgIC8vIHRoaXMuZGF0YVNlcnZpY2UudXNlcnMucHVzaChlbGVtZW50KTtcclxuICAgIH0pO1xyXG4gICAgLy8gY29uc29sZS5sb2coJ25ldyBzZXQnICsgdGhpcy51c2Vycyk7XHJcbiAgfVxyXG5cclxuICBzZXRQcm9vZnMocmVzdWx0OiBhbnkpIHtcclxuICAgIHZhciBhbGxQcm9vZkRhdGEgPSBbXTtcclxuICAgIHRoaXMuZGF0YVNlcnZpY2UucHJvb2ZzID0gW107XHJcblxyXG4gICAgdGhpcy5wcm9vZkRhdGEgPSB0aGlzLmRhdGFTZXJ2aWNlLnRlbXBsYXRlRGF0YS5wcm9vZnM7XHJcbiAgICB2YXIgaSA9IDA7XHJcbiAgICBmb3IgKGxldCBwZmRhdGEgb2YgdGhpcy5wcm9vZkRhdGEpIHtcclxuICAgICAgdGhpcy5wcm9vZiA9IG5ldyBQcm9vZigpO1xyXG4gICAgICB0aGlzLnByb29mLm5hbWUgPSBwZmRhdGEubmFtZTtcclxuICAgICAgdGhpcy5wcm9vZi5kZXNjcmlwdGlvbiA9IHBmZGF0YS5kZXNjcmlwdGlvbjtcclxuICAgICAgdGhpcy5wcm9vZi5UeG5oYXNoID0gcmVzdWx0W2ldLlR4bmhhc2g7XHJcbiAgICAgIHRoaXMucHJvb2YuVXJsID0gcmVzdWx0W2ldLlVybDtcclxuICAgICAgdGhpcy5wcm9vZi5JZGVudGlmaWVyID0gcmVzdWx0W2ldLklkZW50aWZpZXI7XHJcbiAgICAgIHRoaXMucHJvb2YuVGRwSWQgPSByZXN1bHRbaV0uVGRwSUQ7XHJcbiAgICAgIGkrKztcclxuICAgICAgYWxsUHJvb2ZEYXRhLnB1c2godGhpcy5wcm9vZik7XHJcbiAgICB9XHJcblxyXG4gICAgYWxsUHJvb2ZEYXRhLmZvckVhY2gocHJvb2YgPT4ge1xyXG4gICAgICB0aGlzLmRhdGFTZXJ2aWNlLmFkZFByb29mVG9MaXN0KHByb29mKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHRoaXMuZGF0YVNlcnZpY2UucHJvb2ZzID0gYWxsUHJvb2ZEYXRhO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlVG9PdmVydmlldygpIHtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UuY2hhbmdlVG9PdmVydmlldygpO1xyXG4gICAgdGhpcy5zZXROYXZTdGF0dXMoKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVRvQkNQcm9vZnMoKSB7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmNoYW5nZVRvQkNQcm9vZnMoKTtcclxuICAgIHRoaXMuc2V0TmF2U3RhdHVzKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VUb1Blb1RlY2goKSB7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmNoYW5nZVRvUGVvVGVjaCgpO1xyXG4gICAgdGhpcy5zZXROYXZTdGF0dXMoKTtcclxuICB9XHJcblxyXG4gIHNldE5hdlN0YXR1cygpIHtcclxuICAgIHRoaXMubmF2U3RhdHVzID0gdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5nZXROYXZpZ2F0aW9uVmFsdWUoKS50b1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAvLyB0aGlzLmRhdGFTZXJ2aWNlLnVzZXJzID0gW11cclxuICB9XHJcbn1cclxuIl19