import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-agregar-editar-mascota',
    templateUrl: './agregar-editar-mascota.component.html',
    styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent implements OnInit {
    loading: boolean = false;
    form: FormGroup;
    id: number;

    operacion: string = "Agregar";

    constructor(private fb: FormBuilder,
        private _mascotaService: MascotaService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private aRoute: ActivatedRoute) {
        this.form = this.fb.group({
            nombre: ['', Validators.required],
            raza: ['', Validators.required],
            color: ['', Validators.required],
            edad: ['', Validators.required],
            peso: ['', Validators.required]
        })

        // Pongo -1 en lugar de 0 para evitar problemas en el caso de que una mascota tenga id 0
        this.id = Number(this.aRoute.snapshot.paramMap.get('id') ?? -1);
    }

    ngOnInit(): void {
        // Comprobamos -1 en lugar de 0
        if (this.id != -1) {
            this.operacion = "Editar";
            this.obtenerMascota(this.id);
        }
    }

    obtenerMascota(id: number) {
        this.loading = true;
        this._mascotaService.getMascota(id).subscribe(data => {
            this.loading = false;
            this.form.setValue({
                nombre: data.nombre,
                raza: data.raza,
                color: data.color,
                edad: data.edad,
                peso: data.peso
            })
        })
    }

    agregarEditarMascota() {
        const mascota: Mascota = {
            nombre: this.form.value.nombre,
            raza: this.form.value.raza,
            color: this.form.value.color,
            edad: this.form.value.edad,
            peso: this.form.value.peso
        };

        if (this.id != -1) {
            mascota.id = this.id;
            this.editarMascota(this.id, mascota);
        }
        else {
            this.agregarMascota(mascota);
        }
    }

    agregarMascota(mascota: Mascota) {
        // Enviamos objeto al back-end
        this._mascotaService.addMascota(mascota).subscribe(data => {
            this.mensajeExito('registrada');
            this.router.navigate(['/listMascotas']);
        })
    }

    editarMascota(id: number, mascota: Mascota) {
        this.loading = true;
        this._mascotaService.updateMascota(id, mascota).subscribe(() => {
            this.loading = false;
            this.mensajeExito('actualizada');
            this.router.navigate(['/listMascotas']);
        })
    }

    mensajeExito(texto: string) {

        this._snackBar.open(`La mascota fue ${texto} con exito`, "", {
            duration: 4000,
            horizontalPosition: 'right',
        });
    }

}
