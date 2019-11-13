import { OnInit } from "@angular/core";
import { ApiCallsService } from "../../../core/api/api-calls.service";
import { NavigationService } from "../../../core/services/navigation/navigation.service";
import { DataService } from "../../../core/services/data/data.service";
export declare class PeopleTechCardComponent implements OnInit {
    private apiService;
    private navigationService;
    private dataService;
    users: any[];
    userFullName: string;
    userType: string;
    constructor(apiService: ApiCallsService, navigationService: NavigationService, dataService: DataService);
    ngOnInit(): void;
    onNavigateToPeopleTech(): void;
}
