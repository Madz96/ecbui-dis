import { OnInit, OnDestroy } from "@angular/core";
import { NavigationService } from "../../core/services/navigation/navigation.service";
import { DataService } from "../../core/services/data/data.service";
import { ApiCallsService } from "../../core/api/api-calls.service";
import { Proof } from "../model/proof";
export declare class TabNavComponent implements OnInit, OnDestroy {
    private navigationService;
    private dataService;
    private apiService;
    data: any;
    navStatus: string;
    testData: any;
    proof: Proof;
    proofData: any;
    ids: any;
    constructor(navigationService: NavigationService, dataService: DataService, apiService: ApiCallsService);
    ngOnInit(): void;
    setUser(result: any): void;
    setProofs(result: any): void;
    changeToOverview(): void;
    changeToBCProofs(): void;
    changeToPeoTech(): void;
    setNavStatus(): void;
    ngOnDestroy(): void;
}
