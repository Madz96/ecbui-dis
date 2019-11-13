/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from "@angular/core";
import { NavigationService } from "../../core/services/navigation/navigation.service";
import { DataService } from "../../core/services/data/data.service";
import { ApiCallsService } from "../../core/api/api-calls.service";
import { Proof } from "../model/proof";
import * as _ from "lodash";
var TabNavComponent = /** @class */ (function () {
    function TabNavComponent(navigationService, dataService, apiService) {
        this.navigationService = navigationService;
        this.dataService = dataService;
        this.apiService = apiService;
    }
    /**
     * @return {?}
     */
    TabNavComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
        var usersDetails = {
            ids: this.ids
        };
        this.apiService.getUsersDetails(usersDetails).subscribe(function (results) {
            _this.setUser(results);
            console.log("users are " + JSON.stringify(results));
        });
        /** *
         * Getting txn details from gateway
          @type {?} */
        var TDPID = {
            TdpID: this.dataService.templateData.tdpid
        };
        this.apiService.getTxnDetails(TDPID).subscribe(function (res) {
            _this.setProofs(res);
            console.log("txn details: " + JSON.stringify(res));
        });
        this.changeToOverview();
        this.navigationService.navMenuStatus.subscribe(function (status) {
            _this.navStatus = status;
        });
    };
    /**
     * @param {?} result
     * @return {?}
     */
    TabNavComponent.prototype.setUser = /**
     * @param {?} result
     * @return {?}
     */
    function (result) {
        var _this = this;
        this.dataService.users = [];
        result.forEach(function (element) {
            _this.dataService.addUserToList(element);
            // this.dataService.users.push(element);
        });
        // console.log('new set' + this.users);
    };
    /**
     * @param {?} result
     * @return {?}
     */
    TabNavComponent.prototype.setProofs = /**
     * @param {?} result
     * @return {?}
     */
    function (result) {
        var _this = this;
        /** @type {?} */
        var allProofData = [];
        this.dataService.proofs = [];
        this.proofData = this.dataService.templateData.proofs;
        /** @type {?} */
        var i = 0;
        try {
            for (var _a = tslib_1.__values(this.proofData), _b = _a.next(); !_b.done; _b = _a.next()) {
                var pfdata = _b.value;
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
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        allProofData.forEach(function (proof) {
            _this.dataService.addProofToList(proof);
        });
        // this.dataService.proofs = allProofData;
        var e_1, _c;
    };
    /**
     * @return {?}
     */
    TabNavComponent.prototype.changeToOverview = /**
     * @return {?}
     */
    function () {
        this.navigationService.changeToOverview();
        this.setNavStatus();
    };
    /**
     * @return {?}
     */
    TabNavComponent.prototype.changeToBCProofs = /**
     * @return {?}
     */
    function () {
        this.navigationService.changeToBCProofs();
        this.setNavStatus();
    };
    /**
     * @return {?}
     */
    TabNavComponent.prototype.changeToPeoTech = /**
     * @return {?}
     */
    function () {
        this.navigationService.changeToPeoTech();
        this.setNavStatus();
    };
    /**
     * @return {?}
     */
    TabNavComponent.prototype.setNavStatus = /**
     * @return {?}
     */
    function () {
        this.navStatus = this.navigationService.getNavigationValue().toString();
    };
    /**
     * @return {?}
     */
    TabNavComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        // this.dataService.users = []
    };
    TabNavComponent.decorators = [
        { type: Component, args: [{
                    selector: "ecbui-tab-nav",
                    template: "<ul class=\"nav nav-tabs nav-fill\">\n  {{testData}}\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" [ngClass]=\"{'nav-link active': navStatus == 'overview'}\"\n      (click)=\"changeToOverview()\">Overview</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" [ngClass]=\"{'nav-link active': navStatus == 'proofs'}\" (click)=\"changeToBCProofs()\">Blockchain\n      Proofs</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" [ngClass]=\"{'nav-link active': navStatus == 'people'}\" (click)=\"changeToPeoTech()\">People &\n      Technologies</a>\n  </li>\n</ul>\n\n<div *ngIf=\"navStatus == 'overview' \">\n  <ecbui-main-view></ecbui-main-view>\n</div>\n\n<div *ngIf=\"navStatus == 'proofs' \">\n  <ecbui-blockchain-proofs></ecbui-blockchain-proofs>\n</div>\n\n<div *ngIf=\"navStatus == 'people' \">\n  <ecbui-people-tech></ecbui-people-tech>\n</div>",
                    styles: ["*{color:#000}.nav-link.active,.nav-link.active:hover{background-color:#36464f;color:#fff;padding:16px}.nav-tabs .nav-item{margin-bottom:0}.nav-tabs .nav-link{border:none;border-radius:0}.nav-tabs .nav-item:hover{cursor:pointer}a{padding:16px!important;display:inline-block!important;width:100%}"]
                },] },
    ];
    /** @nocollapse */
    TabNavComponent.ctorParameters = function () { return [
        { type: NavigationService },
        { type: DataService },
        { type: ApiCallsService }
    ]; };
    TabNavComponent.propDecorators = {
        data: [{ type: Input }]
    };
    return TabNavComponent;
}());
export { TabNavComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lY29tLWJsb2NrY2hhaW4tdWkvIiwic291cmNlcyI6WyJsaWIvc2hhcmVkL3RhYi1uYXYvdGFiLW5hdi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUV0RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7SUF5QzFCLHlCQUNVLG1CQUNBLGFBQ0E7UUFGQSxzQkFBaUIsR0FBakIsaUJBQWlCO1FBQ2pCLGdCQUFXLEdBQVgsV0FBVztRQUNYLGVBQVUsR0FBVixVQUFVO0tBQ2hCOzs7O0lBRUosa0NBQVE7OztJQUFSO1FBQUEsaUJBcUNDOzs7O1FBaENDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O1FBSzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFDeEQsSUFBTSxZQUFZLEdBQUc7WUFDbkIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1NBQ2QsQ0FBQztRQUVGLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFlBQVks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QUFnQixFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3JCOzs7O0lBRUQsMENBQWdCOzs7SUFBaEI7UUFDRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDckI7Ozs7SUFFRCx5Q0FBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3JCOzs7O0lBRUQsc0NBQVk7OztJQUFaO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUN6RTs7OztJQUVELHFDQUFXOzs7SUFBWDs7S0FFQzs7Z0JBM0lGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLHMzQkEwQkw7b0JBQ0wsTUFBTSxFQUFFLENBQUMsd1NBQXdTLENBQUM7aUJBQ25UOzs7O2dCQXJDUSxpQkFBaUI7Z0JBRWpCLFdBQVc7Z0JBQ1gsZUFBZTs7O3VCQW9DckIsS0FBSzs7MEJBeENSOztTQXVDYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24vbmF2aWdhdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwicnhqc1wiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb3JlL3NlcnZpY2VzL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEFwaUNhbGxzU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb3JlL2FwaS9hcGktY2FsbHMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQcm9vZiB9IGZyb20gXCIuLi9tb2RlbC9wcm9vZlwiO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImVjYnVpLXRhYi1uYXZcIixcclxuICB0ZW1wbGF0ZTogYDx1bCBjbGFzcz1cIm5hdiBuYXYtdGFicyBuYXYtZmlsbFwiPlxyXG4gIHt7dGVzdERhdGF9fVxyXG4gIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+XHJcbiAgICA8YSBjbGFzcz1cIm5hdi1saW5rXCIgW25nQ2xhc3NdPVwieyduYXYtbGluayBhY3RpdmUnOiBuYXZTdGF0dXMgPT0gJ292ZXJ2aWV3J31cIlxyXG4gICAgICAoY2xpY2spPVwiY2hhbmdlVG9PdmVydmlldygpXCI+T3ZlcnZpZXc8L2E+XHJcbiAgPC9saT5cclxuICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPlxyXG4gICAgPGEgY2xhc3M9XCJuYXYtbGlua1wiIFtuZ0NsYXNzXT1cInsnbmF2LWxpbmsgYWN0aXZlJzogbmF2U3RhdHVzID09ICdwcm9vZnMnfVwiIChjbGljayk9XCJjaGFuZ2VUb0JDUHJvb2ZzKClcIj5CbG9ja2NoYWluXHJcbiAgICAgIFByb29mczwvYT5cclxuICA8L2xpPlxyXG4gIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+XHJcbiAgICA8YSBjbGFzcz1cIm5hdi1saW5rXCIgW25nQ2xhc3NdPVwieyduYXYtbGluayBhY3RpdmUnOiBuYXZTdGF0dXMgPT0gJ3Blb3BsZSd9XCIgKGNsaWNrKT1cImNoYW5nZVRvUGVvVGVjaCgpXCI+UGVvcGxlICZcclxuICAgICAgVGVjaG5vbG9naWVzPC9hPlxyXG4gIDwvbGk+XHJcbjwvdWw+XHJcblxyXG48ZGl2ICpuZ0lmPVwibmF2U3RhdHVzID09ICdvdmVydmlldycgXCI+XHJcbiAgPGVjYnVpLW1haW4tdmlldz48L2VjYnVpLW1haW4tdmlldz5cclxuPC9kaXY+XHJcblxyXG48ZGl2ICpuZ0lmPVwibmF2U3RhdHVzID09ICdwcm9vZnMnIFwiPlxyXG4gIDxlY2J1aS1ibG9ja2NoYWluLXByb29mcz48L2VjYnVpLWJsb2NrY2hhaW4tcHJvb2ZzPlxyXG48L2Rpdj5cclxuXHJcbjxkaXYgKm5nSWY9XCJuYXZTdGF0dXMgPT0gJ3Blb3BsZScgXCI+XHJcbiAgPGVjYnVpLXBlb3BsZS10ZWNoPjwvZWNidWktcGVvcGxlLXRlY2g+XHJcbjwvZGl2PmAsXHJcbiAgc3R5bGVzOiBbYCp7Y29sb3I6IzAwMH0ubmF2LWxpbmsuYWN0aXZlLC5uYXYtbGluay5hY3RpdmU6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojMzY0NjRmO2NvbG9yOiNmZmY7cGFkZGluZzoxNnB4fS5uYXYtdGFicyAubmF2LWl0ZW17bWFyZ2luLWJvdHRvbTowfS5uYXYtdGFicyAubmF2LWxpbmt7Ym9yZGVyOm5vbmU7Ym9yZGVyLXJhZGl1czowfS5uYXYtdGFicyAubmF2LWl0ZW06aG92ZXJ7Y3Vyc29yOnBvaW50ZXJ9YXtwYWRkaW5nOjE2cHghaW1wb3J0YW50O2Rpc3BsYXk6aW5saW5lLWJsb2NrIWltcG9ydGFudDt3aWR0aDoxMDAlfWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJOYXZDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgZGF0YTogYW55O1xyXG4gIG5hdlN0YXR1czogc3RyaW5nO1xyXG4gIHRlc3REYXRhOiBhbnk7XHJcbiAgcHJvb2Y6IFByb29mO1xyXG4gIHByb29mRGF0YTogYW55O1xyXG4gIGlkczogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGFwaVNlcnZpY2U6IEFwaUNhbGxzU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICAvKipcclxuICAgICAqIEdldHRpbmcgd2lkZ2V0IGRhdGEgZnJvbSBQT1NcclxuICAgICAqL1xyXG5cclxuICAgIHRoaXMuZGF0YVNlcnZpY2UudGVtcGxhdGVEYXRhID0gSlNPTi5wYXJzZSh0aGlzLmRhdGEpO1xyXG4gICAgY29uc29sZS5sb2coXCJpbmNvbWluZyBkYXRhIGlzIFwiICsgdGhpcy5kYXRhKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHRpbmcgdXNlciBkZXRhaWxzIGZvcm0gQURNSU4gZW5kcG9pbnRcclxuICAgICAqL1xyXG4gICAgdGhpcy5pZHMgPSBfLnVuaXEodGhpcy5kYXRhU2VydmljZS50ZW1wbGF0ZURhdGEudXNlcmlkKTtcclxuICAgIGNvbnN0IHVzZXJzRGV0YWlscyA9IHtcclxuICAgICAgaWRzOiB0aGlzLmlkc1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmFwaVNlcnZpY2UuZ2V0VXNlcnNEZXRhaWxzKHVzZXJzRGV0YWlscykuc3Vic2NyaWJlKHJlc3VsdHMgPT4ge1xyXG4gICAgICB0aGlzLnNldFVzZXIocmVzdWx0cyk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwidXNlcnMgYXJlIFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0cykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXR0aW5nIHR4biBkZXRhaWxzIGZyb20gZ2F0ZXdheVxyXG4gICAgICovXHJcbiAgICBjb25zdCBURFBJRCA9IHtcclxuICAgICAgVGRwSUQ6IHRoaXMuZGF0YVNlcnZpY2UudGVtcGxhdGVEYXRhLnRkcGlkXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuYXBpU2VydmljZS5nZXRUeG5EZXRhaWxzKFREUElEKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgdGhpcy5zZXRQcm9vZnMocmVzKTtcclxuICAgICAgY29uc29sZS5sb2coXCJ0eG4gZGV0YWlsczogXCIgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY2hhbmdlVG9PdmVydmlldygpO1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZNZW51U3RhdHVzLnN1YnNjcmliZShzdGF0dXMgPT4ge1xyXG4gICAgICB0aGlzLm5hdlN0YXR1cyA9IHN0YXR1cztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0VXNlcihyZXN1bHQ6IGFueSkge1xyXG4gICAgdGhpcy5kYXRhU2VydmljZS51c2VycyA9IFtdO1xyXG4gICAgcmVzdWx0LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkVXNlclRvTGlzdChlbGVtZW50KTtcclxuICAgICAgLy8gdGhpcy5kYXRhU2VydmljZS51c2Vycy5wdXNoKGVsZW1lbnQpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnbmV3IHNldCcgKyB0aGlzLnVzZXJzKTtcclxuICB9XHJcblxyXG4gIHNldFByb29mcyhyZXN1bHQ6IGFueSkge1xyXG4gICAgdmFyIGFsbFByb29mRGF0YSA9IFtdO1xyXG4gICAgdGhpcy5kYXRhU2VydmljZS5wcm9vZnMgPSBbXTtcclxuXHJcbiAgICB0aGlzLnByb29mRGF0YSA9IHRoaXMuZGF0YVNlcnZpY2UudGVtcGxhdGVEYXRhLnByb29mcztcclxuICAgIHZhciBpID0gMDtcclxuICAgIGZvciAobGV0IHBmZGF0YSBvZiB0aGlzLnByb29mRGF0YSkge1xyXG4gICAgICB0aGlzLnByb29mID0gbmV3IFByb29mKCk7XHJcbiAgICAgIHRoaXMucHJvb2YubmFtZSA9IHBmZGF0YS5uYW1lO1xyXG4gICAgICB0aGlzLnByb29mLmRlc2NyaXB0aW9uID0gcGZkYXRhLmRlc2NyaXB0aW9uO1xyXG4gICAgICB0aGlzLnByb29mLlR4bmhhc2ggPSByZXN1bHRbaV0uVHhuaGFzaDtcclxuICAgICAgdGhpcy5wcm9vZi5VcmwgPSByZXN1bHRbaV0uVXJsO1xyXG4gICAgICB0aGlzLnByb29mLklkZW50aWZpZXIgPSByZXN1bHRbaV0uSWRlbnRpZmllcjtcclxuICAgICAgdGhpcy5wcm9vZi5UZHBJZCA9IHJlc3VsdFtpXS5UZHBJRDtcclxuICAgICAgaSsrO1xyXG4gICAgICBhbGxQcm9vZkRhdGEucHVzaCh0aGlzLnByb29mKTtcclxuICAgIH1cclxuXHJcbiAgICBhbGxQcm9vZkRhdGEuZm9yRWFjaChwcm9vZiA9PiB7XHJcbiAgICAgIHRoaXMuZGF0YVNlcnZpY2UuYWRkUHJvb2ZUb0xpc3QocHJvb2YpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gdGhpcy5kYXRhU2VydmljZS5wcm9vZnMgPSBhbGxQcm9vZkRhdGE7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VUb092ZXJ2aWV3KCkge1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5jaGFuZ2VUb092ZXJ2aWV3KCk7XHJcbiAgICB0aGlzLnNldE5hdlN0YXR1cygpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlVG9CQ1Byb29mcygpIHtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UuY2hhbmdlVG9CQ1Byb29mcygpO1xyXG4gICAgdGhpcy5zZXROYXZTdGF0dXMoKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVRvUGVvVGVjaCgpIHtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UuY2hhbmdlVG9QZW9UZWNoKCk7XHJcbiAgICB0aGlzLnNldE5hdlN0YXR1cygpO1xyXG4gIH1cclxuXHJcbiAgc2V0TmF2U3RhdHVzKCkge1xyXG4gICAgdGhpcy5uYXZTdGF0dXMgPSB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmdldE5hdmlnYXRpb25WYWx1ZSgpLnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIC8vIHRoaXMuZGF0YVNlcnZpY2UudXNlcnMgPSBbXVxyXG4gIH1cclxufVxyXG4iXX0=