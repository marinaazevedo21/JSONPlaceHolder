import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from
'@angular/common/http/testing';
import { App } from './app';

describe('App', () => {
let httpMock: HttpTestingController;

beforeEach(async () => {
await TestBed.configureTestingModule({
imports: [App],
providers: [provideHttpClient(), provideHttpClientTesting()],
}).compileComponents();

httpMock = TestBed.inject(HttpTestingController);
});

afterEach(() => {
httpMock.verify();
});

it('deve criar o aplicativo', () => {
const fixture = TestBed.createComponent(App);
const app = fixture.componentInstance;
expect(app).toBeTruthy();
httpMock.expectOne((req) =>
req.url.startsWith('https://jsonplaceholder.typicode.com/posts')).flush([]);
});

it('deve renderizar o título', async () => {
const fixture = TestBed.createComponent(App);
httpMock.expectOne((req) =>
req.url.startsWith('https://jsonplaceholder.typicode.com/posts')).flush([]);
await fixture.whenStable();

const compiled = fixture.nativeElement as HTMLElement;
expect(compiled.querySelector('h1')?.textContent).toContain('Gerenciador de Tarefas');
});
});