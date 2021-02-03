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
    this.call();
  }

  call(): void {
    const domain = 'altirnao.com';
    const bucketName = 'finra-test';
    const documentId = 'SNs7ZUKxkzcY9pwAki';
    const propertyName = 'property';
    this.trainingService.copy(domain, bucketName, documentId, propertyName).then((resp) => {
      this.zone.run(() => {
        console.log(resp);
      });
    }).catch((error) => {
      this.zone.run(() => {
        this.loading = false;
      });
    });
  }


}
