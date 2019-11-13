/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import * as i0 from "@angular/core";
var NavigationService = /** @class */ (function () {
    function NavigationService() {
        this.navMenuStatus = new Subject();
    }
    /**
     * @return {?}
     */
    NavigationService.prototype.changeToOverview = /**
     * @return {?}
     */
    function () {
        this.navStatus = "overview";
        this.navMenuStatus.next(this.navStatus);
    };
    /**
     * @return {?}
     */
    NavigationService.prototype.changeToBCProofs = /**
     * @return {?}
     */
    function () {
        this.navStatus = "proofs";
        this.navMenuStatus.next(this.navStatus);
    };
    /**
     * @return {?}
     */
    NavigationService.prototype.changeToPeoTech = /**
     * @return {?}
     */
    function () {
        this.navStatus = "people";
        this.navMenuStatus.next(this.navStatus);
    };
    /**
     * @return {?}
     */
    NavigationService.prototype.getNavigationValue = /**
     * @return {?}
     */
    function () {
        return this.navStatus;
    };
    NavigationService.decorators = [
        { type: Injectable, args: [{
                    providedIn: "root"
                },] },
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return []; };
    /** @nocollapse */ NavigationService.ngInjectableDef = i0.defineInjectable({ factory: function NavigationService_Factory() { return new NavigationService(); }, token: NavigationService, providedIn: "root" });
    return NavigationService;
}());
export { NavigationService };
if (false) {
    /** @type {?} */
    NavigationService.prototype.navStatus;
    /** @type {?} */
    NavigationService.prototype.navMenuStatus;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZWNvbS1ibG9ja2NoYWluLXVpLyIsInNvdXJjZXMiOlsibGliL2NvcmUvc2VydmljZXMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0lBUzdCOzZCQUZ1QixJQUFJLE9BQU8sRUFBTztLQUV6Qjs7OztJQUVoQiw0Q0FBZ0I7OztJQUFoQjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUN6Qzs7OztJQUVELDRDQUFnQjs7O0lBQWhCO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3pDOzs7O0lBRUQsMkNBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3pDOzs7O0lBRUQsOENBQWtCOzs7SUFBbEI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUN2Qjs7Z0JBMUJGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7OzRCQUxEOztTQU1hLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSBcInJ4anNcIjtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiBcInJvb3RcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblNlcnZpY2Uge1xyXG4gIG5hdlN0YXR1czogU3RyaW5nO1xyXG4gIHB1YmxpYyBuYXZNZW51U3RhdHVzID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIGNoYW5nZVRvT3ZlcnZpZXcoKSB7XHJcbiAgICB0aGlzLm5hdlN0YXR1cyA9IFwib3ZlcnZpZXdcIjtcclxuICAgIHRoaXMubmF2TWVudVN0YXR1cy5uZXh0KHRoaXMubmF2U3RhdHVzKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVRvQkNQcm9vZnMoKSB7XHJcbiAgICB0aGlzLm5hdlN0YXR1cyA9IFwicHJvb2ZzXCI7XHJcbiAgICB0aGlzLm5hdk1lbnVTdGF0dXMubmV4dCh0aGlzLm5hdlN0YXR1cyk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VUb1Blb1RlY2goKSB7XHJcbiAgICB0aGlzLm5hdlN0YXR1cyA9IFwicGVvcGxlXCI7XHJcbiAgICB0aGlzLm5hdk1lbnVTdGF0dXMubmV4dCh0aGlzLm5hdlN0YXR1cyk7XHJcbiAgfVxyXG5cclxuICBnZXROYXZpZ2F0aW9uVmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uYXZTdGF0dXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==