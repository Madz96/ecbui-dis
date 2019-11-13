import { OnInit } from "@angular/core";
import { NavigationService } from "../../../core/services/navigation/navigation.service";
import { DataService } from "../../../core/services/data/data.service";
export declare class BlockchainProofsCardComponent implements OnInit {
    private navigationService;
    private dataService;
    navStatus: string;
    proofs: any[];
    constructor(navigationService: NavigationService, dataService: DataService);
    ngOnInit(): void;
    changeToBCProofs(): void;
}
