import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotWorthViewComponent } from './not-worth-view/not-worth-view.component';
import { AllPortfoliosDashboardComponent } from './all-portfolios-dashboard/all-portfolios-dashboard.component';
import { PortfolioOverviewComponent } from './portfolio-overview/portfolio-overview.component';
import { NotWorthEditComponent } from './not-worth-edit/not-worth-edit.component';
import { TotalCurrentValueComponent } from './total-current-value/total-current-value.component';
import { PositionsOverviewComponent } from './positions-overview/positions-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    NotWorthViewComponent,
    AllPortfoliosDashboardComponent,
    PortfolioOverviewComponent,
    NotWorthEditComponent,
    TotalCurrentValueComponent,
    PositionsOverviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
