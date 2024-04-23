import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Mascota } from '../../interfaces/mascota';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
    selector: 'app-listado-mascota',
    templateUrl: './listado-mascota.component.html',
    styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones'];
    dataSource = new MatTableDataSource<Mascota>();
    loading: boolean = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private _snackBar: MatSnackBar, private _mascotaService: MascotaService) { }

    ngOnInit(): void {
        this.obtenerMascotas();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (this.dataSource.data.length > 0) {
            this.paginator._intl.itemsPerPageLabel = "Items for página";
        }

    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    obtenerMascotas() {
        this.loading = true;

        this._mascotaService.getMascotas().subscribe(data => {
            this.loading = false;
            this.dataSource.data = data;
        })
    }

    // obtenerMascotas() {
    //     this.loading = true;

    //     this._mascotaService.getMascotas().subscribe({
    //         next: (data) => {
    //             this.loading = false;
    //             this.dataSource.data = data;
    //         },
    //         error: (v) => this.loading = false,
    //         complete: () => console.info("complete")
    //     })
    // }

    eliminarMascota() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
            this._snackBar.open("La mascota fue eliminada", "", {
                duration: 4000,
                horizontalPosition: 'right',
            });
        }, 3000);
    }
}
