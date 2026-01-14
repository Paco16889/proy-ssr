import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { User } from '../model/user';

@Component({
  selector: 'app-componente',
  imports: [],
  templateUrl: './componente.component.html',
  styleUrl: './componente.component.scss'
})
export class ComponenteComponent {
  users: User[] = [];
  constructor(private serviceService: ServicioService) {}

  ngOnInit() {
    // El servicio maneja toda la lógica
    this.serviceService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
}
