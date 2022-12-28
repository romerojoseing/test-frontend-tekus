import { Component, OnInit, ViewChild } from '@angular/core';
import { SubscribersService } from 'src/app/services/subscribers.service';
import { CountriesService } from 'src/app/services/countries.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
})
export class CreateEditComponent implements OnInit {
  /*---------- Define - Modal - Create or Update Success ----------*/
  @ViewChild('modalSuccess', { static: false }) modalSuccess: any;
  modalSuccessRef?: NgbModalRef;

  /*---------- Define - New Subscriber Object ----------*/
  newSub: any = {
    Subscribers: [],
  };

  /*---------- Define - Update Subscriber Object ----------*/
  editSub: any;

  /*---------- Define - Subscriber form ----------*/
  public subscriberForm: FormGroup = new FormGroup({
    Name: new FormControl('', Validators.required),
    Email: new FormControl(
      '',
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ),
    CountryCode: new FormControl('', Validators.required),
    PhoneNumber: new FormControl('', Validators.required),
    JobTitle: new FormControl(''),
    Area: new FormControl(''),
    Topics: new FormControl([]),
  });

  countries: any;

  constructor(
    private modalService: NgbModal,
    public activatedRoute: ActivatedRoute,
    public countriesService: CountriesService,
    public subscribersService: SubscribersService
  ) {}

  ngOnInit(): void {
    /*---------- Detect ID subscriber in router ----------*/
    if (this.activatedRoute.snapshot.params['id']) {
      this.getSub(this.activatedRoute.snapshot.params['id']);
    }
    this.getCountries();
  }

  /*---------- Load Countries ----------*/
  getCountries() {
    this.countriesService.loadCountries().subscribe((res) => {
      this.countries = res;
      console.log(res);
    });
  }

  /*---------- Subscriber form observable ----------*/
  get subscriberFormControls(): {
    [key: string]: AbstractControl;
  } {
    return this.subscriberForm.controls;
  }

  /*---------- Get Subscriber ----------*/
  getSub(subscriberId: number) {
    this.subscribersService.loadSub(subscriberId).subscribe((res) => {
      let subscriber: any = res;
      this.subscriberForm.controls['Name'].setValue(subscriber.Name);
      this.subscriberForm.controls['Email'].setValue(subscriber.Email);
      this.subscriberForm.controls['CountryCode'].setValue(
        subscriber.CountryCode
      );
      this.subscriberForm.controls['PhoneNumber'].setValue(
        subscriber.PhoneNumber
      );
      this.subscriberForm.controls['JobTitle'].setValue(subscriber.JobTitle);
      this.subscriberForm.controls['Area'].setValue(subscriber.Area);
    });
  }

  /*---------- Send Data - Create or Update ----------*/
  sendData() {
    if (this.activatedRoute.snapshot.params['id']) {
      /*---------- Update ----------*/
      this.editSub = this.subscriberForm.value;
      this.editSub.Id = this.activatedRoute.snapshot.params['id'];
      this.updateSub(this.editSub);
    } else {
      /*---------- Create ----------*/
      this.newSub.Subscribers.push(this.subscriberForm.value);
      this.createSub(this.newSub);
    }
  }

  /*---------- Create Subscriber ----------*/
  createSub(subscriber: any) {
    this.subscribersService.createSub(subscriber).subscribe((res) => {
      this.subscriberForm.reset();
      this.openModalSuccess();
    });
  }

  /*---------- Update Subscriber ----------*/
  updateSub(subscriber: any) {
    this.subscribersService.updateSub(subscriber).subscribe((res) => {
      this.openModalSuccess();
    });
  }

  /*---------- Open - Modal - Delete Success ----------*/
  openModalSuccess() {
    this.modalSuccessRef = this.modalService.open(this.modalSuccess, {
      backdrop: 'static',
      keyboard: false,
    });
  }
}
