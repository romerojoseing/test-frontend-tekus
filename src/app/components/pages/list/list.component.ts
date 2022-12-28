import { Component, OnInit, ViewChild } from '@angular/core';
import { SubscribersService } from 'src/app/services/subscribers.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  /*---------- Define - Modal - Delete Success ----------*/
  @ViewChild('modalDeleteSuccess', { static: false }) modalDeleteSuccess: any;
  modalDeleteSuccessRef?: NgbModalRef;

  /*---------- Define - Subscribers ----------*/
  subscribers: any;
  selectedSubscriber: any = null;

  /*---------- Define - Paginator ----------*/
  page = 1;
  pageSize = 10;

  constructor(
    private modalService: NgbModal,
    public subscribersService: SubscribersService
  ) {}

  ngOnInit(): void {
    /*---------- Load Subscribers on load Component ----------*/
    this.getSubs();
  }

  /*---------- Load Subscribers ----------*/
  getSubs() {
    this.subscribersService.loadSubs().subscribe((res) => {
      this.subscribers = res;
    });
  }

  /*---------- Select Subscriber ----------*/
  selectSubscriber(subscriber: any) {
    this.selectedSubscriber = subscriber;
  }

  /*---------- Change page paginator ----------*/
  handlePageChange(event: any): void {
    this.page = event;
  }

  /*---------- Delete Subscriber ----------*/
  deleteSub() {
    this.subscribersService
      .deleteSub(this.selectedSubscriber.Id)
      .subscribe((res) => {
        this.getSubs();
        this.openModalDeleteSuccess();
      });
  }

  /*---------- Open - Modal - Delete Success ----------*/
  openModalDeleteSuccess() {
    this.modalDeleteSuccessRef = this.modalService.open(
      this.modalDeleteSuccess,
      {
        backdrop: 'static',
        keyboard: false,
      }
    );
  }
}
