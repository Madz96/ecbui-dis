import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
export declare class ApiCallsService {
    private _http;
    private proof;
    private user;
    /**
     * staging
     */
    private allUserDetailsURL;
    private gatewayUrl;
    constructor(_http: HttpClient);
    getTxnDetails(tdpId: any): Observable<Object>;
    getUsersDetails(usersDetails: any): Observable<Object>;
    /**
    ## Mock API to get some sample users
  
    */
    private allUsers;
    getAllUsers(): Observable<Object>;
}
