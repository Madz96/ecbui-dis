/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from "@angular/core";
import * as i0 from "@angular/core";
/** @type {?} */
const STORAGE_KEY_CARD_SUBTITLES = "local_card_subtitles";
export class StorageService {
    constructor() {
        this.cardSubtitles = [];
    }
    /**
     * @return {?}
     */
    getCardSubtitles() {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY_CARD_SUBTITLES));
    }
}
StorageService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root"
            },] },
];
/** @nocollapse */
StorageService.ctorParameters = () => [];
/** @nocollapse */ StorageService.ngInjectableDef = i0.defineInjectable({ factory: function StorageService_Factory() { return new StorageService(); }, token: StorageService, providedIn: "root" });
if (false) {
    /** @type {?} */
    StorageService.prototype.cardSubtitles;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZWNvbS1ibG9ja2NoYWluLXVpLyIsInNvdXJjZXMiOlsibGliL2NvcmUvc2VydmljZXMvc3RvcmFnZS9zdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUUzQyxNQUFNLDBCQUEwQixHQUFHLHNCQUFzQixDQUFDO0FBSzFELE1BQU07SUFHSjs2QkFGdUIsRUFBRTtLQUVUOzs7O0lBRVQsZ0JBQWdCO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDOzs7O1lBVHpFLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuY29uc3QgU1RPUkFHRV9LRVlfQ0FSRF9TVUJUSVRMRVMgPSBcImxvY2FsX2NhcmRfc3VidGl0bGVzXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogXCJyb290XCJcclxufSlcclxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VTZXJ2aWNlIHtcclxuICBwdWJsaWMgY2FyZFN1YnRpdGxlcyA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIHB1YmxpYyBnZXRDYXJkU3VidGl0bGVzKCkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWV9DQVJEX1NVQlRJVExFUykpO1xyXG4gIH1cclxufVxyXG4iXX0=