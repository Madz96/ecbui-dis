import { OnInit, OnDestroy } from "@angular/core";
import { ApiCallsService } from "../../core/api/api-calls.service";
import { StorageService } from "../../core/services/storage/storage.service";
import { DataService } from '../../core/services/data/data.service';
export declare class PeopleTechComponent implements OnInit, OnDestroy {
    private userService;
    private storageService;
    private dataService;
    users: any;
    userFullName: string;
    userType: string;
    techType: string;
    _body: any[];
    constructor(userService: ApiCallsService, storageService: StorageService, dataService: DataService);
    ngOnInit(): void;
    setBody(): void;
    setTechType(): void;
    ngOnDestroy(): void;
}
