import { OnInit } from "@angular/core";
import { NavigationService } from "../../../core/services/navigation/navigation.service";
export declare class DataSourcesComponent implements OnInit {
    private navigationService;
    navStatus: string;
    constructor(navigationService: NavigationService);
    ngOnInit(): void;
    changeToPeoTech(): void;
}
