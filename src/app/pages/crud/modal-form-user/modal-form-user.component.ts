import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss'
})
export class ModalFormUserComponent {

  planoSaude = [
    {
      id: 1,
      description: 'Plano Amil',
    },
    {
      id: 2,
      description: 'Plano Golden Cross',
    },
    {
      id: 3,
      description: 'Plano Medlife',
    },
  ]

  planoOdonto = [
    {
      id: 1,
      description: 'Plano ToothCare',
    },
    {
      id: 2,
      description: 'Plano DentalPlus',
    },
    {
      id: 3,
      description: 'Plano Amil Odontologico',
    },
  ]

  editUser: boolean = false;
  formUser: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalFormUserComponent>,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  )
    {
    this.formUser = new FormGroup({});
    }

    ngOnInit() {
     this.buildForm();
     if(this.data && this.data.name){
      this.editUser = true;
     }
    }

    saveUser(){
      const objUserForm = this.formUser.getRawValue();
      
      if(this.data && this.data.name){
         this.userService.update(this.data.firebaseId, objUserForm).then((response: any) => {
        window.alert('Usuário atualizado com sucesso!');
        this.closeModal();
      }).catch((error) => {
        console.error('Error updating user: ', error);
      });
      }else {
         this.userService.addUser(objUserForm).then((response: any) => {
        window.alert('Usuário adicionado com sucesso!');
        this.closeModal();
      }).catch((error) => {
        console.error('Error adding user: ', error);
      });
      }
       
    }
    buildForm(): void {
      this.formUser = this.formBuilder.group({
        name: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        sector: [null, [Validators.required, Validators.minLength(2)]],
        role: [null, [Validators.required, Validators.minLength(4)]],
        healthPlan: [''],
        dentalPlan: [''],
      });

      if(this.data && this.data.name){
        this.fillForm();
      }
    }

    fillForm(){
      this.formUser.patchValue({
        name: this.data.name,
        email: this.data.email,
        sector: this.data.sector,
        role: this.data.role,
        healthPlan: this.data.healthPlan,
        dentalPlan: this.data.dentalPlan
      });
    }

    closeModal(): void { this.dialogRef.close();}

}
