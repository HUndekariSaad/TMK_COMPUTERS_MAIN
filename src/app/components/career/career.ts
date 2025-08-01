import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../service/theme.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-career',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './career.html',
  styleUrl: './career.css'
})
export class Career {
  jobForm!: FormGroup;

  constructor(private fb: FormBuilder, public themeService: ThemeService, private api: ApiService,
    private router: Router) { }




  ngOnInit(): void {
    this.jobForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      jobPosition: ['', Validators.required],
      // resume: [null],
      experience: ['', Validators.required],
      skills: ['', Validators.required],
      coverMessage: ['test'],
      gender: ['test'],
      linkedInId: ['test'],
      githubId: ['tset'],
      currentCTC: ['test'],
      expectedCTC: ['tset'],
      resumeUrl: [''],
    });
  }



onSubmit() {
  if (this.jobForm.invalid) {
    Swal.fire('Error', 'Please fill all required fields correctly.', 'error');
    return;
  }

  const payload = this.jobForm.value;

  this.api.postDataApi('/api/Career/create', payload).subscribe({
    next: () => {
      Swal.fire('Success', 'Message sent successfully!', 'success');
      this.jobForm.reset();
      this.router.navigate(['/career-thank-you']);
    },
    error: (err) => {
      const message = err?.error?.message || 'Something went wrong.';
      Swal.fire('Error', message, 'error');
    }
  });
}

onResumeChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    this.jobForm.patchValue({ resume: file });
  }
}


activeSection = 'career';
onSectionChange(sectionId: string) {
  this.activeSection = sectionId;
}
}
