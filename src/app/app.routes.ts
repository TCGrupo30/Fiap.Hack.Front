import { Routes } from '@angular/router';
import { UploadComponent } from './pages/upload/upload.component';
import { ListComponent } from './pages/list/list.component';

export const routes: Routes = [
    {
        path: 'upload',
        component: UploadComponent
    },
    {
        path: 'list',
        component: ListComponent
    },
    {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];
