import { OnInit } from "@angular/core";
import { ApiCallsService } from "../../core/api/api-calls.service";
import { DataService } from '../../core/services/data/data.service';
export declare class BlockchainProofsComponent implements OnInit {
    private api;
    private dataService;
    proofs: any;
    tdpid: any[];
    constructor(api: ApiCallsService, dataService: DataService);
    ngOnInit(): void;
    copyTransactionID(transactionHash: string): void;
}
