import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { HomeService } from './home.service'
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ChatComponent } from '../chat/chat.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [{
            path: 'chat',
            loadChildren: () => import('../chat/chat.module').then(m => m.ChatModule),
        },{
            path: 'chat_users/:users_id',
            loadChildren: () => import('../chat_users/chat_users.module').then(m => m.ChatUsersModule),
        }]
    },

];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatCardModule,
        MatIconModule,
        FlexLayoutModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [HomeService, DatePipe]
})

export class HomeModule { }
