import {Component, NgZone, OnInit} from '@angular/core';
import {FinraService} from '../../services/finra.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrls: ['./entry-point.component.scss']
})
export class EntryPointComponent implements OnInit {

  public loading = true;

  constructor(private trainingService: FinraService, private zone: NgZone) {
  }

  ngOnInit(): void {
   // this.call();
  }

  call(): void {
    const domain = 'atlanticlabs.co';
    const bucketName = 'finra-test';
    const documentId = 'SOREEFF8g613gY0pF3';
    const propertyName = 'property';
    this.trainingService.copy(domain, bucketName, documentId, propertyName).then((resp) => {
      this.zone.run(() => {
        console.log(resp);
        this.loading = false;
      });
    }).catch((error) => {
      this.zone.run(() => {
        this.loading = false;
      });
    });
  }

  delete(): void {
    const domain = 'atlanticlabs.co';
    const retentionDocumentId = 'SO9IIRp1Ts1l49dd1z';
    const documentId = 'property';
    this.trainingService.delete(domain, retentionDocumentId, documentId).then((resp) => {
      this.zone.run(() => {
        console.log(resp);
        this.loading = false;
      });
    }).catch((error) => {
      this.zone.run(() => {
        this.loading = false;
      });
    });
  }


}
