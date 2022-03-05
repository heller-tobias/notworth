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
import { PortfolioCreationComponent } from './portfolio-creation/portfolio-creation.component';
import { PositionCreationComponent } from './position-creation/position-creation.component';
import { ValueCreationComponent } from './value-creation/value-creation.component';
import { NoFutureDateValidatorDirective } from './directives/nofuturedatevalidator.directive';
import { NewDateValidatorDirective } from './directives/newdatevalidator.directive';
import { PositionOverviewComponent } from './position-overview/position-overview.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { ValueLineGraphComponent } from './value-line-graph/value-line-graph.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './login/auth-button';
import { UserProfileComponent } from './login/user-profile';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    NotWorthViewComponent,
    AllPortfoliosDashboardComponent,
    PortfolioOverviewComponent,
    NotWorthEditComponent,
    TotalCurrentValueComponent,
    PositionsOverviewComponent,
    PortfolioCreationComponent,
    PositionCreationComponent,
    ValueCreationComponent,
    NoFutureDateValidatorDirective,
    NewDateValidatorDirective,
    PositionOverviewComponent,
    ValueLineGraphComponent,
    AuthButtonComponent,
    UserProfileComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    AuthModule.forRoot({
      domain: 'dev-3p-kd7td.eu.auth0.com',
      clientId: 'TBHl2nfn0FG9VSoA1sBJemgYc4IAGuMU'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
