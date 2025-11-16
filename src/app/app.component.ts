import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-container">
      <nav class="app-nav">
        <div class="nav-brand">
          <h1>Innova</h1>
        </div>
        <div class="nav-links">
          <a routerLink="/gestion-avance" routerLinkActive="active" class="nav-link">
            Gestión de Avance
          </a>
          <a routerLink="/gestion-contenido" routerLinkActive="active" class="nav-link">
            Gestión de Contenido
          </a>
          <a routerLink="/test-evaluacion" routerLinkActive="active" class="nav-link">
            Test de Evaluación
          </a>
        </div>
      </nav>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .app-nav {
      background: #2a2a2a;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      border-bottom: 1px solid #444;
    }
    
    .nav-brand h1 {
      margin: 0;
      color: #d4a574;
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    .nav-links {
      display: flex;
      gap: 1rem;
    }
    
    .nav-link {
      padding: 0.5rem 1.5rem;
      color: #b0b0b0;
      text-decoration: none;
      border-radius: 6px;
      transition: all 0.2s;
      font-weight: 500;
    }
    
    .nav-link:hover {
      background: #333;
      color: #e0e0e0;
    }
    
    .nav-link.active {
      background: #d4a574;
      color: #1a1a1a;
    }
    
    .app-main {
      flex: 1;
      background: #1a1a1a;
    }
  `]
})
export class AppComponent {
  title = 'innova';
}

