import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  cards: Array<any> = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cards = [
      {
        title: 'CRQs',
        image: 'main/table.png',
        description: 'Visualiza y gestiona solicitudes de cambio con facilidad a través de simples tablas.',
        url: '/crqs/todos'
      },
      {
        title: 'Pase Express',
        image: 'main/archive.png',
        description: 'Simplifica el proceso de traspaso de elementos fuera de la tubería con una interfaz intuitiva.',
        url: '/paseExpress/listadoDeCambios'
      },
      {
        title: 'CRQ tracking',
        image: 'main/loupe.png',
        description: 'Explora todos los elementos esenciales en una liberación con acceso completo a cada detalle.',
        url: '/CRQTracking/listadoDeCambios'
      },
      {
        title: 'Despliegue CD',
        image: 'main/shuttle.png',
        description: 'Simplifica el proceso, garantiza un flujo sin inconvenientes y monitoriza cada etapa de tu despliegue.',
        url: '/DespliegueCD/Liberaciones'
      },
      {
        title: 'Administracion',
        image: 'main/settings.png',
        description: 'Gestiona con facilidad las capas y catálogos de elementos fuera de tuberías.',
        url: '/Administracion/capa'
      },
      {
        title: 'CMDB',
        image: 'main/new-folder.png',
        description: 'Visualiza de forma clara y precisa la base de datos de configuración de tu organización.',
        url: '/cmdb/atributos-manuales'
      }
    ];
  }

  navigateTo(url: string, event: Event): void {
    event.preventDefault();
    this.router.navigate([url]);
  }
}
