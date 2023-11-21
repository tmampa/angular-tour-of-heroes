import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';

import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {MessageService} from './message.service';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({providedIn: 'root'})
export class HeroService {
    private heroesUrl = 'api/heroes'

    constructor(private http: HttpClient, private messageService: MessageService) {
    }

    /** GET heroes from the server */
    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
                tap(_ => this.log('fetched heroes')),
                catchError(this.handleError<Hero[]>('getHeroes', []))
            );
    }

    getHero(id: number): Observable<Hero> {
        // For now, assume that a hero with the specified `id` always exists.
        // Error handling will be added in the next step of the tutorial.
        const hero = HEROES.find(h => h.id === id)!;
        this.messageService.add(`HeroService: fetched hero id=${id}`);
        return of(hero);
    }

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`)
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
