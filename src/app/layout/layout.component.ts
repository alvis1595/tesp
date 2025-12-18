import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Menu } from '../core/interfaces/menu.interface';
import menuJson from './menu.json';
import { CommonModule } from '@angular/common';
import { FrameworkModule } from '../shared/framework.module';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FrameworkModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isCollapsed = false;
  menus: Menu[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.menus = menuJson;
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }
}
