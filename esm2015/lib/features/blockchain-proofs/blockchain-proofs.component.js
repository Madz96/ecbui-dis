/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from "@angular/core";
import { ApiCallsService } from "../../core/api/api-calls.service";
import { DataService } from '../../core/services/data/data.service';
export class BlockchainProofsComponent {
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
if (false) {
    /** @type {?} */
    BlockchainProofsComponent.prototype.proofs;
    /** @type {?} */
    BlockchainProofsComponent.prototype.tdpid;
    /** @type {?} */
    BlockchainProofsComponent.prototype.api;
    /** @type {?} */
    BlockchainProofsComponent.prototype.dataService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tjaGFpbi1wcm9vZnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZWNvbS1ibG9ja2NoYWluLXVpLyIsInNvdXJjZXMiOlsibGliL2ZlYXR1cmVzL2Jsb2NrY2hhaW4tcHJvb2ZzL2Jsb2NrY2hhaW4tcHJvb2ZzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBaUlwRSxNQUFNOzs7OztJQU1KLFlBQ1UsS0FDQTtRQURBLFFBQUcsR0FBSCxHQUFHO1FBQ0gsZ0JBQVcsR0FBWCxXQUFXO3FCQUxOLEVBQUU7S0FNWDs7OztJQUVOLFFBQVE7Ozs7Ozs7UUFPTixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBQ3pFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7S0FDdkM7Ozs7O0lBV0QsaUJBQWlCLENBQUMsZUFBdUI7UUFDdkMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQWlCLEVBQUUsRUFBRTtZQUN0RCxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQixRQUFRLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVDLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7S0FFOUI7OztZQXJLRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBeUhYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLHNzQkFBc3NCLENBQUM7YUFDanRCOzs7O1lBbElRLGVBQWU7WUFFZixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBBcGlDYWxsc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9hcGkvYXBpLWNhbGxzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUHJvb2YgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL21vZGVsL3Byb29mXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9kYXRhL2RhdGEuc2VydmljZSc7XHJcbi8vIGltcG9ydCB7Q2xpcGJvYXJkfSBmcm9tICd0cy1jbGlwYm9hcmQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiZWNidWktYmxvY2tjaGFpbi1wcm9vZnNcIixcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICA8ZGl2IGNsYXNzPVwicm93IGhlYWRlci1yb3dcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMiBoZWFkLWNvbC1sZWZ0XCI+UHJvb2YgVHlwZTwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbC1tZCBoZWFkLWNvbC1taWRkbGVcIj5UcmFuc2FjdGlvbiBJRDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbC1tZCBoZWFkLWNvbC1yaWdodFwiPkRlc2NyaXB0aW9uPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIiAqbmdGb3I9XCJsZXQgcHJvb2Ygb2YgcHJvb2ZzXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTIgY29sLWxlZnRcIj5cclxuICAgICAgICAgICAgPHA+e3twcm9vZj8ubmFtZX19PC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kIHRpZC1jb2wgY29sLW1pZGRsZVwiPlxyXG4gICAgICAgICAgICA8IS0tIDxwPmFjY2NiYzVmNDczZTMzMDUyZjY1ZjA5NzMwYzlhODNkZjIwYzFkMGNkZGJjYmIwMGJkMDBmM2Y0MWUwMWI5ZGQ8L3A+IC0tPlxyXG4gICAgICAgICAgICA8YSAqbmdJZj1cInByb29mPy5VcmwgIT0gJ05vdCBGb3VuZCdcIiBocmVmPVwie3twcm9vZj8uVXJsfX1cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+XHJcbiAgICAgICAgICAgICAgPHAgI1R4bmhhc2g+e3twcm9vZj8uVHhuaGFzaH19PC9wPlxyXG4gICAgICAgICAgICA8L2E+XHJcblxyXG4gICAgICAgICAgICA8cCAqbmdJZj1cInByb29mPy5VcmwgPT0gJ05vdCBGb3VuZCdcIj57e3Byb29mPy5UeG5oYXNofX08L3A+XHJcbiAgICAgICAgICAgIDwhLS0gPHA+e3twcm9vZi5UeG5oYXNofX08L3A+IC0tPlxyXG4gICAgICAgICAgICA8IS0tIDxpIGNsYXNzPVwiZmFyIGZhLWNsb25lXCI+PC9pPiAtLT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvcHktaWNvblwiICpuZ0lmPVwicHJvb2Y/LlVybCAhPSAnTm90IEZvdW5kJ1wiIChjbGljayk9XCJjb3B5VHJhbnNhY3Rpb25JRChwcm9vZi5UeG5oYXNoKVwiPlxyXG4gICAgICAgICAgICAgIDxzdmcgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBkYXRhLXByZWZpeD1cImZhclwiIGRhdGEtaWNvbj1cImNsb25lXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzPVwic3ZnLWlubGluZS0tZmEgZmEtY2xvbmUgZmEtdy0xNlwiIHJvbGU9XCJpbWdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPlxyXG4gICAgICAgICAgICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgICAgICAgICAgICAgIGQ9XCJNNDY0IDBIMTQ0Yy0yNi41MSAwLTQ4IDIxLjQ5LTQ4IDQ4djQ4SDQ4Yy0yNi41MSAwLTQ4IDIxLjQ5LTQ4IDQ4djMyMGMwIDI2LjUxIDIxLjQ5IDQ4IDQ4IDQ4aDMyMGMyNi41MSAwIDQ4LTIxLjQ5IDQ4LTQ4di00OGg0OGMyNi41MSAwIDQ4LTIxLjQ5IDQ4LTQ4VjQ4YzAtMjYuNTEtMjEuNDktNDgtNDgtNDh6TTM2MiA0NjRINTRhNiA2IDAgMCAxLTYtNlYxNTBhNiA2IDAgMCAxIDYtNmg0MnYyMjRjMCAyNi41MSAyMS40OSA0OCA0OCA0OGgyMjR2NDJhNiA2IDAgMCAxLTYgNnptOTYtOTZIMTUwYTYgNiAwIDAgMS02LTZWNTRhNiA2IDAgMCAxIDYtNmgzMDhhNiA2IDAgMCAxIDYgNnYzMDhhNiA2IDAgMCAxLTYgNnpcIj5cclxuICAgICAgICAgICAgICAgIDwvcGF0aD5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQgY29sLXJpZ2h0XCI+XHJcbiAgICAgICAgICAgIDxwPnt7cHJvb2Y/LmRlc2NyaXB0aW9ufX08L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8IS0tIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTIgY29sLWxlZnRcIj5cclxuICAgICAgICAgICAgPHA+UG9FPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kIHRpZC1jb2wgY29sLW1pZGRsZVwiPlxyXG4gICAgICAgICAgICA8cD5hY2NjYmM1ZjQ3M2UzMzA1MmY2NWYwOTczMGM5YTgzZGYyMGMxZDBjZGRiY2JiMDBiZDAwZjNmNDFlMDFiOWRkPC9wPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhciBmYS1jbG9uZVwiPjwvaT5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZCBjb2wtcmlnaHRcIj5cclxuICAgICAgICAgICAgPHA+UHJvb2YgdGhhdCBhIGdpdmVuIGRhdGEgZXhpc3RlZCBpbiB0aGUgYmxvY2tjaGFpbjwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTIgY29sLWxlZnRcIj5cclxuICAgICAgICAgICAgPHA+UG9FPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kIHRpZC1jb2wgY29sLW1pZGRsZVwiPlxyXG4gICAgICAgICAgICA8cD5hY2NjYmM1ZjQ3M2UzMzA1MmY2NWYwOTczMGM5YTgzZGYyMGMxZDBjZGRiY2JiMDBiZDAwZjNmNDFlMDFiOWRkPC9wPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhciBmYS1jbG9uZVwiPjwvaT5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZCBjb2wtcmlnaHRcIj5cclxuICAgICAgICAgICAgPHA+UHJvb2YgdGhhdCBhIGdpdmVuIGRhdGEgZXhpc3RlZCBpbiB0aGUgYmxvY2tjaGFpbjwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTIgY29sLWxlZnRcIj5cclxuICAgICAgICAgICAgPHA+UG9FPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kIHRpZC1jb2wgY29sLW1pZGRsZVwiPlxyXG4gICAgICAgICAgICA8cD5hY2NjYmM1ZjQ3M2UzMzA1MmY2NWYwOTczMGM5YTgzZGYyMGMxZDBjZGRiY2JiMDBiZDAwZjNmNDFlMDFiOWRkPC9wPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhciBmYS1jbG9uZVwiPjwvaT5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZCBjb2wtcmlnaHRcIj5cclxuICAgICAgICAgICAgPHA+UHJvb2YgdGhhdCBhIGdpdmVuIGRhdGEgZXhpc3RlZCBpbiB0aGUgYmxvY2tjaGFpbjwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PiAtLT5cclxuICA8IS0tIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxlZnRcIj5Qb0U8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWlkZGxlXCI+XHJcbiAgICAgICAgICAgICAgPHA+PC9wPmFjY2NiYzVmNDczZTMzMDUyZjY1ZjA5NzMwYzlhODNkZjIwYzFkMGNkZGJjYmIwMGJkMDBmM2Y0MWUwMWI5ZGRcclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1yaWdodFwiPlByb29mIHRoYXQgYSBnaXZlbiBkYXRhIGV4aXN0ZWQgaW4gdGhlIGJsb2NrY2hhaW4uPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+IC0tPlxyXG4gIDwhLS0gPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNhcmRcIiBzdHlsZT1cIndpZHRoOiAxMDAlXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxlZnRcIj5Qb0c8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWlkZGxlXCI+PGEgdGFyZ2V0PVwiX2JsYW5rXCJcclxuICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly93d3cuc3RlbGxhci5vcmcvbGFib3JhdG9yeS8jZXhwbG9yZXI/cmVzb3VyY2U9b3BlcmF0aW9ucyZlbmRwb2ludD1mb3JfdHJhbnNhY3Rpb24mdmFsdWVzPWV5SjBjbUZ1YzJGamRHbHZiaUk2SWpBek0yUTFOak15TnpRNU9EWmxNREEyWW1GbVlUTXlOVGxsWWpNNE0ySTFOR1UzWlRnM016VTFZVFJoTTJKaE5XWXpNalEzWldJeVpEY3dOemxoTW1VaWZRJTNEJTNEJm5ldHdvcms9cHVibGljXCI+XHJcbiAgICAgICAgICAgICAgMDMzZDU2MzI3NDk4NmUwMDZiYWZhMzI1OWViMzgzYjU0ZTdlODczNTVhNGEzYmE1ZjMyNDdlYjJkNzA3OWEyZTwvYT5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1yaWdodFwiPlByb29mIG9mIGluaXRpYWxpemF0aW9uIG9mIGEgdHJhY2ViaWxpdHkgaXRlbS48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj4gLS0+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2Aucm93e3BhZGRpbmc6MTBweDt0ZXh0LWFsaWduOmxlZnR9LmhlYWRlci1yb3d7cGFkZGluZzozNXB4IDEwcHggNXB4fS5jYXJke3dpZHRoOjEwMCV9LmNhcmQtYm9keXtwYWRkaW5nOjJweDt0ZXh0LWFsaWduOmxlZnR9LnRpZC1jb2x7bWF4LXdpZHRoOjI2MHB4fS50aWQtY29sIHB7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6NzAlO3doaXRlLXNwYWNlOm5vd3JhcDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpc30uZmEtY2xvbmV7dmVydGljYWwtYWxpZ246dG9wO21hcmdpbjozcHh9LmZhLWNsb25lOmhvdmVye2N1cnNvcjpwb2ludGVyOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEuMSk7dHJhbnNmb3JtOnNjYWxlKDEuMSl9LmNvcHktaWNvbnt3aWR0aDoyNHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOnRvcH0uY29sLWxlZnQsLmNvbC1taWRkbGUsLmNvbC1yaWdodHtjb2xvcjojMzY0NjRmfS5jb2wtbWlkZGxlLC5jb2wtcmlnaHR7Zm9udC13ZWlnaHQ6MzAwfS5oZWFkLWNvbC1sZWZ0e3dpZHRoOjI3JTtmb250LXdlaWdodDo0MDB9LmhlYWQtY29sLW1pZGRsZXttYXgtd2lkdGg6MjYwcHg7Zm9udC13ZWlnaHQ6NDAwfS5oZWFkLWNvbC1yaWdodHt3aWR0aDozMCU7Zm9udC13ZWlnaHQ6NDAwfS5jb250YWluZXJ7YmFja2dyb3VuZC1jb2xvcjojZWVlO21heC13aWR0aDoxMDAlIWltcG9ydGFudH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQmxvY2tjaGFpblByb29mc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgLy8gcHJvb2Y6IFByb29mO1xyXG4gIHByb29mcztcclxuICB0ZHBpZDogYW55W10gPSBbXTtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhcGk6IEFwaUNhbGxzU2VydmljZSxcclxuICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlXHJcbiAgICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy8gdGhpcy50ZHBpZCA9IHRoaXMuZGF0YVNlcnZpY2UudGVtcGxhdGVEYXRhLnRkcGlkO1xyXG4gICAgLy8gdGhpcy5wcm9vZiA9IHt9IGFzIFByb29mO1xyXG4gICAgLy8gdGhpcy5hcGkuZ2V0UHJvb2YodGhpcy50ZHBpZFswXSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XHJcbiAgICAvLyAgIC8vdGhpcy5zZXRSZXN1bHQocmVzdWx0KTtcclxuICAgIC8vICAgdGhpcy5wcm9vZiA9IHJlc3VsdDtcclxuICAgIC8vIH0pO1xyXG4gICAgY29uc29sZS5sb2coJ2RhdGEgZm9yIHByb29mcyAnICsgSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhU2VydmljZS5wcm9vZnMpKVxyXG4gICAgdGhpcy5wcm9vZnMgPSB0aGlzLmRhdGFTZXJ2aWNlLnByb29mcztcclxuICB9XHJcblxyXG4gIC8vIG9uQ29weShUeG5oYXNoKSB7XHJcbiAgLy8gICBDbGlwYm9hcmQuY29weShUeG5oYXNoKTtcclxuICAvLyAgIGNvbnNvbGUubG9nKCdjb3BpZWQnKVxyXG4gIC8vIH1cclxuXHJcbiAgLy8gc2V0UmVzdWx0KHJlc3VsdDogYW55KSB7XHJcbiAgLy8gICB0aGlzLnByb29mID0gcmVzdWx0O1xyXG4gIC8vIH1cclxuXHJcbiAgY29weVRyYW5zYWN0aW9uSUQodHJhbnNhY3Rpb25IYXNoOiBzdHJpbmcpIHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvcHknLCAoZTogQ2xpcGJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgZS5jbGlwYm9hcmREYXRhLnNldERhdGEoJ3RleHQvcGxhaW4nLCAodHJhbnNhY3Rpb25IYXNoKSk7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29weScsIG51bGwpO1xyXG4gICAgfSk7XHJcbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xyXG5cclxuICB9XHJcbn1cclxuIl19