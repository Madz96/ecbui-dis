import { Subject } from "rxjs";
export declare class NavigationService {
    navStatus: String;
    navMenuStatus: Subject<any>;
    constructor();
    changeToOverview(): void;
    changeToBCProofs(): void;
    changeToPeoTech(): void;
    getNavigationValue(): String;
}
