import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { espacio } from 'src/app/models/espacio';

@Component({
  selector: 'app-add-espacio',
  templateUrl: './add-espacio.component.html',
  styleUrls: ['./add-espacio.component.css']
})
export class AddEspacioComponent implements OnInit {

  myForm!:FormGroup;
  color = "accent";
  espacioService: any;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.myForm=this.fb.group({
      id:['',[Validators.required, Validators]],
      estacionamiento:['',[Validators.required, Validators.maxLength(70)]],
      piso:['',[Validators.required]],
      numero:['',[Validators.required, Validators.maxLength(5)]],
      estado:['',[Validators.required]],    
    })
  }

  saveEspacio(){
    
    const espacio: espacio={
      id:0,
      estacionamiento:this.myForm.get('estacionamiento')?.value,
      piso:0,
      numero:this.myForm.get('numero')?.value,
      estado:this.myForm.get('estado')?.value,

    };

    this.espacioService.addEspacio(espacio)
        .subscribe({
          next: (data: any)=>{
            this.snackBar.open("Registro OK",'',{
              duration:3000,
            })
            this.router.navigate(['/espacio']);
          },
          error:(err: any)=>{
            console.log(err);
          }
        })
  }
}
