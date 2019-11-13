import { Subject } from "rxjs";
export declare class DataService {
    userUpdate: Subject<any>;
    proofUpdate: Subject<any>;
    templateData: any;
    users: any[];
    proofs: any[];
    addUserToList(user: any): void;
    addProofToList(proof: any): void;
    constructor();
}
