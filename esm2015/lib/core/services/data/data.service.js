/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import * as i0 from "@angular/core";
export class DataService {
    constructor() {
        this.userUpdate = new Subject();
        this.proofUpdate = new Subject();
        this.users = [];
        this.proofs = [];
    }
    /**
     * @param {?} user
     * @return {?}
     */
    addUserToList(user) {
        this.users.push(user);
        this.userUpdate.next(this.users);
    }
    /**
     * @param {?} proof
     * @return {?}
     */
    addProofToList(proof) {
        this.proofs.push(proof);
        this.proofUpdate.next(this.proofs);
    }
}
DataService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root"
            },] },
];
/** @nocollapse */
DataService.ctorParameters = () => [];
/** @nocollapse */ DataService.ngInjectableDef = i0.defineInjectable({ factory: function DataService_Factory() { return new DataService(); }, token: DataService, providedIn: "root" });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZWNvbS1ibG9ja2NoYWluLXVpLyIsInNvdXJjZXMiOlsibGliL2NvcmUvc2VydmljZXMvZGF0YS9kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFLL0IsTUFBTTtJQWtCSjswQkFqQm9CLElBQUksT0FBTyxFQUFPOzJCQUNqQixJQUFJLE9BQU8sRUFBTztxQkFHL0IsRUFBRTtzQkFDRCxFQUFFO0tBWUs7Ozs7O0lBVmhCLGFBQWEsQ0FBQyxJQUFJO1FBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNsQzs7Ozs7SUFFRCxjQUFjLENBQUMsS0FBSztRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDcEM7OztZQW5CRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gXCJyeGpzXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogXCJyb290XCJcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFTZXJ2aWNlIHtcclxuICBwdWJsaWMgdXNlclVwZGF0ZSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICBwdWJsaWMgcHJvb2ZVcGRhdGUgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG4gIHRlbXBsYXRlRGF0YTtcclxuICB1c2VycyA9IFtdO1xyXG4gIHByb29mcyA9IFtdO1xyXG5cclxuICBhZGRVc2VyVG9MaXN0KHVzZXIpIHtcclxuICAgIHRoaXMudXNlcnMucHVzaCh1c2VyKTtcclxuICAgIHRoaXMudXNlclVwZGF0ZS5uZXh0KHRoaXMudXNlcnMpO1xyXG4gIH1cclxuXHJcbiAgYWRkUHJvb2ZUb0xpc3QocHJvb2YpIHtcclxuICAgIHRoaXMucHJvb2ZzLnB1c2gocHJvb2YpO1xyXG4gICAgdGhpcy5wcm9vZlVwZGF0ZS5uZXh0KHRoaXMucHJvb2ZzKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iXX0=