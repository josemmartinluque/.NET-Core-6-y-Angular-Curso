import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
    selector: 'app-ver-mascota',
    templateUrl: './ver-mascota.component.html',
    styleUrls: ['./ver-mascota.component.css']
})
export class VerMascotaComponent implements OnInit {
    id: number;

    constructor(private _mascotaService: MascotaService, private aRoute: ActivatedRoute) {
        // const id = +this.aRoute.snapshot.paramMap.get('id')!;
        // const id = parseInt(this.aRoute.snapshot.paramMap.get('id')!);
        this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    }

    ngOnInit(): void {
        this.obtenerMascota();
    }

    obtenerMascota() {
        this._mascotaService.getMascota(1).subscribe(data => {
            console.log(data);
        })
    }

}
