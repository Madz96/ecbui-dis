/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { TabNavComponent } from "./shared/tab-nav/tab-nav.component";
import { BlockchainProofsComponent } from "./features/blockchain-proofs/blockchain-proofs.component";
import { PeopleTechComponent } from "./features/people-tech/people-tech.component";
import { MainViewComponent } from "./features/overview/main-view/main-view.component";
import { BlockchainProofsCardComponent } from "./features/overview/blockchain-proofs-card/blockchain-proofs-card.component";
import { DataSourcesComponent } from "./features/overview/data-sources/data-sources.component";
import { PeopleTechCardComponent } from "./features/overview/people-tech-card/people-tech-card.component";
import { OverviewModule } from "./features/overview/overview.module";
var EcomBlockchainUiModule = /** @class */ (function () {
    function EcomBlockchainUiModule() {
    }
    EcomBlockchainUiModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        OverviewModule,
                        CommonModule,
                        HttpClientModule,
                    ],
                    declarations: [
                        TabNavComponent,
                        BlockchainProofsComponent,
                        PeopleTechComponent,
                        MainViewComponent,
                        BlockchainProofsCardComponent,
                        DataSourcesComponent,
                        PeopleTechCardComponent
                    ],
                    exports: [
                        TabNavComponent,
                        BlockchainProofsComponent,
                        PeopleTechComponent
                    ]
                },] },
    ];
    return EcomBlockchainUiModule;
}());
export { EcomBlockchainUiModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNvbS1ibG9ja2NoYWluLXVpLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Vjb20tYmxvY2tjaGFpbi11aS8iLCJzb3VyY2VzIjpbImxpYi9lY29tLWJsb2NrY2hhaW4tdWkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDckUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDckcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFFbkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDdEYsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sNkVBQTZFLENBQUM7QUFDNUgsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDL0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0saUVBQWlFLENBQUM7QUFFMUcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7OztnQkFFcEUsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxjQUFjO3dCQUNkLFlBQVk7d0JBQ1osZ0JBQWdCO3FCQUNqQjtvQkFFRCxZQUFZLEVBQUU7d0JBQ1osZUFBZTt3QkFDZix5QkFBeUI7d0JBQ3pCLG1CQUFtQjt3QkFDbkIsaUJBQWlCO3dCQUNqQiw2QkFBNkI7d0JBQzdCLG9CQUFvQjt3QkFDcEIsdUJBQXVCO3FCQUN4QjtvQkFFRCxPQUFPLEVBQUU7d0JBQ1AsZUFBZTt3QkFDZix5QkFBeUI7d0JBQ3pCLG1CQUFtQjtxQkFDcEI7aUJBQ0Y7O2lDQXJDRDs7U0FzQ2Esc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuXHJcbmltcG9ydCB7IFRhYk5hdkNvbXBvbmVudCB9IGZyb20gXCIuL3NoYXJlZC90YWItbmF2L3RhYi1uYXYuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEJsb2NrY2hhaW5Qcm9vZnNDb21wb25lbnQgfSBmcm9tIFwiLi9mZWF0dXJlcy9ibG9ja2NoYWluLXByb29mcy9ibG9ja2NoYWluLXByb29mcy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUGVvcGxlVGVjaENvbXBvbmVudCB9IGZyb20gXCIuL2ZlYXR1cmVzL3Blb3BsZS10ZWNoL3Blb3BsZS10ZWNoLmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0IHsgTWFpblZpZXdDb21wb25lbnQgfSBmcm9tIFwiLi9mZWF0dXJlcy9vdmVydmlldy9tYWluLXZpZXcvbWFpbi12aWV3LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBCbG9ja2NoYWluUHJvb2ZzQ2FyZENvbXBvbmVudCB9IGZyb20gXCIuL2ZlYXR1cmVzL292ZXJ2aWV3L2Jsb2NrY2hhaW4tcHJvb2ZzLWNhcmQvYmxvY2tjaGFpbi1wcm9vZnMtY2FyZC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRGF0YVNvdXJjZXNDb21wb25lbnQgfSBmcm9tIFwiLi9mZWF0dXJlcy9vdmVydmlldy9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQZW9wbGVUZWNoQ2FyZENvbXBvbmVudCB9IGZyb20gXCIuL2ZlYXR1cmVzL292ZXJ2aWV3L3Blb3BsZS10ZWNoLWNhcmQvcGVvcGxlLXRlY2gtY2FyZC5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IE92ZXJ2aWV3TW9kdWxlIH0gZnJvbSBcIi4vZmVhdHVyZXMvb3ZlcnZpZXcvb3ZlcnZpZXcubW9kdWxlXCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIE92ZXJ2aWV3TW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgSHR0cENsaWVudE1vZHVsZSxcclxuICBdLFxyXG5cclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFRhYk5hdkNvbXBvbmVudCxcclxuICAgIEJsb2NrY2hhaW5Qcm9vZnNDb21wb25lbnQsXHJcbiAgICBQZW9wbGVUZWNoQ29tcG9uZW50LFxyXG4gICAgTWFpblZpZXdDb21wb25lbnQsXHJcbiAgICBCbG9ja2NoYWluUHJvb2ZzQ2FyZENvbXBvbmVudCxcclxuICAgIERhdGFTb3VyY2VzQ29tcG9uZW50LFxyXG4gICAgUGVvcGxlVGVjaENhcmRDb21wb25lbnRcclxuICBdLFxyXG5cclxuICBleHBvcnRzOiBbXHJcbiAgICBUYWJOYXZDb21wb25lbnQsXHJcbiAgICBCbG9ja2NoYWluUHJvb2ZzQ29tcG9uZW50LFxyXG4gICAgUGVvcGxlVGVjaENvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEVjb21CbG9ja2NoYWluVWlNb2R1bGUge31cclxuIl19