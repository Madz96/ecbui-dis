/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import * as i0 from "@angular/core";
export class NavigationService {
    constructor() {
        this.navMenuStatus = new Subject();
    }
    /**
     * @return {?}
     */
    changeToOverview() {
        this.navStatus = "overview";
        this.navMenuStatus.next(this.navStatus);
    }
    /**
     * @return {?}
     */
    changeToBCProofs() {
        this.navStatus = "proofs";
        this.navMenuStatus.next(this.navStatus);
    }
    /**
     * @return {?}
     */
    changeToPeoTech() {
        this.navStatus = "people";
        this.navMenuStatus.next(this.navStatus);
    }
    /**
     * @return {?}
     */
    getNavigationValue() {
        return this.navStatus;
    }
}
NavigationService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root"
            },] },
];
/** @nocollapse */
NavigationService.ctorParameters = () => [];
/** @nocollapse */ NavigationService.ngInjectableDef = i0.defineInjectable({ factory: function NavigationService_Factory() { return new NavigationService(); }, token: NavigationService, providedIn: "root" });
if (false) {
    /** @type {?} */
    NavigationService.prototype.navStatus;
    /** @type {?} */
    NavigationService.prototype.navMenuStatus;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZWNvbS1ibG9ja2NoYWluLXVpLyIsInNvdXJjZXMiOlsibGliL2NvcmUvc2VydmljZXMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFLL0IsTUFBTTtJQUlKOzZCQUZ1QixJQUFJLE9BQU8sRUFBTztLQUV6Qjs7OztJQUVoQixnQkFBZ0I7UUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDekM7Ozs7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDekM7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3pDOzs7O0lBRUQsa0JBQWtCO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3ZCOzs7WUExQkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwicnhqc1wiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46IFwicm9vdFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU2VydmljZSB7XHJcbiAgbmF2U3RhdHVzOiBTdHJpbmc7XHJcbiAgcHVibGljIG5hdk1lbnVTdGF0dXMgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgY2hhbmdlVG9PdmVydmlldygpIHtcclxuICAgIHRoaXMubmF2U3RhdHVzID0gXCJvdmVydmlld1wiO1xyXG4gICAgdGhpcy5uYXZNZW51U3RhdHVzLm5leHQodGhpcy5uYXZTdGF0dXMpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlVG9CQ1Byb29mcygpIHtcclxuICAgIHRoaXMubmF2U3RhdHVzID0gXCJwcm9vZnNcIjtcclxuICAgIHRoaXMubmF2TWVudVN0YXR1cy5uZXh0KHRoaXMubmF2U3RhdHVzKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVRvUGVvVGVjaCgpIHtcclxuICAgIHRoaXMubmF2U3RhdHVzID0gXCJwZW9wbGVcIjtcclxuICAgIHRoaXMubmF2TWVudVN0YXR1cy5uZXh0KHRoaXMubmF2U3RhdHVzKTtcclxuICB9XHJcblxyXG4gIGdldE5hdmlnYXRpb25WYWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5hdlN0YXR1cztcclxuICB9XHJcbn1cclxuIl19