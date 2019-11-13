import { Injectable, Component, NgModule, Input, defineInjectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { uniq } from 'lodash';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NavigationService {
    constructor() {
        this.navMenuStatus = new Subject();
    }
    /**
     * @return {?}
     */
    changeToOverview() {
        this.navStatus = "overview";
        this.navMenuStatus.next(this.navStatus);
    }
    /**
     * @return {?}
     */
    changeToBCProofs() {
        this.navStatus = "proofs";
        this.navMenuStatus.next(this.navStatus);
    }
    /**
     * @return {?}
     */
    changeToPeoTech() {
        this.navStatus = "people";
        this.navMenuStatus.next(this.navStatus);
    }
    /**
     * @return {?}
     */
    getNavigationValue() {
        return this.navStatus;
    }
}
NavigationService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root"
            },] },
];
/** @nocollapse */
NavigationService.ctorParameters = () => [];
/** @nocollapse */ NavigationService.ngInjectableDef = defineInjectable({ factory: function NavigationService_Factory() { return new NavigationService(); }, token: NavigationService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DataService {
    constructor() {
        this.userUpdate = new Subject();
        this.proofUpdate = new Subject();
        this.users = [];
        this.proofs = [];
    }
    /**
     * @param {?} user
     * @return {?}
     */
    addUserToList(user) {
        this.users.push(user);
        this.userUpdate.next(this.users);
    }
    /**
     * @param {?} proof
     * @return {?}
     */
    addProofToList(proof) {
        this.proofs.push(proof);
        this.proofUpdate.next(this.proofs);
    }
}
DataService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root"
            },] },
];
/** @nocollapse */
DataService.ctorParameters = () => [];
/** @nocollapse */ DataService.ngInjectableDef = defineInjectable({ factory: function DataService_Factory() { return new DataService(); }, token: DataService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ApiCallsService {
    /**
     * @param {?} _http
     */
    constructor(_http) {
        this._http = _http;
        /**
         * staging
         */
        this.allUserDetailsURL = "https://admin.api.tracified.com/sign/getUsersDetails";
        this.gatewayUrl = "https://tracified-gateway.herokuapp.com/GetTransactionsForTDPs";
        /**
         * ## Mock API to get some sample users
         */
        this.allUsers = "http://www.mocky.io/v2/5d9db4f7320000500032988a";
    }
    /**
     * @param {?} tdpId
     * @return {?}
     */
    getTxnDetails(tdpId) {
        return this._http.post(this.gatewayUrl, tdpId);
    }
    /**
     * @param {?} usersDetails
     * @return {?}
     */
    getUsersDetails(usersDetails) {
        return this._http.post(this.allUserDetailsURL, usersDetails);
    }
    /**
     * @return {?}
     */
    getAllUsers() {
        return this._http.get(this.allUsers);
    }
}
ApiCallsService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root"
            },] },
];
/** @nocollapse */
ApiCallsService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ ApiCallsService.ngInjectableDef = defineInjectable({ factory: function ApiCallsService_Factory() { return new ApiCallsService(inject(HttpClient)); }, token: ApiCallsService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Proof {
    constructor() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TabNavComponent {
    /**
     * @param {?} navigationService
     * @param {?} dataService
     * @param {?} apiService
     */
    constructor(navigationService, dataService, apiService) {
        this.navigationService = navigationService;
        this.dataService = dataService;
        this.apiService = apiService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /**
             * Getting widget data from POS
             */
        this.dataService.templateData = JSON.parse(this.data);
        console.log("incoming data is " + this.data);
        /**
             * Getting user details form ADMIN endpoint
             */
        this.ids = uniq(this.dataService.templateData.userid);
        /** @type {?} */
        const usersDetails = {
            ids: this.ids
        };
        this.apiService.getUsersDetails(usersDetails).subscribe(results => {
            this.setUser(results);
            console.log("users are " + JSON.stringify(results));
        });
        /** *
         * Getting txn details from gateway
          @type {?} */
        const TDPID = {
            TdpID: this.dataService.templateData.tdpid
        };
        this.apiService.getTxnDetails(TDPID).subscribe(res => {
            this.setProofs(res);
            console.log("txn details: " + JSON.stringify(res));
        });
        this.changeToOverview();
        this.navigationService.navMenuStatus.subscribe(status => {
            this.navStatus = status;
        });
    }
    /**
     * @param {?} result
     * @return {?}
     */
    setUser(result) {
        this.dataService.users = [];
        result.forEach(element => {
            this.dataService.addUserToList(element);
            // this.dataService.users.push(element);
        });
        // console.log('new set' + this.users);
    }
    /**
     * @param {?} result
     * @return {?}
     */
    setProofs(result) {
        /** @type {?} */
        var allProofData = [];
        this.dataService.proofs = [];
        this.proofData = this.dataService.templateData.proofs;
        /** @type {?} */
        var i = 0;
        for (let pfdata of this.proofData) {
            this.proof = new Proof();
            this.proof.name = pfdata.name;
            this.proof.description = pfdata.description;
            this.proof.Txnhash = result[i].Txnhash;
            this.proof.Url = result[i].Url;
            this.proof.Identifier = result[i].Identifier;
            this.proof.TdpId = result[i].TdpID;
            i++;
            allProofData.push(this.proof);
        }
        allProofData.forEach(proof => {
            this.dataService.addProofToList(proof);
        });
        // this.dataService.proofs = allProofData;
    }
    /**
     * @return {?}
     */
    changeToOverview() {
        this.navigationService.changeToOverview();
        this.setNavStatus();
    }
    /**
     * @return {?}
     */
    changeToBCProofs() {
        this.navigationService.changeToBCProofs();
        this.setNavStatus();
    }
    /**
     * @return {?}
     */
    changeToPeoTech() {
        this.navigationService.changeToPeoTech();
        this.setNavStatus();
    }
    /**
     * @return {?}
     */
    setNavStatus() {
        this.navStatus = this.navigationService.getNavigationValue().toString();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // this.dataService.users = []
    }
}
TabNavComponent.decorators = [
    { type: Component, args: [{
                selector: "ecbui-tab-nav",
                template: `<ul class="nav nav-tabs nav-fill">
  {{testData}}
  <li class="nav-item">
    <a class="nav-link" [ngClass]="{'nav-link active': navStatus == 'overview'}"
      (click)="changeToOverview()">Overview</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" [ngClass]="{'nav-link active': navStatus == 'proofs'}" (click)="changeToBCProofs()">Blockchain
      Proofs</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" [ngClass]="{'nav-link active': navStatus == 'people'}" (click)="changeToPeoTech()">People &
      Technologies</a>
  </li>
</ul>

<div *ngIf="navStatus == 'overview' ">
  <ecbui-main-view></ecbui-main-view>
</div>

<div *ngIf="navStatus == 'proofs' ">
  <ecbui-blockchain-proofs></ecbui-blockchain-proofs>
</div>

<div *ngIf="navStatus == 'people' ">
  <ecbui-people-tech></ecbui-people-tech>
</div>`,
                styles: [`*{color:#000}.nav-link.active,.nav-link.active:hover{background-color:#36464f;color:#fff;padding:16px}.nav-tabs .nav-item{margin-bottom:0}.nav-tabs .nav-link{border:none;border-radius:0}.nav-tabs .nav-item:hover{cursor:pointer}a{padding:16px!important;display:inline-block!important;width:100%}`]
            },] },
];
/** @nocollapse */
TabNavComponent.ctorParameters = () => [
    { type: NavigationService },
    { type: DataService },
    { type: ApiCallsService }
];
TabNavComponent.propDecorators = {
    data: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class BlockchainProofsComponent {
    /**
     * @param {?} api
     * @param {?} dataService
     */
    constructor(api, dataService) {
        this.api = api;
        this.dataService = dataService;
        this.tdpid = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // this.tdpid = this.dataService.templateData.tdpid;
        // this.proof = {} as Proof;
        // this.api.getProof(this.tdpid[0]).subscribe(result => {
        //   //this.setResult(result);
        //   this.proof = result;
        // });
        console.log('data for proofs ' + JSON.stringify(this.dataService.proofs));
        this.proofs = this.dataService.proofs;
    }
    /**
     * @param {?} transactionHash
     * @return {?}
     */
    copyTransactionID(transactionHash) {
        document.addEventListener('copy', (e) => {
            e.clipboardData.setData('text/plain', (transactionHash));
            e.preventDefault();
            document.removeEventListener('copy', null);
        });
        document.execCommand('copy');
    }
}
BlockchainProofsComponent.decorators = [
    { type: Component, args: [{
                selector: "ecbui-blockchain-proofs",
                template: `<div class="container">
  <div class="row header-row">
    <div class="col-md-2 head-col-left">Proof Type</div>
    <div class="col-md head-col-middle">Transaction ID</div>
    <div class="col-md head-col-right">Description</div>
  </div>
  <div class="row">
    <div class="card">
      <div class="card-body">
        <div class="row" *ngFor="let proof of proofs">
          <div class="col-md-2 col-left">
            <p>{{proof?.name}}</p>
          </div>
          <div class="col-md tid-col col-middle">
            <!-- <p>acccbc5f473e33052f65f09730c9a83df20c1d0cddbcbb00bd00f3f41e01b9dd</p> -->
            <a *ngIf="proof?.Url != 'Not Found'" href="{{proof?.Url}}" target="_blank" rel="noopener noreferrer">
              <p #Txnhash>{{proof?.Txnhash}}</p>
            </a>

            <p *ngIf="proof?.Url == 'Not Found'">{{proof?.Txnhash}}</p>
            <!-- <p>{{proof.Txnhash}}</p> -->
            <!-- <i class="far fa-clone"></i> -->
            <div class="copy-icon" *ngIf="proof?.Url != 'Not Found'" (click)="copyTransactionID(proof.Txnhash)">
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clone"
                class="svg-inline--fa fa-clone fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <path fill="currentColor"
                  d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z">
                </path>
              </svg>
            </div>
          </div>
          <div class="col-md col-right">
            <p>{{proof?.description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="row">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-2 col-left">
            <p>PoE</p>
          </div>
          <div class="col-md tid-col col-middle">
            <p>acccbc5f473e33052f65f09730c9a83df20c1d0cddbcbb00bd00f3f41e01b9dd</p>
            <i class="far fa-clone"></i>
          </div>
          <div class="col-md col-right">
            <p>Proof that a given data existed in the blockchain</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-2 col-left">
            <p>PoE</p>
          </div>
          <div class="col-md tid-col col-middle">
            <p>acccbc5f473e33052f65f09730c9a83df20c1d0cddbcbb00bd00f3f41e01b9dd</p>
            <i class="far fa-clone"></i>
          </div>
          <div class="col-md col-right">
            <p>Proof that a given data existed in the blockchain</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-2 col-left">
            <p>PoE</p>
          </div>
          <div class="col-md tid-col col-middle">
            <p>acccbc5f473e33052f65f09730c9a83df20c1d0cddbcbb00bd00f3f41e01b9dd</p>
            <i class="far fa-clone"></i>
          </div>
          <div class="col-md col-right">
            <p>Proof that a given data existed in the blockchain</p>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <!-- <div class="row">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-left">PoE</div>
          <div class="col-middle">
              <p></p>acccbc5f473e33052f65f09730c9a83df20c1d0cddbcbb00bd00f3f41e01b9dd
          </div>
          <div class="col-right">Proof that a given data existed in the blockchain.</div>
        </div>
      </div>
    </div>
  </div> -->
  <!-- <div class="row">
    <div class="card" style="width: 100%">
      <div class="card-body">
        <div class="row">
          <div class="col-left">PoG</div>
          <div class="col-middle"><a target="_blank"
              href="https://www.stellar.org/laboratory/#explorer?resource=operations&endpoint=for_transaction&values=eyJ0cmFuc2FjdGlvbiI6IjAzM2Q1NjMyNzQ5ODZlMDA2YmFmYTMyNTllYjM4M2I1NGU3ZTg3MzU1YTRhM2JhNWYzMjQ3ZWIyZDcwNzlhMmUifQ%3D%3D&network=public">
              033d563274986e006bafa3259eb383b54e7e87355a4a3ba5f3247eb2d7079a2e</a>
          </div>
          <div class="col-right">Proof of initialization of a tracebility item.</div>
        </div>
      </div>
    </div>
  </div> -->
</div>
`,
                styles: [`.row{padding:10px;text-align:left}.header-row{padding:35px 10px 5px}.card{width:100%}.card-body{padding:2px;text-align:left}.tid-col{max-width:260px}.tid-col p{display:inline-block;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.fa-clone{vertical-align:top;margin:3px}.fa-clone:hover{cursor:pointer;-webkit-transform:scale(1.1);transform:scale(1.1)}.copy-icon{width:24px;display:inline-block;vertical-align:top}.col-left,.col-middle,.col-right{color:#36464f}.col-middle,.col-right{font-weight:300}.head-col-left{width:27%;font-weight:400}.head-col-middle{max-width:260px;font-weight:400}.head-col-right{width:30%;font-weight:400}.container{background-color:#eee;max-width:100%!important}`]
            },] },
];
/** @nocollapse */
BlockchainProofsComponent.ctorParameters = () => [
    { type: ApiCallsService },
    { type: DataService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const STORAGE_KEY_CARD_SUBTITLES = "local_card_subtitles";
class StorageService {
    constructor() {
        this.cardSubtitles = [];
    }
    /**
     * @return {?}
     */
    getCardSubtitles() {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY_CARD_SUBTITLES));
    }
}
StorageService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root"
            },] },
];
/** @nocollapse */
StorageService.ctorParameters = () => [];
/** @nocollapse */ StorageService.ngInjectableDef = defineInjectable({ factory: function StorageService_Factory() { return new StorageService(); }, token: StorageService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PeopleTechComponent {
    /**
     * @param {?} userService
     * @param {?} storageService
     * @param {?} dataService
     */
    constructor(userService, storageService, dataService) {
        this.userService = userService;
        this.storageService = storageService;
        this.dataService = dataService;
        this.users = [];
        this._body = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.users = this.dataService.users;
        console.log('incoming users for user section : ' + JSON.stringify(this.users));
    }
    /**
     * @return {?}
     */
    setBody() {
        this.storageService.getCardSubtitles().forEach(subtitle => {
            console.log("subs ret by ecbui from sesh store");
            console.log(subtitle);
        });
    }
    /**
     * @return {?}
     */
    setTechType() {
        switch (this.userType) {
            case "FieldOfficer":
                this.techType = "Field Officer App";
                break;
            case "Admin":
                this.techType = "Admin Portal";
                break;
            default:
                this.techType = "null";
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // this.users = []
    }
}
PeopleTechComponent.decorators = [
    { type: Component, args: [{
                selector: "ecbui-people-tech",
                template: `<div class="container">
  <div class="row header-row">
    <div class="col-md ">Data Added by</div>
    <div class="col-md-2 ">Data Source</div>
    <div class="col-md-2 ">Trace Power</div>
    <div class="col-md ">Endorsement</div>
    <div class="col-md ">Badges</div>
  </div>
  <div class="row">
      <div class="card">
        <div class="card-body">
          <div class="row" *ngFor="let user of users">
            <div class="col-md">
                <div class="people-card">
                  <!-- <div class="people-card__image" *ngIf="user.imageUrl == 'none' ; else image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4lq60B8QUO-IJ7Ocv-5Nn77keApow2URygWAZRwdxYltUVb8jlQ" >
                  </div>
                  <ng-template #image>
                    <div class="people-card__image">
                      <img [src]="user.imageUrl" >
                    </div>
                  </ng-template>
                   -->
                    <div class="people-card__details">
                      <p class="people-card__details--name">{{ user.firstName}}  {{user.lastName}}</p>
                      <p class="people-card__details--type" *ngIf="user.type == 'FieldOfficer'">Field Officer</p>
                      <p class="people-card__details--type" *ngIf="user.type == 'TraceabilityAdvocate'">Traceabitily Admin</p>
                      <p class="people-card__details--type" *ngIf="user.type == 'Admin'">Admin</p>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
              <div class="col-data-source">
                 <img src="data:image/png;base64,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" >
              </div>
            </div>
            <div class="col-md-2 tracepower-col">
              <!-- <p>4</p> -->
              <p>N/A</p>
            </div>
            <div class="col-md endorsement-col">
              <!-- <div class="endorsement__image">
                <img src="https://images.pexels.com/photos/2765026/pexels-photo-2765026.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" >
                <img src="https://images.pexels.com/photos/2765026/pexels-photo-2765026.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" >
                <img src="https://images.pexels.com/photos/2765026/pexels-photo-2765026.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" >
                <img src="https://images.pexels.com/photos/2765026/pexels-photo-2765026.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" >
              </div> -->
              <p>N/A</p>
            </div>
            <div class="col-md badge-col">
              <!-- <p>- No Badges yet -</p> -->
              <p>N/A</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  <!-- <div class="row">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md">
                <div class="people-card">
                    <div class="people-card__image">
                        <img src="https://images.pexels.com/photos/2765026/pexels-photo-2765026.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" >
                    </div>
                    <div class="people-card__details">
                        <p class="people-card__details--name">John Doe</p>
                        <p class="people-card__details--type">Field Officer</p>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
              <div class="col-data-source">
                 <img src="data:image/png;base64,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" >
              </div>
            </div>
            <div class="col-md-2">
              <p>4</p>
            </div>
            <div class="col-md">
              <div class="endorsement__image">
                <img src="https://images.pexels.com/photos/2765026/pexels-photo-2765026.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" >
                <img src="https://images.pexels.com/photos/2765026/pexels-photo-2765026.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" >
                <img src="https://images.pexels.com/photos/2765026/pexels-photo-2765026.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" >
                <img src="https://images.pexels.com/photos/2765026/pexels-photo-2765026.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" >
              </div>
            </div>
            <div class="col-md badge-col">
             <img src="data:image/png;base64,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" >
             <img src="data:image/png;base64,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" >
             <img src="data:image/png;base64,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" >
             <img src="data:image/png;base64,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" >
            </div>
          </div>
        </div>
      </div>
    </div> -->
</div>`,
                styles: [`.container{background-color:#eee;max-width:100%!important}.row{padding:10px;text-align:left}.header-row{padding:35px 10px 5px}.col-md-2,.header-row .col-md{text-align:center;font-weight:400}.card{width:100%}.card-body{padding:2px}.card-body .col-md,.col-md-2{text-align:center}.people-card{display:inline-block;height:70px;padding:8px 0}.people-card__image img{width:25px;height:25px;border-radius:50%}.people-card div{display:inline-block;vertical-align:middle}.people-card__details p{margin:3px;font-size:1.1rem;font-weight:200;color:#949494}.people-card__details p:first-child{text-align:center;color:#36464f;font-weight:700}.col-data-source img{margin-top:15px;height:35px}.endorsement__image img{height:25px;width:25px;margin:0 3px 3px 0;border-radius:50%}.badge-col p,.endorsement-col,.tracepower-col{margin-top:20px}.badge-col img{height:35px;margin:0 5px 5px 0}`]
            },] },
];
/** @nocollapse */
PeopleTechComponent.ctorParameters = () => [
    { type: ApiCallsService },
    { type: StorageService },
    { type: DataService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MainViewComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
MainViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ecbui-main-view',
                template: `<div class='container'>
    <ecbui-blockchain-proofs-card></ecbui-blockchain-proofs-card>
    <ecbui-people-tech-card></ecbui-people-tech-card>
    <ecbui-data-sources></ecbui-data-sources>
</div>`,
                styles: [`*{color:#000}.container{background-color:#eee;max-width:100%!important;padding:0}`]
            },] },
];
/** @nocollapse */
MainViewComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class BlockchainProofsCardComponent {
    /**
     * @param {?} navigationService
     * @param {?} dataService
     */
    constructor(navigationService, dataService) {
        this.navigationService = navigationService;
        this.dataService = dataService;
        this.proofs = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.proofs = [];
        this.proofs = this.dataService.proofs;
        console.log("incoming proofs are " + this.proofs);
    }
    /**
     * @return {?}
     */
    changeToBCProofs() {
        this.navigationService.changeToBCProofs();
    }
}
BlockchainProofsCardComponent.decorators = [
    { type: Component, args: [{
                selector: "ecbui-blockchain-proofs-card",
                template: `<div class="container-fluid">
  <div class="row">
    <div class="card" style="width: 100%">
      <div class="card-body">
        <h5 class="card-title">
          <span class="eye-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <g transform="translate(0.46)">
                <g class="a" transform="translate(-0.46)">
                  <circle class="c" cx="16" cy="16" r="16" />
                  <circle class="d" cx="16" cy="16" r="15.5" />
                </g>
                <g transform="translate(5.102 10.034)">
                  <g transform="translate(0 0)">
                    <g transform="translate(0 0)">
                      <path class="b"
                        d="M21.872,116.151a13.762,13.762,0,0,0-4.674-3.827,13.485,13.485,0,0,0-5.91-1.426c-.057,0-.287,0-.344,0a13.486,13.486,0,0,0-5.91,1.426,13.761,13.761,0,0,0-4.674,3.827,1.7,1.7,0,0,0,0,2.094,13.761,13.761,0,0,0,4.674,3.827,13.485,13.485,0,0,0,5.91,1.426c.057,0,.287,0,.344,0a13.486,13.486,0,0,0,5.91-1.426,13.761,13.761,0,0,0,4.674-3.827A1.7,1.7,0,0,0,21.872,116.151ZM5.437,121.263a12.852,12.852,0,0,1-4.365-3.574.8.8,0,0,1,0-.981,12.76,12.76,0,0,1,5.834-4.2,6.293,6.293,0,0,0,0,9.374A12.751,12.751,0,0,1,5.437,121.263Zm5.678,1.333a5.4,5.4,0,1,1,5.4-5.4A5.4,5.4,0,0,1,11.115,122.6Zm10.043-4.907a12.738,12.738,0,0,1-5.833,4.195,6.293,6.293,0,0,0,0-9.373,12.765,12.765,0,0,1,5.835,4.2A.8.8,0,0,1,21.159,117.689Z"
                        transform="translate(0.002 -110.897)" />
                    </g>
                  </g>
                  <g transform="translate(8.807 3.991)">
                    <path class="b"
                      d="M205.115,202.8a2.31,2.31,0,1,0,2.31,2.31A2.313,2.313,0,0,0,205.115,202.8Zm0,3.716a1.406,1.406,0,1,1,1.406-1.406A1.407,1.407,0,0,1,205.115,206.52Z"
                      transform="translate(-202.805 -202.804)" />
                  </g>
                </g>
              </g>
            </svg>
          </span>Blockchain Proofs</h5>
          <!-- <i class="fas fa-question-circle" ></i> -->
          <div class="q-circle">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="question-circle" class="svg-inline--fa fa-question-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
          </div>
       <div class="row proofs-row">
         <div class="col">
            <div class="btn" *ngFor="let proof of proofs" (click)="changeToBCProofs()">{{ proof.name }}</div>
         </div>
       </div>
      </div>
    </div>
  </div>
</div>`,
                styles: [`.row{padding:30px 30px 15px;text-align:left}.btn{background-color:#eee;width:165px;height:34px;border:0;margin-right:5px;color:#36464f;border-radius:4px;margin-bottom:5px}.btn:hover{background-color:#9d9d9d;color:#fff}.btn-container{padding-left:2.5rem}.card-title{display:inline-block;margin-right:.5rem;color:#36464f}.q-circle{width:15px;height:15px;display:inline-block;color:#949191}.fa-question-circle{color:#949191}.fa-question-circle:hover{cursor:pointer;color:#a0a0a0;transition:.5s ease-in-out}.proofs-row{padding:10px}.proofs-row .btn:hover{transition:.5s ease-in-out}.card-name{padding-top:30px}.card-body{text-align:left;box-shadow:1px 2px 4px 0 rgba(0,0,0,.1)}.eye-icon{display:inline-block;margin-right:15px;position:relative;bottom:2px}.a,.d{fill:none}.a,.b{stroke:#000}.b{stroke-width:.5px}.c{stroke:none}`]
            },] },
];
/** @nocollapse */
BlockchainProofsCardComponent.ctorParameters = () => [
    { type: NavigationService },
    { type: DataService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DataSourcesComponent {
    /**
     * @param {?} navigationService
     */
    constructor(navigationService) {
        this.navigationService = navigationService;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    changeToPeoTech() {
        this.navigationService.changeToPeoTech();
    }
}
DataSourcesComponent.decorators = [
    { type: Component, args: [{
                selector: "ecbui-data-sources",
                template: `<div class="container-fluid">
  <div class="row">
    <div class="card" style="width: 100%">
      <div class="card-body">
        <h5 class="card-title">
          <span class="data-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <g transform="translate(0.46)">
                <g transform="translate(6.594 7)">
                  <path
                    d="M120.79,113.59a5.2,5.2,0,1,0,5.2,5.2A5.21,5.21,0,0,0,120.79,113.59Zm-4.092,5.2a4.1,4.1,0,0,1,3.536-4.054v8.108a4.1,4.1,0,0,1-3.536-4.054Zm4.648,4.054V114.74a4.092,4.092,0,0,1,0,8.108Zm0,0"
                    transform="translate(-111.302 -109.38)" />
                  <path
                    d="M241.556,426a.556.556,0,0,0-.556.556v2.076a.556.556,0,1,0,1.112,0v-2.076A.556.556,0,0,0,241.556,426Zm0,0"
                    transform="translate(-232.068 -410.211)" />
                  <path d="M430.546,241h-2a.556.556,0,0,0,0,1.112h2a.556.556,0,0,0,0-1.112Zm0,0"
                    transform="translate(-412.126 -232.068)" />
                  <path
                    d="M3.114,241.556A.556.556,0,0,0,2.558,241h-2a.556.556,0,0,0,0,1.112h2A.556.556,0,0,0,3.114,241.556Zm0,0"
                    transform="translate(0 -232.068)" />
                  <path
                    d="M404.381,122.592a.554.554,0,0,0,.278-.075l1.7-.982a.556.556,0,1,0-.556-.963l-1.7.982a.556.556,0,0,0,.278,1.037Zm0,0"
                    transform="translate(-388.858 -116.033)" />
                  <path d="M35.136,334.078l-1.734,1a.556.556,0,1,0,.556.963l1.734-1a.556.556,0,0,0-.556-.963Zm0,0"
                    transform="translate(-31.896 -321.624)" />
                  <path
                    d="M123.179,401.541a.556.556,0,0,0-.759.2l-1,1.734a.556.556,0,1,0,.963.556l1-1.734A.556.556,0,0,0,123.179,401.541Zm0,0"
                    transform="translate(-116.847 -386.587)" />
                  <path d="M31.671,121.021l1.734,1a.556.556,0,0,0,.556-.963l-1.734-1a.556.556,0,0,0-.556.963Zm0,0"
                    transform="translate(-30.23 -115.537)" />
                  <path
                    d="M404.693,335.1l-1.765-1.019a.556.556,0,0,0-.556.963l1.765,1.019a.556.556,0,0,0,.556-.963Zm0,0"
                    transform="translate(-387.191 -321.628)" />
                  <path d="M334.687,401.753a.556.556,0,0,0-.963.556l1,1.733a.556.556,0,0,0,.963-.556Zm0,0"
                    transform="translate(-321.283 -386.595)" />
                  <path
                    d="M241.556,3.113a.556.556,0,0,0,.556-.556v-2a.556.556,0,0,0-1.112,0v2A.556.556,0,0,0,241.556,3.113Zm0,0"
                    transform="translate(-232.068)" />
                  <path
                    d="M333.923,34.524a.555.555,0,0,0,.759-.2l1-1.734a.556.556,0,1,0-.963-.556l-1,1.734A.556.556,0,0,0,333.923,34.524Zm0,0"
                    transform="translate(-321.279 -30.576)" />
                  <path d="M122.419,34.32a.556.556,0,1,0,.963-.556l-1-1.733a.556.556,0,1,0-.963.556Zm0,0"
                    transform="translate(-116.846 -30.575)" />
                </g>
                <g class="a" transform="translate(-0.46)">
                  <circle class="b" cx="16" cy="16" r="16" />
                  <circle class="c" cx="16" cy="16" r="15.5" />
                </g>
              </g>
            </svg>
          </span>Technology</h5>
          <!-- <i class="fas fa-question-circle"></i> -->
          <div class="q-circle">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="question-circle" class="svg-inline--fa fa-question-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
            </div>
          <div class="row datasource-row">
            <div class="col">
              <div class="btn" (click)="changeToPeoTech()"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABwCAYAAABB0R1NAAAABHNCSVQICAgIfAhkiAAACF1JREFUeJztnVtsFNcZx39nd9bg9dqsMWAIqNjY63IJ2BFJGgiITQmUm5QtOEhVJWKqtmpwHkpbCH2gMW0fSmgEDwmR0oeWqlGqxKFExQZqR6wpt5aYrBNhaAHblAV2ob57d33Z9fTBsmPwjL32zoyBzv/Jey5z/vPTzJnPM9/MEYwg9xpPls1ifUkWwiNknAgKRuoz7pLxyYIWIctHenpjn3iPH2kYrrlQq3hxQ6EbmTcEuLV3aaxk8CLYU3m01KtUrwjhxfWF+wX8WF9rxkuGA5VlpdsfLL8Pgtvtcdrs0slH4pAfq2R8PeHoC17vkZb+Isvg+sceAICgwGaXTg4usvb/sWrdpgMI4THe1ThIMD3HNS+97url430/6ZsEhcxJtT7Tpk5ho2cD+QsXkDMnyyirY9b1ugZqvrzEH9//kHA4rNpOFrxQebTUawWY45r/ewGKe7dq5Qre+s0vmTc3j8npTp1sa6vJ6U7mzc1jw9rVNDU3U1d/Q61pVt3V2kPCvcaTZbNK9UotVq1cwY7tr+nn1iDt2/82FZ9WKdb1xKLZFskqKc4D06ZOeSwAALz6g63Y7XbFOskqeSQh41GKFjZ6NmhqpD3WQUcsFHd7hzWFVKtDk7EdjhQ2vrSeP33w0ZA6IeORgElKHfMXLtDEQHusg4qmkzT2NI+674ykTFZnvECSSErYx/NLnlWEAEyyqMUFWl0FzrVeGBMAgDvdQc62XtDEh+r+CAosyjXa6UbnzcT6R/6jkRN16Q7BYU1JqH+SJfFTYSTpDiHPnptQ/ycd8zVyoi5J7wEWp+aTanXw7/C1Ufd90jGPrIlf08HV/dIdAkCePYc8e44RQ41Jup8Oj4JMCJgQABMCYEIATAiACQEwIQAmBMCEAJgQABMCYEIATAiACQEwIQAmBMCEAJgQAB3vMXZEQ5zwV3E68E9qmmpH3T8zeSq5aVksy3yGb83SN21KFwi+xkvsrt5HKKqeGzCSgpF7BCP3OBO8QGlDOa8v2kZumj65EZqfDr7GS/zkH3sSAvCgrrc1sP18CYHIXc22OViaQuiIhthdvU/LTQ4oFA1z3K+YgZewNIVQWl+m6REwWFtchRS5NuuybU3nhDMBbZ4gP6idi7axRsfJUVMI19tVc4PGpBTJzv7nSnSbEPtlWJyweuaKUbXPSZ1tCAAw4FlkimTnV4t3UJCxAIcthcMN5SP2yUmdzf4lJTikxB7rxytdj4Sc1Nl88M13KMjoS/0pynuZnNTZw/ZZPXMFv1u+TxGAPxKk6MwezX3qBkFpZxxSCq/nF5MiKWeSbXEVsiu/WLHOHwny/LFtnLt3WXOvukEIRu4pluemZfGK6+Uh5TsXbVO9BFYFqnmu/Ee09HRp6rFfukGoaapl7xcHFesKs9ezNPNpoG/OeG/Zm6qXwKP+02w8VUJ7tEcvq/rOCSf8XtUob1d+MUsznx72CvDuvz7klbN7icqynjb1vzq8+cVBctOyhuyoQ0rh14t3qvbbVf027147rrc9wKA4Yfv5Ejqi8Wezbj1TYhgAMAhCKBpm+/k9cYFYWVHMYf9nBrj6SoZFjNfbGnin9pBqfUc0xKK/fpfPmrQNveORobfXTvi9lNaXDSn3R4I8U/Z9boRbjbQzIE0hjBQNAhy8fAhf46WB3xcba3m27Ifc7myPa4wpExXz0ROSphDyM+LLjN9dvY9A5C5VgWo2nPw5oVgs7jGWT104Vnuq0hRCYfa6uNqFomGKz/2Cb596Y1QAki1WXps/NNpMVJpCmJ48jS2uwrjaNnc2MSPJNqrt/3T+JmYlZ47F2rDSfGIscm2O+95BZpKNyZJ15IbAkim57FiwJRFrqtLl6rArvzjuI2LWRBvJFtVXtrEKeDV3DcdXHtDK3hDpFjYXuTazZpab04ELnAkOf+/x65O6+Pt/h76Q587MZ3fB93Q5BQZL1/8dpidPozB7PYXZ6/UcJmGZzyIxIQAmBMCEAJgQABMCYEIATAiACQEwIQAmBMCEAJgQABMCYEIATAiACQEwIQAmBMCEAJgQABMCYEIATAiACQEY5glUWePfjPQxrlKFcLsrYKSPcZV5OmDQZ8fUNC1pCpKQCMcitETHJ2kLxgmCyz6HhSkLyLClD5Td6rpNdXsNwW7lxHA9ZfjpkGfPxe1cdh8AgJkTnmBtxiom24z/LLKhEBxWB8smfUO13iYk3M7lBjrqk6EQcu3ZWMXwOUoZtnQmP3CU6C1DIdgtyXG1S5eMPSUMhdDTG9+LG1E5qrOT+2UohEBPfO86B7qDOjv5SrJMqwUZxY+c3/pc+4jxZuct7owQiVa319DV26352Gr7I8BnQciKi8Lc8t3R3AhAZXMVLdE2xbrrkXouttfoMq7q/gi5wZrjmudUWtyi1d/GzIIZTJw0QVMzUTlGbegKzdFmJliSCMXC3O25x6mWs1wKXdF0rH613Gzj4vtfKtb19rJHuN0ep2SXGoQY+k1356w0VvxsKUn20eUgP0zqDvdQ9duztPiHHn2yTGtleanT2tBwpXOOa/5EIYYuddTZ1kVdVQOp01NJm6HNF/aN1K3PA1S9dZZwU0Styd66q7VeAX2r/qgdDf2yZyTzRMF0Jtj1/6x4ouoKd3PbFyDcqLrzyLJ8IxqOFXi9R1oGMqtXrt3ksVjEXwxx+TBIFk9VlH/kg0Gr/9Rfu3wlxzX3xv/FCkBy79aK8o8H3jm8L5Cvu3rZ9ziDkGVaZVn+TuWxw38eXD4kYqwoP/wHZPGUWhD1yEqmSiDcnx77+MiDVepvWwCr1m0sAksRgtF9BuMhkizzCRYOqC2OByNA6Jfb7XFak61uIcQjs2SaLMu+WCTmHbwGnJr+B36gc8CxSWd6AAAAAElFTkSuQmCC" ></div>
              <!-- <div class="btn" (click)="changeToPeoTech()"> <img src="data:image/png;base64,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" ></div>
              <div class="btn" (click)="changeToPeoTech()"><img src="data:image/png;base64,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" ></div>   -->
            </div>
          </div>       
      </div>
    </div>
  </div>
</div>`,
                styles: [`.row{text-align:left;padding:15px 30px 30px}.btn-container{padding-left:2.5rem}.card-title{display:inline-block;margin-right:.5rem;color:#36464f}.q-circle{width:15px;height:15px;display:inline-block;color:#949191}.fa-question-circle{color:#949191}.fa-question-circle:hover{cursor:pointer;color:#a0a0a0;transition:.5s ease-in-out}.datasource-row{padding:10px}.datasource-row .btn{background-color:#eee;width:100px;height:65px;border:0;margin:0 5px 5px 0;padding:12px;color:#36464f;border-radius:4px}.datasource-row .btn:hover{box-shadow:1px 1px 9px 0 rgba(35,35,35,.2);transition:.2s ease-in-out}.datasource-row img{height:40px}.card-body{text-align:left;box-shadow:1px 2px 4px 0 rgba(0,0,0,.1)}.data-icon{display:inline-block;margin-right:15px;position:relative;bottom:2px}.a,.c{fill:none}.a{stroke:#000}.b{stroke:none}`]
            },] },
];
/** @nocollapse */
DataSourcesComponent.ctorParameters = () => [
    { type: NavigationService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PeopleTechCardComponent {
    /**
     * @param {?} apiService
     * @param {?} navigationService
     * @param {?} dataService
     */
    constructor(apiService, navigationService, dataService) {
        this.apiService = apiService;
        this.navigationService = navigationService;
        this.dataService = dataService;
        this.users = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.users = [];
        this.users = this.dataService.users;
        console.log("incoming user are : " + this.users);
    }
    /**
     * @return {?}
     */
    onNavigateToPeopleTech() {
        this.navigationService.changeToPeoTech();
    }
}
PeopleTechCardComponent.decorators = [
    { type: Component, args: [{
                selector: "ecbui-people-tech-card",
                template: `<div class="container-fluid">
  <div class="row">
    <div class="card" style="width: 100%">
      <div class="card-body">
        <h5 class="card-title">
          <span class="people-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <g transform="translate(0.46)">
                <g class="a" transform="translate(-0.46)">
                  <circle class="b" cx="16" cy="16" r="16" />
                  <circle class="c" cx="16" cy="16" r="15.5" />
                </g>
                <g transform="translate(7.799 5.92)">
                  <path
                    d="M141.181,10.395h.128a3.686,3.686,0,0,0,2.816-1.218c1.538-1.734,1.282-4.706,1.254-4.99A4.076,4.076,0,0,0,143.442.563,4.442,4.442,0,0,0,141.293,0h-.068a4.449,4.449,0,0,0-2.149.547,4.078,4.078,0,0,0-1.962,3.639c-.028.284-.284,3.256,1.254,4.99A3.672,3.672,0,0,0,141.181,10.395Zm-3-6.108c0-.012,0-.024,0-.032.132-2.864,2.165-3.172,3.036-3.172h.048c1.079.024,2.912.463,3.036,3.172a.078.078,0,0,0,0,.032c0,.028.284,2.745-.987,4.175a2.618,2.618,0,0,1-2.057.855h-.04a2.61,2.61,0,0,1-2.053-.855C137.905,7.039,138.177,4.311,138.181,4.287Z"
                    transform="translate(-133.046)" />
                  <path
                    d="M52.481,264.212V264.2c0-.032,0-.064,0-.1-.024-.791-.076-2.641-1.81-3.232l-.04-.012a11.529,11.529,0,0,1-3.316-1.51.539.539,0,1,0-.619.883,12.439,12.439,0,0,0,3.647,1.666c.931.332,1.035,1.326,1.063,2.237a.8.8,0,0,0,0,.1,7.251,7.251,0,0,1-.084,1.234A14.7,14.7,0,0,1,44.28,267.1a14.786,14.786,0,0,1-7.047-1.642,6.865,6.865,0,0,1-.084-1.234c0-.032,0-.064,0-.1.028-.911.132-1.906,1.063-2.237a12.558,12.558,0,0,0,3.647-1.666.539.539,0,1,0-.619-.883,11.4,11.4,0,0,1-3.316,1.51l-.04.012c-1.734.6-1.786,2.445-1.81,3.232a.8.8,0,0,1,0,.1v.012a6.126,6.126,0,0,0,.2,1.81.512.512,0,0,0,.208.252,15.111,15.111,0,0,0,7.8,1.91,15.156,15.156,0,0,0,7.8-1.91.534.534,0,0,0,.208-.252A6.427,6.427,0,0,0,52.481,264.212Z"
                    transform="translate(-36.073 -248.887)" />
                </g>
              </g>
            </svg>
          </span>People</h5>
          <!-- <i class="fas fa-question-circle"></i> -->
          <div class="q-circle">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="question-circle" class="svg-inline--fa fa-question-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
            </div>
        <div class="row people-row">
          <div class="col">
              <div class="people-card" *ngFor="let user of users" (click)="onNavigateToPeopleTech()">
                  <div class="people-card__image" *ngIf="user.imageUrl == 'none' ; else image">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4lq60B8QUO-IJ7Ocv-5Nn77keApow2URygWAZRwdxYltUVb8jlQ" >
                  </div>
                  <ng-template #image>
                    <div class="people-card__image">
                      <img [src]="user.imageUrl" >
                  </div>
                  </ng-template>
                  
                  <div class="people-card__details">
                      <p class="people-card__details--name">{{ user.firstName}}  {{user.lastName}}</p>
                      <p class="people-card__details--type" *ngIf="user.type == 'FieldOfficer'">Field Officer</p>
                      <p class="people-card__details--type" *ngIf="user.type == 'TraceabilityAdvocate'">Traceabitily Admin</p>
                      <p class="people-card__details--type" *ngIf="user.type == 'Admin'">Admin</p>
                  </div>
                  <div class="people-card__navigation">
                      <div class="people-card__navigation--icon">
                          <!-- <i class="fa fa-angle-right"></i> -->
                          <div class="icon-angle-right">
                          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </div>
    </div>
  </div>
</div>`,
                styles: [`.row{padding:15px 30px;text-align:left}.card-body{text-align:left;box-shadow:1px 2px 4px 0 rgba(0,0,0,.1)}.card-title{display:inline-block;margin-right:.5rem;color:#36464f}.q-circle{width:15px;height:15px;display:inline-block;color:#949191}.fa-question-circle{color:#949191}.fa-question-circle:hover{cursor:pointer;color:#a0a0a0;transition:.5s ease-in-out}.people-row{padding:10px}.people-icon{display:inline-block;margin-right:15px;position:relative;bottom:2px}.people-card{display:inline-block;background:#f1efef;height:70px;padding:8px;margin-right:5px;margin-bottom:5px}.people-card:hover{box-shadow:.5px .5px 5px .2px rgba(35,35,35,.19);transition:.5s ease-in-out}.people-card__image img{width:45px;height:45px;border-radius:50%}.people-card div{display:inline-block;vertical-align:middle}.people-card__details{margin-left:16px}.people-card__details p{margin:3px;font-weight:400;color:#36464f}.people-card__details--name,.people-card__details--type{width:150px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.people-card__navigation{margin-left:11px}.people-card__navigation--icon{background:#fff;width:25px;height:25px;text-align:center;border-radius:50%}.icon-angle-right{display:inline-block;width:10px;vertical-align:top!important}.people-card__navigation--icon:hover{cursor:pointer}.fa-angle-right:hover{-webkit-transform:scale(1.1);transform:scale(1.1)}.a,.c{fill:none}.a{stroke:#000}.b{stroke:none}`]
            },] },
];
/** @nocollapse */
PeopleTechCardComponent.ctorParameters = () => [
    { type: ApiCallsService },
    { type: NavigationService },
    { type: DataService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class OverviewModule {
}
OverviewModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class EcomBlockchainUiModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { EcomBlockchainUiModule, OverviewModule, ApiCallsService, NavigationService, StorageService, DataService, TabNavComponent, BlockchainProofsComponent, PeopleTechComponent, MainViewComponent, BlockchainProofsCardComponent as ɵa, DataSourcesComponent as ɵb, PeopleTechCardComponent as ɵc };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNvbS1ibG9ja2NoYWluLXVpLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9lY29tLWJsb2NrY2hhaW4tdWkvbGliL2NvcmUvc2VydmljZXMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnNlcnZpY2UudHMiLCJuZzovL2Vjb20tYmxvY2tjaGFpbi11aS9saWIvY29yZS9zZXJ2aWNlcy9kYXRhL2RhdGEuc2VydmljZS50cyIsIm5nOi8vZWNvbS1ibG9ja2NoYWluLXVpL2xpYi9jb3JlL2FwaS9hcGktY2FsbHMuc2VydmljZS50cyIsIm5nOi8vZWNvbS1ibG9ja2NoYWluLXVpL2xpYi9zaGFyZWQvbW9kZWwvcHJvb2YudHMiLCJuZzovL2Vjb20tYmxvY2tjaGFpbi11aS9saWIvc2hhcmVkL3RhYi1uYXYvdGFiLW5hdi5jb21wb25lbnQudHMiLCJuZzovL2Vjb20tYmxvY2tjaGFpbi11aS9saWIvZmVhdHVyZXMvYmxvY2tjaGFpbi1wcm9vZnMvYmxvY2tjaGFpbi1wcm9vZnMuY29tcG9uZW50LnRzIiwibmc6Ly9lY29tLWJsb2NrY2hhaW4tdWkvbGliL2NvcmUvc2VydmljZXMvc3RvcmFnZS9zdG9yYWdlLnNlcnZpY2UudHMiLCJuZzovL2Vjb20tYmxvY2tjaGFpbi11aS9saWIvZmVhdHVyZXMvcGVvcGxlLXRlY2gvcGVvcGxlLXRlY2guY29tcG9uZW50LnRzIiwibmc6Ly9lY29tLWJsb2NrY2hhaW4tdWkvbGliL2ZlYXR1cmVzL292ZXJ2aWV3L21haW4tdmlldy9tYWluLXZpZXcuY29tcG9uZW50LnRzIiwibmc6Ly9lY29tLWJsb2NrY2hhaW4tdWkvbGliL2ZlYXR1cmVzL292ZXJ2aWV3L2Jsb2NrY2hhaW4tcHJvb2ZzLWNhcmQvYmxvY2tjaGFpbi1wcm9vZnMtY2FyZC5jb21wb25lbnQudHMiLCJuZzovL2Vjb20tYmxvY2tjaGFpbi11aS9saWIvZmVhdHVyZXMvb3ZlcnZpZXcvZGF0YS1zb3VyY2VzL2RhdGEtc291cmNlcy5jb21wb25lbnQudHMiLCJuZzovL2Vjb20tYmxvY2tjaGFpbi11aS9saWIvZmVhdHVyZXMvb3ZlcnZpZXcvcGVvcGxlLXRlY2gtY2FyZC9wZW9wbGUtdGVjaC1jYXJkLmNvbXBvbmVudC50cyIsIm5nOi8vZWNvbS1ibG9ja2NoYWluLXVpL2xpYi9mZWF0dXJlcy9vdmVydmlldy9vdmVydmlldy5tb2R1bGUudHMiLCJuZzovL2Vjb20tYmxvY2tjaGFpbi11aS9saWIvZWNvbS1ibG9ja2NoYWluLXVpLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gXCJyeGpzXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogXCJyb290XCJcclxufSlcclxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25TZXJ2aWNlIHtcclxuICBuYXZTdGF0dXM6IFN0cmluZztcclxuICBwdWJsaWMgbmF2TWVudVN0YXR1cyA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBjaGFuZ2VUb092ZXJ2aWV3KCkge1xyXG4gICAgdGhpcy5uYXZTdGF0dXMgPSBcIm92ZXJ2aWV3XCI7XHJcbiAgICB0aGlzLm5hdk1lbnVTdGF0dXMubmV4dCh0aGlzLm5hdlN0YXR1cyk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VUb0JDUHJvb2ZzKCkge1xyXG4gICAgdGhpcy5uYXZTdGF0dXMgPSBcInByb29mc1wiO1xyXG4gICAgdGhpcy5uYXZNZW51U3RhdHVzLm5leHQodGhpcy5uYXZTdGF0dXMpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlVG9QZW9UZWNoKCkge1xyXG4gICAgdGhpcy5uYXZTdGF0dXMgPSBcInBlb3BsZVwiO1xyXG4gICAgdGhpcy5uYXZNZW51U3RhdHVzLm5leHQodGhpcy5uYXZTdGF0dXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TmF2aWdhdGlvblZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubmF2U3RhdHVzO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gXCJyeGpzXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogXCJyb290XCJcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFTZXJ2aWNlIHtcclxuICBwdWJsaWMgdXNlclVwZGF0ZSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICBwdWJsaWMgcHJvb2ZVcGRhdGUgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG4gIHRlbXBsYXRlRGF0YTtcclxuICB1c2VycyA9IFtdO1xyXG4gIHByb29mcyA9IFtdO1xyXG5cclxuICBhZGRVc2VyVG9MaXN0KHVzZXIpIHtcclxuICAgIHRoaXMudXNlcnMucHVzaCh1c2VyKTtcclxuICAgIHRoaXMudXNlclVwZGF0ZS5uZXh0KHRoaXMudXNlcnMpO1xyXG4gIH1cclxuXHJcbiAgYWRkUHJvb2ZUb0xpc3QocHJvb2YpIHtcclxuICAgIHRoaXMucHJvb2ZzLnB1c2gocHJvb2YpO1xyXG4gICAgdGhpcy5wcm9vZlVwZGF0ZS5uZXh0KHRoaXMucHJvb2ZzKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7IFByb29mIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9tb2RlbC9wcm9vZlwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9tb2RlbC91c2VyXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogXCJyb290XCJcclxufSlcclxuZXhwb3J0IGNsYXNzIEFwaUNhbGxzU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBwcm9vZjogUHJvb2Y7XHJcbiAgcHJpdmF0ZSB1c2VyOiBVc2VyO1xyXG5cclxuICAvLyBwcml2YXRlIHVzZXJEZXRhaWxzVVJMID1cclxuICAvLyAgIFwiaHR0cHM6Ly9zdGFnaW5nLmFkbWluLmFwaS50cmFjaWZpZWQuY29tL3NpZ24vZ2V0VXNlckRldGFpbHMvODNmMWI4ODAtNjcxZC0xMWU5LWIyZjQtMGI4MjAyYmUwYjRmXCI7XHJcblxyXG4gIC8qKlxyXG4gICAqIHN0YWdpbmdcclxuICAgKi9cclxuICAvLyBwcml2YXRlIGFsbFVzZXJEZXRhaWxzVVJMID1cclxuICAvLyAgIFwiaHR0cHM6Ly9zdGFnaW5nLmFkbWluLmFwaS50cmFjaWZpZWQuY29tL3NpZ24vZ2V0VXNlcnNEZXRhaWxzXCI7XHJcblxyXG4gIHByaXZhdGUgYWxsVXNlckRldGFpbHNVUkwgPVxyXG4gICAgXCJodHRwczovL2FkbWluLmFwaS50cmFjaWZpZWQuY29tL3NpZ24vZ2V0VXNlcnNEZXRhaWxzXCI7XHJcblxyXG4gIC8vIHByaXZhdGUgYmxvY2tjaGFpblByb29mc1VSTCA9XHJcbiAgLy8gICBcImh0dHA6Ly90cmFjaWZpZWQtZ2F0ZXdheS5oZXJva3VhcHAuY29tL1RyYW5zYWN0aW9uSWQvXCI7XHJcblxyXG4gIHByaXZhdGUgZ2F0ZXdheVVybCA9XHJcbiAgICBcImh0dHBzOi8vdHJhY2lmaWVkLWdhdGV3YXkuaGVyb2t1YXBwLmNvbS9HZXRUcmFuc2FjdGlvbnNGb3JURFBzXCI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQpIHt9XHJcblxyXG4gIHB1YmxpYyBnZXRUeG5EZXRhaWxzKHRkcElkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KHRoaXMuZ2F0ZXdheVVybCwgdGRwSWQpO1xyXG4gIH1cclxuXHJcbiAgLy8gcHVibGljIGdldFByb29mKHRkcGlkKSB7XHJcbiAgLy8gICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5ibG9ja2NoYWluUHJvb2ZzVVJMK3RkcGlkKTtcclxuICAvLyB9XHJcblxyXG4gIC8vIHB1YmxpYyBnZXRVc2VyRGV0YWlscygpOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xyXG4gIC8vICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0PFVzZXJbXT4odGhpcy51c2VyRGV0YWlsc1VSTCk7XHJcbiAgLy8gfVxyXG5cclxuICBwdWJsaWMgZ2V0VXNlcnNEZXRhaWxzKHVzZXJzRGV0YWlsczogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KHRoaXMuYWxsVXNlckRldGFpbHNVUkwsIHVzZXJzRGV0YWlscyk7XHJcbiAgfVxyXG5cclxuICAvKiogXHJcbiAgIyMgTW9jayBBUEkgdG8gZ2V0IHNvbWUgc2FtcGxlIHVzZXJzXHJcblxyXG4gICovXHJcbiAgcHJpdmF0ZSBhbGxVc2VycyA9IFwiaHR0cDovL3d3dy5tb2NreS5pby92Mi81ZDlkYjRmNzMyMDAwMDUwMDAzMjk4OGFcIjtcclxuXHJcbiAgcHVibGljIGdldEFsbFVzZXJzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuYWxsVXNlcnMpO1xyXG4gIH1cclxuICAvKipcclxuICAgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICovXHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFByb29mIHtcclxuXHJcbiAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBwdWJsaWMgVHhuaGFzaDogc3RyaW5nO1xyXG4gIHB1YmxpYyBVcmw6IHN0cmluZztcclxuICBwdWJsaWMgSWRlbnRpZmllcjogc3RyaW5nO1xyXG4gIHB1YmxpYyBUZHBJZDogc3RyaW5nXHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VydmljZXMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VydmljZXMvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXBpQ2FsbHNTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvYXBpL2FwaS1jYWxscy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFByb29mIH0gZnJvbSBcIi4uL21vZGVsL3Byb29mXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiZWNidWktdGFiLW5hdlwiLFxyXG4gIHRlbXBsYXRlOiBgPHVsIGNsYXNzPVwibmF2IG5hdi10YWJzIG5hdi1maWxsXCI+XHJcbiAge3t0ZXN0RGF0YX19XHJcbiAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj5cclxuICAgIDxhIGNsYXNzPVwibmF2LWxpbmtcIiBbbmdDbGFzc109XCJ7J25hdi1saW5rIGFjdGl2ZSc6IG5hdlN0YXR1cyA9PSAnb3ZlcnZpZXcnfVwiXHJcbiAgICAgIChjbGljayk9XCJjaGFuZ2VUb092ZXJ2aWV3KClcIj5PdmVydmlldzwvYT5cclxuICA8L2xpPlxyXG4gIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+XHJcbiAgICA8YSBjbGFzcz1cIm5hdi1saW5rXCIgW25nQ2xhc3NdPVwieyduYXYtbGluayBhY3RpdmUnOiBuYXZTdGF0dXMgPT0gJ3Byb29mcyd9XCIgKGNsaWNrKT1cImNoYW5nZVRvQkNQcm9vZnMoKVwiPkJsb2NrY2hhaW5cclxuICAgICAgUHJvb2ZzPC9hPlxyXG4gIDwvbGk+XHJcbiAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj5cclxuICAgIDxhIGNsYXNzPVwibmF2LWxpbmtcIiBbbmdDbGFzc109XCJ7J25hdi1saW5rIGFjdGl2ZSc6IG5hdlN0YXR1cyA9PSAncGVvcGxlJ31cIiAoY2xpY2spPVwiY2hhbmdlVG9QZW9UZWNoKClcIj5QZW9wbGUgJlxyXG4gICAgICBUZWNobm9sb2dpZXM8L2E+XHJcbiAgPC9saT5cclxuPC91bD5cclxuXHJcbjxkaXYgKm5nSWY9XCJuYXZTdGF0dXMgPT0gJ292ZXJ2aWV3JyBcIj5cclxuICA8ZWNidWktbWFpbi12aWV3PjwvZWNidWktbWFpbi12aWV3PlxyXG48L2Rpdj5cclxuXHJcbjxkaXYgKm5nSWY9XCJuYXZTdGF0dXMgPT0gJ3Byb29mcycgXCI+XHJcbiAgPGVjYnVpLWJsb2NrY2hhaW4tcHJvb2ZzPjwvZWNidWktYmxvY2tjaGFpbi1wcm9vZnM+XHJcbjwvZGl2PlxyXG5cclxuPGRpdiAqbmdJZj1cIm5hdlN0YXR1cyA9PSAncGVvcGxlJyBcIj5cclxuICA8ZWNidWktcGVvcGxlLXRlY2g+PC9lY2J1aS1wZW9wbGUtdGVjaD5cclxuPC9kaXY+YCxcclxuICBzdHlsZXM6IFtgKntjb2xvcjojMDAwfS5uYXYtbGluay5hY3RpdmUsLm5hdi1saW5rLmFjdGl2ZTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiMzNjQ2NGY7Y29sb3I6I2ZmZjtwYWRkaW5nOjE2cHh9Lm5hdi10YWJzIC5uYXYtaXRlbXttYXJnaW4tYm90dG9tOjB9Lm5hdi10YWJzIC5uYXYtbGlua3tib3JkZXI6bm9uZTtib3JkZXItcmFkaXVzOjB9Lm5hdi10YWJzIC5uYXYtaXRlbTpob3ZlcntjdXJzb3I6cG9pbnRlcn1he3BhZGRpbmc6MTZweCFpbXBvcnRhbnQ7ZGlzcGxheTppbmxpbmUtYmxvY2shaW1wb3J0YW50O3dpZHRoOjEwMCV9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYk5hdkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBkYXRhOiBhbnk7XHJcbiAgbmF2U3RhdHVzOiBzdHJpbmc7XHJcbiAgdGVzdERhdGE6IGFueTtcclxuICBwcm9vZjogUHJvb2Y7XHJcbiAgcHJvb2ZEYXRhOiBhbnk7XHJcbiAgaWRzOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcclxuICAgIHByaXZhdGUgYXBpU2VydmljZTogQXBpQ2FsbHNTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIC8qKlxyXG4gICAgICogR2V0dGluZyB3aWRnZXQgZGF0YSBmcm9tIFBPU1xyXG4gICAgICovXHJcblxyXG4gICAgdGhpcy5kYXRhU2VydmljZS50ZW1wbGF0ZURhdGEgPSBKU09OLnBhcnNlKHRoaXMuZGF0YSk7XHJcbiAgICBjb25zb2xlLmxvZyhcImluY29taW5nIGRhdGEgaXMgXCIgKyB0aGlzLmRhdGEpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0dGluZyB1c2VyIGRldGFpbHMgZm9ybSBBRE1JTiBlbmRwb2ludFxyXG4gICAgICovXHJcbiAgICB0aGlzLmlkcyA9IF8udW5pcSh0aGlzLmRhdGFTZXJ2aWNlLnRlbXBsYXRlRGF0YS51c2VyaWQpO1xyXG4gICAgY29uc3QgdXNlcnNEZXRhaWxzID0ge1xyXG4gICAgICBpZHM6IHRoaXMuaWRzXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuYXBpU2VydmljZS5nZXRVc2Vyc0RldGFpbHModXNlcnNEZXRhaWxzKS5zdWJzY3JpYmUocmVzdWx0cyA9PiB7XHJcbiAgICAgIHRoaXMuc2V0VXNlcihyZXN1bHRzKTtcclxuICAgICAgY29uc29sZS5sb2coXCJ1c2VycyBhcmUgXCIgKyBKU09OLnN0cmluZ2lmeShyZXN1bHRzKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHRpbmcgdHhuIGRldGFpbHMgZnJvbSBnYXRld2F5XHJcbiAgICAgKi9cclxuICAgIGNvbnN0IFREUElEID0ge1xyXG4gICAgICBUZHBJRDogdGhpcy5kYXRhU2VydmljZS50ZW1wbGF0ZURhdGEudGRwaWRcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5hcGlTZXJ2aWNlLmdldFR4bkRldGFpbHMoVERQSUQpLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICB0aGlzLnNldFByb29mcyhyZXMpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcInR4biBkZXRhaWxzOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VUb092ZXJ2aWV3KCk7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdk1lbnVTdGF0dXMuc3Vic2NyaWJlKHN0YXR1cyA9PiB7XHJcbiAgICAgIHRoaXMubmF2U3RhdHVzID0gc3RhdHVzO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRVc2VyKHJlc3VsdDogYW55KSB7XHJcbiAgICB0aGlzLmRhdGFTZXJ2aWNlLnVzZXJzID0gW107XHJcbiAgICByZXN1bHQuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRVc2VyVG9MaXN0KGVsZW1lbnQpO1xyXG4gICAgICAvLyB0aGlzLmRhdGFTZXJ2aWNlLnVzZXJzLnB1c2goZWxlbWVudCk7XHJcbiAgICB9KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKCduZXcgc2V0JyArIHRoaXMudXNlcnMpO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJvb2ZzKHJlc3VsdDogYW55KSB7XHJcbiAgICB2YXIgYWxsUHJvb2ZEYXRhID0gW107XHJcbiAgICB0aGlzLmRhdGFTZXJ2aWNlLnByb29mcyA9IFtdO1xyXG5cclxuICAgIHRoaXMucHJvb2ZEYXRhID0gdGhpcy5kYXRhU2VydmljZS50ZW1wbGF0ZURhdGEucHJvb2ZzO1xyXG4gICAgdmFyIGkgPSAwO1xyXG4gICAgZm9yIChsZXQgcGZkYXRhIG9mIHRoaXMucHJvb2ZEYXRhKSB7XHJcbiAgICAgIHRoaXMucHJvb2YgPSBuZXcgUHJvb2YoKTtcclxuICAgICAgdGhpcy5wcm9vZi5uYW1lID0gcGZkYXRhLm5hbWU7XHJcbiAgICAgIHRoaXMucHJvb2YuZGVzY3JpcHRpb24gPSBwZmRhdGEuZGVzY3JpcHRpb247XHJcbiAgICAgIHRoaXMucHJvb2YuVHhuaGFzaCA9IHJlc3VsdFtpXS5UeG5oYXNoO1xyXG4gICAgICB0aGlzLnByb29mLlVybCA9IHJlc3VsdFtpXS5Vcmw7XHJcbiAgICAgIHRoaXMucHJvb2YuSWRlbnRpZmllciA9IHJlc3VsdFtpXS5JZGVudGlmaWVyO1xyXG4gICAgICB0aGlzLnByb29mLlRkcElkID0gcmVzdWx0W2ldLlRkcElEO1xyXG4gICAgICBpKys7XHJcbiAgICAgIGFsbFByb29mRGF0YS5wdXNoKHRoaXMucHJvb2YpO1xyXG4gICAgfVxyXG5cclxuICAgIGFsbFByb29mRGF0YS5mb3JFYWNoKHByb29mID0+IHtcclxuICAgICAgdGhpcy5kYXRhU2VydmljZS5hZGRQcm9vZlRvTGlzdChwcm9vZik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB0aGlzLmRhdGFTZXJ2aWNlLnByb29mcyA9IGFsbFByb29mRGF0YTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVRvT3ZlcnZpZXcoKSB7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmNoYW5nZVRvT3ZlcnZpZXcoKTtcclxuICAgIHRoaXMuc2V0TmF2U3RhdHVzKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VUb0JDUHJvb2ZzKCkge1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5jaGFuZ2VUb0JDUHJvb2ZzKCk7XHJcbiAgICB0aGlzLnNldE5hdlN0YXR1cygpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlVG9QZW9UZWNoKCkge1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5jaGFuZ2VUb1Blb1RlY2goKTtcclxuICAgIHRoaXMuc2V0TmF2U3RhdHVzKCk7XHJcbiAgfVxyXG5cclxuICBzZXROYXZTdGF0dXMoKSB7XHJcbiAgICB0aGlzLm5hdlN0YXR1cyA9IHRoaXMubmF2aWdhdGlvblNlcnZpY2UuZ2V0TmF2aWdhdGlvblZhbHVlKCkudG9TdHJpbmcoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgLy8gdGhpcy5kYXRhU2VydmljZS51c2VycyA9IFtdXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQXBpQ2FsbHNTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvYXBpL2FwaS1jYWxscy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFByb29mIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9tb2RlbC9wcm9vZlwiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvZGF0YS9kYXRhLnNlcnZpY2UnO1xyXG4vLyBpbXBvcnQge0NsaXBib2FyZH0gZnJvbSAndHMtY2xpcGJvYXJkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImVjYnVpLWJsb2NrY2hhaW4tcHJvb2ZzXCIsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgPGRpdiBjbGFzcz1cInJvdyBoZWFkZXItcm93XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTIgaGVhZC1jb2wtbGVmdFwiPlByb29mIFR5cGU8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQgaGVhZC1jb2wtbWlkZGxlXCI+VHJhbnNhY3Rpb24gSUQ8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQgaGVhZC1jb2wtcmlnaHRcIj5EZXNjcmlwdGlvbjwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCIgKm5nRm9yPVwibGV0IHByb29mIG9mIHByb29mc1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0yIGNvbC1sZWZ0XCI+XHJcbiAgICAgICAgICAgIDxwPnt7cHJvb2Y/Lm5hbWV9fTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZCB0aWQtY29sIGNvbC1taWRkbGVcIj5cclxuICAgICAgICAgICAgPCEtLSA8cD5hY2NjYmM1ZjQ3M2UzMzA1MmY2NWYwOTczMGM5YTgzZGYyMGMxZDBjZGRiY2JiMDBiZDAwZjNmNDFlMDFiOWRkPC9wPiAtLT5cclxuICAgICAgICAgICAgPGEgKm5nSWY9XCJwcm9vZj8uVXJsICE9ICdOb3QgRm91bmQnXCIgaHJlZj1cInt7cHJvb2Y/LlVybH19XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxyXG4gICAgICAgICAgICAgIDxwICNUeG5oYXNoPnt7cHJvb2Y/LlR4bmhhc2h9fTwvcD5cclxuICAgICAgICAgICAgPC9hPlxyXG5cclxuICAgICAgICAgICAgPHAgKm5nSWY9XCJwcm9vZj8uVXJsID09ICdOb3QgRm91bmQnXCI+e3twcm9vZj8uVHhuaGFzaH19PC9wPlxyXG4gICAgICAgICAgICA8IS0tIDxwPnt7cHJvb2YuVHhuaGFzaH19PC9wPiAtLT5cclxuICAgICAgICAgICAgPCEtLSA8aSBjbGFzcz1cImZhciBmYS1jbG9uZVwiPjwvaT4gLS0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb3B5LWljb25cIiAqbmdJZj1cInByb29mPy5VcmwgIT0gJ05vdCBGb3VuZCdcIiAoY2xpY2spPVwiY29weVRyYW5zYWN0aW9uSUQocHJvb2YuVHhuaGFzaClcIj5cclxuICAgICAgICAgICAgICA8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXJcIiBkYXRhLWljb249XCJjbG9uZVwiXHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInN2Zy1pbmxpbmUtLWZhIGZhLWNsb25lIGZhLXctMTZcIiByb2xlPVwiaW1nXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj5cclxuICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICAgICAgICAgICAgICBkPVwiTTQ2NCAwSDE0NGMtMjYuNTEgMC00OCAyMS40OS00OCA0OHY0OEg0OGMtMjYuNTEgMC00OCAyMS40OS00OCA0OHYzMjBjMCAyNi41MSAyMS40OSA0OCA0OCA0OGgzMjBjMjYuNTEgMCA0OC0yMS40OSA0OC00OHYtNDhoNDhjMjYuNTEgMCA0OC0yMS40OSA0OC00OFY0OGMwLTI2LjUxLTIxLjQ5LTQ4LTQ4LTQ4ek0zNjIgNDY0SDU0YTYgNiAwIDAgMS02LTZWMTUwYTYgNiAwIDAgMSA2LTZoNDJ2MjI0YzAgMjYuNTEgMjEuNDkgNDggNDggNDhoMjI0djQyYTYgNiAwIDAgMS02IDZ6bTk2LTk2SDE1MGE2IDYgMCAwIDEtNi02VjU0YTYgNiAwIDAgMSA2LTZoMzA4YTYgNiAwIDAgMSA2IDZ2MzA4YTYgNiAwIDAgMS02IDZ6XCI+XHJcbiAgICAgICAgICAgICAgICA8L3BhdGg+XHJcbiAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kIGNvbC1yaWdodFwiPlxyXG4gICAgICAgICAgICA8cD57e3Byb29mPy5kZXNjcmlwdGlvbn19PC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPCEtLSA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0yIGNvbC1sZWZ0XCI+XHJcbiAgICAgICAgICAgIDxwPlBvRTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZCB0aWQtY29sIGNvbC1taWRkbGVcIj5cclxuICAgICAgICAgICAgPHA+YWNjY2JjNWY0NzNlMzMwNTJmNjVmMDk3MzBjOWE4M2RmMjBjMWQwY2RkYmNiYjAwYmQwMGYzZjQxZTAxYjlkZDwvcD5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtY2xvbmVcIj48L2k+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQgY29sLXJpZ2h0XCI+XHJcbiAgICAgICAgICAgIDxwPlByb29mIHRoYXQgYSBnaXZlbiBkYXRhIGV4aXN0ZWQgaW4gdGhlIGJsb2NrY2hhaW48L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0yIGNvbC1sZWZ0XCI+XHJcbiAgICAgICAgICAgIDxwPlBvRTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZCB0aWQtY29sIGNvbC1taWRkbGVcIj5cclxuICAgICAgICAgICAgPHA+YWNjY2JjNWY0NzNlMzMwNTJmNjVmMDk3MzBjOWE4M2RmMjBjMWQwY2RkYmNiYjAwYmQwMGYzZjQxZTAxYjlkZDwvcD5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtY2xvbmVcIj48L2k+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQgY29sLXJpZ2h0XCI+XHJcbiAgICAgICAgICAgIDxwPlByb29mIHRoYXQgYSBnaXZlbiBkYXRhIGV4aXN0ZWQgaW4gdGhlIGJsb2NrY2hhaW48L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0yIGNvbC1sZWZ0XCI+XHJcbiAgICAgICAgICAgIDxwPlBvRTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZCB0aWQtY29sIGNvbC1taWRkbGVcIj5cclxuICAgICAgICAgICAgPHA+YWNjY2JjNWY0NzNlMzMwNTJmNjVmMDk3MzBjOWE4M2RmMjBjMWQwY2RkYmNiYjAwYmQwMGYzZjQxZTAxYjlkZDwvcD5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtY2xvbmVcIj48L2k+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQgY29sLXJpZ2h0XCI+XHJcbiAgICAgICAgICAgIDxwPlByb29mIHRoYXQgYSBnaXZlbiBkYXRhIGV4aXN0ZWQgaW4gdGhlIGJsb2NrY2hhaW48L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj4gLS0+XHJcbiAgPCEtLSA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZWZ0XCI+UG9FPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1pZGRsZVwiPlxyXG4gICAgICAgICAgICAgIDxwPjwvcD5hY2NjYmM1ZjQ3M2UzMzA1MmY2NWYwOTczMGM5YTgzZGYyMGMxZDBjZGRiY2JiMDBiZDAwZjNmNDFlMDFiOWRkXHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtcmlnaHRcIj5Qcm9vZiB0aGF0IGEgZ2l2ZW4gZGF0YSBleGlzdGVkIGluIHRoZSBibG9ja2NoYWluLjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PiAtLT5cclxuICA8IS0tIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjYXJkXCIgc3R5bGU9XCJ3aWR0aDogMTAwJVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZWZ0XCI+UG9HPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1pZGRsZVwiPjxhIHRhcmdldD1cIl9ibGFua1wiXHJcbiAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vd3d3LnN0ZWxsYXIub3JnL2xhYm9yYXRvcnkvI2V4cGxvcmVyP3Jlc291cmNlPW9wZXJhdGlvbnMmZW5kcG9pbnQ9Zm9yX3RyYW5zYWN0aW9uJnZhbHVlcz1leUowY21GdWMyRmpkR2x2YmlJNklqQXpNMlExTmpNeU56UTVPRFpsTURBMlltRm1ZVE15TlRsbFlqTTRNMkkxTkdVM1pUZzNNelUxWVRSaE0ySmhOV1l6TWpRM1pXSXlaRGN3TnpsaE1tVWlmUSUzRCUzRCZuZXR3b3JrPXB1YmxpY1wiPlxyXG4gICAgICAgICAgICAgIDAzM2Q1NjMyNzQ5ODZlMDA2YmFmYTMyNTllYjM4M2I1NGU3ZTg3MzU1YTRhM2JhNWYzMjQ3ZWIyZDcwNzlhMmU8L2E+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtcmlnaHRcIj5Qcm9vZiBvZiBpbml0aWFsaXphdGlvbiBvZiBhIHRyYWNlYmlsaXR5IGl0ZW0uPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+IC0tPlxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgLnJvd3twYWRkaW5nOjEwcHg7dGV4dC1hbGlnbjpsZWZ0fS5oZWFkZXItcm93e3BhZGRpbmc6MzVweCAxMHB4IDVweH0uY2FyZHt3aWR0aDoxMDAlfS5jYXJkLWJvZHl7cGFkZGluZzoycHg7dGV4dC1hbGlnbjpsZWZ0fS50aWQtY29se21heC13aWR0aDoyNjBweH0udGlkLWNvbCBwe2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjcwJTt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXN9LmZhLWNsb25le3ZlcnRpY2FsLWFsaWduOnRvcDttYXJnaW46M3B4fS5mYS1jbG9uZTpob3ZlcntjdXJzb3I6cG9pbnRlcjstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxLjEpO3RyYW5zZm9ybTpzY2FsZSgxLjEpfS5jb3B5LWljb257d2lkdGg6MjRweDtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjp0b3B9LmNvbC1sZWZ0LC5jb2wtbWlkZGxlLC5jb2wtcmlnaHR7Y29sb3I6IzM2NDY0Zn0uY29sLW1pZGRsZSwuY29sLXJpZ2h0e2ZvbnQtd2VpZ2h0OjMwMH0uaGVhZC1jb2wtbGVmdHt3aWR0aDoyNyU7Zm9udC13ZWlnaHQ6NDAwfS5oZWFkLWNvbC1taWRkbGV7bWF4LXdpZHRoOjI2MHB4O2ZvbnQtd2VpZ2h0OjQwMH0uaGVhZC1jb2wtcmlnaHR7d2lkdGg6MzAlO2ZvbnQtd2VpZ2h0OjQwMH0uY29udGFpbmVye2JhY2tncm91bmQtY29sb3I6I2VlZTttYXgtd2lkdGg6MTAwJSFpbXBvcnRhbnR9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJsb2NrY2hhaW5Qcm9vZnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIC8vIHByb29mOiBQcm9vZjtcclxuICBwcm9vZnM7XHJcbiAgdGRwaWQ6IGFueVtdID0gW107XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYXBpOiBBcGlDYWxsc1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZVxyXG4gICAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIC8vIHRoaXMudGRwaWQgPSB0aGlzLmRhdGFTZXJ2aWNlLnRlbXBsYXRlRGF0YS50ZHBpZDtcclxuICAgIC8vIHRoaXMucHJvb2YgPSB7fSBhcyBQcm9vZjtcclxuICAgIC8vIHRoaXMuYXBpLmdldFByb29mKHRoaXMudGRwaWRbMF0pLnN1YnNjcmliZShyZXN1bHQgPT4ge1xyXG4gICAgLy8gICAvL3RoaXMuc2V0UmVzdWx0KHJlc3VsdCk7XHJcbiAgICAvLyAgIHRoaXMucHJvb2YgPSByZXN1bHQ7XHJcbiAgICAvLyB9KTtcclxuICAgIGNvbnNvbGUubG9nKCdkYXRhIGZvciBwcm9vZnMgJyArIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YVNlcnZpY2UucHJvb2ZzKSlcclxuICAgIHRoaXMucHJvb2ZzID0gdGhpcy5kYXRhU2VydmljZS5wcm9vZnM7XHJcbiAgfVxyXG5cclxuICAvLyBvbkNvcHkoVHhuaGFzaCkge1xyXG4gIC8vICAgQ2xpcGJvYXJkLmNvcHkoVHhuaGFzaCk7XHJcbiAgLy8gICBjb25zb2xlLmxvZygnY29waWVkJylcclxuICAvLyB9XHJcblxyXG4gIC8vIHNldFJlc3VsdChyZXN1bHQ6IGFueSkge1xyXG4gIC8vICAgdGhpcy5wcm9vZiA9IHJlc3VsdDtcclxuICAvLyB9XHJcblxyXG4gIGNvcHlUcmFuc2FjdGlvbklEKHRyYW5zYWN0aW9uSGFzaDogc3RyaW5nKSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjb3B5JywgKGU6IENsaXBib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgIGUuY2xpcGJvYXJkRGF0YS5zZXREYXRhKCd0ZXh0L3BsYWluJywgKHRyYW5zYWN0aW9uSGFzaCkpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvcHknLCBudWxsKTtcclxuICAgIH0pO1xyXG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcclxuXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuY29uc3QgU1RPUkFHRV9LRVlfQ0FSRF9TVUJUSVRMRVMgPSBcImxvY2FsX2NhcmRfc3VidGl0bGVzXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogXCJyb290XCJcclxufSlcclxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VTZXJ2aWNlIHtcclxuICBwdWJsaWMgY2FyZFN1YnRpdGxlcyA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIHB1YmxpYyBnZXRDYXJkU3VidGl0bGVzKCkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWV9DQVJEX1NVQlRJVExFUykpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQXBpQ2FsbHNTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvYXBpL2FwaS1jYWxscy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL21vZGVsL3VzZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9zZXJ2aWNlcy9zdG9yYWdlL3N0b3JhZ2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvZGF0YS9kYXRhLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiZWNidWktcGVvcGxlLXRlY2hcIixcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICA8ZGl2IGNsYXNzPVwicm93IGhlYWRlci1yb3dcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQgXCI+RGF0YSBBZGRlZCBieTwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbC1tZC0yIFwiPkRhdGEgU291cmNlPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTIgXCI+VHJhY2UgUG93ZXI8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQgXCI+RW5kb3JzZW1lbnQ8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQgXCI+QmFkZ2VzPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIiAqbmdGb3I9XCJsZXQgdXNlciBvZiB1c2Vyc1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVvcGxlLWNhcmRcIj5cclxuICAgICAgICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwicGVvcGxlLWNhcmRfX2ltYWdlXCIgKm5nSWY9XCJ1c2VyLmltYWdlVXJsID09ICdub25lJyA7IGVsc2UgaW1hZ2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vZW5jcnlwdGVkLXRibjAuZ3N0YXRpYy5jb20vaW1hZ2VzP3E9dGJuOkFOZDlHY1I0bHE2MEI4UVVPLUlKN09jdi01Tm43N2tlQXBvdzJVUnlnV0FaUndkeFlsdFVWYjhqbFFcIiA+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2ltYWdlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW9wbGUtY2FyZF9faW1hZ2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxpbWcgW3NyY109XCJ1c2VyLmltYWdlVXJsXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICAgICAgICAgLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlb3BsZS1jYXJkX19kZXRhaWxzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInBlb3BsZS1jYXJkX19kZXRhaWxzLS1uYW1lXCI+e3sgdXNlci5maXJzdE5hbWV9fSAge3t1c2VyLmxhc3ROYW1lfX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInBlb3BsZS1jYXJkX19kZXRhaWxzLS10eXBlXCIgKm5nSWY9XCJ1c2VyLnR5cGUgPT0gJ0ZpZWxkT2ZmaWNlcidcIj5GaWVsZCBPZmZpY2VyPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwZW9wbGUtY2FyZF9fZGV0YWlscy0tdHlwZVwiICpuZ0lmPVwidXNlci50eXBlID09ICdUcmFjZWFiaWxpdHlBZHZvY2F0ZSdcIj5UcmFjZWFiaXRpbHkgQWRtaW48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInBlb3BsZS1jYXJkX19kZXRhaWxzLS10eXBlXCIgKm5nSWY9XCJ1c2VyLnR5cGUgPT0gJ0FkbWluJ1wiPkFkbWluPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTJcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWRhdGEtc291cmNlXCI+XHJcbiAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUVFQUFBQndDQVlBQUFCQjBSMU5BQUFBQkhOQ1NWUUlDQWdJZkFoa2lBQUFDRjFKUkVGVWVKenRuVnRzRk5jWngzOW5kOWJnOWRxc01XQUlxTmpZNjNJSjJCRkpHZ2lJVFFtVW01UXRPRWhWSldLcXRtcHdIa3BiQ0gyZ01XMGZTbWdFRHdtUjBvZVdxbEdxeEtGRXhRWnFSNndwdDVhWXJCTmhhQUhibEFWMm9iNTdkMzNaOWZUQnNtUHdqTDMyem95Qnp2L0pleTV6L3ZQVHpKblBNOS9NRVl3Zzl4cFBsczFpZlVrV3dpTmtuQWdLUnVvejdwTHh5WUlXSWN0SGVucGpuM2lQSDJrWXJybFFxM2h4UTZFYm1UY0V1TFYzYWF4azhDTFlVM20wMUt0VXJ3amh4ZldGK3dYOFdGOXJ4a3VHQTVWbHBkc2ZMTDhQZ3R2dGNkcnMwc2xINHBBZnEyUjhQZUhvQzE3dmtaYitJc3ZnK3NjZUFJQ2d3R2FYVGc0dXN2Yi9zV3JkcGdNSTRUSGUxVGhJTUQzSE5TKzk3dXJsNDMwLzZac0VoY3hKdFQ3VHBrNWhvMmNEK1FzWGtETW55eWlyWTliMXVnWnF2cnpFSDkvL2tIQTRyTnBPRnJ4UWViVFVhd1dZNDVyL2V3R0tlN2RxNVFyZStzMHZtVGMzajhucFRwMXNhNnZKNlU3bXpjMWp3OXJWTkRVM1UxZC9RNjFwVnQzVjJrUEN2Y2FUWmJOSzlVb3RWcTFjd1k3dHIrbm4xaUR0Mi84MkZaOVdLZGIxeEtMWkZza3FLYzREMDZaT2VTd0FBTHo2ZzYzWTdYYkZPc2txZVNRaDQxR0tGalo2Tm1ocXBEM1dRVWNzRkhkN2h6V0ZWS3REazdFZGpoUTJ2clNlUDMzdzBaQTZJZU9SZ0VsS0hmTVhMdERFUUh1c2c0cW1relQyTkkrNjc0eWtURlpudkVDU1NFcll4L05MbmxXRUFFeXlxTVVGV2wwRnpyVmVHQk1BZ0R2ZFFjNjJYdERFaCtyK0NBb3N5alhhNlVibnpjVDZSLzZqa1JOMTZRN0JZVTFKcUgrU0pmRlRZU1RwRGlIUG5wdFEveWNkOHpWeW9pNUo3d0VXcCthVGFuWHc3L0MxVWZkOTBqR1BySWxmMDhIVi9kSWRBa0NlUFljOGU0NFJRNDFKdXA4T2o0Sk1DSmdRQUJNQ1lFSUFUQWlBQ1FFd0lRQW1CTUNFQUpnUUFCTUNZRUlBVEFpQUNRRXdJUUFtQk1DRUFKZ1FBQjN2TVhaRVE1endWM0U2OEU5cW1tcEgzVDh6ZVNxNWFWa3N5M3lHYjgzU04yMUtGd2kreGt2c3J0NUhLS3FlR3pDU2dwRjdCQ1AzT0JPOFFHbERPYTh2MmtadW1qNjVFWnFmRHI3R1MvemtIM3NTQXZDZ3JyYzFzUDE4Q1lISVhjMjJPVmlhUXVpSWh0aGR2VS9MVFE0b0ZBMXozSytZZ1pld05JVlFXbCttNlJFd1dGdGNoUlM1TnV1eWJVM25oRE1CYlo0Z1A2aWRpN2F4UnNmSlVWTUkxOXRWYzRQR3BCVEp6djduU25TYkVQdGxXSnl3ZXVhS1ViWFBTWjF0Q0FBdzRGbGtpbVRuVjR0M1VKQ3hBSWN0aGNNTjVTUDJ5VW1kemY0bEpUaWt4QjdyeHl0ZGo0U2MxTmw4OE0xM0tNam9TLzBweW51Wm5OVFp3L1paUFhNRnYxdStUeEdBUHhLazZNd2V6WDNxQmtGcFp4eFNDcS9uRjVNaUtXZVNiWEVWc2l1L1dMSE9Id255L0xGdG5MdDNXWE92dWtFSVJ1NHBsdWVtWmZHSzYrVWg1VHNYYlZPOUJGWUZxbm11L0VlMDlIUnA2ckZmdWtHb2FhcGw3eGNIRmVzS3M5ZXpOUE5wb0cvT2VHL1ptNnFYd0tQKzAydzhWVUo3dEVjdnEvck9DU2Y4WHRVb2IxZCtNVXN6bng3MkN2RHV2ejdrbGJON2ljcXluamIxdnpxOCtjVkJjdE95aHV5b1EwcmgxNHQzcXZiYlZmMDI3MTQ3cnJjOXdLQTRZZnY1RWpxaThXZXpiajFUWWhnQU1BaENLQnBtKy9rOWNZRllXVkhNWWY5bkJyajZTb1pGak5mYkduaW45cEJxZlVjMHhLSy9mcGZQbXJRTnZlT1JvYmZYVHZpOWxOYVhEU24zUjRJOFUvWjlib1JiamJReklFMGhqQlFOQWh5OGZBaGY0NldCM3hjYmEzbTI3SWZjN215UGE0d3BFeFh6MFJPU3BoRHlNK0xMak45ZHZZOUE1QzVWZ1dvMm5QdzVvVmdzN2pHV1QxMDRWbnVxMGhSQ1lmYTZ1TnFGb21HS3ovMkNiNTk2WTFRQWtpMVdYcHMvTk5wTVZKcENtSjQ4alMydXdyamFObmMyTVNQSk5xcnQvM1QrSm1ZbFo0N0YyckRTZkdJc2NtMk8rOTVCWnBLTnlaSjE1SWJBa2ltNTdGaXdKUkZycXRMbDZyQXJ2emp1STJMV1JCdkpGdFZYdHJFS2VEVjNEY2RYSHRESzNoRHBGallYdVRhelpwYWIwNEVMbkFrT2YrL3g2NU82K1B0L2g3NlE1ODdNWjNmQjkzUTVCUVpMMS84ZHBpZFBvekI3UFlYWjYvVWNKbUdaenlJeElRQW1CTUNFQUpnUUFCTUNZRUlBVEFpQUNRRXdJUUFtQk1DRUFKZ1FBQk1DWUVJQVRBaUFDUUV3SVFBbUJNQ0VBSmdRQUJNQ1lFSUFUQWlBQ1FFWTVnbFVXZVBmalBReHJsS0ZjTHNyWUtTUGNaVjVPbURRWjhmVU5DMXBDcEtRQ01jaXRFVEhKMmtMeGdtQ3l6NkhoU2tMeUxDbEQ1VGQ2cnBOZFhzTndXN2x4SEE5WmZqcGtHZlB4ZTFjZGg4QWdKa1RubUJ0eGlvbTI0ei9MTEtoRUJ4V0I4c21mVU8xM2lZazNNN2xCanJxazZFUWN1M1pXTVh3T1VvWnRuUW1QM0NVNkMxRElkZ3R5WEcxUzVlTVBTVU1oZERURzkrTEcxRTVxck9UKzJVb2hFQlBmTzg2QjdxRE9qdjVTckpNcXdVWnhZK2MzL3BjKzRqeFp1Y3Q3b3dRaVZhMzE5RFYyNjM1MkdyN0k4Qm5RY2lLaThMYzh0M1IzQWhBWlhNVkxkRTJ4YnJya1hvdXR0Zm9NcTdxL2dpNXdacmptdWRVV3R5aTFkL0d6SUlaVEp3MFFWTXpVVGxHYmVnS3pkRm1KbGlTQ01YQzNPMjV4Nm1XczF3S1hkRjBySDYxM0d6ajR2dGZLdGIxOXJKSHVOMGVwMlNYR29RWStrMTM1NncwVnZ4c0tVbjIwZVVnUDB6cUR2ZFE5ZHV6dFBpSEhuMnlUR3RsZWFuVDJ0QndwWE9PYS81RUlZWXVkZFRaMWtWZFZRT3AwMU5KbTZITkYvYU4xSzNQQTFTOWRaWndVMFN0eWQ2NnE3VmVBWDJyL3FnZERmMnlaeVR6Uk1GMEp0ajEvNng0b3VvS2QzUGJGeURjcUxyenlMSjhJeHFPRlhpOVIxb0dNcXRYcnQza3NWakVYd3h4K1RCSUZrOVZsSC9rZzBHci85UmZ1M3dseHpYM3h2L0ZDa0J5NzlhSzhvOEgzam04TDVDdnUzclo5emlEa0dWYVpWbitUdVd4dzM4ZVhENGtZcXdvUC93SFpQR1VXaEQxeUVxbVNpRGNueDc3K01pRFZlcHZXd0NyMW0wc0Frc1JndEY5QnVNaGtpenpDUllPcUMyT0J5TkE2SmZiN1hGYWs2MXVJY1FqczJTYUxNdStXQ1RtSGJ3R25KcitCMzZnYzhDeFNXZDZBQUFBQUVsRlRrU3VRbUNDXCIgPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0yIHRyYWNlcG93ZXItY29sXCI+XHJcbiAgICAgICAgICAgICAgPCEtLSA8cD40PC9wPiAtLT5cclxuICAgICAgICAgICAgICA8cD5OL0E8L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kIGVuZG9yc2VtZW50LWNvbFwiPlxyXG4gICAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImVuZG9yc2VtZW50X19pbWFnZVwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL2ltYWdlcy5wZXhlbHMuY29tL3Bob3Rvcy8yNzY1MDI2L3BleGVscy1waG90by0yNzY1MDI2LmpwZWc/YXV0bz1jb21wcmVzcyZjcz10aW55c3JnYiZkcHI9MSZ3PTUwMFwiID5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9pbWFnZXMucGV4ZWxzLmNvbS9waG90b3MvMjc2NTAyNi9wZXhlbHMtcGhvdG8tMjc2NTAyNi5qcGVnP2F1dG89Y29tcHJlc3MmY3M9dGlueXNyZ2ImZHByPTEmdz01MDBcIiA+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vaW1hZ2VzLnBleGVscy5jb20vcGhvdG9zLzI3NjUwMjYvcGV4ZWxzLXBob3RvLTI3NjUwMjYuanBlZz9hdXRvPWNvbXByZXNzJmNzPXRpbnlzcmdiJmRwcj0xJnc9NTAwXCIgPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL2ltYWdlcy5wZXhlbHMuY29tL3Bob3Rvcy8yNzY1MDI2L3BleGVscy1waG90by0yNzY1MDI2LmpwZWc/YXV0bz1jb21wcmVzcyZjcz10aW55c3JnYiZkcHI9MSZ3PTUwMFwiID5cclxuICAgICAgICAgICAgICA8L2Rpdj4gLS0+XHJcbiAgICAgICAgICAgICAgPHA+Ti9BPC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZCBiYWRnZS1jb2xcIj5cclxuICAgICAgICAgICAgICA8IS0tIDxwPi0gTm8gQmFkZ2VzIHlldCAtPC9wPiAtLT5cclxuICAgICAgICAgICAgICA8cD5OL0E8L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gIDwhLS0gPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlb3BsZS1jYXJkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlb3BsZS1jYXJkX19pbWFnZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vaW1hZ2VzLnBleGVscy5jb20vcGhvdG9zLzI3NjUwMjYvcGV4ZWxzLXBob3RvLTI3NjUwMjYuanBlZz9hdXRvPWNvbXByZXNzJmNzPXRpbnlzcmdiJmRwcj0xJnc9NTAwXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW9wbGUtY2FyZF9fZGV0YWlsc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInBlb3BsZS1jYXJkX19kZXRhaWxzLS1uYW1lXCI+Sm9obiBEb2U8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicGVvcGxlLWNhcmRfX2RldGFpbHMtLXR5cGVcIj5GaWVsZCBPZmZpY2VyPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTJcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWRhdGEtc291cmNlXCI+XHJcbiAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUVFQUFBQndDQVlBQUFCQjBSMU5BQUFBQkhOQ1NWUUlDQWdJZkFoa2lBQUFDRjFKUkVGVWVKenRuVnRzRk5jWngzOW5kOWJnOWRxc01XQUlxTmpZNjNJSjJCRkpHZ2lJVFFtVW01UXRPRWhWSldLcXRtcHdIa3BiQ0gyZ01XMGZTbWdFRHdtUjBvZVdxbEdxeEtGRXhRWnFSNndwdDVhWXJCTmhhQUhibEFWMm9iNTdkMzNaOWZUQnNtUHdqTDMyem95Qnp2L0pleTV6L3ZQVHpKblBNOS9NRVl3Zzl4cFBsczFpZlVrV3dpTmtuQWdLUnVvejdwTHh5WUlXSWN0SGVucGpuM2lQSDJrWXJybFFxM2h4UTZFYm1UY0V1TFYzYWF4azhDTFlVM20wMUt0VXJ3amh4ZldGK3dYOFdGOXJ4a3VHQTVWbHBkc2ZMTDhQZ3R2dGNkcnMwc2xINHBBZnEyUjhQZUhvQzE3dmtaYitJc3ZnK3NjZUFJQ2d3R2FYVGc0dXN2Yi9zV3JkcGdNSTRUSGUxVGhJTUQzSE5TKzk3dXJsNDMwLzZac0VoY3hKdFQ3VHBrNWhvMmNEK1FzWGtETW55eWlyWTliMXVnWnF2cnpFSDkvL2tIQTRyTnBPRnJ4UWViVFVhd1dZNDVyL2V3R0tlN2RxNVFyZStzMHZtVGMzajhucFRwMXNhNnZKNlU3bXpjMWp3OXJWTkRVM1UxZC9RNjFwVnQzVjJrUEN2Y2FUWmJOSzlVb3RWcTFjd1k3dHIrbm4xaUR0Mi84MkZaOVdLZGIxeEtMWkZza3FLYzREMDZaT2VTd0FBTHo2ZzYzWTdYYkZPc2txZVNRaDQxR0tGalo2Tm1ocXBEM1dRVWNzRkhkN2h6V0ZWS3REazdFZGpoUTJ2clNlUDMzdzBaQTZJZU9SZ0VsS0hmTVhMdERFUUh1c2c0cW1relQyTkkrNjc0eWtURlpudkVDU1NFcll4L05MbmxXRUFFeXlxTVVGV2wwRnpyVmVHQk1BZ0R2ZFFjNjJYdERFaCtyK0NBb3N5alhhNlVibnpjVDZSLzZqa1JOMTZRN0JZVTFKcUgrU0pmRlRZU1RwRGlIUG5wdFEveWNkOHpWeW9pNUo3d0VXcCthVGFuWHc3L0MxVWZkOTBqR1BySWxmMDhIVi9kSWRBa0NlUFljOGU0NFJRNDFKdXA4T2o0Sk1DSmdRQUJNQ1lFSUFUQWlBQ1FFd0lRQW1CTUNFQUpnUUFCTUNZRUlBVEFpQUNRRXdJUUFtQk1DRUFKZ1FBQjN2TVhaRVE1endWM0U2OEU5cW1tcEgzVDh6ZVNxNWFWa3N5M3lHYjgzU04yMUtGd2kreGt2c3J0NUhLS3FlR3pDU2dwRjdCQ1AzT0JPOFFHbERPYTh2MmtadW1qNjVFWnFmRHI3R1MvemtIM3NTQXZDZ3JyYzFzUDE4Q1lISVhjMjJPVmlhUXVpSWh0aGR2VS9MVFE0b0ZBMXozSytZZ1pld05JVlFXbCttNlJFd1dGdGNoUlM1TnV1eWJVM25oRE1CYlo0Z1A2aWRpN2F4UnNmSlVWTUkxOXRWYzRQR3BCVEp6djduU25TYkVQdGxXSnl3ZXVhS1ViWFBTWjF0Q0FBdzRGbGtpbVRuVjR0M1VKQ3hBSWN0aGNNTjVTUDJ5VW1kemY0bEpUaWt4QjdyeHl0ZGo0U2MxTmw4OE0xM0tNam9TLzBweW51Wm5OVFp3L1paUFhNRnYxdStUeEdBUHhLazZNd2V6WDNxQmtGcFp4eFNDcS9uRjVNaUtXZVNiWEVWc2l1L1dMSE9Id255L0xGdG5MdDNXWE92dWtFSVJ1NHBsdWVtWmZHSzYrVWg1VHNYYlZPOUJGWUZxbm11L0VlMDlIUnA2ckZmdWtHb2FhcGw3eGNIRmVzS3M5ZXpOUE5wb0cvT2VHL1ptNnFYd0tQKzAydzhWVUo3dEVjdnEvck9DU2Y4WHRVb2IxZCtNVXN6bng3MkN2RHV2ejdrbGJON2ljcXluamIxdnpxOCtjVkJjdE95aHV5b1EwcmgxNHQzcXZiYlZmMDI3MTQ3cnJjOXdLQTRZZnY1RWpxaThXZXpiajFUWWhnQU1BaENLQnBtKy9rOWNZRllXVkhNWWY5bkJyajZTb1pGak5mYkduaW45cEJxZlVjMHhLSy9mcGZQbXJRTnZlT1JvYmZYVHZpOWxOYVhEU24zUjRJOFUvWjlib1JiamJReklFMGhqQlFOQWh5OGZBaGY0NldCM3hjYmEzbTI3SWZjN215UGE0d3BFeFh6MFJPU3BoRHlNK0xMak45ZHZZOUE1QzVWZ1dvMm5QdzVvVmdzN2pHV1QxMDRWbnVxMGhSQ1lmYTZ1TnFGb21HS3ovMkNiNTk2WTFRQWtpMVdYcHMvTk5wTVZKcENtSjQ4alMydXdyamFObmMyTVNQSk5xcnQvM1QrSm1ZbFo0N0YyckRTZkdJc2NtMk8rOTVCWnBLTnlaSjE1SWJBa2ltNTdGaXdKUkZycXRMbDZyQXJ2emp1STJMV1JCdkpGdFZYdHJFS2VEVjNEY2RYSHRESzNoRHBGallYdVRhelpwYWIwNEVMbkFrT2YrL3g2NU82K1B0L2g3NlE1ODdNWjNmQjkzUTVCUVpMMS84ZHBpZFBvekI3UFlYWjYvVWNKbUdaenlJeElRQW1CTUNFQUpnUUFCTUNZRUlBVEFpQUNRRXdJUUFtQk1DRUFKZ1FBQk1DWUVJQVRBaUFDUUV3SVFBbUJNQ0VBSmdRQUJNQ1lFSUFUQWlBQ1FFWTVnbFVXZVBmalBReHJsS0ZjTHNyWUtTUGNaVjVPbURRWjhmVU5DMXBDcEtRQ01jaXRFVEhKMmtMeGdtQ3l6NkhoU2tMeUxDbEQ1VGQ2cnBOZFhzTndXN2x4SEE5WmZqcGtHZlB4ZTFjZGg4QWdKa1RubUJ0eGlvbTI0ei9MTEtoRUJ4V0I4c21mVU8xM2lZazNNN2xCanJxazZFUWN1M1pXTVh3T1VvWnRuUW1QM0NVNkMxRElkZ3R5WEcxUzVlTVBTVU1oZERURzkrTEcxRTVxck9UKzJVb2hFQlBmTzg2QjdxRE9qdjVTckpNcXdVWnhZK2MzL3BjKzRqeFp1Y3Q3b3dRaVZhMzE5RFYyNjM1MkdyN0k4Qm5RY2lLaThMYzh0M1IzQWhBWlhNVkxkRTJ4YnJya1hvdXR0Zm9NcTdxL2dpNXdacmptdWRVV3R5aTFkL0d6SUlaVEp3MFFWTXpVVGxHYmVnS3pkRm1KbGlTQ01YQzNPMjV4Nm1XczF3S1hkRjBySDYxM0d6ajR2dGZLdGIxOXJKSHVOMGVwMlNYR29RWStrMTM1NncwVnZ4c0tVbjIwZVVnUDB6cUR2ZFE5ZHV6dFBpSEhuMnlUR3RsZWFuVDJ0QndwWE9PYS81RUlZWXVkZFRaMWtWZFZRT3AwMU5KbTZITkYvYU4xSzNQQTFTOWRaWndVMFN0eWQ2NnE3VmVBWDJyL3FnZERmMnlaeVR6Uk1GMEp0ajEvNng0b3VvS2QzUGJGeURjcUxyenlMSjhJeHFPRlhpOVIxb0dNcXRYcnQza3NWakVYd3h4K1RCSUZrOVZsSC9rZzBHci85UmZ1M3dseHpYM3h2L0ZDa0J5NzlhSzhvOEgzam04TDVDdnUzclo5emlEa0dWYVpWbitUdVd4dzM4ZVhENGtZcXdvUC93SFpQR1VXaEQxeUVxbVNpRGNueDc3K01pRFZlcHZXd0NyMW0wc0Frc1JndEY5QnVNaGtpenpDUllPcUMyT0J5TkE2SmZiN1hGYWs2MXVJY1FqczJTYUxNdStXQ1RtSGJ3R25KcitCMzZnYzhDeFNXZDZBQUFBQUVsRlRrU3VRbUNDXCIgPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0yXCI+XHJcbiAgICAgICAgICAgICAgPHA+NDwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWRcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZW5kb3JzZW1lbnRfX2ltYWdlXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vaW1hZ2VzLnBleGVscy5jb20vcGhvdG9zLzI3NjUwMjYvcGV4ZWxzLXBob3RvLTI3NjUwMjYuanBlZz9hdXRvPWNvbXByZXNzJmNzPXRpbnlzcmdiJmRwcj0xJnc9NTAwXCIgPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL2ltYWdlcy5wZXhlbHMuY29tL3Bob3Rvcy8yNzY1MDI2L3BleGVscy1waG90by0yNzY1MDI2LmpwZWc/YXV0bz1jb21wcmVzcyZjcz10aW55c3JnYiZkcHI9MSZ3PTUwMFwiID5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9pbWFnZXMucGV4ZWxzLmNvbS9waG90b3MvMjc2NTAyNi9wZXhlbHMtcGhvdG8tMjc2NTAyNi5qcGVnP2F1dG89Y29tcHJlc3MmY3M9dGlueXNyZ2ImZHByPTEmdz01MDBcIiA+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vaW1hZ2VzLnBleGVscy5jb20vcGhvdG9zLzI3NjUwMjYvcGV4ZWxzLXBob3RvLTI3NjUwMjYuanBlZz9hdXRvPWNvbXByZXNzJmNzPXRpbnlzcmdiJmRwcj0xJnc9NTAwXCIgPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZCBiYWRnZS1jb2xcIj5cclxuICAgICAgICAgICAgIDxpbWcgc3JjPVwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFFY0FBQUJsQ0FZQUFBQWYxUDRpQUFBQUJITkNTVlFJQ0FnSWZBaGtpQUFBQjRsSlJFRlVlSnp0blc5c0UrY1p3SC9uT0xienowbHNDQ0VGWXRJVXlCODZZQVhLWUcwUnFsb0ttYUpwazdxS1ZkMkhkcFBvUnFWOW9HT2lRNXUwTmRKV3BrYW8wenFwRVd0cFZhbGJ0VFlVRFcxS1ZkSVFHZ0tNa0FVQ0pLRUpDWUg4c2Iwa3huWjgreERzeEdDL2NjNTM4VzI5MzdkY1hqOTY3dWU3OSs2NTU3MUVBc2ovNDRHZFNLR1haYVFLQ2ZMNGlpTERxSVI4QWRuMDZzZ0xCejZXOHY1MG9GcVM1YittT2pHOU1TbEoyMDJTTE85TmRTSjZKQzBrN3pjaHkyV3BUa1NmeUJVbUpDazMxV25vRWtuS05hVTZCejFqeUJGZ3lCRmd5QkZneUJGZ3lCRmd5QkZneUJGZ3lCRmd5QkZneUJGZ3lCRmd5QkZneUJGZ3lCRmd5QkZneUJGZ3lCR2dLemxXMDJTcVU0aENWM0xxSGp5QjArSkxkUm9SektsT0FPQzNaVit3UHZjV0s3STgvR1BEMzdreW5zT2U5ZzMwK3JKU21wY3VqcHdXOXdKV1pIa0JpVVZXSHhPaHRKU0xBWjNJS2Nud1RQOGd5MlNhZ3FsTFpnYWF5akZKSWJZdjdKMTFuRGVZenBFK0Z3RE5iaWVOSXdVNDBtL0hIYi9XUHNRUzI1aHFlY1pEa3puSGJ2WlRrVFBLRXd2NzJGVjBoUmN2UE14SXdFTHphRUhNOGJVOTVRQU1CMjI4M2wyR041Z2VjMXhwcG9lRlZoKy9XZG5LVGIrVjE3b3F1T0hMNE9wRWpoYTdnWlQvNWk5a3RZTmFwRWthdi9FSlMyemprVzJIZTB2WWUvR2hwT0p1ZGZaelpNMW5VZHQydG16anROdVpWTng0YUhKYStlVTBMbmhuZEpsbG1ROXVMRXM2YnVOd0FiN1FkTXJEQVl0bVlrQWpPVXRzWXp6bUdJamE5cExyMzBuSC9lR3lTOWhNazRBTXNvd2ozVS8xb210Sng0MkhKcWRWbUsvbkR2RkdaUk5iUHQrT1gwNVRMVzdOeWhiY3dYUitmZVZycXNXTWhhWnlZR29TdlR4dVZ6V21JLzAyUVZuQ0U3U29HdmR1Tkw5RFZsc013SERBcW5yTVdPamlKbEN2SkMybnlEYU9SZEpYTmUzSzlLb1NKK25UYW4vcE9kcTllZFQyS0Y4OXQzZmRZenhWdklyVnprSUFybmxIT2RKNWhqKzBOZVB4ejYxS1YvTWlvSGhDZm5iSlpXcFd0a1p0MjN0eEhZZDdTeE9PWWJmWStHakhjeEVwZDNOK2FJQ3ErcnFFQkRrdFBwbzJIU1hIUEYyWHRiaWRWTFZzU3ppZnUxRjhXcjNkVjhMRTVQUTNNeHBJNSsyK2tqbkZlT2Z4cHlOaWFsb2JxS3F2bzZxK2pwcldCangrSDZ1ZGhYeTA0N21FWWczNWJad1lpUzVQRG5ZbHR4WlVzWnh2RmZTU2tUYjlMZG5OZmtybmNLNXZYdXhpOCtLcFluUFg4ZmVvYVcyZ3NiK2J4djV1YWxvYjJQbHhIUUNybllWODc0RTFzOGJMTVFkWW4zc3phdHNUQzY0bm5FOHNGTXZwR012bDI2MWJPZVBKNThSSUFkODVzeFZmS1BGemZNc2RNWTM5M1J6dDZiam45MjNEQTd6YmVSYUFIYTVWczhaTGwwSzgwTGFaMTdyS0NJUWtmdFQyTUg4WktFNDRuMWdvbnBBNy9qTlZPKzFwMzRBL1pLSm5qcFZ4V002Si91NjRZNjU1UndISXRkaG1qVGNjc05JMFVrRFRTQUh0M2p6cWJ5NmRVejZ4U1BwcTFUbW12MlhNYW9nQjR5WlFpT2ExMVV3MkwzWng2SkZxbHVVb2V6SEg3ZmV4citsWVpDN1Ntbms5Y3Q1NS9HbkZZbUJxN2puMGFEWDJCT1lnTlppMzFreWxvekN5VS90T0h1UDgwTUFzbjdpWDhEM1BhbWNoallLSlhDM21UVTZ1ZGZyYlBqODBNQzg3bHl6R2hDeEFWM0lxSFlWVU9tTFhXYWxBRisxZ2dFT1BWa2ZLaFBxZURyNS8vTDBVWjZTVEkyZHBkbDVVL2JTamVGV2s3a29sU2N0Um8vdVlTSG1RS0lsMldST0twZlNEcFprZU51VVBjckQ4Q3c2V24ySlQvaUFsR2NxZXdNMHNNZ0dPOW5UTStXcG1OL3ZabEQvSUt3K2NvN2JpSkU4dTdHVmozcUNpZk1Jb25uT1dab3hGdW84cnMyQkxmZ003VzdiQmhMSjR1ei85a0RmT255VFhhbE4wbWZkTnB2RjYrYWxJbC9XdEJ6L25jRzlKM0JaMElpaVdFKzQrMmt3aFFKM3VZOXZ3M0c4TXc0UzdySkVXdEFwZFZzV24xWHgzSDJkRGl5NnI0aU9udHFlTTJwNHlSZDNIU3NjaVpGbmRlcmZYbDRXcjRidjZlTUFlWmk3ZHgrNW5YMWFsYUhRZGZsWDQwTjJWNmFWN1BQbGxLVWxmeW9jRDFvVGJzajlyT2piblZzdE1QSDRmdXovOWNOWVlhb2lCZVg2ZTg3K0dMdTZROVlvaFI0QWhSNEFoUjREbWNwWm5lREZKSVZWakZ0bkd5VFlIVkkwWkM4M1hJUitxUE1tdSs2NnFHbmQvNlRsK1V0eXVhc3hZYUhZcDMzZi9PWDdzdWhpMWJmdXBiWnoxS3ErL1lxM3MyTk8rbnZmN2x5dU9LVUt6SStmUGZmY3pPVVA3NWJIc3BNUUFITG51aWxwcTZ3bWFOUk1ER3NwNXNiaUROQ2xzUjJaNXBwYzFPVVBDei95ODlGL0NWV0kvdU8vcW5XSjNLcWJkSE9CSmxSNXN4VUx6TytUMzF6WncvRllSYjM2NUl1Nlk1NWRlWWxXMm0yZUtydkxaOENLYVJ4ZndibjhKMTMyWk1jZi92cndaVDhEQ0s1MXJ0VW9ibUljSDdEL3RlSWkrT0RzWnhtYWE1Sm1pTGtEaW00NUI3T1lBdit1cWpEditsNTFyQ01xU3lwbmVpK1p5dnB6SW5uVk0vKzJNcUordit6TGlqSnppSzdYVWRvdmpCcGZHcGlycFczNHIyZWFnTGw1bjFFWGY2cVgyalFCOHNPNmY3R25mcUl1MzlFQW5jc0xzT3ZzSUV5SDlwS1NMMHlxTW5zU0F6dVRvRFVPT0FFT09BRU9PQUVPT0FFT09BRU9PQUVPT0FFT09BRU9PQUVPT0FFT09BRU9PQUVPT0FFT09BRU9PQUVPT0FCT3k3RTUxRXJwRWx0MG1KQ241di9yemY0bDB3U1JMVWsycTA5QWpreWJwVjJtK3Z6VjBaRlJ0UFkwa0Y4dElkZ25tNXdWS0hYTG4zOGFkUmpidGRqOS80R2lxODlFMS93WHI3WDVVT0tMK0tBQUFBQUJKUlU1RXJrSmdnZz09XCIgPlxyXG4gICAgICAgICAgICAgPGltZyBzcmM9XCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUVjQUFBQmxDQVlBQUFBZjFQNGlBQUFBQkhOQ1NWUUlDQWdJZkFoa2lBQUFCNGxKUkVGVWVKenRuVzlzRStjWndIL25PTGJ6ejBsc0NDRUZZdElVeUI4NllBWEtZRzBScWxvS21hSnBrN3FLVmQySGRwUG9ScVY5b0dPaVE1dTBOZEpXcGthbzB6cXBFV3RwVmFsYnRUWVVEVzFLVmRJUUdnS01rQVVDSktFSkNZSDhzYjBreG5aOCt4RHN4R0MvY2M1MzhXMjkzN2RjWGo5Njd1ZTc5KzY1NTcxRUFzai80NEdkU0tHWFphUUtDZkw0aWlMRHFJUjhBZG4wNnNnTEJ6Nlc4djUwb0ZxUzViK21Pakc5TVNsSjIwMlNMTzlOZFNKNkpDMGs3emNoeTJXcFRrU2Z5QlVtSkNrMzFXbm9Fa25LTmFVNkJ6MWp5QkZneUJGZ3lCRmd5QkZneUJGZ3lCRmd5QkZneUJGZ3lCRmd5QkZneUJGZ3lCRmd5QkZneUJGZ3lCRmd5QkZneUJHZ0t6bFcwMlNxVTRoQ1YzTHFIanlCMCtKTGRSb1J6S2xPQU9DM1pWK3dQdmNXSzdJOC9HUEQzN2t5bnNPZTlnMzArckpTbXBjdWpwd1c5d0pXWkhrQmlVVldIeE9odEpTTEFaM0lLY253VFA4Z3kyU2FncWxMWmdhYXlqRkpJYll2N0oxMW5EZVl6cEUrRndETmJpZU5Jd1U0MG0vSEhiL1dQc1FTMjVocWVjWkRrem5IYnZaVGtUUEtFd3Y3MkZWMGhSY3ZQTXhJd0VMemFFSE04YlU5NVFBTUIyMjgzbDJHTjVnZWMxeHBwb2VGVmgrL1dkbktUYitWMTdvcXVPSEw0T3BFamhhN2daVC81aTlrdFlOYXBFa2F2L0VKUzJ6amtXMkhlMHZZZS9HaHBPSnVkZlp6Wk0xblVkdDJ0bXpqdE51WlZOeDRhSEphK2VVMExuaG5kSmxsbVE5dUxFczZidU53QWI3UWRNckRBWXRtWWtBak9VdHNZenptR0lqYTlwTHIzMG5IL2VHeVM5aE1rNEFNc293ajNVLzFvbXRKeDQySEpxZFZtSy9uRHZGR1pSTmJQdCtPWDA1VExXN055aGJjd1hSK2ZlVnJxc1dNaGFaeVlHb1N2VHh1VnpXbUkvMDJRVm5DRTdTb0d2ZHVOTDlEVmxzTXdIREFxbnJNV09qaUpsQ3ZKQzJueURhT1JkSlhOZTNLOUtvU0orblRhbi9wT2RxOWVkVDJLRjg5dDNmZFl6eFZ2SXJWemtJQXJubEhPZEo1aGorME5lUHh6NjFLVi9NaW9IaENmbmJKWldwV3RrWnQyM3R4SFlkN1N4T09ZYmZZK0dqSGN4RXBkM04rYUlDcStycUVCRGt0UHBvMkhTWEhQRjJYdGJpZFZMVnNTemlmdTFGOFdyM2RWOExFNVBRM014cEk1KzIra2puRmVPZnhweU5pYWxvYnFLcXZvNnEranByV0JqeCtINnVkaFh5MDQ3bUVZZzM1Ylp3WWlTNVBEbllsdHhaVXNaeHZGZlNTa1RiOUxkbk5ma3JuY0s1dlh1eGk4K0twWW5QWDhmZW9hVzJnc2IrYnh2NXVhbG9iMlBseEhRQ3JuWVY4NzRFMXM4YkxNUWRZbjNzemF0c1RDNjRubkU4c0ZNdnBHTXZsMjYxYk9lUEo1OFJJQWQ4NXN4VmZLUEZ6Zk1zZE1ZMzkzUnp0NmJqbjkyM0RBN3piZVJhQUhhNVZzOFpMbDBLODBMYVoxN3JLQ0lRa2Z0VDJNSDhaS0U0NG4xZ29ucEE3L2pOVk8rMXAzNEEvWktKbmpwVnhXTTZKL3U2NFk2NTVSd0hJdGRobWpUY2NzTkkwVWtEVFNBSHQzanpxYnk2ZFV6NnhTUHBxMVRtbXYyWE1hb2dCNHlaUWlPYTExVXcyTDNaeDZKRnFsdVVvZXpISDdmZXhyK2xZWkM3U21uazljdDU1L0duRlltQnE3am4wYURYMkJPWWdOWmkzMWt5bG96Q3lVL3RPSHVQODBNQXNuN2lYOEQzUGFtY2hqWUtKWEMzbVRVNnVkZnJiUGo4ME1DODdseXpHaEN4QVYzSXFIWVZVT21MWFdhbEFGKzFnZ0VPUFZrZktoUHFlRHI1Ly9MMFVaNlNUSTJkcGRsNVUvYlNqZUZXazdrb2xTY3RSby91WVNIbVFLSWwyV1JPS3BmU0RwWmtlTnVVUGNyRDhDdzZXbjJKVC9pQWxHY3Fld00wc01nR085blRNK1dwbU4vdlpsRC9JS3crY283YmlKRTh1N0dWajNxQ2lmTUlvbm5PV1pveEZ1bzhyczJCTGZnTTdXN2JCaExKNHV6LzlrRGZPbnlUWGFsTjBtZmROcHZGNithbElsL1d0QnovbmNHOUozQlowSWlpV0UrNCsya3doUUozdVk5dnczRzhNdzRTN3JKRVd0QXBkVnNXbjFYeDNIMmREaXk2cjRpT250cWVNMnA0eVJkM0hTc2NpWkZuZGVyZlhsNFdyNGJ2NmVNQWVaaTdkeCs1blgxYWxhSFFkZmxYNDBOMlY2YVY3UFBsbEtVbGZ5b2NEMW9UYnNqOXJPamJuVnN0TVBINGZ1ei85Y05ZWWFvaUJlWDZlODcrR0x1NlE5WW9oUjRBaFI0QWhSNERtY3BabmVERkpJVlZqRnRuR3lUWUhWSTBaQzgzWElSK3FQTW11KzY2cUduZC82VGwrVXR5dWFzeFlhSFlwMzNmL09YN3N1aGkxYmZ1cGJaejFLcSsvWXEzczJOTytudmY3bHl1T0tVS3pJK2ZQZmZjek9VUDc1YkhzcE1RQUhMbnVpbHBxNndtYU5STURHc3A1c2JpRE5DbHNSMlo1cHBjMU9VUEN6L3k4OUYvQ1ZXSS91Ty9xbldKM0txYmRIT0JKbFI1c3hVTHpPK1QzMXpady9GWVJiMzY1SXU2WTU1ZGVZbFcybTJlS3J2TFo4Q0thUnhmd2JuOEoxMzJaTWNmL3Zyd1pUOERDSzUxcnRVb2JtSWNIN0QvdGVJaStPRHNaeG1hYTVKbWlMa0RpbTQ1QjdPWUF2K3VxakR2K2w1MXJDTXFTeXBuZWkrWnl2cHpJbm5WTS8rMk1xSit2K3pMaWpKemlLN1hVZG92akJwZkdwaXJwVzM0cjJlYWdMbDVuMUVYZjZxWDJqUUI4c082ZjdHbmZxSXUzOUVBbmNzTHNPdnNJRXlIOXBLU0wweXFNbnNTQXp1VG9EVU9PQUVPT0FFT09BRU9PQUVPT0FFT09BRU9PQUVPT0FFT09BRU9PQUVPT0FFT09BRU9PQUVPT0FFT09BRU9PQUJPeTdFNTFFcnBFbHQwbUpDbjV2L3J6ZjRsMHdTUkxVazJxMDlBamt5YnBWMm0rdnpWMFpGUnRQWTBrRjh0SWRnbm01d1ZLSFhMbjM4YWRSamJ0ZGo5LzRHaXE4OUUxL3dYcjdYNVVPS0wrS0FBQUFBQkpSVTVFcmtKZ2dnPT1cIiA+XHJcbiAgICAgICAgICAgICA8aW1nIHNyYz1cImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRWNBQUFCbENBWUFBQUFmMVA0aUFBQUFCSE5DU1ZRSUNBZ0lmQWhraUFBQUI0bEpSRUZVZUp6dG5XOXNFK2Nad0gvbk9MYnp6MGxzQ0NFRll0SVV5Qjg2WUFYS1lHMFJxbG9LbWFKcGs3cUtWZDJIZHBQb1JxVjlvR09pUTV1ME5kSldwa2FvMHpxcEVXdHBWYWxidFRZVURXMUtWZElRR2dLTWtBVUNKS0VKQ1lIOHNiMGt4blo4K3hEc3hHQy9jYzUzOFcyOTM3ZGNYajk2N3VlNzkrNjU1NzFFQXNqLzQ0R2RTS0dYWmFRS0NmTDRpaUxEcUlSOEFkbjA2c2dMQno2Vzh2NTBvRnFTNWIrbU9qRzlNU2xKMjAyU0xPOU5kU0o2SkMwazd6Y2h5MldwVGtTZnlCVW1KQ2szMVdub0VrbktOYVU2QnoxanlCRmd5QkZneUJGZ3lCRmd5QkZneUJGZ3lCRmd5QkZneUJGZ3lCRmd5QkZneUJGZ3lCRmd5QkZneUJGZ3lCRmd5QkdnS3psVzAyU3FVNGhDVjNMcUhqeUIwK0pMZFJvUnpLbE9BT0MzWlYrd1B2Y1dLN0k4L0dQRDM3a3luc09lOWczMCtySlNtcGN1anB3Vzl3SldaSGtCaVVWV0h4T2h0SlNMQVozSUtjbndUUDhneTJTYWdxbExaZ2FheWpGSkliWXY3SjExbkRlWXpwRStGd0ROYmllTkl3VTQwbS9ISGIvV1BzUVMyNWhxZWNaRGt6bkhidlpUa1RQS0V3djcyRlYwaFJjdlBNeEl3RUx6YUVITThiVTk1UUFNQjIyODNsMkdONWdlYzF4cHBvZUZWaCsvV2RuS1RiK1YxN29xdU9ITDRPcEVqaGE3Z1pULzVpOWt0WU5hcEVrYXYvRUpTMnpqa1cySGUwdlllL0docE9KdWRmWnpaTTFuVWR0MnRtemp0TnVaVk54NGFISmErZVUwTG5obmRKbGxtUTl1TEVzNmJ1TndBYjdRZE1yREFZdG1Za0FqT1V0c1l6em1HSWphOXBMcjMwbkgvZUd5UzloTWs0QU1zb3dqM1UvMW9tdEp4NDJISnFkVm1LL25EdkZHWlJOYlB0K09YMDVUTFc3TnloYmN3WFIrZmVWcnFzV01oYVp5WUdvU3ZUeHVWeldtSS8wMlFWbkNFN1NvR3ZkdU5MOURWbHNNd0hEQXFuck1XT2ppSmxDdkpDMm55RGFPUmRKWE5lM0s5S29TSituVGFuL3BPZHE5ZWRUMktGODl0M2ZkWXp4VnZJclZ6a0lBcm5sSE9kSjVoaiswTmVQeHo2MUtWL01pb0hoQ2ZuYkpaV3BXdGtadDIzdHhIWWQ3U3hPT1liZlkrR2pIY3hFcGQzTithSUNxK3JxRUJEa3RQcG8ySFNYSFBGMlh0YmlkVkxWc1N6aWZ1MUY4V3IzZFY4TEU1UFEzTXhwSTUrMitram5GZU9meHB5TmlhbG9icUtxdm82cStqcHJXQmp4K0g2dWRoWHkwNDdtRVlnMzViWndZaVM1UERuWWx0eFpVc1p4dkZmU1NrVGI5TGRuTmZrcm5jSzV2WHV4aTgrS3BZblBYOGZlb2FXMmdzYitieHY1dWFsb2IyUGx4SFFDcm5ZVjg3NEUxczhiTE1RZFluM3N6YXRzVEM2NG5uRThzRk12cEdNdmwyNjFiT2VQSjU4UklBZDg1c3hWZktQRnpmTXNkTVkzOTNSenQ2YmpuOTIzREE3emJlUmFBSGE1VnM4WkxsMEs4MExhWjE3cktDSVFrZnRUMk1IOFpLRTQ0bjFnb25wQTcvak5WTysxcDM0QS9aS0puanBWeFdNNkovdTY0WTY1NVJ3SEl0ZGhtalRjY3NOSTBVa0RUU0FIdDNqenFieTZkVXo2eFNQcHExVG1tdjJYTWFvZ0I0eVpRaU9hMTFVdzJMM1p4NkpGcWx1VW9lekhIN2ZleHIrbFlaQzdTbW5rOWN0NTUvR25GWW1CcTdqbjBhRFgyQk9ZZ05aaTMxa3lsb3pDeVUvdE9IdVA4ME1Bc243aVg4RDNQYW1jaGpZS0pYQzNtVFU2dWRmcmJQajgwTUM4N2x5ekdoQ3hBVjNJcUhZVlVPbUxYV2FsQUYrMWdnRU9QVmtmS2hQcWVEcjUvL0wwVVo2U1RJMmRwZGw1VS9iU2plRldrN2tvbFNjdFJvL3VZU0htUUtJbDJXUk9LcGZTRHBaa2VOdVVQY3JEOEN3NlduMkpUL2lBbEdjcWV3TTBzTWdHTzluVE0rV3BtTi92WmxEL0lLdytjbzdiaUpFOHU3R1ZqM3FDaWZNSW9ubk9XWm94RnVvOHJzMkJMZmdNN1c3YkJoTEo0dXovOWtEZk9ueVRYYWxOMG1mZE5wdkY2K2FsSWwvV3RCei9uY0c5SjNCWjBJaWlXRSs0KzJrd2hRSjN1WTl2dzNHOE13NFM3ckpFV3RBcGRWc1duMVh4M0gyZERpeTZyNGlPbnRxZU0ycDR5UmQzSFNzY2laRm5kZXJmWGw0V3I0YnY2ZU1BZVppN2R4KzVuWDFhbGFIUWRmbFg0ME4yVjZhVjdQUGxsS1VsZnlvY0Qxb1Ric2o5ck9qYm5Wc3RNUEg0ZnV6LzljTllZYW9pQmVYNmU4NytHTHU2UTlZb2hSNEFoUjRBaFI0RG1jcFpuZURGSklWVmpGdG5HeVRZSFZJMFpDODNYSVIrcVBNbXUrNjZxR25kLzZUbCtVdHl1YXN4WWFIWXAzM2YvT1g3c3VoaTFiZnVwYlp6MUtxKy9ZcTNzMk5PK252ZjdseXVPS1VLekkrZlBmZmN6T1VQNzViSHNwTVFBSExudWlscHE2d21hTlJNREdzcDVzYmlETkNsc1IyWjVwcGMxT1VQQ3oveTg5Ri9DVldJL3VPL3FuV0ozS3FiZEhPQkpsUjVzeFVMek8rVDMxelp3L0ZZUmIzNjVJdTZZNTVkZVlsVzJtMmVLcnZMWjhDS2FSeGZ3Ym44SjEzMlpNY2YvdnJ3WlQ4RENLNTFydFVvYm1JY0g3RC90ZUlpK09Ec1p4bWFhNUptaUxrRGltNDVCN09ZQXYrdXFqRHYrbDUxckNNcVN5cG5laStaeXZweklublZNLysyTXFKK3Yrekxpakp6aUs3WFVkb3ZqQnBmR3BpcnBXMzRyMmVhZ0xsNW4xRVhmNnFYMmpRQjhzTzZmN0duZnFJdTM5RUFuY3NMc092c0lFeUg5cEtTTDB5cU1uc1NBenVUb0RVT09BRU9PQUVPT0FFT09BRU9PQUVPT0FFT09BRU9PQUVPT0FFT09BRU9PQUVPT0FFT09BRU9PQUVPT0FFT09BQk95N0U1MUVycEVsdDBtSkNuNXYvcnpmNGwwd1NSTFVrMnEwOUFqa3licFYybSt2elYwWkZSdFBZMGtGOHRJZGdubTV3VktIWExuMzhhZFJqYnRkajkvNEdpcTg5RTEvd1hyN1g1VU9LTCtLQUFBQUFCSlJVNUVya0pnZ2c9PVwiID5cclxuICAgICAgICAgICAgIDxpbWcgc3JjPVwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFFY0FBQUJsQ0FZQUFBQWYxUDRpQUFBQUJITkNTVlFJQ0FnSWZBaGtpQUFBQjRsSlJFRlVlSnp0blc5c0UrY1p3SC9uT0xienowbHNDQ0VGWXRJVXlCODZZQVhLWUcwUnFsb0ttYUpwazdxS1ZkMkhkcFBvUnFWOW9HT2lRNXUwTmRKV3BrYW8wenFwRVd0cFZhbGJ0VFlVRFcxS1ZkSVFHZ0tNa0FVQ0pLRUpDWUg4c2Iwa3huWjgreERzeEdDL2NjNTM4VzI5MzdkY1hqOTY3dWU3OSs2NTU3MUVBc2ovNDRHZFNLR1haYVFLQ2ZMNGlpTERxSVI4QWRuMDZzZ0xCejZXOHY1MG9GcVM1YittT2pHOU1TbEoyMDJTTE85TmRTSjZKQzBrN3pjaHkyV3BUa1NmeUJVbUpDazMxV25vRWtuS05hVTZCejFqeUJGZ3lCRmd5QkZneUJGZ3lCRmd5QkZneUJGZ3lCRmd5QkZneUJGZ3lCRmd5QkZneUJGZ3lCRmd5QkZneUJGZ3lCR2dLemxXMDJTcVU0aENWM0xxSGp5QjArSkxkUm9SektsT0FPQzNaVit3UHZjV0s3STgvR1BEMzdreW5zT2U5ZzMwK3JKU21wY3VqcHdXOXdKV1pIa0JpVVZXSHhPaHRKU0xBWjNJS2Nud1RQOGd5MlNhZ3FsTFpnYWF5akZKSWJZdjdKMTFuRGVZenBFK0Z3RE5iaWVOSXdVNDBtL0hIYi9XUHNRUzI1aHFlY1pEa3puSGJ2WlRrVFBLRXd2NzJGVjBoUmN2UE14SXdFTHphRUhNOGJVOTVRQU1CMjI4M2wyR041Z2VjMXhwcG9lRlZoKy9XZG5LVGIrVjE3b3F1T0hMNE9wRWpoYTdnWlQvNWk5a3RZTmFwRWthdi9FSlMyemprVzJIZTB2WWUvR2hwT0p1ZGZaelpNMW5VZHQydG16anROdVpWTng0YUhKYStlVTBMbmhuZEpsbG1ROXVMRXM2YnVOd0FiN1FkTXJEQVl0bVlrQWpPVXRzWXp6bUdJamE5cExyMzBuSC9lR3lTOWhNazRBTXNvd2ozVS8xb210Sng0MkhKcWRWbUsvbkR2RkdaUk5iUHQrT1gwNVRMVzdOeWhiY3dYUitmZVZycXNXTWhhWnlZR29TdlR4dVZ6V21JLzAyUVZuQ0U3U29HdmR1Tkw5RFZsc013SERBcW5yTVdPamlKbEN2SkMybnlEYU9SZEpYTmUzSzlLb1NKK25UYW4vcE9kcTllZFQyS0Y4OXQzZmRZenhWdklyVnprSUFybmxIT2RKNWhqKzBOZVB4ejYxS1YvTWlvSGhDZm5iSlpXcFd0a1p0MjN0eEhZZDdTeE9PWWJmWStHakhjeEVwZDNOK2FJQ3ErcnFFQkRrdFBwbzJIU1hIUEYyWHRiaWRWTFZzU3ppZnUxRjhXcjNkVjhMRTVQUTNNeHBJNSsyK2tqbkZlT2Z4cHlOaWFsb2JxS3F2bzZxK2pwcldCangrSDZ1ZGhYeTA0N21FWWczNWJad1lpUzVQRG5ZbHR4WlVzWnh2RmZTU2tUYjlMZG5OZmtybmNLNXZYdXhpOCtLcFluUFg4ZmVvYVcyZ3NiK2J4djV1YWxvYjJQbHhIUUNybllWODc0RTFzOGJMTVFkWW4zc3phdHNUQzY0bm5FOHNGTXZwR012bDI2MWJPZVBKNThSSUFkODVzeFZmS1BGemZNc2RNWTM5M1J6dDZiam45MjNEQTd6YmVSYUFIYTVWczhaTGwwSzgwTGFaMTdyS0NJUWtmdFQyTUg4WktFNDRuMWdvbnBBNy9qTlZPKzFwMzRBL1pLSm5qcFZ4V002Si91NjRZNjU1UndISXRkaG1qVGNjc05JMFVrRFRTQUh0M2p6cWJ5NmRVejZ4U1BwcTFUbW12MlhNYW9nQjR5WlFpT2ExMVV3MkwzWng2SkZxbHVVb2V6SEg3ZmV4citsWVpDN1Ntbms5Y3Q1NS9HbkZZbUJxN2puMGFEWDJCT1lnTlppMzFreWxvekN5VS90T0h1UDgwTUFzbjdpWDhEM1BhbWNoallLSlhDM21UVTZ1ZGZyYlBqODBNQzg3bHl6R2hDeEFWM0lxSFlWVU9tTFhXYWxBRisxZ2dFT1BWa2ZLaFBxZURyNS8vTDBVWjZTVEkyZHBkbDVVL2JTamVGV2s3a29sU2N0Um8vdVlTSG1RS0lsMldST0twZlNEcFprZU51VVBjckQ4Q3c2V24ySlQvaUFsR2NxZXdNMHNNZ0dPOW5UTStXcG1OL3ZabEQvSUt3K2NvN2JpSkU4dTdHVmozcUNpZk1Jb25uT1dab3hGdW84cnMyQkxmZ003VzdiQmhMSjR1ei85a0RmT255VFhhbE4wbWZkTnB2RjYrYWxJbC9XdEJ6L25jRzlKM0JaMElpaVdFKzQrMmt3aFFKM3VZOXZ3M0c4TXc0UzdySkVXdEFwZFZzV24xWHgzSDJkRGl5NnI0aU9udHFlTTJwNHlSZDNIU3NjaVpGbmRlcmZYbDRXcjRidjZlTUFlWmk3ZHgrNW5YMWFsYUhRZGZsWDQwTjJWNmFWN1BQbGxLVWxmeW9jRDFvVGJzajlyT2piblZzdE1QSDRmdXovOWNOWVlhb2lCZVg2ZTg3K0dMdTZROVlvaFI0QWhSNEFoUjREbWNwWm5lREZKSVZWakZ0bkd5VFlIVkkwWkM4M1hJUitxUE1tdSs2NnFHbmQvNlRsK1V0eXVhc3hZYUhZcDMzZi9PWDdzdWhpMWJmdXBiWnoxS3ErL1lxM3MyTk8rbnZmN2x5dU9LVUt6SStmUGZmY3pPVVA3NWJIc3BNUUFITG51aWxwcTZ3bWFOUk1ER3NwNXNiaUROQ2xzUjJaNXBwYzFPVVBDei95ODlGL0NWV0kvdU8vcW5XSjNLcWJkSE9CSmxSNXN4VUx6TytUMzF6WncvRllSYjM2NUl1Nlk1NWRlWWxXMm0yZUtydkxaOENLYVJ4ZndibjhKMTMyWk1jZi92cndaVDhEQ0s1MXJ0VW9ibUljSDdEL3RlSWkrT0RzWnhtYWE1Sm1pTGtEaW00NUI3T1lBdit1cWpEditsNTFyQ01xU3lwbmVpK1p5dnB6SW5uVk0vKzJNcUordit6TGlqSnppSzdYVWRvdmpCcGZHcGlycFczNHIyZWFnTGw1bjFFWGY2cVgyalFCOHNPNmY3R25mcUl1MzlFQW5jc0xzT3ZzSUV5SDlwS1NMMHlxTW5zU0F6dVRvRFVPT0FFT09BRU9PQUVPT0FFT09BRU9PQUVPT0FFT09BRU9PQUVPT0FFT09BRU9PQUVPT0FFT09BRU9PQUVPT0FCT3k3RTUxRXJwRWx0MG1KQ241di9yemY0bDB3U1JMVWsycTA5QWpreWJwVjJtK3Z6VjBaRlJ0UFkwa0Y4dElkZ25tNXdWS0hYTG4zOGFkUmpidGRqOS80R2lxODlFMS93WHI3WDVVT0tMK0tBQUFBQUJKUlU1RXJrSmdnZz09XCIgPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PiAtLT5cclxuPC9kaXY+YCxcclxuICBzdHlsZXM6IFtgLmNvbnRhaW5lcntiYWNrZ3JvdW5kLWNvbG9yOiNlZWU7bWF4LXdpZHRoOjEwMCUhaW1wb3J0YW50fS5yb3d7cGFkZGluZzoxMHB4O3RleHQtYWxpZ246bGVmdH0uaGVhZGVyLXJvd3twYWRkaW5nOjM1cHggMTBweCA1cHh9LmNvbC1tZC0yLC5oZWFkZXItcm93IC5jb2wtbWR7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC13ZWlnaHQ6NDAwfS5jYXJke3dpZHRoOjEwMCV9LmNhcmQtYm9keXtwYWRkaW5nOjJweH0uY2FyZC1ib2R5IC5jb2wtbWQsLmNvbC1tZC0ye3RleHQtYWxpZ246Y2VudGVyfS5wZW9wbGUtY2FyZHtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6NzBweDtwYWRkaW5nOjhweCAwfS5wZW9wbGUtY2FyZF9faW1hZ2UgaW1ne3dpZHRoOjI1cHg7aGVpZ2h0OjI1cHg7Ym9yZGVyLXJhZGl1czo1MCV9LnBlb3BsZS1jYXJkIGRpdntkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LnBlb3BsZS1jYXJkX19kZXRhaWxzIHB7bWFyZ2luOjNweDtmb250LXNpemU6MS4xcmVtO2ZvbnQtd2VpZ2h0OjIwMDtjb2xvcjojOTQ5NDk0fS5wZW9wbGUtY2FyZF9fZGV0YWlscyBwOmZpcnN0LWNoaWxke3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiMzNjQ2NGY7Zm9udC13ZWlnaHQ6NzAwfS5jb2wtZGF0YS1zb3VyY2UgaW1ne21hcmdpbi10b3A6MTVweDtoZWlnaHQ6MzVweH0uZW5kb3JzZW1lbnRfX2ltYWdlIGltZ3toZWlnaHQ6MjVweDt3aWR0aDoyNXB4O21hcmdpbjowIDNweCAzcHggMDtib3JkZXItcmFkaXVzOjUwJX0uYmFkZ2UtY29sIHAsLmVuZG9yc2VtZW50LWNvbCwudHJhY2Vwb3dlci1jb2x7bWFyZ2luLXRvcDoyMHB4fS5iYWRnZS1jb2wgaW1ne2hlaWdodDozNXB4O21hcmdpbjowIDVweCA1cHggMH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGVvcGxlVGVjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICB1c2VyczphbnkgPSBbXTtcclxuICB1c2VyRnVsbE5hbWU6IHN0cmluZztcclxuICB1c2VyVHlwZTogc3RyaW5nO1xyXG4gIHRlY2hUeXBlOiBzdHJpbmc7XHJcbiAgX2JvZHkgPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBBcGlDYWxsc1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHN0b3JhZ2VTZXJ2aWNlOiBTdG9yYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudXNlcnMgPSB0aGlzLmRhdGFTZXJ2aWNlLnVzZXJzO1xyXG4gICAgY29uc29sZS5sb2coJ2luY29taW5nIHVzZXJzIGZvciB1c2VyIHNlY3Rpb24gOiAnICsgSlNPTi5zdHJpbmdpZnkodGhpcy51c2VycykpO1xyXG4gIH1cclxuXHJcblxyXG4gIHNldEJvZHkoKSB7XHJcbiAgICB0aGlzLnN0b3JhZ2VTZXJ2aWNlLmdldENhcmRTdWJ0aXRsZXMoKS5mb3JFYWNoKHN1YnRpdGxlID0+IHtcclxuICAgICAgY29uc29sZS5sb2coXCJzdWJzIHJldCBieSBlY2J1aSBmcm9tIHNlc2ggc3RvcmVcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKHN1YnRpdGxlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0VGVjaFR5cGUoKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMudXNlclR5cGUpIHtcclxuICAgICAgY2FzZSBcIkZpZWxkT2ZmaWNlclwiOlxyXG4gICAgICAgIHRoaXMudGVjaFR5cGUgPSBcIkZpZWxkIE9mZmljZXIgQXBwXCI7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFwiQWRtaW5cIjpcclxuICAgICAgICB0aGlzLnRlY2hUeXBlID0gXCJBZG1pbiBQb3J0YWxcIjtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy50ZWNoVHlwZSA9IFwibnVsbFwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAvLyB0aGlzLnVzZXJzID0gW11cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZWNidWktbWFpbi12aWV3JyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9J2NvbnRhaW5lcic+XHJcbiAgICA8ZWNidWktYmxvY2tjaGFpbi1wcm9vZnMtY2FyZD48L2VjYnVpLWJsb2NrY2hhaW4tcHJvb2ZzLWNhcmQ+XHJcbiAgICA8ZWNidWktcGVvcGxlLXRlY2gtY2FyZD48L2VjYnVpLXBlb3BsZS10ZWNoLWNhcmQ+XHJcbiAgICA8ZWNidWktZGF0YS1zb3VyY2VzPjwvZWNidWktZGF0YS1zb3VyY2VzPlxyXG48L2Rpdj5gLFxyXG4gIHN0eWxlczogW2Aqe2NvbG9yOiMwMDB9LmNvbnRhaW5lcntiYWNrZ3JvdW5kLWNvbG9yOiNlZWU7bWF4LXdpZHRoOjEwMCUhaW1wb3J0YW50O3BhZGRpbmc6MH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFpblZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uL25hdmlnYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJlY2J1aS1ibG9ja2NoYWluLXByb29mcy1jYXJkXCIsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XHJcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNhcmRcIiBzdHlsZT1cIndpZHRoOiAxMDAlXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICA8aDUgY2xhc3M9XCJjYXJkLXRpdGxlXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImV5ZS1pY29uXCI+XHJcbiAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMzJcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgMzIgMzJcIj5cclxuICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMC40NilcIj5cclxuICAgICAgICAgICAgICAgIDxnIGNsYXNzPVwiYVwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtMC40NilcIj5cclxuICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjbGFzcz1cImNcIiBjeD1cIjE2XCIgY3k9XCIxNlwiIHI9XCIxNlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY2xhc3M9XCJkXCIgY3g9XCIxNlwiIGN5PVwiMTZcIiByPVwiMTUuNVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoNS4xMDIgMTAuMDM0KVwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCAwKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwIDApXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTIxLjg3MiwxMTYuMTUxYTEzLjc2MiwxMy43NjIsMCwwLDAtNC42NzQtMy44MjcsMTMuNDg1LDEzLjQ4NSwwLDAsMC01LjkxLTEuNDI2Yy0uMDU3LDAtLjI4NywwLS4zNDQsMGExMy40ODYsMTMuNDg2LDAsMCwwLTUuOTEsMS40MjYsMTMuNzYxLDEzLjc2MSwwLDAsMC00LjY3NCwzLjgyNywxLjcsMS43LDAsMCwwLDAsMi4wOTQsMTMuNzYxLDEzLjc2MSwwLDAsMCw0LjY3NCwzLjgyNywxMy40ODUsMTMuNDg1LDAsMCwwLDUuOTEsMS40MjZjLjA1NywwLC4yODcsMCwuMzQ0LDBhMTMuNDg2LDEzLjQ4NiwwLDAsMCw1LjkxLTEuNDI2LDEzLjc2MSwxMy43NjEsMCwwLDAsNC42NzQtMy44MjdBMS43LDEuNywwLDAsMCwyMS44NzIsMTE2LjE1MVpNNS40MzcsMTIxLjI2M2ExMi44NTIsMTIuODUyLDAsMCwxLTQuMzY1LTMuNTc0LjguOCwwLDAsMSwwLS45ODEsMTIuNzYsMTIuNzYsMCwwLDEsNS44MzQtNC4yLDYuMjkzLDYuMjkzLDAsMCwwLDAsOS4zNzRBMTIuNzUxLDEyLjc1MSwwLDAsMSw1LjQzNywxMjEuMjYzWm01LjY3OCwxLjMzM2E1LjQsNS40LDAsMSwxLDUuNC01LjRBNS40LDUuNCwwLDAsMSwxMS4xMTUsMTIyLjZabTEwLjA0My00LjkwN2ExMi43MzgsMTIuNzM4LDAsMCwxLTUuODMzLDQuMTk1LDYuMjkzLDYuMjkzLDAsMCwwLDAtOS4zNzMsMTIuNzY1LDEyLjc2NSwwLDAsMSw1LjgzNSw0LjJBLjguOCwwLDAsMSwyMS4xNTksMTE3LjY4OVpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMC4wMDIgLTExMC44OTcpXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDguODA3IDMuOTkxKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiYlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBkPVwiTTIwNS4xMTUsMjAyLjhhMi4zMSwyLjMxLDAsMSwwLDIuMzEsMi4zMUEyLjMxMywyLjMxMywwLDAsMCwyMDUuMTE1LDIwMi44Wm0wLDMuNzE2YTEuNDA2LDEuNDA2LDAsMSwxLDEuNDA2LTEuNDA2QTEuNDA3LDEuNDA3LDAsMCwxLDIwNS4xMTUsMjA2LjUyWlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTIwMi44MDUgLTIwMi44MDQpXCIgLz5cclxuICAgICAgICAgICAgICAgICAgPC9nPlxyXG4gICAgICAgICAgICAgICAgPC9nPlxyXG4gICAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICA8L3NwYW4+QmxvY2tjaGFpbiBQcm9vZnM8L2g1PlxyXG4gICAgICAgICAgPCEtLSA8aSBjbGFzcz1cImZhcyBmYS1xdWVzdGlvbi1jaXJjbGVcIiA+PC9pPiAtLT5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWNpcmNsZVwiPlxyXG4gICAgICAgICAgPHN2ZyBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGRhdGEtcHJlZml4PVwiZmFzXCIgZGF0YS1pY29uPVwicXVlc3Rpb24tY2lyY2xlXCIgY2xhc3M9XCJzdmctaW5saW5lLS1mYSBmYS1xdWVzdGlvbi1jaXJjbGUgZmEtdy0xNlwiIHJvbGU9XCJpbWdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNTA0IDI1NmMwIDEzNi45OTctMTExLjA0MyAyNDgtMjQ4IDI0OFM4IDM5Mi45OTcgOCAyNTZDOCAxMTkuMDgzIDExOS4wNDMgOCAyNTYgOHMyNDggMTExLjA4MyAyNDggMjQ4ek0yNjIuNjU1IDkwYy01NC40OTcgMC04OS4yNTUgMjIuOTU3LTExNi41NDkgNjMuNzU4LTMuNTM2IDUuMjg2LTIuMzUzIDEyLjQxNSAyLjcxNSAxNi4yNThsMzQuNjk5IDI2LjMxYzUuMjA1IDMuOTQ3IDEyLjYyMSAzLjAwOCAxNi42NjUtMi4xMjIgMTcuODY0LTIyLjY1OCAzMC4xMTMtMzUuNzk3IDU3LjMwMy0zNS43OTcgMjAuNDI5IDAgNDUuNjk4IDEzLjE0OCA0NS42OTggMzIuOTU4IDAgMTQuOTc2LTEyLjM2MyAyMi42NjctMzIuNTM0IDMzLjk3NkMyNDcuMTI4IDIzOC41MjggMjE2IDI1NC45NDEgMjE2IDI5NnY0YzAgNi42MjcgNS4zNzMgMTIgMTIgMTJoNTZjNi42MjcgMCAxMi01LjM3MyAxMi0xMnYtMS4zMzNjMC0yOC40NjIgODMuMTg2LTI5LjY0NyA4My4xODYtMTA2LjY2NyAwLTU4LjAwMi02MC4xNjUtMTAyLTExNi41MzEtMTAyek0yNTYgMzM4Yy0yNS4zNjUgMC00NiAyMC42MzUtNDYgNDYgMCAyNS4zNjQgMjAuNjM1IDQ2IDQ2IDQ2czQ2LTIwLjYzNiA0Ni00NmMwLTI1LjM2NS0yMC42MzUtNDYtNDYtNDZ6XCI+PC9wYXRoPjwvc3ZnPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICA8ZGl2IGNsYXNzPVwicm93IHByb29mcy1yb3dcIj5cclxuICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuXCIgKm5nRm9yPVwibGV0IHByb29mIG9mIHByb29mc1wiIChjbGljayk9XCJjaGFuZ2VUb0JDUHJvb2ZzKClcIj57eyBwcm9vZi5uYW1lIH19PC9kaXY+XHJcbiAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PmAsXHJcbiAgc3R5bGVzOiBbYC5yb3d7cGFkZGluZzozMHB4IDMwcHggMTVweDt0ZXh0LWFsaWduOmxlZnR9LmJ0bntiYWNrZ3JvdW5kLWNvbG9yOiNlZWU7d2lkdGg6MTY1cHg7aGVpZ2h0OjM0cHg7Ym9yZGVyOjA7bWFyZ2luLXJpZ2h0OjVweDtjb2xvcjojMzY0NjRmO2JvcmRlci1yYWRpdXM6NHB4O21hcmdpbi1ib3R0b206NXB4fS5idG46aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojOWQ5ZDlkO2NvbG9yOiNmZmZ9LmJ0bi1jb250YWluZXJ7cGFkZGluZy1sZWZ0OjIuNXJlbX0uY2FyZC10aXRsZXtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tcmlnaHQ6LjVyZW07Y29sb3I6IzM2NDY0Zn0ucS1jaXJjbGV7d2lkdGg6MTVweDtoZWlnaHQ6MTVweDtkaXNwbGF5OmlubGluZS1ibG9jaztjb2xvcjojOTQ5MTkxfS5mYS1xdWVzdGlvbi1jaXJjbGV7Y29sb3I6Izk0OTE5MX0uZmEtcXVlc3Rpb24tY2lyY2xlOmhvdmVye2N1cnNvcjpwb2ludGVyO2NvbG9yOiNhMGEwYTA7dHJhbnNpdGlvbjouNXMgZWFzZS1pbi1vdXR9LnByb29mcy1yb3d7cGFkZGluZzoxMHB4fS5wcm9vZnMtcm93IC5idG46aG92ZXJ7dHJhbnNpdGlvbjouNXMgZWFzZS1pbi1vdXR9LmNhcmQtbmFtZXtwYWRkaW5nLXRvcDozMHB4fS5jYXJkLWJvZHl7dGV4dC1hbGlnbjpsZWZ0O2JveC1zaGFkb3c6MXB4IDJweCA0cHggMCByZ2JhKDAsMCwwLC4xKX0uZXllLWljb257ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luLXJpZ2h0OjE1cHg7cG9zaXRpb246cmVsYXRpdmU7Ym90dG9tOjJweH0uYSwuZHtmaWxsOm5vbmV9LmEsLmJ7c3Ryb2tlOiMwMDB9LmJ7c3Ryb2tlLXdpZHRoOi41cHh9LmN7c3Ryb2tlOm5vbmV9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJsb2NrY2hhaW5Qcm9vZnNDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBuYXZTdGF0dXM6IHN0cmluZztcclxuICBwcm9vZnMgPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMucHJvb2ZzID0gW107XHJcbiAgICB0aGlzLnByb29mcyA9IHRoaXMuZGF0YVNlcnZpY2UucHJvb2ZzO1xyXG4gICAgY29uc29sZS5sb2coXCJpbmNvbWluZyBwcm9vZnMgYXJlIFwiICsgdGhpcy5wcm9vZnMpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlVG9CQ1Byb29mcygpIHtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UuY2hhbmdlVG9CQ1Byb29mcygpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmljZXMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnNlcnZpY2VcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiZWNidWktZGF0YS1zb3VyY2VzXCIsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XHJcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNhcmRcIiBzdHlsZT1cIndpZHRoOiAxMDAlXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICA8aDUgY2xhc3M9XCJjYXJkLXRpdGxlXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGEtaWNvblwiPlxyXG4gICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjMyXCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDMyIDMyXCI+XHJcbiAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAuNDYpXCI+XHJcbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoNi41OTQgNylcIj5cclxuICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICBkPVwiTTEyMC43OSwxMTMuNTlhNS4yLDUuMiwwLDEsMCw1LjIsNS4yQTUuMjEsNS4yMSwwLDAsMCwxMjAuNzksMTEzLjU5Wm0tNC4wOTIsNS4yYTQuMSw0LjEsMCwwLDEsMy41MzYtNC4wNTR2OC4xMDhhNC4xLDQuMSwwLDAsMS0zLjUzNi00LjA1NFptNC42NDgsNC4wNTRWMTE0Ljc0YTQuMDkyLDQuMDkyLDAsMCwxLDAsOC4xMDhabTAsMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC0xMTEuMzAyIC0xMDkuMzgpXCIgLz5cclxuICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICBkPVwiTTI0MS41NTYsNDI2YS41NTYuNTU2LDAsMCwwLS41NTYuNTU2djIuMDc2YS41NTYuNTU2LDAsMSwwLDEuMTEyLDB2LTIuMDc2QS41NTYuNTU2LDAsMCwwLDI0MS41NTYsNDI2Wm0wLDBcIlxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtMjMyLjA2OCAtNDEwLjIxMSlcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTQzMC41NDYsMjQxaC0yYS41NTYuNTU2LDAsMCwwLDAsMS4xMTJoMmEuNTU2LjU1NiwwLDAsMCwwLTEuMTEyWm0wLDBcIlxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNDEyLjEyNiAtMjMyLjA2OClcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIGQ9XCJNMy4xMTQsMjQxLjU1NkEuNTU2LjU1NiwwLDAsMCwyLjU1OCwyNDFoLTJhLjU1Ni41NTYsMCwwLDAsMCwxLjExMmgyQS41NTYuNTU2LDAsMCwwLDMuMTE0LDI0MS41NTZabTAsMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAgLTIzMi4wNjgpXCIgLz5cclxuICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICBkPVwiTTQwNC4zODEsMTIyLjU5MmEuNTU0LjU1NCwwLDAsMCwuMjc4LS4wNzVsMS43LS45ODJhLjU1Ni41NTYsMCwxLDAtLjU1Ni0uOTYzbC0xLjcuOTgyYS41NTYuNTU2LDAsMCwwLC4yNzgsMS4wMzdabTAsMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC0zODguODU4IC0xMTYuMDMzKVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMzUuMTM2LDMzNC4wNzhsLTEuNzM0LDFhLjU1Ni41NTYsMCwxLDAsLjU1Ni45NjNsMS43MzQtMWEuNTU2LjU1NiwwLDAsMC0uNTU2LS45NjNabTAsMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC0zMS44OTYgLTMyMS42MjQpXCIgLz5cclxuICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICBkPVwiTTEyMy4xNzksNDAxLjU0MWEuNTU2LjU1NiwwLDAsMC0uNzU5LjJsLTEsMS43MzRhLjU1Ni41NTYsMCwxLDAsLjk2My41NTZsMS0xLjczNEEuNTU2LjU1NiwwLDAsMCwxMjMuMTc5LDQwMS41NDFabTAsMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC0xMTYuODQ3IC0zODYuNTg3KVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMzEuNjcxLDEyMS4wMjFsMS43MzQsMWEuNTU2LjU1NiwwLDAsMCwuNTU2LS45NjNsLTEuNzM0LTFhLjU1Ni41NTYsMCwwLDAtLjU1Ni45NjNabTAsMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC0zMC4yMyAtMTE1LjUzNylcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIGQ9XCJNNDA0LjY5MywzMzUuMWwtMS43NjUtMS4wMTlhLjU1Ni41NTYsMCwwLDAtLjU1Ni45NjNsMS43NjUsMS4wMTlhLjU1Ni41NTYsMCwwLDAsLjU1Ni0uOTYzWm0wLDBcIlxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtMzg3LjE5MSAtMzIxLjYyOClcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTMzNC42ODcsNDAxLjc1M2EuNTU2LjU1NiwwLDAsMC0uOTYzLjU1NmwxLDEuNzMzYS41NTYuNTU2LDAsMCwwLC45NjMtLjU1NlptMCwwXCJcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTMyMS4yODMgLTM4Ni41OTUpXCIgLz5cclxuICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICBkPVwiTTI0MS41NTYsMy4xMTNhLjU1Ni41NTYsMCwwLDAsLjU1Ni0uNTU2di0yYS41NTYuNTU2LDAsMCwwLTEuMTEyLDB2MkEuNTU2LjU1NiwwLDAsMCwyNDEuNTU2LDMuMTEzWm0wLDBcIlxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtMjMyLjA2OClcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIGQ9XCJNMzMzLjkyMywzNC41MjRhLjU1NS41NTUsMCwwLDAsLjc1OS0uMmwxLTEuNzM0YS41NTYuNTU2LDAsMSwwLS45NjMtLjU1NmwtMSwxLjczNEEuNTU2LjU1NiwwLDAsMCwzMzMuOTIzLDM0LjUyNFptMCwwXCJcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTMyMS4yNzkgLTMwLjU3NilcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEyMi40MTksMzQuMzJhLjU1Ni41NTYsMCwxLDAsLjk2My0uNTU2bC0xLTEuNzMzYS41NTYuNTU2LDAsMSwwLS45NjMuNTU2Wm0wLDBcIlxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtMTE2Ljg0NiAtMzAuNTc1KVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgICAgICA8ZyBjbGFzcz1cImFcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTAuNDYpXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY2xhc3M9XCJiXCIgY3g9XCIxNlwiIGN5PVwiMTZcIiByPVwiMTZcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8Y2lyY2xlIGNsYXNzPVwiY1wiIGN4PVwiMTZcIiBjeT1cIjE2XCIgcj1cIjE1LjVcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9nPlxyXG4gICAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICA8L3NwYW4+VGVjaG5vbG9neTwvaDU+XHJcbiAgICAgICAgICA8IS0tIDxpIGNsYXNzPVwiZmFzIGZhLXF1ZXN0aW9uLWNpcmNsZVwiPjwvaT4gLS0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1jaXJjbGVcIj5cclxuICAgICAgICAgICAgPHN2ZyBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGRhdGEtcHJlZml4PVwiZmFzXCIgZGF0YS1pY29uPVwicXVlc3Rpb24tY2lyY2xlXCIgY2xhc3M9XCJzdmctaW5saW5lLS1mYSBmYS1xdWVzdGlvbi1jaXJjbGUgZmEtdy0xNlwiIHJvbGU9XCJpbWdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNTA0IDI1NmMwIDEzNi45OTctMTExLjA0MyAyNDgtMjQ4IDI0OFM4IDM5Mi45OTcgOCAyNTZDOCAxMTkuMDgzIDExOS4wNDMgOCAyNTYgOHMyNDggMTExLjA4MyAyNDggMjQ4ek0yNjIuNjU1IDkwYy01NC40OTcgMC04OS4yNTUgMjIuOTU3LTExNi41NDkgNjMuNzU4LTMuNTM2IDUuMjg2LTIuMzUzIDEyLjQxNSAyLjcxNSAxNi4yNThsMzQuNjk5IDI2LjMxYzUuMjA1IDMuOTQ3IDEyLjYyMSAzLjAwOCAxNi42NjUtMi4xMjIgMTcuODY0LTIyLjY1OCAzMC4xMTMtMzUuNzk3IDU3LjMwMy0zNS43OTcgMjAuNDI5IDAgNDUuNjk4IDEzLjE0OCA0NS42OTggMzIuOTU4IDAgMTQuOTc2LTEyLjM2MyAyMi42NjctMzIuNTM0IDMzLjk3NkMyNDcuMTI4IDIzOC41MjggMjE2IDI1NC45NDEgMjE2IDI5NnY0YzAgNi42MjcgNS4zNzMgMTIgMTIgMTJoNTZjNi42MjcgMCAxMi01LjM3MyAxMi0xMnYtMS4zMzNjMC0yOC40NjIgODMuMTg2LTI5LjY0NyA4My4xODYtMTA2LjY2NyAwLTU4LjAwMi02MC4xNjUtMTAyLTExNi41MzEtMTAyek0yNTYgMzM4Yy0yNS4zNjUgMC00NiAyMC42MzUtNDYgNDYgMCAyNS4zNjQgMjAuNjM1IDQ2IDQ2IDQ2czQ2LTIwLjYzNiA0Ni00NmMwLTI1LjM2NS0yMC42MzUtNDYtNDYtNDZ6XCI+PC9wYXRoPjwvc3ZnPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgZGF0YXNvdXJjZS1yb3dcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG5cIiAoY2xpY2spPVwiY2hhbmdlVG9QZW9UZWNoKClcIj48aW1nIHNyYz1cImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRUVBQUFCd0NBWUFBQUJCMFIxTkFBQUFCSE5DU1ZRSUNBZ0lmQWhraUFBQUNGMUpSRUZVZUp6dG5WdHNGTmNaeDM5bmQ5Ymc5ZHFzTVdBSXFOalk2M0lKMkJGSkdnaUlUUW1VbTVRdE9FaFZKV0txdG1wd0hrcGJDSDJnTVcwZlNtZ0VEd21SMG9lV3FsR3F4S0ZFeFFacVI2d3B0NWFZckJOaGFBSGJsQVYyb2I1N2QzM1o5ZlRCc21Qd2pMMzJ6b3lCenYvSmV5NXovdlBUekpuUE05L01FWXdnOXhwUGxzMWlmVWtXd2lOa25BZ0tSdW96N3BMeHlZSVdJY3RIZW5wam4zaVBIMmtZcnJsUXEzaHhRNkVibVRjRXVMVjNhYXhrOENMWVUzbTAxS3RVcndqaHhmV0Yrd1g4V0Y5cnhrdUdBNVZscGRzZkxMOFBndHZ0Y2RyczBzbEg0cEFmcTJSOFBlSG9DMTd2a1piK0lzdmcrc2NlQUlDZ3dHYVhUZzR1c3ZiL3NXcmRwZ01JNFRIZTFUaElNRDNITlMrOTd1cmw0MzAvNlpzRWhjeEp0VDdUcGs1aG8yY0QrUXNYa0RNbnl5aXJZOWIxdWdacXZyekVIOS8va0hBNHJOcE9GcnhRZWJUVWF3V1k0NXIvZXdHS2U3ZHE1UXJlK3Mwdm1UYzNqOG5wVHAxc2E2dko2VTdtemMxanc5clZORFUzVTFkL1E2MXBWdDNWMmtQQ3ZjYVRaYk5LOVVvdFZxMWN3WTd0citubjFpRHQyLzgyRlo5V0tkYjF4S0xaRnNrcUtjNEQwNlpPZVN3QUFMejZnNjNZN1hiRk9za3FlU1FoNDFHS0ZqWjZObWhxcEQzV1FVY3NGSGQ3aHpXRlZLdERrN0VkamhRMnZyU2VQMzN3MFpBNkllT1JnRWxLSGZNWEx0REVRSHVzZzRxbWt6VDJOSSs2NzR5a1RGWm52RUNTU0VyWXgvTkxubFdFQUV5eXFNVUZXbDBGenJWZUdCTUFnRHZkUWM2Mlh0REVoK3IrQ0Fvc3lqWGE2VWJuemNUNlIvNmprUk4xNlE3QllVMUpxSCtTSmZGVFlTVHBEaUhQbnB0US95Y2Q4elZ5b2k1Sjd3RVdwK2FUYW5YdzcvQzFVZmQ5MGpHUHJJbGYwOEhWL2RJZEFrQ2VQWWM4ZTQ0UlE0MUp1cDhPajRKTUNKZ1FBQk1DWUVJQVRBaUFDUUV3SVFBbUJNQ0VBSmdRQUJNQ1lFSUFUQWlBQ1FFd0lRQW1CTUNFQUpnUUFCM3ZNWFpFUTV6d1YzRTY4RTlxbW1wSDNUOHplU3E1YVZrc3kzeUdiODNTTjIxS0Z3aSt4a3ZzcnQ1SEtLcWVHekNTZ3BGN0JDUDNPQk84UUdsRE9hOHYya1p1bWo2NUVacWZEcjdHUy96a0gzc1NBdkNncnJjMXNQMThDWUhJWGMyMk9WaWFRdWlJaHRoZHZVL0xUUTRvRkExejNLK1lnWmV3TklWUVdsK202UkV3V0Z0Y2hSUzVOdXV5YlUzbmhETUJiWjRnUDZpZGk3YXhSc2ZKVVZNSTE5dFZjNFBHcEJUSnp2N25TblNiRVB0bFdKeXdldWFLVWJYUFNaMXRDQUF3NEZsa2ltVG5WNHQzVUpDeEFJY3RoY01ONVNQMnlVbWR6ZjRsSlRpa3hCN3J4eXRkajRTYzFObDg4TTEzS01qb1MvMHB5bnVabk5UWncvWlpQWE1GdjF1K1R4R0FQeEtrNk13ZXpYM3FCa0ZwWnh4U0NxL25GNU1pS1dlU2JYRVZzaXUvV0xIT0h3bnkvTEZ0bkx0M1dYT3Z1a0VJUnU0cGx1ZW1aZkdLNitVaDVUc1hiVk85QkZZRnFubXUvRWUwOUhScDZyRmZ1a0dvYWFwbDd4Y0hGZXNLczllek5QTnBvRy9PZUcvWm02cVh3S1ArMDJ3OFZVSjd0RWN2cS9yT0NTZjhYdFVvYjFkK01Vc3pueDcyQ3ZEdXZ6N2tsYk43aWNxeW5qYjF2enE4K2NWQmN0T3lodXlvUTByaDE0dDNxdmJiVmYwMjcxNDdycmM5d0tBNFlmdjVFanFpOFdlemJqMVRZaGdBTUFoQ0tCcG0rL2s5Y1lGWVdWSE1ZZjluQnJqNlNvWkZqTmZiR25pbjlwQnFmVWMweEtLL2ZwZlBtclFOdmVPUm9iZlhUdmk5bE5hWERTbjNSNEk4VS9aOWJvUmJqYlF6SUUwaGpCUU5BaHk4ZkFoZjQ2V0IzeGNiYTNtMjdJZmM3bXlQYTR3cEV4WHowUk9TcGhEeU0rTExqTjlkdlk5QTVDNVZnV28yblB3NW9WZ3M3akdXVDEwNFZudXEwaFJDWWZhNnVOcUZvbUdLei8yQ2I1OTZZMVFBa2kxV1hwcy9OTnBNVkpwQ21KNDhqUzJ1d3JqYU5uYzJNU1BKTnFydC8zVCtKbVlsWjQ3RjJyRFNmR0lzY20yTys5NUJacEtOeVpKMTVJYkFraW01N0Zpd0pSRnJxdExsNnJBcnZ6anVJMkxXUkJ2SkZ0Vlh0ckVLZURWM0RjZFhIdERLM2hEcEZqWVh1VGF6WnBhYjA0RUxuQWtPZisveDY1TzYrUHQvaDc2UTU4N01aM2ZCOTNRNUJRWkwxLzhkcGlkUG96QjdQWVhaNi9VY0ptR1p6eUl4SVFBbUJNQ0VBSmdRQUJNQ1lFSUFUQWlBQ1FFd0lRQW1CTUNFQUpnUUFCTUNZRUlBVEFpQUNRRXdJUUFtQk1DRUFKZ1FBQk1DWUVJQVRBaUFDUUVZNWdsVVdlUGZqUFF4cmxLRmNMc3JZS1NQY1pWNU9tRFFaOGZVTkMxcENwS1FDTWNpdEVUSEoya0x4Z21DeXo2SGhTa0x5TENsRDVUZDZycE5kWHNOd1c3bHhIQTlaZmpwa0dmUHhlMWNkaDhBZ0prVG5tQnR4aW9tMjR6L0xMS2hFQnhXQjhzbWZVTzEzaVlrM003bEJqcnFrNkVRY3UzWldNWHdPVW9adG5RbVAzQ1U2QzFESWRndHlYRzFTNWVNUFNVTWhkRFRHOStMRzFFNXFyT1QrMlVvaEVCUGZPODZCN3FET2p2NVNySk1xd1VaeFkrYzMvcGMrNGp4WnVjdDdvd1FpVmEzMTlEVjI2MzUyR3I3SThCblFjaUtpOExjOHQzUjNBaEFaWE1WTGRFMnhicnJrWG91dHRmb01xN3EvZ2k1d1pyam11ZFVXdHlpMWQvR3pJSVpUSncwUVZNelVUbEdiZWdLemRGbUpsaVNDTVhDM08yNXg2bVdzMXdLWGRGMHJINjEzR3pqNHZ0Zkt0YjE5ckpIdU4wZXAyU1hHb1FZK2sxMzU2dzBWdnhzS1VuMjBlVWdQMHpxRHZkUTlkdXp0UGlISG4yeVRHdGxlYW5UMnRCd3BYT09hLzVFSVlZdWRkVFoxa1ZkVlFPcDAxTkptNkhORi9hTjFLM1BBMVM5ZFpad1UwU3R5ZDY2cTdWZUFYMnIvcWdkRGYyeVp5VHpSTUYwSnRqMS82eDRvdW9LZDNQYkZ5RGNxTHJ6eUxKOEl4cU9GWGk5UjFvR01xdFhydDNrc1ZqRVh3eHgrVEJJRms5VmxIL2tnMEdyLzlSZnUzd2x4elgzeHYvRkNrQnk3OWFLOG84SDNqbThMNUN2dTNyWjl6aURrR1ZhWlZuK1R1V3h3MzhlWEQ0a1lxd29QL3dIWlBHVVdoRDF5RXFtU2lEY254NzcrTWlEVmVwdld3Q3IxbTBzQWtzUmd0RjlCdU1oa2l6ekNSWU9xQzJPQnlOQTZKZmI3WEZhazYxdUljUWpzMlNhTE11K1dDVG1IYndHbkpyK0IzNmdjOEN4U1dkNkFBQUFBRWxGVGtTdVFtQ0NcIiA+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiYnRuXCIgKGNsaWNrKT1cImNoYW5nZVRvUGVvVGVjaCgpXCI+IDxpbWcgc3JjPVwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFJVUFBQUJrQ0FZQUFBQ293dk1iQUFBQUJITkNTVlFJQ0FnSWZBaGtpQUFBQ0pkSlJFRlVlSnp0blcxTVc5Y1p4Ly9ITm1iWUpVQ0FORm1ZQXFOSmVGRUt0RW0wYVpzR1NidDE2eVRJQjhiV2JTSk1WYVYyU1p0VlhWdEZtb0JJMDE2NnFHa1Zta21kR3I2czZpcDF6ZFIxVXR0c2NVdmJyY29MSnNReGJ6R21vODBMMExpR09OaXhmZmJCUkJ1NTJQZk5MOWZIeisramZjNXpIK0VmejNuT3ZkZlhERW5nM2djZS9DN252SmN4dGpVWjhRajFjT0E0V1BqeDQzL3FIOVlieTZJM3dEZmF1OG9Cdk1rWTB4dUswQUVEN3VIYy9BcUFlcjJ4VEhvRFdQTk1PL1hHSUpJREE2djcxZzhmcXRFYlI3Y1VKbzRpdlRHSUpNS2lkcjBoZEV0QmlJZnVuaUlldSs2N0I3ZlpiYWtLbi9OTVRYK0s5ejQ2bFpMWUtaT2k3ZHM3c0c1TmVhckM1enp2L3Z0a3lxU2c1WU9RUUZJUUVrZ0tRZ0pKUVVnZ0tRZ0pKQVVoZ2FRZ0pKQVVoQVNTZ3BCQVVoQVNVbmFhMnloNGcxY3dGWnJSRmFQQlZvbGlzKzZMajFtRHNGSThkK2xOOU0rY2dEUGdUVXE4eXZ4eTdDNXZRV2RaTXlyejF5UWxwbEVSYnZsd0JpWlI1WHdZKzZhT0prMElBUEFHWjlBei9TcWFocDlBLzh5SnBNVTFJa0pKNGZDNzBEVDhDM2lEK3BhTFJQZ2lBWFI1K3JCdjZtaktqcEZwaEpIQ0c3eUNYV08vVGR2eGJpNVBJaUtNRkYyZVB2Z2lnYlFkcjhHMkFXMnJ0NmZ0ZU9sRUNDbWNnVWs0L0s2MEhhKzFaQnNjZFFlRTNaRUlzZnRJcHhDZFpjM29yOTZUdHVObEFwSkNCVWUvL0RQc0xtOUp5N0V5aVJETGh5OThUWFpNZzIyRDV2aEZaaHRlMy9Sa1RnZ0JDQ0tGSE05dTJBM25sb05vTGRtbWVtNlIyUVpIWFMvYVNzUnNLbGRDYUNrMldNc3d1T1VaN0Z2N1BRQkFmL1VlRkptVmYrMmd3YllCM3FZamFMUlZ4UjNqdlhaWmQ1NUdRMWdwV2t1MndYbm53V1VmYUxIWnJyaEpWTExEZU1IekJ1Nzk0R25kdVJvTklhWG9YdCtPWTV1ZVd2RURiU3ZaanNmVzNwOXcvbU5yNzQ4Ny95WXZlTjdBM3RPSE1SdWUxNTJ2MFJCaTkzRXI3ODZmVC9oK1Q4WDNjZXl6anpBVm1wVzhwMlNIMGZwaEQvNzJ5YjkwNVdoa2hLd1VEcjhyNGJXSllyTWR4elkvdGV5MUlyTU5KMnA3WllYWStmN1RRZ3NCQ0NvRklIOXRvdEZXaGU3MTdRQmlEYW1qcmhmTnErSS8yc0YzWXdGYlQreUY0K0pnMG5NMUdrSXVIemZwOHZTaDBWNFpkL2ZRVTlFQmIzQUdoeXE3RXZZUHZoc0x1T1B0TGx3TitGT1ZxcUVRdGxMY3BPVjhOM3lSK0NlMytxdjNKQlRpckg4U1ZXOTE1b3dRUUE1STRZc0UwSEsrVzlQY2dibHp1UHVkUitDL3ZwRGtySXlOOEZJQWdEUGdSWmZuc0tvNWY3NzBIcG9kVHlBYWphWW9LK09TRTFJQVFQK01RL0ZOTVE4T1A0Y0hCbjRGUkhtS3N6SW1PU01GRUdzOG5ZSEpoR04rTlBRTWpvNzhQVTBaR1pPY2tnS0lOWjdlNEpVVjM3dnIvYjE0WmV4NG1qTXlIa0pJb2VhV2UxOGtnRjFqdjF1MkkvRkZydUdMNy93WVF4ZkhWQis3dEVDOGh3TUtJVVdpazA0cjRReDQ4Zk9sTTU1bkZ5Wnh4ejkraXNzK2JYZUFmN084UWRNOEl5UEV5U3UxVWdDeHhyTUFlWGh4K0srSWhpS2Fqc3N0REwvYytBTk5jNDJNRUpXaU1uOE5Pc3VhVmM4N2N2a3RSSFJzT1J2WDFRajViVEVocEFDQVE1VmRxbTZnQVFDWVRPQmxCZUFhL2dwbVd6NyswclJmL2NRc1FCZ3BpczEyT09wNjFZdGhOWU92TGxBMWhlZVpjT2l1aDRXc0VvQkFVZ0N4SzUrYXhMQlpFQzJ4S2hyS0MvUHcwdGVleENQcnZxTWh3K3hBS0NtQW1CamVwaVBvWHQrdVRvN0NmSEI3bnVSbGJnTDRGMHpnaFhuWVZiOFRucGFYaEwrclc0amR4NjBVbSszb3FlaEFUMFVISEg0WEhQNXp5aWF1WC9ubFJuc1ZtbGZWQy91TnNGc1JVb3IvcDNsVnZhWXRheTRqM1BKQjZJZWtJQ1NRRklRRWtvS1FRRklRRWtnS1FnSkpRVWdnS1FnSkpBVWhJV1ZuTkVjbUpuRmw3ck5VaGM5NVB2N2tZc3BpcDB5S1gvZTltS3JRUklxaDVZT1FRRklRRWtnS1FnSkpRVWpRM1dqdStQcFhhODBXNFcvTHlCb3N6Rno5OXN0L1BLMG5CdE16MmUyZUxsMEl6M3N0ZVhtMzZZbERKSTlRS09UYXZxWDJUc2FZNXU4dTZGbytGckY0a0lRd0ZsYXJ0WDV3MVBPUW5oaWFLOFZaOThUZEVZWlRlZzVPcEFZT1BsdkFDMnBxYXl2bXRNelhWQ2s0NTZZd3d4KzB6Q1ZTRHdNclc4VGlRYTN6TlVuaEhQVTh5b0N0V2c5S3BBR0d6ak1qRnpSOVJxcVhEN2Q3dW5TUlhaOEVXR0c4TVZjLzkrUEl5NitCODl4OEVrdzZzQmNVWU05UDJtRkp2UE03MmJpNStpdHFtMDdWbFNKV2x1SUxBUUFEcDUwa1JJcTVkdjA2enJoRzVJWnRjNDU2SGxVYlc1VVVnKzd4WmpCMEpocHo5WE0vem8xZVVKc0hvWUVQend3akhBN0xqSW9lY0x1blM5WEVWU3dGNTl3RXhtU2JTNm9TNlVOWnRXQ0ZhcHRPeFZJc2xhSE5pY1pRbFVnL2lxb0ZRK2ZReU1RT3BURVZTVEUwUGw0QlJBL0lqYU1xa1g0VTloYUlnUGR4cnV4SkhJb0dSU0xzOTNMTkpWV0p6S0drV2pDd0dxVk5wNndVZys3eFpnWjB5STJqS3BFNWxGWUxJSG9nVnZVVGsxQUtsNHRibFRTWFZDVXlqN0tkQ0N1TVZmM0VKSlFpYUpsNEhETE5KVUJWd2dnb3JSWU02SkJyT3VOS01UUStYc0U0WkovMGRXbDJqcXFFUVZCV0xlU2J6cmh2UkNQc3NGeHpDUUFESndlcFNoZ0U1ZFVpY2RPNW9oUkRJeFAzQVdpVkMzNXBkZzVqa3gvTEprR2tENlhWSWxIVEtaSEM1ZUxXS0hCSVNRSURKOFgvUGExc1EvbE9KSDdUS1pFaVpKcllEd1hOSlZVSjQ2SzBXc1JyT3BkSk1UUStYZ0VHUlQvSlMxWEN1Q2l2RnJHbTArWGl5eDRpdXV4aWZLeTVSTDVjb0hBNGd0dExWK1AyMHRWcWNrMGVqQ0ViZWx2R09KQ2hQQzBXNlROQlY0S0IxU3lkZXZqTi8xNWJZbkIwb2cwY3J5Yy92ZVF6NHYwUExzOWV6WFFhc215dXFzRGFUUDNqcUlMUG04eW9hOWk0Y1JwWVdqNWNMbTdsSE05bk5qSGwrT2F6NDlmL2ZQUHhmL3JTV0xEQ3BWVUN3SklVSWRQRWZnWjhLWE5KS1djeEZFSXdlQ1BUYVNnaVcrUmRvblhwVkFSTVR2ZUZUVXFiU3lPUVRYL29ZUEFHRmtPaFRLZWhtQWo0c3k0WHQ1cWlMUG84d0dTYlM2T1FQU1U1UmpaSnpNQnFRcWFKL2V6WVB6L0lnajZlU0IvOEZIM3JuSkJBVWhBU1NBcENBa2xCU0xCd2p0NU1KMEVZQ0diNjlMOW1kZjcycWZ1V2FBQUFBQUJKUlU1RXJrSmdnZz09XCIgPjwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG5cIiAoY2xpY2spPVwiY2hhbmdlVG9QZW9UZWNoKClcIj48aW1nIHNyYz1cImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRjhBQUFCWUNBWUFBQUNUU1N0TkFBQUFCSE5DU1ZRSUNBZ0lmQWhraUFBQUZBSkpSRUZVZUp6ZFhYdDhWTlcxL3RhWnlRTlFlWldIQ1FpS3o0dENoQ1FraUFYOHRTcnZRVWdxSkFUUUlQZVdoN0crQU5zYTdiMUNhMjh2UW10RlFDQUoyUExRQkNGWUh3M2NhaEtTSUNBZ1Z2RWlFQUpVUU1CTHpHUG1mUDBqbVRCelhqT1R6RXhTdm4rUzJXZXZ0ZmR2elo1dnI3MzIydnNJcmlLVXN1SitnaThENkFmZ09NSGpBaHdINUdzQWUyM2d3VVJKUE5ISzNXeUN0SFlIZ29WaTdvc0Y2bzRJSk5xNkppOEJzaHZBamdqSWxuaUpQeDZXRGhyZ3FqSCtibGFNVWNGdGdjb1IzQ2RRdHRpZ3JrcVV4Tk9oNkpzWnJpTGo3NzVSaGZKL0xkRkJZTHNDckVtU2hDM0I2cGNWcmhyakEwQUpLeklCcGdQb1R2QkczeFJrREFKZkNmaE1zaVMrRmVRdWVpSHN4bmRrWlhmS1g1cDlJUnh0ZmNSUFlpTEFmaXJVZUFDRENDUUljSnUvOGdTS2JiQTlQa1FHVllTaWYvWlFLTFdDNHFwekFGZ2JqcmFHeWFBcUFGVUEvdVl1SythaExncXE3MWVCVVFJK0FFZ1BNM2tCaHFwd2xSZXpmSVdLYTU4ZUpyZC9GOHoraFgza1Q1Ni9hSzlUaVJ3WnJ0RnZCWkpTaW9weEFINEdZTGhsWGFBS1lNWlFTZnd3V08wcndWSVVBT0pzenRvUnJkQ3VEaUxDWkVuWW1pd0pJOWhBUzV0TjZ3SXhBdm1naEdWL0NGYjdZVFgrNUxrTEdveXVTSnN3dmllR1NzTGVvWktRSWxEaUFldzJyeWsvTFdGWlJSbkxlcmEwemZDT2ZKRTRBQkFmUC9IV1JKSU0zcE1zQ1VrQ3BCRDhoM0V0R2V3RTlwZXcvSjZXdEJWVzQxTVExL2h2bkNNcnUxTTQydzRVU1pLd0dlaHdCNEUzalo0THBEdUJENHRaOW1CejJ3aXJ0eU9RZ2U3L0czay9QNWo2VjU3WjBFT2NyaWRBRElDQ3d5QU9DOVZETlpIdERzenBudnIvZ2VvYkt2M1BBNWhheklxM0FUVkh1MjRRSUFxUUhhVXNuNUlrQ1g4S1ZIL1l2QjFIVm5ZbnUxcjNyZnN6Z1ZlMkxIc3BLMWo2VjV6ZjJGR3ByajBvZ2w1R3p3a2VCMUJDS25tUDlVb1BPQXp4TWN2dkZHQzdBRGNZUFJkd1dwSWs1Z1dpTTJ5MFkzZld4SGwrRGpidjIycHFrODBNMzlDZTNDQ1FueWpDZDFaVzVwNWZlVEwzTnl2UGJERDE4Ylc0UnhJT3RvTjlJSUJkUnM4SnlkM04zY21COURsOG5LOG9XZzhucUx3Zm9hcmxCUHlpRmhGMEZ1QnBjYnBPcjZyTWZXMUYxWVlmK0NOM3Q5eDk0VHEwdngvQSswYlBYVkFLQXZHQ3dqbmh4bWtMZ3VudlQrODEvWnhBL1NHSS9RRUpDbVlyZEIxZFZabnpoRC9WKzB2L3VtUkp1Qi9nMjNwVjZPWUVkaFR4cUY4eHBiQVpuK0JBWFdHUS9mM00yT2w3TTN0Tmk2dnJvSFJSRk9rUGNEekoxd2ljdFpJVDRCcUkvRzVWWmM2Qk4wN25EUEduclJwY1RvVUJCUWtrTGdwbmYrdVBqckJNdU5ySjFnUDdOaTk3NmU1dzlHRjE1YnBraWpoSW1XbzFOd0FBaGY4OUt5YmpLVjg2UCtMbjE5cHdhUThndDJpZkNUQW1TUklLcmVURFl2eEpjeGM2UkJIZHp4UUFuRXBrNTNESGVWWlg1cVpTdUFBUTB5K2VaR0ZIUms5TzdaMzZ2Wld1RXU3dEM5UlhBTkxWU3g3NE5oTFNQMTdpVDVuSmhvVjJSQkVkMzd2UkduR2VSM3ROMjVnWm16R0lZQ2JBYzBaMVJHVDBKYVgyL2J4emVkZFo2VXFXdTc4R1pESUFlc2tEbmV2QVY2MWt3OFA1cExtQld6SE9NeXMyWTNWMHRISVRnRmNKcWdaVjd2bStocnRXZjdQNldpczl5Wkt3RThBTDJuSUJIQ1VzLzVHWlhGaU1UeEg5Wk51STFvN3pwSGROdjVRWk8yMk9RZzREcU52REZTQk9yWXNzOHVNTGVJSGczN1RsQkphYnlZVGMrSTZzQlgwRnVPTFBreGMxVmRwRW5PZlJYdE5MYUxmSGdkUkZOQVVZck5aRmJsL0ROVDVjU0dXT2dlenR4U3lmYTFpN3VaMzFGemFuanUvM2tkenZYU2M0dkoreU1TVnk0cmEwNlk3Q3RHY21GazRibmxLYzBpNFErVms5cHA1eEtaM3ZBL2lSOXBrQTl6cXI3QnVzNUlkSy9BRUNiK2hsdVlDa1RWc2VldHJSY3JySVRvanN0S3pUREl3b0dtR3Y2eEQxTVVYV2d2SnJranZydm8yOFBHRjdldm40N1duL1BxcHdWSlEvZW1iSGpLdDJTZWNIQ096UlBoTmc0c3JLM0F3cmVRWFJpd0JxUENTSkxVRkZxcjV1aUNHazE4aW55bjFRNldYOFlQRCtkWmRqN2hVZzNsdXZpQUR4Q3VTUGtXcVhZeE8ycFQ4MW9taUd6OVhuN0poeDFXb2t4b0U4Yi9CNDJSdW5Obll6azAyU3U4NEE4cHEyWElBRjJyTFFqM3dSTDhPNjdOem5za2Z0MU5ScU1lOHJ4R1hyYmtnUEViemNxYnIrYzBkaDJpaGYrbVozbTNaS3NlRWh2UjUwZExscWYyY2w2NExOYUlVN29KUVZ3N3o2N0tzVExVRksxaUp2dmljdjVpOWQ4blgrMHV3THdlYjkvSEVieWtpczkxMVQrb0JTNk5pV3ZuSGNPK1BhVzlWODVQcU1YUUIvbzlNZ1NIKzljcjNwMm1XWURLb3k0bjVDbmVyNU9hVEdkN2swd1RSUHJnOEI3eGVNelV1SFlDS0JIQkFIUWJwTUt3dFNGT1c2YmI1b0tETTI0MW1RQjNYaW9pNnprclBCOWtkdEdTRVBrMnl5ZVVpTkw2S0xaTzVyK2k4RXZBOEErYVB6OGd2RzVFM1BINXQzbCtwU1k5bXd5cXczN0I5a1pLZHE1M1pmWHdBVjJ3eTlMTzYxR3YyTmlWWkhOREtkZDJOUDA2SXJ0TWJYR2xSVm13d2VDdDdYWXV1RU44OFVqRmsvQjFKL0I2a1BBVGZpdms3VjlicFI2b2xaTVdsN1NPUm95d1hxa3o2Nm9LTkJnaFBkLzRkNnd2VWFHVTU3ZE5QSUR3WHZteUYvOUorL0toaTcvaUVJUjVNd3lEcVRHWTd0NlZPc2ROaXAvS2RPU3BEKzZvWDFuYzFrYk9BbWJSbUJrZTcvUTJiOHBod2RkNlBFTVYzME1nUzhiNFg4MGV0M1FIZ1BvSGNoQ2F4MDdIaTRyNW5zek41cFh3SjhSMXNlZVZtZFpDYVRLSW1IdENFTEFXNHI1WUVlUUNoSHZuaXZiRVU4K042TkVQRytGUXJHckQrZ0t1cElBcldhdGp0QXRiOWtKU3NVL1FZNU9kV2c2cFhIa0NKOWFjMUlJSVRHcDNheUpiVWNIeGJlTjhMV1VXOStDdUJ4YlRuQmh5Y1VwdjJibVp3UzY5d0tvczVMUmpBODUzUk9Cek1aZ2Z4Vlc2YUNTVUFJamUrWm93TUFJSFVqUHhpODc4aGEwSGZTL0VXUFQ1Ni82UG5KOHhjOXIxdGJtS0JnVE40S2FMWUJCU0pRNVJkbU1qTmxaZzJGNzJsa2xIb3FQN1JvNmhOdGdVQnVCVUprL01iUjYyV0V6Yjlmb2h2NURUMXBIdTlQbnJ0Z3hPUjVDNHZzcW5KVWdLVUFzZ0ZrVThYZVNmTVhIcDAwZitGMFh6cFU0bVY5ZnpEUktnNGtJaDlveTZqU2xDNnZRenZkR2dIQUxVQ0lqSy9OMGRHT2JpODBnL2NmbXJkb0JoU2xDR0w4UlFta3IwRFdUcHEzYUkyVm5xMWo4Z29CZktGcFB5cEt1Z3d6RVlHcUtycE5jNUozbWRYdkwvM3J0Sk11d1J0SktxR2hIVzJPanRGazI0aEFlWC9TM0lVT1JiQUdBS0tpN1VoKzhIYk1XVElXVDc0eUVVKytNaEhqSHgyQ2F6czNSQTFFTUdQeS9FWFpwdjBVa0tEdTZBOVZQR0FtRWhGYjk3bUJucHROMndCQTNSY3N0bExzdXlGVW5PL3Q2ZERjK0FIenZzaFNvTUh3cWZQdnhkQlJkeUM2WFVUVDQxc0d4Q0RqMmZ2UUxhYWp1K2g1UjlZQ1V4ZVM0QTVkRXhUVHpMT1pNck5HbTczczVuQnp5Qmw5bWF1SEhXamc2QWhYcmVsV254dWJsaTgyVEpYVGd1QkE4VWlNRUpzWTgzMVRCZGtKWUtESDV3a3A4eGJxVWsxVXFuRWk2QU1BSXg0YWdPNnh4aitRNkhZUm1EQnJDSEovL1ZmVTFqaGhVNVVzQUlaNW9TZDdYRlBTKzB5MXBqL3NiZGxmeWpFSXVuc1c1WnpPNlo3Uk04TXdwVnpBczlwRUVRRzcyaWZQVzVnRnRlNS9LTDZ6U0J4WjJUN1RQQnhaMloxRXJmTWFhWnVXdm1RNjhnRTA4TDRpVGE2ZkNHWVFvbytueUpYTm9EdUg5TEZVMmJGTEIvUytwUnVPSERpbDIxUHd4Sjc0MSt0N2IwK3JCTVFqbDBkaVFBakVPeVBoeW1PZTBScXpWdGdUZ0tIeENadzFzRzVYaGFMM2Q4M2dqeHVvcTBQNi9MVVk4TDRoM0pibzFhK3JaVDAzdXNVMlVvOW1UMEdubDZJOWhSNHg4YjFwcGhzbUF1aHljYVRlWmxGZk1jaVlZeGNGaEhaRDJ4eCt1SUhhSEIyS1dJOTZHUE8rb2U3R3Y1ZSt0Y3hqMGtPL2FhL1ZxNHRxMnBXYVdxTzZBRUFETDFGc1lwUjY0cGJRN2Q4U2ltcFhiREpEVlprbGhHNVNJdEJKUE5JKy9GcitreVBnUVdHMG1HdzlJY0Jha0E1TDFVQXZFZWwzNlh3MUxwNi9qSTVkVEJlV0FJQWpuellOVU1zK0VPZ2hYcC9wM1BUalRlWmZHS1dqTHRlUExxdGpva2FKVjVmc2pYeXM0MWZBTU1jeXp0Y2hab29NOU95WHplYWY4VGN2WDd3VURZc2xVeml5RnZTMXEzSVVBSXJlT2dCSFpwSnAzUzgvcmNJM1ZVMzJNejBCazdJeHhWWW43T0hKNFFJNVp0VVBBYnRxT1Y5eDJheCtYUWJHVjcremREVURkUU9OY25SOFRyWUJJSC9wa3E4SnJnT0FydzZjd3J2cmRRa0dBQm9NLzVjTm56VDF3V21MTWoxMFhYTk45SENCYUk1SDhRdmoybzFQQmYyMFpSMTZSWmgrWWZTMFNTTUU4cDN2TTFsYU43Q0I5dzFIa3MwcGNSbzJESnJoM1hBcFVWazJWOTBJRWZRNVZIWWNKNDZjeFoxRCtxQmJiRWQ4Yy9JaVRuejVEVTRjOFpqZlNJZlZMMVZST1VwTElRUU5EejhBUURhekZha1N6ZEVnbmtpVjFEcGpDUURnemRwZmlnczQ1WHVSRmNqeTN5aEhKOGpJWDVwOXdXVlRSN2gva1pmT1Y2TjR4MkVVckNwRjhZN0RWd3hQWHFUS2lhWXhKVFFrV1lrZ1RmZEE1QzltTWplY3VTbEJXMGJnNzFaOUZrQzNDT3VFOWwvNE5INGd5My9ESEowUUlIL3BrcSszTEY4Y3B4SXp0YTRzaVdNQVhuRGFvdnB1K2YxaXk5T085ZTBqWndPNFhpTi92R0QwK3MvTVpGeE91VjliSmtTNVdmMzkzTjhCRUsralFnU085WmYrZFQ1cEozOXA5b1ZKOHhidTkvUjZUSTl4R3VUbytOTGZFcnkxL0tXMWFPWWxHaE0veU9pcTFyaWUwem90SXJETXlRRXdXbHNnTmtXWElPdEdEV29HR0hpbWZ3ZjhqV3I2RWZZMXk5SHhTMys0UVloYTY5b2s0bjNqQ0lIVEVaZHJUVGZUMTUxZEZ5c0N2WXRscjlYbGRycWh3cWFMOVF0NEFQRFgrSDd3dm1XT1Rsc0NJUk1LMDVZTFpLVEIwK3hOcVp0TUo4NzZHdEhsV3hMODRORnVqMXI0K0lheC9sMkFuOGIzaC9jdGMzVGFDZ2lac0QwOVZ5QzZWRzZDUlFXajgxNDNGU1VGZ3ZuYWNvRmllRDJBVzRiQXZkcmlDQ2dmQW40YTN4OS8zeXBIcHkxZzlQYVVuaE1LMDNZYWVqZkVPU1hLbG1JYVNBUHd4c204RkVDOG9nQWt2bmUxaXpTOWo2MFVGY01GdU1hN0tlNkpsL2hxSUpDN0YzejcrNlk1T3EySmxPS1VkblhmUmo0aXdIOEIwdEdnU2oySXlXLy9LTWZ3YkJZQWJPUkcyOFdxbWlXaWp5bXNtOTBsMVhSbFMyQ0tRVFN6YWYvQWYrTnJ3NzRlSTkydkhKMXdndG5LK01JdmhpbFFKdFNkeHl3Um1CM3BxWWR3UXY2NDlaYS8wa3RWTmM4SjVFWnRLN0JEbDBUclJoR0w3QUJTdE9VQ1d4Tk4rVzE4bHoxcXAxMzFtb3V1eEhuOHlkRUpBeVpzVDdzTGxFV3kvY2lERUtWVFkxL01VRTlGZFJTTTJxRGJ5ZkxFNnNyY2dUUTQ3QWJ5N1ZrOU00NmF5VVdqdzNnQTJteTJBOGt5K0xEN2c5L2JpRmE4NzArT1RxZ3hadHZVemtMNVh4RThETkhIVWp4QllMZFFCaFdNMm1CNVNIa1pDNk5VNFVhZFBGbXZTSVNQRzFQa09YMjc5SnFjQTd0dng0VDMvY25SQ1RYc05pUkR0VFk2Z0g4UStHWEI2THpYclNaWE45cWZPcmNDQnZ1ekF2ejJrZGdwcG5jeWw3SmlKTUZCMm5JRmFxNzM1MEJnNE84SGxLTVRRcmpxYmFiNStBUlBRRER2UW50N240SXhlU3Y4TWZ6S2t6bHpRQmpsL256V0w3YjNMNjFrQ2VvU3J3amtKRWxTcFdkWlFDUGZpUGR0enRvUlVEdzNUM3p2U0lVQzI4Ym5IaCsvYldxNkFpd2g1QWNBeXdRb1ZTa2ZSMVhYdmJzcGRaUDVRUWtOVmxmbFRpTHhpcmFjWUxWcVY4ZVBsSkZPTTlsaVZqZ0E2aFp3Q3V6NkxHZC9PK1RHcEhrTDkzbkdlVWg2eFgwSXJ0dXliTEhoNXN5L0FocnVaY0Nmalo1Uk9HbFdUSWJwRmI5RlBCb2RqVysrOU42TUJ3RHNTSllFWFV3bzhMd2RUZGhBTktmTHJYSjAyakpJeXFxcXZGOVJZSEpYR3ArM01qd0FST0hjcnd3TUR3SzZ5UmRvanZGVmEwL0daNDVPRzhTYVUyLzJYVjJWOXo3SW44T1lEVlpseG1hOGFLV2poQlZEQlB5WnRwekFpcUdTc05kSUp1RGJCUTE0M3d2QjNEWU1OZFp3VGJTcnl2YU1TM1hxL2ZnbWNHVm1iTVpqVm5vcVdORyt2dUVVaXRkZ0puQWhFdktzbVZ6QUk5OHl6Y09QSEoyMmd0V1Z1YW11S3RzWGdGZ1ova1ZmaGdlQWVuQUZBRjJXbTREUHhFdThhZmloZWZkcWF2MzlSdmlUbzlPYVdIVmlZeGRSNnRKSVpsRndrNW0vUWVLaUtIZzRNeWJqWFY4NmkxbjJGSUIwZzBlRnlaSzQwa3EyZWNiWHhIbmM4RGRISjV4NDQrU2J2VWxuaWdxT2g5UU9KMkR0NDVHN2JSS1I4a2lNK1NMS2pXSldPTVRna0RUQXlnZ29sc2VGZ0dZYTM0ejMvYzNSQ1JWeVR1ZDBxRk1sbldSL29jUVF1RldGOHk0SW9JOUlHb0Jjbk5rclk1RS9iVFhjbzJ4OHZGU2dUTEdpbXl2MW1nbXR2dy95NHVibGkxdjEzcHlWbFRuN1JXUkFvSElrZDRrZGN6TjdaaGlkSXRHaGxCWERDUFU5UUF5dWxKSEhreVhlOG5TNkc4Mi9TMW5QKzYwNjZsZFc1dHdYcU9FSmJGUVVXWnQ1L1RUTHlLWW5pbG4yb0FybUM4VG82RkNldjRZSFdtSjhMZSszOHA0dFJXcjgreG16aEpUYyttdVVQLzIwVTVyUmRaT21LR1o1RnNDWHhjQnVCTXRyY1hsbUlQcWFiWHd0NzRjcVI4ZGZQQlk3clhobFpVNmhpSGd0NDBsOEsyQVJSSXBzaW4zYnpPdW5CSnhSY1lpSElpK2hPZ2ZBVDR5WW1zRGVTQ2cvSG1vUjh6RkNpKzdWOU9SOXA2TGUyQlpTUlZaVjVUNEljZ0FWSElUZ3NOV0doei9ZelU4R3FuQ3VnelpzZmdWRjdSRTVicUFNdEx6dnh3Z3R1ei9memZ0dEtFY25NMmJhdXdCOCt1ZitvSmhsTDZwdy9jSjhqUEt0WkVrMFBmN3ZDeTA3RU9lTzg3VFZISjFtb3BoN3hwYXc3SkRBL0VBMGdKKzN4UEJBQzBlK0IrKzN1Y1ZWYzlCQU1hNC9BT285Rm94OGtlQ2tZTHl5cVVVanZ5bk8wOFp5ZEFKRk1mZU1MV2JadXlwYyt3Qll2WVJtbHdyYndHQzlLNnZsNzB3UjJlbTBSZjNMamZ4eWx0OVczL0NXdVA4QTFGdDkrQjdWQWo2ZEpJbVdkeU1IaWhZYlgxUTFQMzlaNjcvdHpSZUtXWEc3QWpXZVFESWhZNTNBRFEzbXRuYjRDR3hXNEhwQ3UvOGFERnhWYndVRkdrYTBFNHdEcEIrQmZnQnZGc2hnQU5hbjV6UWdXQ0dRckdSSitEaEVYYjI2akYvTTh0VUNQTkpDTmJzRldOcWNWeThGaXF2RytLWGNNNWhRbS92cTFJc0UxeXF3djU0a2cweFBwUVFiWVg4bGEraWdkZ21rZHNQbEZiSkpnV3hOa3ZqM2ZFc0VIMWVOOGE5Ris1SkxxRDRCZysyOGhsYzQ4UUFnbndya000S2xReVd4ckJXNjZZV3JobllBb0pqN1lnWDFtUVF2QThveGdNY1VSQjlydUZ5NjdlR2ZITjBRbFY5dktvSUFBQUFBU1VWT1JLNUNZSUk9XCIgPjwvZGl2PiAgIC0tPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PiAgICAgICBcclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+YCxcclxuICBzdHlsZXM6IFtgLnJvd3t0ZXh0LWFsaWduOmxlZnQ7cGFkZGluZzoxNXB4IDMwcHggMzBweH0uYnRuLWNvbnRhaW5lcntwYWRkaW5nLWxlZnQ6Mi41cmVtfS5jYXJkLXRpdGxle2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1yaWdodDouNXJlbTtjb2xvcjojMzY0NjRmfS5xLWNpcmNsZXt3aWR0aDoxNXB4O2hlaWdodDoxNXB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO2NvbG9yOiM5NDkxOTF9LmZhLXF1ZXN0aW9uLWNpcmNsZXtjb2xvcjojOTQ5MTkxfS5mYS1xdWVzdGlvbi1jaXJjbGU6aG92ZXJ7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6I2EwYTBhMDt0cmFuc2l0aW9uOi41cyBlYXNlLWluLW91dH0uZGF0YXNvdXJjZS1yb3d7cGFkZGluZzoxMHB4fS5kYXRhc291cmNlLXJvdyAuYnRue2JhY2tncm91bmQtY29sb3I6I2VlZTt3aWR0aDoxMDBweDtoZWlnaHQ6NjVweDtib3JkZXI6MDttYXJnaW46MCA1cHggNXB4IDA7cGFkZGluZzoxMnB4O2NvbG9yOiMzNjQ2NGY7Ym9yZGVyLXJhZGl1czo0cHh9LmRhdGFzb3VyY2Utcm93IC5idG46aG92ZXJ7Ym94LXNoYWRvdzoxcHggMXB4IDlweCAwIHJnYmEoMzUsMzUsMzUsLjIpO3RyYW5zaXRpb246LjJzIGVhc2UtaW4tb3V0fS5kYXRhc291cmNlLXJvdyBpbWd7aGVpZ2h0OjQwcHh9LmNhcmQtYm9keXt0ZXh0LWFsaWduOmxlZnQ7Ym94LXNoYWRvdzoxcHggMnB4IDRweCAwIHJnYmEoMCwwLDAsLjEpfS5kYXRhLWljb257ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luLXJpZ2h0OjE1cHg7cG9zaXRpb246cmVsYXRpdmU7Ym90dG9tOjJweH0uYSwuY3tmaWxsOm5vbmV9LmF7c3Ryb2tlOiMwMDB9LmJ7c3Ryb2tlOm5vbmV9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFTb3VyY2VzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBuYXZTdGF0dXM6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgY2hhbmdlVG9QZW9UZWNoKCkge1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5jaGFuZ2VUb1Blb1RlY2goKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBBcGlDYWxsc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9hcGkvYXBpLWNhbGxzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvbW9kZWwvdXNlclwiO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24vbmF2aWdhdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmljZXMvZGF0YS9kYXRhLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImVjYnVpLXBlb3BsZS10ZWNoLWNhcmRcIixcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj5cclxuICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiIHN0eWxlPVwid2lkdGg6IDEwMCVcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgIDxoNSBjbGFzcz1cImNhcmQtdGl0bGVcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGVvcGxlLWljb25cIj48c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjMyXCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDMyIDMyXCI+XHJcbiAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAuNDYpXCI+XHJcbiAgICAgICAgICAgICAgICA8ZyBjbGFzcz1cImFcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTAuNDYpXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY2xhc3M9XCJiXCIgY3g9XCIxNlwiIGN5PVwiMTZcIiByPVwiMTZcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8Y2lyY2xlIGNsYXNzPVwiY1wiIGN4PVwiMTZcIiBjeT1cIjE2XCIgcj1cIjE1LjVcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9nPlxyXG4gICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDcuNzk5IDUuOTIpXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgZD1cIk0xNDEuMTgxLDEwLjM5NWguMTI4YTMuNjg2LDMuNjg2LDAsMCwwLDIuODE2LTEuMjE4YzEuNTM4LTEuNzM0LDEuMjgyLTQuNzA2LDEuMjU0LTQuOTlBNC4wNzYsNC4wNzYsMCwwLDAsMTQzLjQ0Mi41NjMsNC40NDIsNC40NDIsMCwwLDAsMTQxLjI5MywwaC0uMDY4YTQuNDQ5LDQuNDQ5LDAsMCwwLTIuMTQ5LjU0Nyw0LjA3OCw0LjA3OCwwLDAsMC0xLjk2MiwzLjYzOWMtLjAyOC4yODQtLjI4NCwzLjI1NiwxLjI1NCw0Ljk5QTMuNjcyLDMuNjcyLDAsMCwwLDE0MS4xODEsMTAuMzk1Wm0tMy02LjEwOGMwLS4wMTIsMC0uMDI0LDAtLjAzMi4xMzItMi44NjQsMi4xNjUtMy4xNzIsMy4wMzYtMy4xNzJoLjA0OGMxLjA3OS4wMjQsMi45MTIuNDYzLDMuMDM2LDMuMTcyYS4wNzguMDc4LDAsMCwwLDAsLjAzMmMwLC4wMjguMjg0LDIuNzQ1LS45ODcsNC4xNzVhMi42MTgsMi42MTgsMCwwLDEtMi4wNTcuODU1aC0uMDRhMi42MSwyLjYxLDAsMCwxLTIuMDUzLS44NTVDMTM3LjkwNSw3LjAzOSwxMzguMTc3LDQuMzExLDEzOC4xODEsNC4yODdaXCJcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTEzMy4wNDYpXCIgLz5cclxuICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICBkPVwiTTUyLjQ4MSwyNjQuMjEyVjI2NC4yYzAtLjAzMiwwLS4wNjQsMC0uMS0uMDI0LS43OTEtLjA3Ni0yLjY0MS0xLjgxLTMuMjMybC0uMDQtLjAxMmExMS41MjksMTEuNTI5LDAsMCwxLTMuMzE2LTEuNTEuNTM5LjUzOSwwLDEsMC0uNjE5Ljg4MywxMi40MzksMTIuNDM5LDAsMCwwLDMuNjQ3LDEuNjY2Yy45MzEuMzMyLDEuMDM1LDEuMzI2LDEuMDYzLDIuMjM3YS44LjgsMCwwLDAsMCwuMSw3LjI1MSw3LjI1MSwwLDAsMS0uMDg0LDEuMjM0QTE0LjcsMTQuNywwLDAsMSw0NC4yOCwyNjcuMWExNC43ODYsMTQuNzg2LDAsMCwxLTcuMDQ3LTEuNjQyLDYuODY1LDYuODY1LDAsMCwxLS4wODQtMS4yMzRjMC0uMDMyLDAtLjA2NCwwLS4xLjAyOC0uOTExLjEzMi0xLjkwNiwxLjA2My0yLjIzN2ExMi41NTgsMTIuNTU4LDAsMCwwLDMuNjQ3LTEuNjY2LjUzOS41MzksMCwxLDAtLjYxOS0uODgzLDExLjQsMTEuNCwwLDAsMS0zLjMxNiwxLjUxbC0uMDQuMDEyYy0xLjczNC42LTEuNzg2LDIuNDQ1LTEuODEsMy4yMzJhLjguOCwwLDAsMSwwLC4xdi4wMTJhNi4xMjYsNi4xMjYsMCwwLDAsLjIsMS44MS41MTIuNTEyLDAsMCwwLC4yMDguMjUyLDE1LjExMSwxNS4xMTEsMCwwLDAsNy44LDEuOTEsMTUuMTU2LDE1LjE1NiwwLDAsMCw3LjgtMS45MS41MzQuNTM0LDAsMCwwLC4yMDgtLjI1MkE2LjQyNyw2LjQyNywwLDAsMCw1Mi40ODEsMjY0LjIxMlpcIlxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtMzYuMDczIC0yNDguODg3KVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgICAgPC9nPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgIDwvc3Bhbj5QZW9wbGU8L2g1PlxyXG4gICAgICAgICAgPCEtLSA8aSBjbGFzcz1cImZhcyBmYS1xdWVzdGlvbi1jaXJjbGVcIj48L2k+IC0tPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtY2lyY2xlXCI+XHJcbiAgICAgICAgICAgIDxzdmcgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBkYXRhLXByZWZpeD1cImZhc1wiIGRhdGEtaWNvbj1cInF1ZXN0aW9uLWNpcmNsZVwiIGNsYXNzPVwic3ZnLWlubGluZS0tZmEgZmEtcXVlc3Rpb24tY2lyY2xlIGZhLXctMTZcIiByb2xlPVwiaW1nXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTUwNCAyNTZjMCAxMzYuOTk3LTExMS4wNDMgMjQ4LTI0OCAyNDhTOCAzOTIuOTk3IDggMjU2QzggMTE5LjA4MyAxMTkuMDQzIDggMjU2IDhzMjQ4IDExMS4wODMgMjQ4IDI0OHpNMjYyLjY1NSA5MGMtNTQuNDk3IDAtODkuMjU1IDIyLjk1Ny0xMTYuNTQ5IDYzLjc1OC0zLjUzNiA1LjI4Ni0yLjM1MyAxMi40MTUgMi43MTUgMTYuMjU4bDM0LjY5OSAyNi4zMWM1LjIwNSAzLjk0NyAxMi42MjEgMy4wMDggMTYuNjY1LTIuMTIyIDE3Ljg2NC0yMi42NTggMzAuMTEzLTM1Ljc5NyA1Ny4zMDMtMzUuNzk3IDIwLjQyOSAwIDQ1LjY5OCAxMy4xNDggNDUuNjk4IDMyLjk1OCAwIDE0Ljk3Ni0xMi4zNjMgMjIuNjY3LTMyLjUzNCAzMy45NzZDMjQ3LjEyOCAyMzguNTI4IDIxNiAyNTQuOTQxIDIxNiAyOTZ2NGMwIDYuNjI3IDUuMzczIDEyIDEyIDEyaDU2YzYuNjI3IDAgMTItNS4zNzMgMTItMTJ2LTEuMzMzYzAtMjguNDYyIDgzLjE4Ni0yOS42NDcgODMuMTg2LTEwNi42NjcgMC01OC4wMDItNjAuMTY1LTEwMi0xMTYuNTMxLTEwMnpNMjU2IDMzOGMtMjUuMzY1IDAtNDYgMjAuNjM1LTQ2IDQ2IDAgMjUuMzY0IDIwLjYzNSA0NiA0NiA0NnM0Ni0yMC42MzYgNDYtNDZjMC0yNS4zNjUtMjAuNjM1LTQ2LTQ2LTQ2elwiPjwvcGF0aD48L3N2Zz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBwZW9wbGUtcm93XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBlb3BsZS1jYXJkXCIgKm5nRm9yPVwibGV0IHVzZXIgb2YgdXNlcnNcIiAoY2xpY2spPVwib25OYXZpZ2F0ZVRvUGVvcGxlVGVjaCgpXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW9wbGUtY2FyZF9faW1hZ2VcIiAqbmdJZj1cInVzZXIuaW1hZ2VVcmwgPT0gJ25vbmUnIDsgZWxzZSBpbWFnZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL2VuY3J5cHRlZC10Ym4wLmdzdGF0aWMuY29tL2ltYWdlcz9xPXRibjpBTmQ5R2NSNGxxNjBCOFFVTy1JSjdPY3YtNU5uNzdrZUFwb3cyVVJ5Z1dBWlJ3ZHhZbHRVVmI4amxRXCIgPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNpbWFnZT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVvcGxlLWNhcmRfX2ltYWdlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8aW1nIFtzcmNdPVwidXNlci5pbWFnZVVybFwiID5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVvcGxlLWNhcmRfX2RldGFpbHNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicGVvcGxlLWNhcmRfX2RldGFpbHMtLW5hbWVcIj57eyB1c2VyLmZpcnN0TmFtZX19ICB7e3VzZXIubGFzdE5hbWV9fTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicGVvcGxlLWNhcmRfX2RldGFpbHMtLXR5cGVcIiAqbmdJZj1cInVzZXIudHlwZSA9PSAnRmllbGRPZmZpY2VyJ1wiPkZpZWxkIE9mZmljZXI8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInBlb3BsZS1jYXJkX19kZXRhaWxzLS10eXBlXCIgKm5nSWY9XCJ1c2VyLnR5cGUgPT0gJ1RyYWNlYWJpbGl0eUFkdm9jYXRlJ1wiPlRyYWNlYWJpdGlseSBBZG1pbjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicGVvcGxlLWNhcmRfX2RldGFpbHMtLXR5cGVcIiAqbmdJZj1cInVzZXIudHlwZSA9PSAnQWRtaW4nXCI+QWRtaW48L3A+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGVvcGxlLWNhcmRfX25hdmlnYXRpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwZW9wbGUtY2FyZF9fbmF2aWdhdGlvbi0taWNvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gPGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1yaWdodFwiPjwvaT4gLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljb24tYW5nbGUtcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJhbmdsZS1yaWdodFwiIGNsYXNzPVwic3ZnLWlubGluZS0tZmEgZmEtYW5nbGUtcmlnaHQgZmEtdy04XCIgcm9sZT1cImltZ1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI1NiA1MTJcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yMjQuMyAyNzNsLTEzNiAxMzZjLTkuNCA5LjQtMjQuNiA5LjQtMzMuOSAwbC0yMi42LTIyLjZjLTkuNC05LjQtOS40LTI0LjYgMC0zMy45bDk2LjQtOTYuNC05Ni40LTk2LjRjLTkuNC05LjQtOS40LTI0LjYgMC0zMy45TDU0LjMgMTAzYzkuNC05LjQgMjQuNi05LjQgMzMuOSAwbDEzNiAxMzZjOS41IDkuNCA5LjUgMjQuNi4xIDM0elwiPjwvcGF0aD48L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+YCxcclxuICBzdHlsZXM6IFtgLnJvd3twYWRkaW5nOjE1cHggMzBweDt0ZXh0LWFsaWduOmxlZnR9LmNhcmQtYm9keXt0ZXh0LWFsaWduOmxlZnQ7Ym94LXNoYWRvdzoxcHggMnB4IDRweCAwIHJnYmEoMCwwLDAsLjEpfS5jYXJkLXRpdGxle2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1yaWdodDouNXJlbTtjb2xvcjojMzY0NjRmfS5xLWNpcmNsZXt3aWR0aDoxNXB4O2hlaWdodDoxNXB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO2NvbG9yOiM5NDkxOTF9LmZhLXF1ZXN0aW9uLWNpcmNsZXtjb2xvcjojOTQ5MTkxfS5mYS1xdWVzdGlvbi1jaXJjbGU6aG92ZXJ7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6I2EwYTBhMDt0cmFuc2l0aW9uOi41cyBlYXNlLWluLW91dH0ucGVvcGxlLXJvd3twYWRkaW5nOjEwcHh9LnBlb3BsZS1pY29ue2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1yaWdodDoxNXB4O3Bvc2l0aW9uOnJlbGF0aXZlO2JvdHRvbToycHh9LnBlb3BsZS1jYXJke2Rpc3BsYXk6aW5saW5lLWJsb2NrO2JhY2tncm91bmQ6I2YxZWZlZjtoZWlnaHQ6NzBweDtwYWRkaW5nOjhweDttYXJnaW4tcmlnaHQ6NXB4O21hcmdpbi1ib3R0b206NXB4fS5wZW9wbGUtY2FyZDpob3Zlcntib3gtc2hhZG93Oi41cHggLjVweCA1cHggLjJweCByZ2JhKDM1LDM1LDM1LC4xOSk7dHJhbnNpdGlvbjouNXMgZWFzZS1pbi1vdXR9LnBlb3BsZS1jYXJkX19pbWFnZSBpbWd7d2lkdGg6NDVweDtoZWlnaHQ6NDVweDtib3JkZXItcmFkaXVzOjUwJX0ucGVvcGxlLWNhcmQgZGl2e2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0ucGVvcGxlLWNhcmRfX2RldGFpbHN7bWFyZ2luLWxlZnQ6MTZweH0ucGVvcGxlLWNhcmRfX2RldGFpbHMgcHttYXJnaW46M3B4O2ZvbnQtd2VpZ2h0OjQwMDtjb2xvcjojMzY0NjRmfS5wZW9wbGUtY2FyZF9fZGV0YWlscy0tbmFtZSwucGVvcGxlLWNhcmRfX2RldGFpbHMtLXR5cGV7d2lkdGg6MTUwcHg7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzfS5wZW9wbGUtY2FyZF9fbmF2aWdhdGlvbnttYXJnaW4tbGVmdDoxMXB4fS5wZW9wbGUtY2FyZF9fbmF2aWdhdGlvbi0taWNvbntiYWNrZ3JvdW5kOiNmZmY7d2lkdGg6MjVweDtoZWlnaHQ6MjVweDt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItcmFkaXVzOjUwJX0uaWNvbi1hbmdsZS1yaWdodHtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMHB4O3ZlcnRpY2FsLWFsaWduOnRvcCFpbXBvcnRhbnR9LnBlb3BsZS1jYXJkX19uYXZpZ2F0aW9uLS1pY29uOmhvdmVye2N1cnNvcjpwb2ludGVyfS5mYS1hbmdsZS1yaWdodDpob3Zlcnstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxLjEpO3RyYW5zZm9ybTpzY2FsZSgxLjEpfS5hLC5je2ZpbGw6bm9uZX0uYXtzdHJva2U6IzAwMH0uYntzdHJva2U6bm9uZX1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGVvcGxlVGVjaENhcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHVzZXJzOiBhbnlbXSA9IFtdO1xyXG4gIHVzZXJGdWxsTmFtZTogc3RyaW5nO1xyXG4gIHVzZXJUeXBlOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhcGlTZXJ2aWNlOiBBcGlDYWxsc1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudXNlcnMgPSBbXTtcclxuICAgIHRoaXMudXNlcnMgPSB0aGlzLmRhdGFTZXJ2aWNlLnVzZXJzO1xyXG4gICAgY29uc29sZS5sb2coXCJpbmNvbWluZyB1c2VyIGFyZSA6IFwiICsgdGhpcy51c2Vycyk7XHJcbiAgfVxyXG5cclxuICBvbk5hdmlnYXRlVG9QZW9wbGVUZWNoKCkge1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5jaGFuZ2VUb1Blb1RlY2goKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IEJsb2NrY2hhaW5Qcm9vZnNDYXJkQ29tcG9uZW50IH0gZnJvbSBcIi4vYmxvY2tjaGFpbi1wcm9vZnMtY2FyZC9ibG9ja2NoYWluLXByb29mcy1jYXJkLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlc0NvbXBvbmVudCB9IGZyb20gXCIuL2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFBlb3BsZVRlY2hDYXJkQ29tcG9uZW50IH0gZnJvbSBcIi4vcGVvcGxlLXRlY2gtY2FyZC9wZW9wbGUtdGVjaC1jYXJkLmNvbXBvbmVudFwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPdmVydmlld01vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5cclxuaW1wb3J0IHsgVGFiTmF2Q29tcG9uZW50IH0gZnJvbSBcIi4vc2hhcmVkL3RhYi1uYXYvdGFiLW5hdi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQmxvY2tjaGFpblByb29mc0NvbXBvbmVudCB9IGZyb20gXCIuL2ZlYXR1cmVzL2Jsb2NrY2hhaW4tcHJvb2ZzL2Jsb2NrY2hhaW4tcHJvb2ZzLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQZW9wbGVUZWNoQ29tcG9uZW50IH0gZnJvbSBcIi4vZmVhdHVyZXMvcGVvcGxlLXRlY2gvcGVvcGxlLXRlY2guY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBNYWluVmlld0NvbXBvbmVudCB9IGZyb20gXCIuL2ZlYXR1cmVzL292ZXJ2aWV3L21haW4tdmlldy9tYWluLXZpZXcuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEJsb2NrY2hhaW5Qcm9vZnNDYXJkQ29tcG9uZW50IH0gZnJvbSBcIi4vZmVhdHVyZXMvb3ZlcnZpZXcvYmxvY2tjaGFpbi1wcm9vZnMtY2FyZC9ibG9ja2NoYWluLXByb29mcy1jYXJkLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlc0NvbXBvbmVudCB9IGZyb20gXCIuL2ZlYXR1cmVzL292ZXJ2aWV3L2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFBlb3BsZVRlY2hDYXJkQ29tcG9uZW50IH0gZnJvbSBcIi4vZmVhdHVyZXMvb3ZlcnZpZXcvcGVvcGxlLXRlY2gtY2FyZC9wZW9wbGUtdGVjaC1jYXJkLmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0IHsgT3ZlcnZpZXdNb2R1bGUgfSBmcm9tIFwiLi9mZWF0dXJlcy9vdmVydmlldy9vdmVydmlldy5tb2R1bGVcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgT3ZlcnZpZXdNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gIF0sXHJcblxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgVGFiTmF2Q29tcG9uZW50LFxyXG4gICAgQmxvY2tjaGFpblByb29mc0NvbXBvbmVudCxcclxuICAgIFBlb3BsZVRlY2hDb21wb25lbnQsXHJcbiAgICBNYWluVmlld0NvbXBvbmVudCxcclxuICAgIEJsb2NrY2hhaW5Qcm9vZnNDYXJkQ29tcG9uZW50LFxyXG4gICAgRGF0YVNvdXJjZXNDb21wb25lbnQsXHJcbiAgICBQZW9wbGVUZWNoQ2FyZENvbXBvbmVudFxyXG4gIF0sXHJcblxyXG4gIGV4cG9ydHM6IFtcclxuICAgIFRhYk5hdkNvbXBvbmVudCxcclxuICAgIEJsb2NrY2hhaW5Qcm9vZnNDb21wb25lbnQsXHJcbiAgICBQZW9wbGVUZWNoQ29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRWNvbUJsb2NrY2hhaW5VaU1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOlsiXy51bmlxIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7SUFVRTs2QkFGdUIsSUFBSSxPQUFPLEVBQU87S0FFekI7Ozs7SUFFaEIsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7UUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3pDOzs7O0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFB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