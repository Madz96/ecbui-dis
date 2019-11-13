/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ApiCallsService {
    /**
     * @param {?} _http
     */
    constructor(_http) {
        this._http = _http;
        /**
         * staging
         */
        this.allUserDetailsURL = "https://admin.api.tracified.com/sign/getUsersDetails";
        this.gatewayUrl = "https://tracified-gateway.herokuapp.com/GetTransactionsForTDPs";
        /**
         * ## Mock API to get some sample users
         */
        this.allUsers = "http://www.mocky.io/v2/5d9db4f7320000500032988a";
    }
    /**
     * @param {?} tdpId
     * @return {?}
     */
    getTxnDetails(tdpId) {
        return this._http.post(this.gatewayUrl, tdpId);
    }
    /**
     * @param {?} usersDetails
     * @return {?}
     */
    getUsersDetails(usersDetails) {
        return this._http.post(this.allUserDetailsURL, usersDetails);
    }
    /**
     * @return {?}
     */
    getAllUsers() {
        return this._http.get(this.allUsers);
    }
}
ApiCallsService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root"
            },] },
];
/** @nocollapse */
ApiCallsService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ ApiCallsService.ngInjectableDef = i0.defineInjectable({ factory: function ApiCallsService_Factory() { return new ApiCallsService(i0.inject(i1.HttpClient)); }, token: ApiCallsService, providedIn: "root" });
if (false) {
    /** @type {?} */
    ApiCallsService.prototype.proof;
    /** @type {?} */
    ApiCallsService.prototype.user;
    /**
     * staging
     * @type {?}
     */
    ApiCallsService.prototype.allUserDetailsURL;
    /** @type {?} */
    ApiCallsService.prototype.gatewayUrl;
    /**
     * ## Mock API to get some sample users
     * @type {?}
     */
    ApiCallsService.prototype.allUsers;
    /** @type {?} */
    ApiCallsService.prototype._http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWNhbGxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lY29tLWJsb2NrY2hhaW4tdWkvIiwic291cmNlcyI6WyJsaWIvY29yZS9hcGkvYXBpLWNhbGxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7QUFRbEQsTUFBTTs7OztJQXNCSixZQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZOzs7O2lDQVJuQyxzREFBc0Q7MEJBTXRELGdFQUFnRTs7Ozt3QkF3Qi9DLGlEQUFpRDtLQXRCM0I7Ozs7O0lBRWxDLGFBQWEsQ0FBQyxLQUFLO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDOzs7Ozs7SUFXMUMsZUFBZSxDQUFDLFlBQWlCO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLENBQUM7Ozs7O0lBU3hELFdBQVc7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztZQWxEeEMsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBUFEsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgUHJvb2YgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL21vZGVsL3Byb29mXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL21vZGVsL3VzZXJcIjtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiBcInJvb3RcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBpQ2FsbHNTZXJ2aWNlIHtcclxuICBwcml2YXRlIHByb29mOiBQcm9vZjtcclxuICBwcml2YXRlIHVzZXI6IFVzZXI7XHJcblxyXG4gIC8vIHByaXZhdGUgdXNlckRldGFpbHNVUkwgPVxyXG4gIC8vICAgXCJodHRwczovL3N0YWdpbmcuYWRtaW4uYXBpLnRyYWNpZmllZC5jb20vc2lnbi9nZXRVc2VyRGV0YWlscy84M2YxYjg4MC02NzFkLTExZTktYjJmNC0wYjgyMDJiZTBiNGZcIjtcclxuXHJcbiAgLyoqXHJcbiAgICogc3RhZ2luZ1xyXG4gICAqL1xyXG4gIC8vIHByaXZhdGUgYWxsVXNlckRldGFpbHNVUkwgPVxyXG4gIC8vICAgXCJodHRwczovL3N0YWdpbmcuYWRtaW4uYXBpLnRyYWNpZmllZC5jb20vc2lnbi9nZXRVc2Vyc0RldGFpbHNcIjtcclxuXHJcbiAgcHJpdmF0ZSBhbGxVc2VyRGV0YWlsc1VSTCA9XHJcbiAgICBcImh0dHBzOi8vYWRtaW4uYXBpLnRyYWNpZmllZC5jb20vc2lnbi9nZXRVc2Vyc0RldGFpbHNcIjtcclxuXHJcbiAgLy8gcHJpdmF0ZSBibG9ja2NoYWluUHJvb2ZzVVJMID1cclxuICAvLyAgIFwiaHR0cDovL3RyYWNpZmllZC1nYXRld2F5Lmhlcm9rdWFwcC5jb20vVHJhbnNhY3Rpb25JZC9cIjtcclxuXHJcbiAgcHJpdmF0ZSBnYXRld2F5VXJsID1cclxuICAgIFwiaHR0cHM6Ly90cmFjaWZpZWQtZ2F0ZXdheS5oZXJva3VhcHAuY29tL0dldFRyYW5zYWN0aW9uc0ZvclREUHNcIjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCkge31cclxuXHJcbiAgcHVibGljIGdldFR4bkRldGFpbHModGRwSWQpIHtcclxuICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QodGhpcy5nYXRld2F5VXJsLCB0ZHBJZCk7XHJcbiAgfVxyXG5cclxuICAvLyBwdWJsaWMgZ2V0UHJvb2YodGRwaWQpIHtcclxuICAvLyAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLmJsb2NrY2hhaW5Qcm9vZnNVUkwrdGRwaWQpO1xyXG4gIC8vIH1cclxuXHJcbiAgLy8gcHVibGljIGdldFVzZXJEZXRhaWxzKCk6IE9ic2VydmFibGU8VXNlcltdPiB7XHJcbiAgLy8gICByZXR1cm4gdGhpcy5faHR0cC5nZXQ8VXNlcltdPih0aGlzLnVzZXJEZXRhaWxzVVJMKTtcclxuICAvLyB9XHJcblxyXG4gIHB1YmxpYyBnZXRVc2Vyc0RldGFpbHModXNlcnNEZXRhaWxzOiBhbnkpIHtcclxuICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QodGhpcy5hbGxVc2VyRGV0YWlsc1VSTCwgdXNlcnNEZXRhaWxzKTtcclxuICB9XHJcblxyXG4gIC8qKiBcclxuICAjIyBNb2NrIEFQSSB0byBnZXQgc29tZSBzYW1wbGUgdXNlcnNcclxuXHJcbiAgKi9cclxuICBwcml2YXRlIGFsbFVzZXJzID0gXCJodHRwOi8vd3d3Lm1vY2t5LmlvL3YyLzVkOWRiNGY3MzIwMDAwNTAwMDMyOTg4YVwiO1xyXG5cclxuICBwdWJsaWMgZ2V0QWxsVXNlcnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5hbGxVc2Vycyk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgKi9cclxufVxyXG4iXX0=