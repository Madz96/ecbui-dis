/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var ApiCallsService = /** @class */ (function () {
    function ApiCallsService(_http) {
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
    ApiCallsService.prototype.getTxnDetails = /**
     * @param {?} tdpId
     * @return {?}
     */
    function (tdpId) {
        return this._http.post(this.gatewayUrl, tdpId);
    };
    /**
     * @param {?} usersDetails
     * @return {?}
     */
    ApiCallsService.prototype.getUsersDetails = /**
     * @param {?} usersDetails
     * @return {?}
     */
    function (usersDetails) {
        return this._http.post(this.allUserDetailsURL, usersDetails);
    };
    /**
     * @return {?}
     */
    ApiCallsService.prototype.getAllUsers = /**
     * @return {?}
     */
    function () {
        return this._http.get(this.allUsers);
    };
    ApiCallsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: "root"
                },] },
    ];
    /** @nocollapse */
    ApiCallsService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    /** @nocollapse */ ApiCallsService.ngInjectableDef = i0.defineInjectable({ factory: function ApiCallsService_Factory() { return new ApiCallsService(i0.inject(i1.HttpClient)); }, token: ApiCallsService, providedIn: "root" });
    return ApiCallsService;
}());
export { ApiCallsService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWNhbGxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lY29tLWJsb2NrY2hhaW4tdWkvIiwic291cmNlcyI6WyJsaWIvY29yZS9hcGkvYXBpLWNhbGxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0lBOEJoRCx5QkFBb0IsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTs7OztpQ0FSbkMsc0RBQXNEOzBCQU10RCxnRUFBZ0U7Ozs7d0JBd0IvQyxpREFBaUQ7S0F0QjNCOzs7OztJQUVsQyx1Q0FBYTs7OztjQUFDLEtBQUs7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7Ozs7OztJQVcxQyx5Q0FBZTs7OztjQUFDLFlBQWlCO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLENBQUM7Ozs7O0lBU3hELHFDQUFXOzs7O1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7OztnQkFsRHhDLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBUFEsVUFBVTs7OzBCQURuQjs7U0FTYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tIFwicnhqc1wiO1xyXG5pbXBvcnQgeyBQcm9vZiB9IGZyb20gXCIuLi8uLi9zaGFyZWQvbW9kZWwvcHJvb2ZcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9zaGFyZWQvbW9kZWwvdXNlclwiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46IFwicm9vdFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcGlDYWxsc1NlcnZpY2Uge1xyXG4gIHByaXZhdGUgcHJvb2Y6IFByb29mO1xyXG4gIHByaXZhdGUgdXNlcjogVXNlcjtcclxuXHJcbiAgLy8gcHJpdmF0ZSB1c2VyRGV0YWlsc1VSTCA9XHJcbiAgLy8gICBcImh0dHBzOi8vc3RhZ2luZy5hZG1pbi5hcGkudHJhY2lmaWVkLmNvbS9zaWduL2dldFVzZXJEZXRhaWxzLzgzZjFiODgwLTY3MWQtMTFlOS1iMmY0LTBiODIwMmJlMGI0ZlwiO1xyXG5cclxuICAvKipcclxuICAgKiBzdGFnaW5nXHJcbiAgICovXHJcbiAgLy8gcHJpdmF0ZSBhbGxVc2VyRGV0YWlsc1VSTCA9XHJcbiAgLy8gICBcImh0dHBzOi8vc3RhZ2luZy5hZG1pbi5hcGkudHJhY2lmaWVkLmNvbS9zaWduL2dldFVzZXJzRGV0YWlsc1wiO1xyXG5cclxuICBwcml2YXRlIGFsbFVzZXJEZXRhaWxzVVJMID1cclxuICAgIFwiaHR0cHM6Ly9hZG1pbi5hcGkudHJhY2lmaWVkLmNvbS9zaWduL2dldFVzZXJzRGV0YWlsc1wiO1xyXG5cclxuICAvLyBwcml2YXRlIGJsb2NrY2hhaW5Qcm9vZnNVUkwgPVxyXG4gIC8vICAgXCJodHRwOi8vdHJhY2lmaWVkLWdhdGV3YXkuaGVyb2t1YXBwLmNvbS9UcmFuc2FjdGlvbklkL1wiO1xyXG5cclxuICBwcml2YXRlIGdhdGV3YXlVcmwgPVxyXG4gICAgXCJodHRwczovL3RyYWNpZmllZC1nYXRld2F5Lmhlcm9rdWFwcC5jb20vR2V0VHJhbnNhY3Rpb25zRm9yVERQc1wiO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50KSB7fVxyXG5cclxuICBwdWJsaWMgZ2V0VHhuRGV0YWlscyh0ZHBJZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCh0aGlzLmdhdGV3YXlVcmwsIHRkcElkKTtcclxuICB9XHJcblxyXG4gIC8vIHB1YmxpYyBnZXRQcm9vZih0ZHBpZCkge1xyXG4gIC8vICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuYmxvY2tjaGFpblByb29mc1VSTCt0ZHBpZCk7XHJcbiAgLy8gfVxyXG5cclxuICAvLyBwdWJsaWMgZ2V0VXNlckRldGFpbHMoKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcclxuICAvLyAgIHJldHVybiB0aGlzLl9odHRwLmdldDxVc2VyW10+KHRoaXMudXNlckRldGFpbHNVUkwpO1xyXG4gIC8vIH1cclxuXHJcbiAgcHVibGljIGdldFVzZXJzRGV0YWlscyh1c2Vyc0RldGFpbHM6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCh0aGlzLmFsbFVzZXJEZXRhaWxzVVJMLCB1c2Vyc0RldGFpbHMpO1xyXG4gIH1cclxuXHJcbiAgLyoqIFxyXG4gICMjIE1vY2sgQVBJIHRvIGdldCBzb21lIHNhbXBsZSB1c2Vyc1xyXG5cclxuICAqL1xyXG4gIHByaXZhdGUgYWxsVXNlcnMgPSBcImh0dHA6Ly93d3cubW9ja3kuaW8vdjIvNWQ5ZGI0ZjczMjAwMDA1MDAwMzI5ODhhXCI7XHJcblxyXG4gIHB1YmxpYyBnZXRBbGxVc2VycygpIHtcclxuICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLmFsbFVzZXJzKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAqL1xyXG59XHJcbiJdfQ==