import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GovermantateServiceService } from '../../../Core/Services/govermantate-service.service';
import { CommonModule } from '@angular/common';
import { IGovernorate } from '../../../Core/Interface/IGovernment';

@Component({
  selector: 'app-government',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './government.component.html',
  styleUrl: './government.component.css',
})
export class GovernmentComponent {
  isSubmitting = false;
  isEditMode = false;
  id!: number;
  previewImage: string | ArrayBuffer | null = null;
  imglink: any;

  //----------------------------------------------------------
  constructor(
    private fb: FormBuilder,
    private govermantateService: GovermantateServiceService,
    public router: Router,
    private active: ActivatedRoute
  ) {}
  //-----------------------------------------
  get name() {
    return this.govermantateForm.get('name');
  }

  get description() {
    return this.govermantateForm.get('description');
  }

  get latitude() {
    return this.govermantateForm.get('latitude');
  }

  get longitude() {
    return this.govermantateForm.get('longitude');
  }

  get imageFile() {
    return this.govermantateForm.get('imageFile');
  }
  //-------------------------------------
  ngOnInit(): void {
    this.active.params.subscribe({
      next: (para) => {
        this.id = para['id'];
        this.name?.setValue('');
        this.description?.setValue('');
        this.latitude?.setValue(0);
        this.longitude?.setValue(0);
        this.imageFile?.setValue('');
      },
    });

    if (this.id != 0) this.isEditMode = true;

    console.log(this.id);
    console.log(this.isEditMode);

    if (this.isEditMode) {
      this.govermantateService.GetGovernmentbyid(Number(this.id)).subscribe({
        next: (value) => {
          this.name?.setValue(value.name);
          this.description?.setValue(value.description);
          this.latitude?.setValue(value.latitude);
          this.longitude?.setValue(value.longitude);
          this.imageFile?.setValue(value.imageFile);
        },
      });
    }
  }

  
  govermantateForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
    ]),
    latitude: new FormControl(0, [Validators.required]),
    longitude: new FormControl(0, [Validators.required]),
    imageFile: new FormControl('', [Validators.required]),
  });
  //-----------------------
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        this.previewImage = base64;

        this.imglink = base64;
        this.govermantateForm.patchValue({
          imageFile: base64,
        });
      };

      reader.readAsDataURL(file);
    }
  }
  //--------------------------------------
  onSubmit(): void {
    if (this.govermantateForm.invalid || !this.imglink) {
      this.markFormGroupTouched(this.govermantateForm);
      return;
    }

    this.isSubmitting = true;

    let body = {
      title: this.govermantateForm.value.name,
      overviewDescription: this.govermantateForm.value.description,
      lat: this.govermantateForm.value.latitude,
      lng: this.govermantateForm.value.longitude,
      imageLink: this.imglink, // Base64
    };

    console.log(body);
    if (!this.isEditMode) {
      this.govermantateService.createGovermantate(body).subscribe({
        next: () => {
          this.router.navigate(['/govall']);
        },
        error: (err: any) => {
          console.error(err);
          this.isSubmitting = false;
        },
      });
    } else {
    
      this.govermantateService.updateGovernment(body,this.id).subscribe({
        next: () => {
          this.router.navigate(['/govall']);
        },
        error: (err: any) => {
          console.error(err);
          this.isSubmitting = false;
        },
      });
    }
  }
  //----------------------------------------------------------------------
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
