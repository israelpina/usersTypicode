import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit {
  @Input() userId: number;
  @Output() userIdSelectedEvent = new EventEmitter<number>();

  //#region [Properties]
  public filterForm: FormGroup;
  //#endregion

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this._initForm();
    if (this.userId > 0) {
      this._setUserID(this.userId.toString());
    }
  }

  //#region [Form handler]
  private _initForm(): FormGroup {
    return this.fb.group({
      userId: ['', [Validators.required]]
    });
  }

  private _setUserID(value: string): void {
    this.filterForm.setValue({
      userId: value,
    });
  }

  public onSubmit() {
    this.userIdSelectedEvent.emit(this.filterForm.value.userId);
  }
  //#endregion

}
