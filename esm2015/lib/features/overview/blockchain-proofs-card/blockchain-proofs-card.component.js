/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from "@angular/core";
import { NavigationService } from "../../../core/services/navigation/navigation.service";
import { DataService } from "../../../core/services/data/data.service";
export class BlockchainProofsCardComponent {
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
if (false) {
    /** @type {?} */
    BlockchainProofsCardComponent.prototype.navStatus;
    /** @type {?} */
    BlockchainProofsCardComponent.prototype.proofs;
    /** @type {?} */
    BlockchainProofsCardComponent.prototype.navigationService;
    /** @type {?} */
    BlockchainProofsCardComponent.prototype.dataService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tjaGFpbi1wcm9vZnMtY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9lY29tLWJsb2NrY2hhaW4tdWkvIiwic291cmNlcyI6WyJsaWIvZmVhdHVyZXMvb3ZlcnZpZXcvYmxvY2tjaGFpbi1wcm9vZnMtY2FyZC9ibG9ja2NoYWluLXByb29mcy1jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUN6RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFnRHZFLE1BQU07Ozs7O0lBSUosWUFDVSxtQkFDQTtRQURBLHNCQUFpQixHQUFqQixpQkFBaUI7UUFDakIsZ0JBQVcsR0FBWCxXQUFXO3NCQUpaLEVBQUU7S0FLUDs7OztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ25EOzs7O0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLENBQUM7S0FDM0M7OztZQS9ERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlDTDtnQkFDTCxNQUFNLEVBQUUsQ0FBQyx1ekJBQXV6QixDQUFDO2FBQ2wwQjs7OztZQWhEUSxpQkFBaUI7WUFDakIsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uL25hdmlnYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL2RhdGEvZGF0YS5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJlY2J1aS1ibG9ja2NoYWluLXByb29mcy1jYXJkXCIsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XHJcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNhcmRcIiBzdHlsZT1cIndpZHRoOiAxMDAlXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICA8aDUgY2xhc3M9XCJjYXJkLXRpdGxlXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImV5ZS1pY29uXCI+XHJcbiAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMzJcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgMzIgMzJcIj5cclxuICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMC40NilcIj5cclxuICAgICAgICAgICAgICAgIDxnIGNsYXNzPVwiYVwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtMC40NilcIj5cclxuICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjbGFzcz1cImNcIiBjeD1cIjE2XCIgY3k9XCIxNlwiIHI9XCIxNlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY2xhc3M9XCJkXCIgY3g9XCIxNlwiIGN5PVwiMTZcIiByPVwiMTUuNVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoNS4xMDIgMTAuMDM0KVwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCAwKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwIDApXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz1cImJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTIxLjg3MiwxMTYuMTUxYTEzLjc2MiwxMy43NjIsMCwwLDAtNC42NzQtMy44MjcsMTMuNDg1LDEzLjQ4NSwwLDAsMC01LjkxLTEuNDI2Yy0uMDU3LDAtLjI4NywwLS4zNDQsMGExMy40ODYsMTMuNDg2LDAsMCwwLTUuOTEsMS40MjYsMTMuNzYxLDEzLjc2MSwwLDAsMC00LjY3NCwzLjgyNywxLjcsMS43LDAsMCwwLDAsMi4wOTQsMTMuNzYxLDEzLjc2MSwwLDAsMCw0LjY3NCwzLjgyNywxMy40ODUsMTMuNDg1LDAsMCwwLDUuOTEsMS40MjZjLjA1NywwLC4yODcsMCwuMzQ0LDBhMTMuNDg2LDEzLjQ4NiwwLDAsMCw1LjkxLTEuNDI2LDEzLjc2MSwxMy43NjEsMCwwLDAsNC42NzQtMy44MjdBMS43LDEuNywwLDAsMCwyMS44NzIsMTE2LjE1MVpNNS40MzcsMTIxLjI2M2ExMi44NTIsMTIuODUyLDAsMCwxLTQuMzY1LTMuNTc0LjguOCwwLDAsMSwwLS45ODEsMTIuNzYsMTIuNzYsMCwwLDEsNS44MzQtNC4yLDYuMjkzLDYuMjkzLDAsMCwwLDAsOS4zNzRBMTIuNzUxLDEyLjc1MSwwLDAsMSw1LjQzNywxMjEuMjYzWm01LjY3OCwxLjMzM2E1LjQsNS40LDAsMSwxLDUuNC01LjRBNS40LDUuNCwwLDAsMSwxMS4xMTUsMTIyLjZabTEwLjA0My00LjkwN2ExMi43MzgsMTIuNzM4LDAsMCwxLTUuODMzLDQuMTk1LDYuMjkzLDYuMjkzLDAsMCwwLDAtOS4zNzMsMTIuNzY1LDEyLjc2NSwwLDAsMSw1LjgzNSw0LjJBLjguOCwwLDAsMSwyMS4xNTksMTE3LjY4OVpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMC4wMDIgLTExMC44OTcpXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDguODA3IDMuOTkxKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPVwiYlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBkPVwiTTIwNS4xMTUsMjAyLjhhMi4zMSwyLjMxLDAsMSwwLDIuMzEsMi4zMUEyLjMxMywyLjMxMywwLDAsMCwyMDUuMTE1LDIwMi44Wm0wLDMuNzE2YTEuNDA2LDEuNDA2LDAsMSwxLDEuNDA2LTEuNDA2QTEuNDA3LDEuNDA3LDAsMCwxLDIwNS4xMTUsMjA2LjUyWlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTIwMi44MDUgLTIwMi44MDQpXCIgLz5cclxuICAgICAgICAgICAgICAgICAgPC9nPlxyXG4gICAgICAgICAgICAgICAgPC9nPlxyXG4gICAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICA8L3NwYW4+QmxvY2tjaGFpbiBQcm9vZnM8L2g1PlxyXG4gICAgICAgICAgPCEtLSA8aSBjbGFzcz1cImZhcyBmYS1xdWVzdGlvbi1jaXJjbGVcIiA+PC9pPiAtLT5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWNpcmNsZVwiPlxyXG4gICAgICAgICAgPHN2ZyBhcmlhLWhpZGRlbj1cInRydWVcIiBmb2N1c2FibGU9XCJmYWxzZVwiIGRhdGEtcHJlZml4PVwiZmFzXCIgZGF0YS1pY29uPVwicXVlc3Rpb24tY2lyY2xlXCIgY2xhc3M9XCJzdmctaW5saW5lLS1mYSBmYS1xdWVzdGlvbi1jaXJjbGUgZmEtdy0xNlwiIHJvbGU9XCJpbWdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNTA0IDI1NmMwIDEzNi45OTctMTExLjA0MyAyNDgtMjQ4IDI0OFM4IDM5Mi45OTcgOCAyNTZDOCAxMTkuMDgzIDExOS4wNDMgOCAyNTYgOHMyNDggMTExLjA4MyAyNDggMjQ4ek0yNjIuNjU1IDkwYy01NC40OTcgMC04OS4yNTUgMjIuOTU3LTExNi41NDkgNjMuNzU4LTMuNTM2IDUuMjg2LTIuMzUzIDEyLjQxNSAyLjcxNSAxNi4yNThsMzQuNjk5IDI2LjMxYzUuMjA1IDMuOTQ3IDEyLjYyMSAzLjAwOCAxNi42NjUtMi4xMjIgMTcuODY0LTIyLjY1OCAzMC4xMTMtMzUuNzk3IDU3LjMwMy0zNS43OTcgMjAuNDI5IDAgNDUuNjk4IDEzLjE0OCA0NS42OTggMzIuOTU4IDAgMTQuOTc2LTEyLjM2MyAyMi42NjctMzIuNTM0IDMzLjk3NkMyNDcuMTI4IDIzOC41MjggMjE2IDI1NC45NDEgMjE2IDI5NnY0YzAgNi42MjcgNS4zNzMgMTIgMTIgMTJoNTZjNi42MjcgMCAxMi01LjM3MyAxMi0xMnYtMS4zMzNjMC0yOC40NjIgODMuMTg2LTI5LjY0NyA4My4xODYtMTA2LjY2NyAwLTU4LjAwMi02MC4xNjUtMTAyLTExNi41MzEtMTAyek0yNTYgMzM4Yy0yNS4zNjUgMC00NiAyMC42MzUtNDYgNDYgMCAyNS4zNjQgMjAuNjM1IDQ2IDQ2IDQ2czQ2LTIwLjYzNiA0Ni00NmMwLTI1LjM2NS0yMC42MzUtNDYtNDYtNDZ6XCI+PC9wYXRoPjwvc3ZnPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICA8ZGl2IGNsYXNzPVwicm93IHByb29mcy1yb3dcIj5cclxuICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuXCIgKm5nRm9yPVwibGV0IHByb29mIG9mIHByb29mc1wiIChjbGljayk9XCJjaGFuZ2VUb0JDUHJvb2ZzKClcIj57eyBwcm9vZi5uYW1lIH19PC9kaXY+XHJcbiAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PmAsXHJcbiAgc3R5bGVzOiBbYC5yb3d7cGFkZGluZzozMHB4IDMwcHggMTVweDt0ZXh0LWFsaWduOmxlZnR9LmJ0bntiYWNrZ3JvdW5kLWNvbG9yOiNlZWU7d2lkdGg6MTY1cHg7aGVpZ2h0OjM0cHg7Ym9yZGVyOjA7bWFyZ2luLXJpZ2h0OjVweDtjb2xvcjojMzY0NjRmO2JvcmRlci1yYWRpdXM6NHB4O21hcmdpbi1ib3R0b206NXB4fS5idG46aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojOWQ5ZDlkO2NvbG9yOiNmZmZ9LmJ0bi1jb250YWluZXJ7cGFkZGluZy1sZWZ0OjIuNXJlbX0uY2FyZC10aXRsZXtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tcmlnaHQ6LjVyZW07Y29sb3I6IzM2NDY0Zn0ucS1jaXJjbGV7d2lkdGg6MTVweDtoZWlnaHQ6MTVweDtkaXNwbGF5OmlubGluZS1ibG9jaztjb2xvcjojOTQ5MTkxfS5mYS1xdWVzdGlvbi1jaXJjbGV7Y29sb3I6Izk0OTE5MX0uZmEtcXVlc3Rpb24tY2lyY2xlOmhvdmVye2N1cnNvcjpwb2ludGVyO2NvbG9yOiNhMGEwYTA7dHJhbnNpdGlvbjouNXMgZWFzZS1pbi1vdXR9LnByb29mcy1yb3d7cGFkZGluZzoxMHB4fS5wcm9vZnMtcm93IC5idG46aG92ZXJ7dHJhbnNpdGlvbjouNXMgZWFzZS1pbi1vdXR9LmNhcmQtbmFtZXtwYWRkaW5nLXRvcDozMHB4fS5jYXJkLWJvZHl7dGV4dC1hbGlnbjpsZWZ0O2JveC1zaGFkb3c6MXB4IDJweCA0cHggMCByZ2JhKDAsMCwwLC4xKX0uZXllLWljb257ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luLXJpZ2h0OjE1cHg7cG9zaXRpb246cmVsYXRpdmU7Ym90dG9tOjJweH0uYSwuZHtmaWxsOm5vbmV9LmEsLmJ7c3Ryb2tlOiMwMDB9LmJ7c3Ryb2tlLXdpZHRoOi41cHh9LmN7c3Ryb2tlOm5vbmV9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJsb2NrY2hhaW5Qcm9vZnNDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBuYXZTdGF0dXM6IHN0cmluZztcclxuICBwcm9vZnMgPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMucHJvb2ZzID0gW107XHJcbiAgICB0aGlzLnByb29mcyA9IHRoaXMuZGF0YVNlcnZpY2UucHJvb2ZzO1xyXG4gICAgY29uc29sZS5sb2coXCJpbmNvbWluZyBwcm9vZnMgYXJlIFwiICsgdGhpcy5wcm9vZnMpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlVG9CQ1Byb29mcygpIHtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UuY2hhbmdlVG9CQ1Byb29mcygpO1xyXG4gIH1cclxufVxyXG4iXX0=