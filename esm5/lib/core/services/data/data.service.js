/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import * as i0 from "@angular/core";
var DataService = /** @class */ (function () {
    function DataService() {
        this.userUpdate = new Subject();
        this.proofUpdate = new Subject();
        this.users = [];
        this.proofs = [];
    }
    /**
     * @param {?} user
     * @return {?}
     */
    DataService.prototype.addUserToList = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        this.users.push(user);
        this.userUpdate.next(this.users);
    };
    /**
     * @param {?} proof
     * @return {?}
     */
    DataService.prototype.addProofToList = /**
     * @param {?} proof
     * @return {?}
     */
    function (proof) {
        this.proofs.push(proof);
        this.proofUpdate.next(this.proofs);
    };
    DataService.decorators = [
        { type: Injectable, args: [{
                    providedIn: "root"
                },] },
    ];
    /** @nocollapse */
    DataService.ctorParameters = function () { return []; };
    /** @nocollapse */ DataService.ngInjectableDef = i0.defineInjectable({ factory: function DataService_Factory() { return new DataService(); }, token: DataService, providedIn: "root" });
    return DataService;
}());
export { DataService };
if (false) {
    /** @type {?} */
    DataService.prototype.userUpdate;
    /** @type {?} */
    DataService.prototype.proofUpdate;
    /** @type {?} */
    DataService.prototype.templateData;
    /** @type {?} */
    DataService.prototype.users;
    /** @type {?} */
    DataService.prototype.proofs;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZWNvbS1ibG9ja2NoYWluLXVpLyIsInNvdXJjZXMiOlsibGliL2NvcmUvc2VydmljZXMvZGF0YS9kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0lBdUI3QjswQkFqQm9CLElBQUksT0FBTyxFQUFPOzJCQUNqQixJQUFJLE9BQU8sRUFBTztxQkFHL0IsRUFBRTtzQkFDRCxFQUFFO0tBWUs7Ozs7O0lBVmhCLG1DQUFhOzs7O0lBQWIsVUFBYyxJQUFJO1FBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNsQzs7Ozs7SUFFRCxvQ0FBYzs7OztJQUFkLFVBQWUsS0FBSztRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDcEM7O2dCQW5CRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7OztzQkFMRDs7U0FNYSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwicnhqc1wiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46IFwicm9vdFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhU2VydmljZSB7XHJcbiAgcHVibGljIHVzZXJVcGRhdGUgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgcHVibGljIHByb29mVXBkYXRlID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG5cclxuICB0ZW1wbGF0ZURhdGE7XHJcbiAgdXNlcnMgPSBbXTtcclxuICBwcm9vZnMgPSBbXTtcclxuXHJcbiAgYWRkVXNlclRvTGlzdCh1c2VyKSB7XHJcbiAgICB0aGlzLnVzZXJzLnB1c2godXNlcik7XHJcbiAgICB0aGlzLnVzZXJVcGRhdGUubmV4dCh0aGlzLnVzZXJzKTtcclxuICB9XHJcblxyXG4gIGFkZFByb29mVG9MaXN0KHByb29mKSB7XHJcbiAgICB0aGlzLnByb29mcy5wdXNoKHByb29mKTtcclxuICAgIHRoaXMucHJvb2ZVcGRhdGUubmV4dCh0aGlzLnByb29mcyk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIl19