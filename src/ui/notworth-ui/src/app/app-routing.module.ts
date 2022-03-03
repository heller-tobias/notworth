import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotWorthEditComponent } from './not-worth-edit/not-worth-edit.component';
import { NotWorthViewComponent } from './not-worth-view/not-worth-view.component';
import { PortfolioOverviewComponent } from './portfolio-overview/portfolio-overview.component';
import { PositionOverviewComponent } from './position-overview/position-overview.component';

const routes: Routes = [
  { path: '', redirectTo: '/view', pathMatch: 'full' },
  { path: 'view', component: NotWorthViewComponent},
  { path: 'edit', component: NotWorthEditComponent },
  { path: 'view/portfolios/:id', component: PortfolioOverviewComponent },
  { path: 'view/portfolios/:portfolioId/positions/:id', component: PositionOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
