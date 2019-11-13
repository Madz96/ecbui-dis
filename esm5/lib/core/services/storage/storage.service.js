/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from "@angular/core";
import * as i0 from "@angular/core";
/** @type {?} */
var STORAGE_KEY_CARD_SUBTITLES = "local_card_subtitles";
var StorageService = /** @class */ (function () {
    function StorageService() {
        this.cardSubtitles = [];
    }
    /**
     * @return {?}
     */
    StorageService.prototype.getCardSubtitles = /**
     * @return {?}
     */
    function () {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY_CARD_SUBTITLES));
    };
    StorageService.decorators = [
        { type: Injectable, args: [{
                    providedIn: "root"
                },] },
    ];
    /** @nocollapse */
    StorageService.ctorParameters = function () { return []; };
    /** @nocollapse */ StorageService.ngInjectableDef = i0.defineInjectable({ factory: function StorageService_Factory() { return new StorageService(); }, token: StorageService, providedIn: "root" });
    return StorageService;
}());
export { StorageService };
if (false) {
    /** @type {?} */
    StorageService.prototype.cardSubtitles;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZWNvbS1ibG9ja2NoYWluLXVpLyIsInNvdXJjZXMiOlsibGliL2NvcmUvc2VydmljZXMvc3RvcmFnZS9zdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUUzQyxJQUFNLDBCQUEwQixHQUFHLHNCQUFzQixDQUFDOztJQVF4RDs2QkFGdUIsRUFBRTtLQUVUOzs7O0lBRVQseUNBQWdCOzs7O1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDOzs7Z0JBVHpFLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7O3lCQU5EOztTQU9hLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmNvbnN0IFNUT1JBR0VfS0VZX0NBUkRfU1VCVElUTEVTID0gXCJsb2NhbF9jYXJkX3N1YnRpdGxlc1wiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46IFwicm9vdFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdG9yYWdlU2VydmljZSB7XHJcbiAgcHVibGljIGNhcmRTdWJ0aXRsZXMgPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBwdWJsaWMgZ2V0Q2FyZFN1YnRpdGxlcygpIHtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlfQ0FSRF9TVUJUSVRMRVMpKTtcclxuICB9XHJcbn1cclxuIl19